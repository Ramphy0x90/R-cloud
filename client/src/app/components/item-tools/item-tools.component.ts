import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-tools',
  templateUrl: './item-tools.component.html',
  styleUrls: ['./item-tools.component.css']
})
export class ItemToolsComponent implements OnInit {
  @Output() buttonsEvent = new EventEmitter<{onNew: boolean, onUpload: boolean, onEdit: boolean}>();
  buttons = {onNew: false, onUpload: false, onEdit: false};

  constructor() {

  }

  ngOnInit(): void {
  }

  setEvent(btn: string) {
    if(btn == 'edit') this.buttons.onEdit = !this.buttons.onEdit;
    if(btn == 'upload') this.buttons.onUpload = true;

    this.buttonsEvent.emit(this.buttons);
  }

  setUploadModalEvent(event: any) {
    if(event.action == 'close') this.buttons.onUpload = false;
  }

}
