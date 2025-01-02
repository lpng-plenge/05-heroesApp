import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sideBarItems = [
    {label: 'List', icon: 'label', url: './list'},
    {label: 'Add', icon: 'add', url: './new-hero'},
    {label: 'Search', icon: 'search', url: './search-page'}
  ]

}
