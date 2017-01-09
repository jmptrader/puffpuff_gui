import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/observable'
import * as toastr from 'toastr'
import * as Dropzone from 'dropzone'

declare const $;

toastr.options.newestOnTop = true;

Dropzone.autoDiscover = false;
Dropzone.options.myAwesomeDropzone = false;

@Component({
    selector: 'flux-upload',
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit, AfterViewInit {
    // valid input for multiple uploads
    @Input('multiple-Upload') mutiUpload = true
    @Input('drop-zone-id') dropId = ''
    @Input('single') single = true
    @Input('max-files') maxFiles = 10
    @Output('uploads') uploads = new EventEmitter()

    private uploading: boolean = false
    private currentUProgs: number = 0
    private totalUProgs: number = 0
    private currentFile: string = ' '
    // controlls progress visibilty
    private singleUpload: boolean = false
    private multipleUpload: boolean = false
    private err = ''
    private zoneOptions: any
    private dropzone: any
    constructor() {
        this.zoneOptions = {
            url: 'temporal:4000',
            addRemoveLinks: false,
            maxFilesize: 2,
            parallelUploads: 10,
            uploadMultiple: this.mutiUpload,
            maxFiles: this.maxFiles,
            acceptedFiles: 'image/*',
            autoProcessQueue: false
        }
        // bug: !this.single

    }

    resizeModal() {
        $('.ui.modal')
            .modal('refresh')
        // `div#${this.dropId}`
    }

    uploadEmit() {
        this.uploads.emit({
            uploads: this.dropzone
        })
    }


    updateProgs() {
        $('#totalProgress').progress({
            percent: this.totalUProgs
        });

        $('#currentProgress').progress({
            percent: this.currentUProgs
        });
    }

    initDropzone(dropElement) {
        // programatically creates the upload div
        this.dropzone = new Dropzone(dropElement, this.zoneOptions)
        // add an event to the thumbnail generated
        // to remove if clicked
        this.dropzone.on('addedfile', (file) => {
            try {
                file.previewElement.addEventListener("click", () => {
                this.dropzone.removeFile(file)
            })
            } catch (e) {
            //   console.log(e)  
            }
            this.uploadEmit()
            this.resizeModal()
        })
        // add event to programatically remove individual
        // files created after complete [fail or success]
        this.dropzone.on('complete', (file) => {
            // this.updateProgs()
            try {
                this.currentUProgs = 0
                this.currentFile = ''
                this.uploading = false
                this.singleUpload = false
                toastr.info(`completed ${file.name}`)
                this.dropzone.removeFile(file)
            } catch (error) {
                // console.error('a', error)
            }
            this.uploadEmit()
            this.err = ''
            $('.ui.modal')
                .modal('hide')
        })
        // emit dropzone upload progress when a file is removed
        this.dropzone.on('removedfile', (file) => {
            this.uploadEmit()
            this.resizeModal()
        })
        // while sending srts the name of file currently uploaded
        // and sets autoprocessque to upload all images
        this.dropzone.on('sending', (file, xhr, formData) => {
            // this.dropzone.options.autoProcessQueue = true 
            this.currentFile = file.name
            this.singleUpload = true
            toastr.info(`currently uploading ${file.name}`)
            this.resizeModal()
        })
        // trigger error during Upload
        this.dropzone.on('error', (file, err) => {
            this.singleUpload = false
            toastr.error( `err while uploading ${file.name}`)
            this.resizeModal()
        })
        // monitor total upload progress
        this.dropzone.on('totaluploadprogress', (uploadProgress) => {
            if (uploadProgress === NaN) uploadProgress = 0
            this.totalUProgs = uploadProgress
            this.updateProgs()
            this.resizeModal()
        })
        // monitor current upload progress
        this.dropzone.on('uploadprogress', (file, uploadProgress) => {
            if (uploadProgress === NaN) uploadProgress = 0
            this.currentUProgs = uploadProgress
            this.updateProgs()
        })
        // resets total upload progress
        this.dropzone.on('completemultiple', (fileArray) => {
            // this.totalUProgs = 0
            this.multipleUpload = false
            this.singleUpload = false
            this.updateProgs()
        })
        // resets total upload progress
        this.dropzone.on('processingmultiple', (fileArray) => {
            this.multipleUpload = true
            this.updateProgs()
        })
        // info about maxFiles and maxFilesize
        this.dropzone.on('maxfilesreached', (file) => {
            toastr.warn(`${file.name} max number of files allowed for uploads reached`)
        })

        this.dropzone.on('maxfilesexceeded', (file) => {
            toastr.warn(`${file.name} max file size allowed for uploads exceeded`)
        })

        this.updateProgs()
    }

    ngAfterViewInit() {
        const selector = `.create`
        const composed = `div#${this.dropId}.create`
        try {
            // please note this would trigger an error if it has been
            // attached with the id before in anoder page.
            // that's why it is tryied
            this.initDropzone($(composed).get(0))
        } catch (e) {
            // console.log(e)
        }
    }

    ngOnInit() {

    }

}
