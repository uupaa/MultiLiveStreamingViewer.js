export class CSSComponent {
  constructor(className, // @arg CSSClassNameString - "foo", "foo-bar"
              source) {  // @arg StyleSheetSourceCodeString - ".foo-bar { color: red }"
    this._className = className;

    if ( !document.head.querySelector("." + this._className) ) {
      document.head.insertAdjacentHTML("beforeend",
        `<style class="${this._className}">${source}</style>`);
    }
    this._styleNode = document.head.querySelector("." + this._className);
    // styleNode has parent
  }
  get styleNode() { // @ret HTMLStyleElement - <style class="className">...</style>
    return this._styleNode;
  }
}

export class HTMLComponent {
  constructor(className, // @arg CSSClassNameString - "foo", "foo-bar"
              source) {  // @arg HTMLSourceCodeString - '<div class="foo-bar"></div>'
    this._className = className;
    this._containerNode = document.createElement("div");
    this._containerNode.className = className;
    this._containerNode.insertAdjacentHTML("beforeend", source);
    // containerNode has not parent.
  }
  get containerNode() { // @ret HTMLDivElement - container div node. <div class="className">...</div>
    return this._containerNode;
  }
}

export class DOMComponent {
  constructor(className, // @arg CSSClassNameString - "foo", "foo-bar"
              html,      // @arg HTMLSourceCodeString - '<div class="foo-bar"></div>'
              css) {     // @arg StyleSheetSourceCodeString - ".foo-bar { color: red }"
    this._css = new CSSComponent(className, css);
    this._html = new HTMLComponent(className, html);
  }
  get styleNode() {
    return this._css.styleNode;
  }
  get containerNode() {
    return this._html.containerNode;
  }
}

