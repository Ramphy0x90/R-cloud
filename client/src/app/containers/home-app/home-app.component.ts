import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent implements OnInit {
  path: {name: string, isDir: boolean; path: string; }[] = [];
  pathHistory: {folder: string, path: string}[] = [];
  buttonsEvent: {onNew: boolean, onUpload: boolean, onEdit: boolean, onDownload: boolean} = {onNew: false, onUpload: false, onEdit: false, onDownload: false};
  selectedItems: {name: string, path: string}[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.currentPath.subscribe((currentPath) => {
      this.path = [];
      
      Object.entries(currentPath).find(([key, value]) => {
        let folderParams: {isDir: boolean, path: string} | any = value;
        this.path.push({
          name: key, isDir: folderParams.isDir, path: folderParams.path 
        })
      });
    });
  }

  ngOnInit(): void {
    this.itemService.getContent();
  }

  getContent(parent: number) {
    let nextPath = this.path[parent].path;
    let newPath = nextPath.substring(0, nextPath.length - this.path[parent].name.length);

    this.pathHistory.push(
      {folder: this.path[parent].name, path: newPath}
    );

    this.path = [];

    this.itemService.getContent(nextPath);
  }

  comeBack(folderTo: number) {
    let folderInfo = this.pathHistory[folderTo];

    this.pathHistory.splice(folderTo);
    
    this.path = [];
    this.itemService.getContent(folderInfo.path);
  }

  setItemToolsEvent(event: any) {
    this.buttonsEvent = event;

    if(this.buttonsEvent.onDownload) {
      this.selectedItems.forEach((item) => {
        this.itemService.download(item);
      });

      this.selectedItems = []
      this.buttonsEvent.onEdit = false;
    }

    if(!event.onEdit) this.selectedItems = [];
  }

  getSelectorClass(item: {name: string, path: string}) {
    let itemSelected = false;

    this.selectedItems.forEach((selectedItem) => {
      if(selectedItem.path == item.path) itemSelected = true;
    });

    return (itemSelected) ? 'bi bi-circle-fill p-1' : 'bi bi-circle p-1';
  }

  selectedAction(item: {name: string, path: string}) {
    let itemSelected = false;

    this.selectedItems.forEach((selectedItem, index) => {
      if(selectedItem.path == item.path){
        this.selectedItems.splice(index);
        itemSelected = true;
      }
    });

    if(!itemSelected) this.selectedItems.push({name: item.name, path: item.path});
  }
}
