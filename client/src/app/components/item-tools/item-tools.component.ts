import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-tools',
  templateUrl: './item-tools.component.html',
  styleUrls: ['./item-tools.component.css']
})
export class ItemToolsComponent implements OnInit {
  @Input() buttonsEvent!: {onNew: boolean, onUpload: boolean, onEdit: boolean, onDownload: boolean};
  @Output() buttonsEventChange = new EventEmitter<{onNew: boolean, onUpload: boolean, onEdit: boolean, onDownload: boolean}>();

  constructor() {

  }

  ngOnInit(): void {
  }

  setEvent(btn: string) {
    if(btn == 'edit') this.buttonsEvent.onEdit = !this.buttonsEvent.onEdit;
    if(btn == 'upload') this.buttonsEvent.onUpload = true;
    if(btn == 'download') this.buttonsEvent.onDownload = true;

    this.buttonsEventChange.emit(this.buttonsEvent);

    console.log(this.buttonsEvent);

    this.buttonsEvent.onDownload = false;
  }

  setUploadModalEvent(event: any) {
    if(event.action == 'close') this.buttonsEvent.onUpload = false;
  }

}
