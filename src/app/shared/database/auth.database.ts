import * as cookies from 'browser-cookies'
import { IUserDB, IUser, ICAuth } from './../interfaces'
import { Observable } from 'rxjs/observable'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

const User = 'USER-cookies'
const Token = 'Token-cookies'

/**
 * AuthDB
 */
export class AuthDB {
    private options;
    public token: string
    public user: Object
    constructor(cookieOpts: Object = {}) {
        this.options = cookieOpts
    }

    setAuth(data: IUserDB): Observable<ICAuth> {
        return this.nexter({
            user: this.setUser(data.user),
            token: this.setToken(data.token)
        })
    }

    getAuth(): Observable<ICAuth> {
        return this.nexter({
            user: this.getUser(),
            token: this.getToken()
        })
    }

    delAuth(): Observable<ICAuth> {
        return this.nexter({
            user: this.delUser(),
            token: this.delToken()
        })
    }

    setUser(data: IUser): Observable<IUser> {
        cookies.set(User, JSON.stringify(data), this.options)
        return this.getUser()
    }
    setToken(token: string) {
        cookies.set(Token, JSON.stringify(token), this.options)
        return this.getToken()
    }

    getUser(): Observable<IUser> {
        this.user = JSON.parse(cookies.get(User, this.options))
        return this.nexter(this.user)
    }

    getToken(): Observable<String> {
        this.token = JSON.parse(cookies.get(Token, this.options))
        return this.nexter(this.token)
    }

    delUser(): Observable<IUser> {
        cookies.erase(User, this.options)
        return this.getUser()
    }

    public auth() {
        return {
            user: JSON.parse(cookies.get(User, this.options)),
            token: JSON.parse(cookies.get(Token, this.options))
        }
    }

    delToken(): Observable<String> {
        cookies.erase(Token, this.options)
        return this.getToken()
    }

    nexter(data): Observable<any> {
        return Observable.create((_subscriber) => _subscriber.next(data))
    }
}