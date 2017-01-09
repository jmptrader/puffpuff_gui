import { AuthDB } from './../database'
export * from './post.faker'


export function selectUser(item) {
    const  auth = new AuthDB()
    const user = auth.auth().user

    if (user === null) return undefined
    return user[item]
}