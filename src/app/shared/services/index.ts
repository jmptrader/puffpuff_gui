import { Headers, RequestOptions } from '@angular/http'

const headers = new Headers({
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "e7b074a1-fcf2-152a-b8de-3e6bfda7d8a5"
  });
export const options = new RequestOptions({ headers: headers });
export const ApiUrl =  'http://localhost:3000'

export * from './auth.service'
export * from './feed.service'
export * from './item.service'

export * from './upload.service'
export * from './info.service'