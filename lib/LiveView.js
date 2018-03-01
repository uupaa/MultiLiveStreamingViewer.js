// if you want import() polyfill
import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

const LIVE_VIEW_TEMPLATE = `
<style>
#container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  align-content: flex-start;
  overflow: auto;
}
.hide { visibility: hidden; }
</style>
<div id="container" class="hide"></div>
`;

// -------------------------------------
// LiveView(<live-view>) node is based on Custom Elements.
export class LiveView extends HTMLElement {
  constructor() {
    super();
    this._view = null;
    this._model = null;
  }
  // --- LiveView specific properties and methods ---
  async loadPlugin(classPath, options = {}) {
  //const { default: View  } = await import(`${classPath}View.js`);
  //const { default: Model } = await import(`${classPath}Model.js`);
    const { default: View  } = await importModule(`${classPath}View.js`);
    const { default: Model } = await importModule(`${classPath}Model.js`);
    this._view  = new View(this, options);
    this._model = new Model(this, options);
    return { view: this._view, model: this._model };
  }
  static get nodeList() {
    return Array.from(document.querySelectorAll("live-view"));
  }
  get view()  { return this._view; }
  get model() { return this._model; }
  get type()  { return this.getAttribute("type") || ""; }
  get nodes() {
    return {
      container: this._shadowRoot.querySelector("#container"), // <div id="container">
    };
  }
  show() { this.nodes.container.classList.remove("hide"); }
  hide() { this.nodes.container.classList.add("hide"); }
  // --- Custom Elements specific properties and methods ---
  static define() { customElements.define("live-view", LiveView); }
  static get observedAttributes() { return [ "type" ]; }
  connectedCallback() {
    this._shadowRoot = this.attachShadow({ mode: "open" }); // { mode, host, innerHTML }
    this._shadowRoot.innerHTML = LIVE_VIEW_TEMPLATE;
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(/*attributeName, oldValue, newValue, namespace */) {
    // NOT IMPL.
  }
  adoptedCallback() {
    // NOT IMPL.
  }
}

LiveView.define();

