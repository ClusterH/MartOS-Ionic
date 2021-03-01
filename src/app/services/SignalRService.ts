import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ConfigService } from './ConfigService';
import { UserConnection } from '../models/UserConnection';
import { DeliveryOrdersClient } from '../my-orders/checkout/clients/DeliveryOrdersClient';
import { DeliveryRider } from '../models/DeliveryRider';
import { UpdateDeliveryStepMessage } from '../models/UpdateDeliveryStepMessage';
import { UpdateDeliveryLocationMessage } from '../models/UpdateDeliveryLocationMessage';
import { DeliveryOrdersService } from './DeliveryOrdersService';
import { CloseDeliveryMessage } from '../models/CloseDeliveryMessage';
import { DeliveryExistResponse } from '../requests/DeliveryExistResponse';


@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    connection: UserConnection;
    private hubConnection: signalR.HubConnection

    constructor(private configService: ConfigService,
        private deliveryOrdersClient : DeliveryOrdersClient,
        private deliveryOrdersService: DeliveryOrdersService) {
    }

    public async init() {
        return new Promise(async (resolve) => {
        (await this.deliveryOrdersClient.GetConnectionId()).subscribe(async userConnection => {
           resolve(userConnection)
           this.connection = userConnection;

        if (!this.hubConnection) {
            console.log('init signalR');
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`http://10.0.2.2:5080/hub?connectionId=${this.connection.id}`)
                .build();
            this.hubConnection.start().then(() => {
                console.log('hub connection started');
            }).catch(err => {
                console.log(err);
            });
        }
        
        this.hubConnection.on(`UpdateDeliveryRider`, (rider: DeliveryRider) => {
            console.log('signalR pass message');
            //console.log(rider);
            this.deliveryOrdersService.changeDeliveryRider(rider);
        });

        this.hubConnection.on(`UpdateDeliveryStep`, (deliveryStep: UpdateDeliveryStepMessage) => {
            console.log('signalR pass message');
            this.deliveryOrdersService.changeDeliveryStep(deliveryStep);
        });

        this.hubConnection.on(`UpdateDeliveryLocation`, (deliveryLocation: UpdateDeliveryLocationMessage) => {
            console.log('signalR pass message');
            this.deliveryOrdersService.changeDeliveryLocation(deliveryLocation)
        });

        this.hubConnection.on(`CloseDelivery`, (deliveryLocation: CloseDeliveryMessage) => {
            console.log('signalR pass message');
            this.deliveryOrdersService.changeCloseDelivery(deliveryLocation);
            let response = <DeliveryExistResponse> {
                exist : false
            };

            this.deliveryOrdersService.changeDeliveryExistResponse(response);
        });

        this.hubConnection.on(`DeliveryExist`, (existResponse: DeliveryExistResponse) => {
            console.log('signalR pass message');
            this.deliveryOrdersService.changeDeliveryExistResponse(existResponse)
        });
    }); 
    });
    }

    // public Test = () => {
    //     alert(`testo${this.id}`);
    //     this.hubConnection.on(`testo${this.id}`, (message: NewMessage) => {
    //         console.log('signalR pass message');
    //         alert(message.id);
    //     });
    //   }

    public closeConnection() {
        if (this.hubConnection) {
            console.log('close connection');
            this.hubConnection.stop();
            this.hubConnection = null;
        }
    }
}