import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ItemToolsEvents } from '../../models/ItemToolsEvents.model';

@Component({
  selector: 'app-item-tools',
  templateUrl: './item-tools.component.html',
  styleUrls: ['./item-tools.component.css']
})
export class ItemToolsComponent implements OnInit {
  @Input() buttonsEvent!: ItemToolsEvents;
  @Output() buttonsEventChange = new EventEmitter<ItemToolsEvents>();

  constructor() { }

  ngOnInit(): void { }

  /**
   * Set button event based on clicked button
   * @param btn 
   */
  setEvent(btn: string) {
    if(btn == 'new') this.buttonsEvent.onNew.status = true;
    if(btn == 'edit') this.buttonsEvent.onEdit = !this.buttonsEvent.onEdit;
    if(btn == 'upload') this.buttonsEvent.onUpload = true;
    if(btn == 'download') this.buttonsEvent.onDownload = true;
    if(btn == 'delete') this.buttonsEvent.onDelete = true;

    this.buttonsEventChange.emit(this.buttonsEvent);
  }

  /**
   * Function called inside the upload modal
   * @param event 
   */
  setUploadModalEvent(event: any) {
    if(event.action == 'close') this.buttonsEvent.onUpload = false;
  }

  /**
   * Show modal to create new folder
   * @param event 
   */
  setNewFolderModalEvent(event: any) {
    if(event.action == 'new') {
      this.buttonsEvent.onNew.value = event.value;

      this.buttonsEventChange.emit(this.buttonsEvent);
    }

    if(event.action == 'close') this.buttonsEvent.onNew.status = false;
  }

}
