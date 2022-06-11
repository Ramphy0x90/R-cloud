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

  constructor(private itemService: ItemService) {
    this.itemService.currentPath.subscribe((currentPath) => {
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
}
