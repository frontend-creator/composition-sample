import {NavModel} from 'aurelia-router';
import {computedFrom} from 'aurelia-binding';
import {InlineViewStrategy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {relativeToFile} from 'aurelia-path';
import {Router} from 'aurelia-router';

export class Demo {
  static inject = [HttpClient, Router];

  settings;
  requires;
  files;
  activeFile;
  model;
  agenda;

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  @computedFrom('files[0].text')
  get previewSource() {
    return new InlineViewStrategy(`
      <template>
        ${this.requires}
        ${this.files[0].text}
      </template>
    `);
  }

  activate(params, instruction) {   
    this.settings = instruction.navModel.settings;
    this.model = this.settings.model;
    this.agenda = this.router.navigation.filter(x => x.settings.agendaItem);

    if (this.settings.requires) {
      this.requires = this.settings.requires
        .map(x => `<require from="${x}"></require>`)
        .join('\n');
    }

    if (this.settings.files) {
      return Promise.all(this.settings.files.map(x => this.http.fetch(x))).then(responses => {
        return Promise.all(responses.map(x => x.text())).then(fileTexts => {
          this.files = fileTexts.map((text, index) => {
            let name = this.settings.files[index];
            let shortName = name.substring(name.lastIndexOf('/') + 1);
            return {
              // name: name.substring(name.lastIndexOf('/') + 1),
              // language: name.indexOf('.js') !== -1 ? 'javascript' : 'html',
              name: name,
              language: shortName.indexOf('.js') !== -1 ? 'javascript' : 'html',
              text
            };
          });
          this.activeFile = this.files[0];
        });
      });
    }
  }

  getViewStrategy() {
    // console.log('stdRequireLoad', window.stdRequireLoad);
    window.require.load = window.stdRequireLoad;
    return this.settings.view;
  }
}
