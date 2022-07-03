import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-folder-modal',
  templateUrl: './new-folder-modal.component.html',
  styleUrls: ['./new-folder-modal.component.css']
})
export class NewFolderModalComponent implements OnInit {
  @Output() newFolderModalAction: EventEmitter<{action: string, value: string}> = new EventEmitter();
  folderName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  create() {
    this.newFolderModalAction.emit({action: 'new', value: this.folderName});
  }

  close() {
    this.newFolderModalAction.emit({action: 'close', value: ''});
  }

}
