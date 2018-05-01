import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {bindable} from 'aurelia-framework';

export class DashboardSidebar {
  static inject = [EventAggregator];

  @bindable dashboard;

  sub;
  isOpen = false;
  model;

  constructor(ea) {
    this.ea = ea;
  }

  hide() {
    this.isOpen = false;
    this.model = null;
  }

  removeWidget() {
    let index = this.dashboard.widgets.indexOf(this.model);
    if (index !== -1) {
      this.dashboard.widgets.splice(index, 1);
    }

    this.hide();
  }

  bind() {
    this.sub = this.ea.subscribe('toggle-widget-settings', data => {
      if (this.model === data) {
        this.hide();
      } else {
        this.model = data;
        this.isOpen = true;
      }
    });
  }

  unbind() {
    this.sub.dispose();
  }
}
