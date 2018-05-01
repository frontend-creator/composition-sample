import {RouterConfiguration, Router} from 'aurelia-router';
import {TaskQueue} from 'aurelia-task-queue';
import {DOM} from 'aurelia-pal';
import routes from './routes';

export class App {
  static inject = [TaskQueue];

  router;
  navigationIsOpen = false;

  constructor(taskQueue) {
    this.taskQueue = taskQueue;

    window.stdRequireLoad = window.require.load;    
  }

  configureRouter(config, router) {
    config.map(routes);
    this.router = router;
  }

  activate() {
    DOM.addEventListener('keyup', evt => {
      if (evt.keyCode === 34 || evt.keyCode == 120) { /* PageDown or F9 */
        this.next();
      } else if (evt.keyCode == 33 || evt.keyCode == 118) { /* PageUp or F7 */
        this.previous();
      }
    }, false);
  }

  requestFullscreen() {
    let docElm = document.documentElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }

  toggleNavigation = (event) => {
    if (this.navigationIsOpen) {
      this.navigationIsOpen = false;
      DOM.removeEventListener('click', this.toggleNavigation, false);
    } else {
      this.navigationIsOpen = true;
      this.taskQueue.queueTask(() => DOM.addEventListener('click', this.toggleNavigation, false));
    }
  }

  next() {
    let index = this.router.routes.indexOf(this.router.currentInstruction.config);

    if ((index + 1) < this.router.routes.length) {
      console.log('href', this.router.routes[index + 1].navModel.href);
      this.router.navigate(this.router.routes[index + 1].navModel.href);
    }
  }

  previous() {
    let index = this.router.routes.indexOf(this.router.currentInstruction.config);

    if (index > 0) {
      console.log('href', this.router.routes[index - 1].navModel.href);
      this.router.navigate(this.router.routes[index - 1].navModel.href);
    }
  }
}
