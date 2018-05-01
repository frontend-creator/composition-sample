import {bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';

export class MonacoEditor {
  static inject = [TaskQueue];

  @bindable({ defaultBindingMode: bindingMode.twoWay }) source = '';
  @bindable language = 'html';
  @bindable theme = 'vs-light';

  editor;
  editorHost;
  guard = false;
  keyUpDisposable;

  constructor(taskQueue) {
    this.taskQueue = taskQueue;
  }

  sourceChanged(newValue) {
    if (this.guard || !this.editor) {
      return;
    } 
    this.editor.setValue(newValue);
  }

  languageChanged(newValue) {
    if (this.editor) {
      monaco.editor.setModelLanguage(this.editor.getModel(), newValue);
    }
  }

  attached() {
    // console.log('monaco-editor:attached');
    this.configureMonacoEnvironment();
  }

  detached() {
    this.keyUpDisposable.dispose();
    this.editor.dispose();
  }

  configureMonacoEnvironment() {
    let stdRequire = window.require;
    let stdLoad = window.require.load;
    let amdLoader;
    let anySelf = self;
    
    amdLoader = window.require;
    amdLoader.load = amdLoader.standardLoad;
    anySelf.module = undefined;
    amdLoader.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.10.0/min/vs' }});

  	// Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites
  	// the default worker url location (used when creating WebWorkers). The problem here is that
  	// HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of
  	// a web worker through a same-domain script
  	window.MonacoEnvironment = {
  		getWorkerUrl: function(workerId, label) {
  			return 'monaco-editor-worker-loader-proxy.js';
  		}
  	};
  
    // console.log('trying to load editor...');
    if (!window.monaco) {
      amdLoader(['vs/editor/editor.main'], () => {
        this.setupEditor();
      });
    } else {
      this.setupEditor();
    }    
  }
  setupEditor() {
    // console.log('editor loaded...');
    this.editor = monaco.editor.create(this.editorHost, {
      value: this.source,
      language: this.language,
      folding: true,
      fontSize: 20,
      tabSize: 2,
      lineHeight: 24,
      theme: this.theme
    });
    this.editor.getModel().updateOptions({ tabSize: 2 });

    this.keyUpDisposable = this.editor.onKeyUp(() => {
      let newValue = this.editor.getValue();        
      if (this.source === newValue) {
        return;
      }
      this.guard = true;
      this.source = newValue;
      this.taskQueue.queueMicroTask(() => this.guard = false);
    });      

    // validation settings
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    });
        
    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true
    });

    let didScrollChangeDisposable = this.editor.onDidScrollChange((event) => {
      didScrollChangeDisposable.dispose();
      // this.editor.getAction("editor.action.format").run();
    }); 

    // console.log('resetting require.load', stdLoad);
    // window.require.load = stdLoad;       
  }
}
