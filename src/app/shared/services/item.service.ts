import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiUrl } from './index'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map';
// import { of } from 'rxjs/observable/of';

@Injectable()
export class ItemService {

    constructor(private http: Http) { }

    /** loadPostFeed$(id, skip) gets a post of it
     * and corresponding comments of id and concat to it */
    loadPostFeed$(id: string, skip: number = 0): Observable<any> {
        // const comment$ = this.findItem$('post', id, skip)
        //     .map((res) => res.json())
        // if (skip > 0) {
        //     return comment$
        // }
        const post$ = this.getItem$('post', id)
        return post$
        // return Observable.merge(post$, comment$)
    }

    /** getItem$(type, id) returns an observable of http from the
     * url path formated throught the type [post, comment] an id of
     * item to return */
    getItem$(type: string, id: string): Observable<any> {
        let url = ApiUrl + `/api/v1/${type}s/${id}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

    /** createItem$(type, data) type [post, comment] returns an http observable of post request */
    createItem$(token: string, type: string, data: any): Observable<any> {
        let url = ApiUrl + `/api/v1/${type}s` + `?token=${token}`

        if (type.toLowerCase() === 'comment') data = data.body
        return this.http.post(url, data)
            .map((res: Response) => {
                return res.json();
            })
    }

    /** updateItem$(type, id, data) the type[comment, post]
     * id of item to update and data to update to */
    updateItem$(token: string, type: string, id: string, data: any): Observable<any> {
        let url = ApiUrl + `/api/v1/${type}s/${id}` + `?token=${token}`
        return this.http.put(url, data)
            .map((res: Response) => {
                return res.json();
            })
    }

    /** findItem$(type, id) returns an observable of http from the
  * url path formated throught the type [post, comment] an id of
  * item to return */
    findItem$(type: string, query: string, skip: number): Observable<any> {
        let url = ApiUrl + `/api/v1/${type}s`
        if (query) {
            if (type === 'post') {
                url = url + `?id=${query}`
            } else {
                url = url + `?base=${query}`
            }
        }
        if (skip) url = url + `&skip=${skip}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

}