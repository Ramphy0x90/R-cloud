import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent implements OnInit {
  path: any;
  pathHistory: {folder: string, path: string}[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.currentPath.subscribe((currentPath) => {
      this.path = currentPath;
    });
  }

  ngOnInit(): void {
    this.itemService.getContent();
  }

  getContent(parent: string | any) {
    let nextPath = this.path[parent].path;
    this.pathHistory.push({folder: parent, path: nextPath});

    this.itemService.getContent(nextPath);
  }

  comeBack(folderTo: number) {
    let folderInfo = this.pathHistory[folderTo];
    let newPath = folderInfo.path.substring(0, folderInfo.path.length - folderInfo.folder.length)

    this.pathHistory.splice(folderTo);
    this.itemService.getContent(newPath);
  }
}
