import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  providers: [Keyboard]
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @ViewChild('drawerbtn', { read: ElementRef }) drawerbtn: ElementRef;
  @ViewChild('innerContent', { read: ElementRef }) innerContent: ElementRef;
  @Input() minheight;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  breacckpointa = 55;
  breacckpointb = 160;
  breacckpointc = 100;
  currentStateValue = '';
  isOpen = false;
  isdrawerOpenned = false;
  openHeight = 0;
  @Input() scrollPosition;

  constructor(private plt: Platform, private gestureCtrl: GestureController, private keyboard: Keyboard) { }
  async ngAfterViewInit() {
    console.log('init');
    this.keyboard.disableScroll(true);
    const drawer = this.drawer.nativeElement;
    const drawerbtn = this.drawerbtn.nativeElement;
    const innerContent = this.innerContent.nativeElement;

    this.openHeight = this.plt.height();
    // console.log(this.openHeight);
    drawer.style.transform = `translateY(${this.openHeight}px)`;
    const gesture = await this.gestureCtrl.create({
      el: drawerbtn,
      gestureName: 'swipe',
      direction: 'y',
      passive: false,
      onStart: () => {
        drawer.style.transition = 'none';
      },
      onMove: ev => {
        // console.log(ev.deltaY);
        drawer.style.transition = 'all 0ms linear 0ms';
        switch (this.currentStateValue) {
          case 'a':
            drawer.style.transform = `translateY(${this.openHeight - this.breacckpointa + ev.deltaY}px)`;
            break;
          case 'b':
            drawer.style.transform = `translateY(${this.openHeight - this.breacckpointb + ev.deltaY}px)`;
            break;
          case 'c':
            drawer.style.transform = `translateY(${this.breacckpointc + ev.deltaY}px)`;
            break;
          default:
            break;

        }
      },
      onEnd: ev => {
        console.log('end', ev.deltaY);
        if (ev.deltaY === 0) {
          return;
        }
        switch (this.currentStateValue) {
          case 'a':
            if (ev.deltaY < 0 && ev.deltaY > -100) {
              this.minimizeDrawer();
            } else if (ev.deltaY > 0) {
              this.closeDrawer();
            } else {
              this.fullOpenDrawer();
            }
            break;
          case 'b':
            if (ev.deltaY < 0) {
              this.fullOpenDrawer();
            } else {
              this.openDrawer();
            }
            break;
          case 'c':
            if (ev.deltaY < 0) {
              this.fullOpenDrawer();
            } else if (ev.deltaY > this.openHeight - (this.breacckpointb + this.breacckpointa)) {
              this.openDrawer();
            } else {
              this.minimizeDrawer();
            }
            break;
          default:
            break;
        }

      }
    });
    gesture.enable(true);

    const gesture2 = await this.gestureCtrl.create({
      el: innerContent,
      gestureName: 'swipe2',
      direction: 'y',
      passive: false,
      onMove: ev => {
        drawer.style.transition = 'all 0ms linear 0ms';
        console.log(this.scrollPosition);
        if (this.scrollPosition === 0) {
          switch (this.currentStateValue) {
            case 'a':
              drawer.style.transform = `translateY(${this.openHeight - this.breacckpointa + ev.deltaY}px)`;
              break;
            case 'b':
              drawer.style.transform = `translateY(${this.openHeight - this.breacckpointb + ev.deltaY}px)`;
              break;
            case 'c':
              drawer.style.transform = `translateY(${this.breacckpointc + ev.deltaY}px)`;
              break;
            default:
              break;
          }
        }
        // console.log('start', ev);

      },
      onEnd: ev => {
        console.log('end', ev);
        if (this.scrollPosition === 0) {
          switch (this.currentStateValue) {
            case 'a':
              if (ev.deltaY < 0 && ev.deltaY > -100) {
                this.minimizeDrawer();
              } else if (ev.deltaY > 0) {
                this.closeDrawer();
              } else {
                this.fullOpenDrawer();
              }
              break;
            case 'b':
              if (ev.deltaY < 0) {
                this.fullOpenDrawer();
              } else {
                this.openDrawer();
              }
              break;
            case 'c':
              if (ev.deltaY < 0) {
                this.fullOpenDrawer();
              } else if (ev.deltaY > this.openHeight - (this.breacckpointb + this.breacckpointa)) {
                this.openDrawer();
              } else {
                this.minimizeDrawer();
              }
              break;
            default:
              break;
          }
        }
      }
    });
    gesture2.enable(true);
  }

  openDrawer() {

    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.4s ease-out';
    drawer.style.transform = `translateY(${this.openHeight - this.breacckpointa}px)`;
    this.currentStateValue = 'a';
    this.isOpen = false;
    this.openState.emit(false);

  }
  fullOpenDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.4s ease-out';
    drawer.style.transform = `translateY(${this.breacckpointc}px)`;
    this.currentStateValue = 'c';
    this.isOpen = true;
    this.openState.emit(true);

  }

  minimizeDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transform = `translateY(${this.openHeight - this.breacckpointb}px)`;
    drawer.style.transition = '.4s ease-out';
    this.isOpen = false;
    this.openState.emit(false);
    this.currentStateValue = 'b';
  }

  closeDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transform = `translateY(${this.openHeight}px)`;
    drawer.style.transition = '.4s ease-out';
    this.isOpen = false;
    this.openState.emit(false);
  }
}
