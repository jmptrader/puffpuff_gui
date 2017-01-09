const Primus = require('./primus')

import { Observable } from 'rxjs/observable'
import { IWChangeRoom } from './../interfaces'
export const USER_ROOM_CHANGE = 'user:room:change'
export const ROOM_GET_USERS = 'room:get:users'
export const USER_JOIN_ROOM = 'user:join:room'
export const USER_LEAVE_ROOM = 'user:leave:room'
export const OTHER_JOINED_ROOM = 'other:joined:room'
export const OTHER_LEAVED_ROOM = 'other:leaved:room'
export const STREAM = 'stream'
export const ROOM_NEW_REPLY = 'room:new:reply'
export const ROOM_USERS_ALL = 'room:users:all'
export const USER_CONNECTED = 'user:connected'

export const primus = new Primus('ws://localhost:3000', {})

import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs'

@Injectable()
export class PrimusService {
    public primus = new Primus('ws://localhost:3000', {})
    constructor() { }

    /**
     * getRoomUsers(roomId)
     * emits for server responds with room users */
    getRoomUsers(roomId: string) {
        this.primus.emit(ROOM_GET_USERS, roomId)
    }

    /**changeRoom(data)
     * emits for theserver to change current user room */
    changeRoom(data: IWChangeRoom) {
        this.primus.emit(USER_ROOM_CHANGE, data)
    }

    /** joinedRoom()
     * subscribe for events when the user joins a room */
    joinedRoom(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(USER_JOIN_ROOM, (data) => _subscriber.next(data))
        })
    }

    /** leavedRoom()
    * subscribe for events when the user leaves a room */
    leavedRoom(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(USER_LEAVE_ROOM, (data) => _subscriber.next(data))
        })
    }

    /** otherJoinedRoom()
     * subscribe for events when the other users joins a room */
    otherJoinedRoom(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(OTHER_JOINED_ROOM, (data) => _subscriber.next(data))
        })
    }

    /** otherLeavedRoom()
     * subscribe for events when the  other users leaves a room */
    otherLeavedRoom(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(OTHER_LEAVED_ROOM, (data) => _subscriber.next(data))
        })
    }

    /** stream()
    * subscribe for genric stream events */
    stream(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(STREAM, (data) => _subscriber.next(data))
        })
    }

    /** postReply()
    * subscribe for event when a new reply is created */
    postReply(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(ROOM_NEW_REPLY, (data) => _subscriber.next(data))
        })
    }

    /** roomUsers()
    * subscribe for when server sends all connected room users data */
    roomUsers(): Observable<any> {
        return Observable.create((_subscriber) => {
            this.primus.on(ROOM_USERS_ALL, (data) => _subscriber.next(data))
        })
    }

}