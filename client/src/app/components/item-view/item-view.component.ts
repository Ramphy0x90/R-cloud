import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  @Input() item!: {name: string, isDir: boolean, path: string};
  itemExt!: string;

  constructor() { }

  ngOnInit(): void {
  }

  getExtencion(name: string) {
    let extencion = name.split('.');

    return extencion.pop();
  }
}
