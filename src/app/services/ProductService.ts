
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    public activeImageSlide$ = new BehaviorSubject(null);
    constructor() { 
        
    }
    updateActiveImageSlide(slide) {
        this.activeImageSlide$.next(slide);
    }
}