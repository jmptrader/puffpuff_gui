import { Injectable } from '@angular/core';
// import * as blobutil from 'blob-util'
import { Observable } from 'rxjs/observable'


// implemented fullt for the mobile application cache
@Injectable()
export class UploadService {

    constructor() { }

    fileChangeEvent(files: FileList) {
        // blobutil.blobToBase64String(files['0'])
        //     .then((base64string) => {
        //         console.log(base64string)
        //     })

    }
    fileObservable(item: File) {
        console.log(typeof item, item)
        return Observable.create((_observer: any) => {
            const reader: FileReader = new FileReader()
            reader.addEventListener('load', () => {
                console.log(reader.result);
                _observer.next(reader.result);
            })
            reader.readAsDataURL(item)
        })
    }

}