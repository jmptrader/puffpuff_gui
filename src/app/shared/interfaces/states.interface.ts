import { Observable } from 'rxjs/observable'

// interface for a login user or any user
export interface IUser {
    id: string | number,
    email: string,
    username: string,
    gender: string,
    img?: string
}

// interface for a list of feed items for both posts and comments
export interface IFeedItem {
    id: string | number,
    title?: string,
    body: string,
    category?: string[],
    imgsUrl?: string[],
    base?: any,
    createdAt?: string
    owner: IUser
}

// Interface for Actions like slap, clap
export interface IAction {
    id: string | number,
    owner: IUser,
    type: string,
    flour: IFeedItem
}

// meta data informations for feed Items
export interface IInfo {
    likes: number,
    dislikes: number,
    bias?: boolean,
    likeId?: string
}

// login Interface
export interface ILogin {
    email: string,
    password: string
}

// SignUp Interface
export interface ISignUp {
    email: string,
    username: string,
    password: string,
    gender: string
}

export interface IUserDB {
    _id?: string,
    user: IUser,
    token: string
}

export interface IStoredDoc {
    _id: string,
    _rev: string,
    doc: any
}

export interface IDbDoc {
    doc: IStoredDoc,
    id: string,
    key: string,
    value: {
        rev: string
    }
}

export interface IDbTotal {
    total_rows: number,
    offset: number,
    rows: IDbDoc[]
}

export interface IWChangeRoom {
    id?: string,
    room: string
}


export interface ICAuth {
    user: Observable<IUser>,
    token: Observable<string>
}