import { DOMComponent } from "./DOMComponent.js";

let loadingIcon = null;

class LoadingIcon {
  constructor() {
    this._lock = false;
    this._key = "";
    this._containerNode = _createDOMComponent("LoadingIcon").containerNode;
    this._attachNode();
  }
  _attachNode() {
    if (this._containerNode && !this._containerNode.parentNode) {
      const node = document.querySelector("body");
      if (node) {
        node.appendChild(this._containerNode);
      }
    }
  }
  lock(key) {
    if (!this._key) {
      this._key = key;
      this.show();
      this._lock = true;
      return true;
    }
    return false; // already locked
  }
  unlock(key) {
    if (this._key === key) {
      this._key = "";
      this._lock = false;
      this.hide();
      return true;
    }
    // unmatched key
    return false;
  }
  show() {
    if (this._lock) { return; }
    this._attachNode();
    this._containerNode.style.display = "block";
  }
  hide() {
    if (this._lock) { return; }
    this._containerNode.style.display = "none";
  }
}

export function lockLoadingIcon(key) {
  if (!loadingIcon) {
    loadingIcon = new LoadingIcon();
  }
  return loadingIcon.lock(key);
}

export function unlockLoadingIcon(key) {
  if (!loadingIcon) {
    loadingIcon = new LoadingIcon();
  }
  return loadingIcon.unlock(key);
}

export function showLoadingIcon() {
  if (!loadingIcon) {
    loadingIcon = new LoadingIcon();
  }
  loadingIcon.show();
}

export function hideLoadingIcon() {
  if (loadingIcon) {
    loadingIcon.hide();
  }
}

function _createDOMComponent(className) {
  const HTML = `
<div class="dot1"></div>
<div class="dot2"></div>`;

  const CSS = `
.${className} {
  z-index: 1000;
  position: absolute;
  display: none;
  top: 20%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: 100px auto;
  -webkit-user-select: none;
  user-select: none;
  text-align: center;
  -webkit-animation: sk-rotate 2.0s infinite linear;
}
.${className} .dot1,
.${className} .dot2 {
  display: inline-block;
  position: absolute;
  top: 0;
  width: 60%;
  height: 60%;
  background-color: rgba(220,247,144,0.8);
  border-radius: 100%;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
}
.${className} .dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
}
@-webkit-keyframes sk-rotate {
  100% { -webkit-transform: rotate(360deg) }
}
@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}`;

  return new DOMComponent(className, HTML, CSS);
}

