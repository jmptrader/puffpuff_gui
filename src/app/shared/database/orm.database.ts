import { Observable } from 'rxjs'
import * as PouchDb from 'pouchdb'
import { IDbTotal } from './../interfaces'

// PouchDb.debug.disable('*');
// PouchDb.debug.enable('*')

export const obserPromise = function (promiseObj: any) {
    return Observable.fromPromise(promiseObj)

}
/**
 * PouchOrm
 *  CRUD
 */
export class PouchOrm {
    public db: any
    /** constructor(name, options)
     *creates a new PouchDb adapter: 'idb', storage: 'persistent'
    */
    constructor(private name: string, private options: Object = {}) {
        this.db = new PouchDb(this.name, this.options)
    }

    /**destory()
     *destorys the database collection
    */
    destroy() {
        return obserPromise(this.db.destroy())
            .map((data) => {
                this.db = new PouchDb(this.name, this.options)
                return
            })
    }

    /**createPutDoc(doc)
     *  creates a doc with defined Id
     *  */
    createPutDoc(doc) {
        return obserPromise(this.db.put(doc))
    }

    /**createPostDoc(doc)
     *  creates a doc with auto generate _id */
    createPostDoc(doc) {
        return obserPromise(this.db.post(doc))
    }

    /**
     *fetchDoc(doc)
     * get by id or complete doc or _rev */
    fetchDoc(doc) {
        return obserPromise(this.db.get(doc))
    }

    /**deleteDoc(doc)
     * deletes the doc ny the id */
    deleteDoc(doc) {
        return obserPromise(this.db.remove(doc))
    }

    /** batchCreateUpdate(doc[])
     *  creates doc from an array of doc provided
    */
    batchCreateUpdate(doc: any[]) {
        return obserPromise(this.db.bulkDocs(doc))
    }

    /**batchFetch(options)
     * returns all docs from the db  */
    allDocs(options: Object = { include_docs: true }) {
        return obserPromise(this.db.allDocs(options))
    }

    /**
     *query is a function(doc, emit)
    * note: doc is the coumnet being considered, emit split it
     */
    query(query: Function) {
        return obserPromise(this.db.query(query, { include_docs: true }))
    }

    /**
     *checkAndAdd(doc)
    * checks and adds and add the doc to the db
     */
    checkAndAdd(doc) {
        return this.allDocs()
            .map((data: IDbTotal) => data.rows)
            .map((stored: any[]) => {
                if (typeof doc.length === 'number') {
                    stored.forEach((item) => {
                        if (this.check(stored, item)) this.createPostDoc(item)
                    })
                    return doc
                }
                if (this.check(stored, doc)) this.createPostDoc(doc)
                return doc
            })
    }

    /**
     *check( datas ,doc)
    *checks if a data esits in the list
     */
    check(data: any[], doc: any): boolean {
        let isExist = true
        data.forEach(item => {
            if (doc.id === item.doc.id) isExist = false
        });
        return isExist
    }

    /**dbInfo()
     * returns the database information
     */
    dbInfo() {
        return obserPromise(this.db.info())
    }


}