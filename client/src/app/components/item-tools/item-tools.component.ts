import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-tools',
  templateUrl: './item-tools.component.html',
  styleUrls: ['./item-tools.component.css']
})
export class ItemToolsComponent implements OnInit {
  @Input() buttonsEvent!: {onNew: {status: boolean, value: string}, onUpload: boolean, onEdit: boolean, onDownload: boolean};
  @Output() buttonsEventChange = new EventEmitter<{onNew: {status: boolean, value: string}, onUpload: boolean, onEdit: boolean, onDownload: boolean}>();

  constructor() {

  }

  ngOnInit(): void {
  }

  setEvent(btn: string) {
    if(btn == 'new') this.buttonsEvent.onNew.status = true;
    if(btn == 'edit') this.buttonsEvent.onEdit = !this.buttonsEvent.onEdit;
    if(btn == 'upload') this.buttonsEvent.onUpload = true;
    if(btn == 'download') this.buttonsEvent.onDownload = true;

    this.buttonsEventChange.emit(this.buttonsEvent);
  }

  setUploadModalEvent(event: any) {
    if(event.action == 'close') this.buttonsEvent.onUpload = false;
  }

  setNewFolderModalEvent(event: any) {
    if(event.action == 'new') {
      console.log(event.value);
      this.buttonsEvent.onNew.value = event.value;

      this.buttonsEventChange.emit(this.buttonsEvent);
    }

    if(event.action == 'close') this.buttonsEvent.onNew.status = false;
  }

}
