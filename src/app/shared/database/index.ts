export * from './orm.database'
export * from './auth.database'

import { PouchOrm } from './orm.database'
import { IDbTotal } from './../interfaces'
export const AuthorizedId = 'AuthorizedID'
// adapter: 'idb', 
export const UserDB = new PouchOrm('Flux-User', { revs_limit: 1, auto_compaction: true, storage: 'persistent' })
export const FeedDB = new PouchOrm('Flux-Feed', { revs_limit: 1, auto_compaction: true, storage: 'persistent' })
export const PostsDB = new PouchOrm('Flux-Posts')
export const TrendsDB = new PouchOrm('Flux-Trends')
export const StreamDB = new PouchOrm('Flux-Stream')

// UserDB.allDocs().map((data: IDbTotal) => {
//     // console.log(data)
//     return data.rows
// }).subscribe((x) => console.log(x))