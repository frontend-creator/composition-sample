import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export class Widget {
  static inject = [EventAggregator];

  @bindable model;

  constructor(ea) {
    this.ea = ea;
  }

  showSettings() {
    this.ea.publish('toggle-widget-settings', this.model);
  }
}
