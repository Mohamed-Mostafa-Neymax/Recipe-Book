import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

export interface AuthResponseData {
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {}
    
    userSubj = new BehaviorSubject<User>(null);

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz6Fi2TiTU8cKmNtjDwV2Efwphmu5Ajfk', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError( this.handleError ),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz6Fi2TiTU8cKmNtjDwV2Efwphmu5Ajfk', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError( this.handleError ),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    logout() {
        this.userSubj.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSubj.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if( !errorRes.error || !errorRes.error.error ) return throwError(errorMessage);
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email doesn\'t exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password isn\'t correct.';
                break;
        }
        return throwError(errorMessage);
    }
}