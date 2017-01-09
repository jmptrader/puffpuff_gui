import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const $;

@Component({
    selector: 'flux-create',
    templateUrl: 'create.component.html'
})
export class ItemCreateComponent implements OnInit {
    @Input('label') label = 'Comment'
    @Input('upload') upload: boolean = false
    @Input('singleUpload') fileUpload: boolean = true
    @Input('filesNo') fileNo: number = 8
    @Input('upload-id') dropId = 'default'
    @Input('base') base

    @Output('createdValue') value = new EventEmitter()
    private texts: string = ''
    private activeUpload: boolean = false

    private dropzone: any;
    constructor() { }

    inputChanges($event: any) {
        this.texts = $event.target.value
    }


    createItem() {
        if (this.dropId === 'ID_Post_Modal_Creator') this.base = undefined
        // attaches form body
        if (this.dropzone) {
            this.dropzone.on('sending', (file, xhr, formData) => {
                formData.append('body', this.texts)
                if (this.base) formData.append('base', this.base)
            })
        }

        this.value.emit({
            input: this.texts,
            type: this.label,
            upload: this.activeUpload,
            base: this.base,
            dropzone: this.dropzone
        })
        this.texts = ''
        this.activeUpload = false
    }

    setUploads($event) {
        this.activeUpload = true
        this.dropzone = $event.uploads
    }

    ngOnInit() {

    }

}