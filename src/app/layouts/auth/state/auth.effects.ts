import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthPageAction } from './actions';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../login/services/auth.service';

@Injectable() 
export class AuthEffects { 
    constructor(private actions$: Actions, 
        private authService: AuthService,
         private route: Router,
         )  {}
}
