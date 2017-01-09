import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApiUrl, options } from './index'
import { ILogin } from './../interfaces'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    /** login$(data) 
     * creates a post request for the login */
    login$(data: ILogin): Observable<any> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        const url = ApiUrl + '/auth/login'        
        return this.http.post(url, data)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**signUp$(data)
     * returns a post Observable for the user to signUp */
    signUp$(data: any): Observable<any> {
        const url = ApiUrl + '/auth/signup'
        return this.http.post(url, data)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**update$(data)
     *returns a put request to update the user
     */
    update$(token: string, data: any): Observable<any> {
        const url = ApiUrl + '/api/v1/dashboard?' + `token=${token}`
        return this.http.put(url, data)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**getUser$()
     * returns an http request that returns the current user */
    getUser$(token: string): Observable<any> {
        const url = ApiUrl + '/api/v1/dashboard?' + `token=${token}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**logOut$()
    * returns an http request that returns that logOut the current user */
    logOut$(): Observable<any> {
        const url = ApiUrl + '/api/v1/auth/logout'
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

}