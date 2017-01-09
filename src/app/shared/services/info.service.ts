import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ApiUrl } from './index'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InfoService {

    constructor(private http: Http) { }

    /**getInfo(id, token)
     * @{params} id {type} string
     * @{params} token{string} returns a particular feedInfo*/
    getInfo(id: string, token: string) {
        let url = ApiUrl + `/api/v1/info/${id}`
        if (typeof token === 'string') url = url + `?token=${token}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }


    iAction(token: string, type: string, id: string) {
        const url = ApiUrl + '/api/v1/iaction' + `?token=${token}`        
        return this.http.post(url, { type, flour: id })
            .map((res: Response) => {
                return res.json();
            })
    }

    iView(id: string, token: string) {
        let url = ApiUrl + '/api/v1/iaction/' + id
        if (token) url = url + `?token=${token}`
        return this.http.post(url, { type: 'view' })
            .map((res: Response) => {
                return res.json();
            })
    }

}