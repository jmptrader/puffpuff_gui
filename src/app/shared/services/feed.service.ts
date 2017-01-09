import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiUrl } from './index'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

import { TrendsDB, StreamDB , FeedDB} from './../database'
@Injectable()
export class FeedService {

    constructor(private http: Http) { }

    /**loadFeed$(skip)
     *{skip } is number of feed items to skip over
     * @ params number returns an http observable which loads the current user
     * personal feed */
    loadFeed$(token: string, skip: number = 0): Observable<any> {
        let url = ApiUrl + '/api/v1/feed?' + `token=${token}`
        if (skip !== 0 && typeof skip === 'number') url = url + `&skip=${skip}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**userFeed$(id, skip)
     *  id = is the user id which feed is loaded
     *  skip = is number of feed items to skip over
     * @ params number returns an http observable which loads the user with the id
     * personal feed */
    userFeed$(id: string, skip: number): Observable<any> {
        let url = ApiUrl + `/api/v1/feed/${id}`
        if (skip !== 0 && typeof skip === 'number') url = url + `?skip=${skip}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**
     * trending$(skip)
     * skip is the amount of items to skip over
     * returns an http observable which loads the trending items from the server */
    trending$(skip: number): Observable<any> {
        let url = ApiUrl + `/api/v1/trends`
        if (skip !== 0 && typeof skip === 'number') url = url + `?skip=${skip}`
        return this.http.get(url)
            .map((res: Response) => {
                console.log('trending', res.json());

                return res.json();
            })
    }

    /**
     *stream$(skip)
     *skip is the amount of items to skip over
     * is used to get the latest uploaded items
     */
    stream$(skip: number): Observable<any> {
        let url = ApiUrl + `/api/v1/stream`
        if (skip !== 0 && typeof skip === 'number') url = url + `?skip=${skip}`
        return this.http.get(url)
            .map((res: Response) => {
                return res.json();
            })
    }

    /**trendingDB$()
     * returns all the trends stored in the database */
    trendingDB$(): Observable<any> {
        return TrendsDB.allDocs()
    }

    /**streamDB$()
     * returns all the streams stored in the database */    
    streamDB$(): Observable<any> {
        return StreamDB.allDocs()
    }

    /**feedDB$()
     * returns all the streams stored in the database */    
    feedDB$(): Observable<any> {
        return FeedDB.allDocs()
    }
}