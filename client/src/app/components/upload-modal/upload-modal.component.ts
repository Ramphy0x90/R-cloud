import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {
  @Output() uploadModalAction: EventEmitter<{action: string}> = new EventEmitter();
  uploader!: FileUploader;

  constructor(private itemService: ItemService) {
    this.uploader = itemService.uploader;
  }

  ngOnInit(): void {
  }

  close() {
    this.uploadModalAction.emit({action: 'close'});
  }
}
