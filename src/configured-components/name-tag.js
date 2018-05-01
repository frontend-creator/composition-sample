import {customElement, useView, bindable} from 'aurelia-framework';

@customElement('name-tag')
@useView('./name-tag.html')
export class NameTag {
  @bindable name;
  @bindable color;
}
