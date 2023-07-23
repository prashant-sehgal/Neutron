// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDarkMode = void 0;
var dom = {
  container: document.querySelector('.container'),
  barcContainer: document.querySelector('.bard'),
  tabsContainer: document.querySelector('.tabs'),
  bookmarksContainer: document.querySelector('.bookmarksContainer'),
  webviewContainer: document.querySelector('.tabWebViews'),
  bardButton: document.getElementById('bard'),
  newTabButton: document.getElementById('newTab'),
  searchInput: document.getElementById('search'),
  searchButton: document.getElementById('searchButton'),
  actionButtons: document.getElementsByClassName('actionButton'),
  homeButton: document.getElementById('home'),
  reloadButton: document.getElementById('reload'),
  previousButton: document.getElementById('previous'),
  bookmarkButton: document.getElementById('bookmark')
};
var toggleDarkMode = function toggleDarkMode() {
  var _a;
  ;
  [dom.container, dom.searchInput, dom.newTabButton].forEach(function (element) {
    element.classList.toggle('darkMode');
  });
  (_a = document.querySelector('.webviewContainer')) === null || _a === void 0 ? void 0 : _a.classList.toggle('webviewDarkMode');
  document.querySelectorAll('.actionButton').forEach(function (el) {
    el.classList.toggle('actionButton-dark');
  });
  document.querySelectorAll('.bookmark').forEach(function (el) {
    return el.classList.toggle('close-tab-dark');
  });
};
exports.toggleDarkMode = toggleDarkMode;
exports.default = dom;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limitString = exports.generateId = void 0;
var generateRandomString = function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var generateId = function generateId(ids, length) {
  var tabId = generateRandomString(length);
  var i = 0;
  while (i < ids.length) {
    if (tabId === ids[i]) {
      tabId = generateRandomString(10);
      i = 0;
    } else {
      i++;
    }
  }
  return tabId;
};
exports.generateId = generateId;
var limitString = function limitString(str, length) {
  if (str.length <= length) return str;
  return "".concat(str.substring(0, length), "...");
};
exports.limitString = limitString;
},{}],"Bookmark.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBookmarkIcon = exports.updateBookMarks = exports.deleteBookmark = exports.addNewBookmark = exports.getAllBookmarks = void 0;
var dom_1 = __importDefault(require("./dom"));
var renderer_1 = require("./renderer");
var utils_1 = require("./utils");
var Bookmark = /*#__PURE__*/_createClass(function Bookmark(id, title, url, favicon) {
  _classCallCheck(this, Bookmark);
  this.id = id;
  this.title = title;
  this.url = url;
  this.favicon = favicon;
});
exports.default = Bookmark;
var getAllBookmarks = function getAllBookmarks() {
  return JSON.parse("".concat(localStorage.getItem('bookmarks')));
};
exports.getAllBookmarks = getAllBookmarks;
var addNewBookmark = function addNewBookmark(bookmark) {
  var allBookmarks = (0, exports.getAllBookmarks)();
  allBookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(allBookmarks));
};
exports.addNewBookmark = addNewBookmark;
var deleteBookmark = function deleteBookmark(id) {
  var bookmarks = (0, exports.getAllBookmarks)().filter(function (bookmark) {
    return bookmark.id !== id;
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};
exports.deleteBookmark = deleteBookmark;
var updateBookMarks = function updateBookMarks() {
  dom_1.default.bookmarksContainer.innerHTML = '';
  (0, exports.getAllBookmarks)().forEach(function (bookmark) {
    var _a;
    (_a = dom_1.default.bookmarksContainer) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', "<div class=\"bookmark\" url=\"".concat(bookmark.url, "\" id=\"bookmark-").concat(bookmark.id, "\">\n                <img src=\"").concat(bookmark.favicon, "\" />\n                <p class=\"bookmark-title\">").concat((0, utils_1.limitString)(bookmark.title, 20), "</p>\n                <div class=\"close-tab ").concat(renderer_1.isDarkMode ? 'close-tab-dark' : '', "\">\n                    <span class=\"material-symbols-outlined close\">close</span>\n                </div>\n            </div>"));
  });
  if (renderer_1.isDarkMode) document.querySelectorAll('.bookmark').forEach(function (el) {
    return el.classList.add('close-tab-dark');
  });else document.querySelectorAll('.bookmark').forEach(function (el) {
    return el.classList.remove('close-tab-dark');
  });
};
exports.updateBookMarks = updateBookMarks;
var updateBookmarkIcon = function updateBookmarkIcon() {
  var _a, _b, _c;
  var tabid = (_a = renderer_1.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var webview = document.getElementById("web-".concat(tabid));
  if ((0, exports.getAllBookmarks)().map(function (bookmark) {
    return bookmark.url;
  }).includes(webview.src)) {
    var chileNode = (_b = dom_1.default.bookmarkButton) === null || _b === void 0 ? void 0 : _b.childNodes[1];
    chileNode.classList.add('icon-active');
  } else {
    var _chileNode = (_c = dom_1.default.bookmarkButton) === null || _c === void 0 ? void 0 : _c.childNodes[1];
    _chileNode.classList.remove('icon-active');
  }
};
exports.updateBookmarkIcon = updateBookmarkIcon;
},{"./dom":"dom.js","./renderer":"renderer.js","./utils":"utils.js"}],"webview.js":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWebView = exports.addWebView = exports.updateSearchBar = void 0;
var Bookmark_1 = require("./Bookmark");
var Tab_1 = require("./Tab");
var dom_1 = __importDefault(require("./dom"));
var renderer_1 = require("./renderer");
var renderSearchBar = function renderSearchBar(tabId, url) {
  var tab = renderer_1.tabs.find(function (tab) {
    return tab.id === tabId;
  });
  tab.url = url.indexOf('home-page.html') !== -1 ? '' : url;
  return tab.url;
};
var updateSearchBar = function updateSearchBar(url, isTabActive) {
  if (isTabActive) dom_1.default.searchInput.value = url;
};
exports.updateSearchBar = updateSearchBar;
var addWebView = function addWebView(tabId) {
  dom_1.default.webviewContainer.insertAdjacentHTML('beforeend', "<webview src=\"home-page.html\" class=\"webview\" id=\"web-".concat(tabId, "\"></webview>"));
  addWebViewEventListers();
};
exports.addWebView = addWebView;
var updateWebView = function updateWebView(tabId) {
  var _a;
  document.querySelectorAll('.webview').forEach(function (webview) {
    webview.classList.add('hidden');
  });
  (_a = document.getElementById("web-".concat(tabId))) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
};
exports.updateWebView = updateWebView;
var loadstart = function loadstart(event) {
  var target = event.target;
  var tab = renderer_1.tabs.find(function (tab) {
    return tab.id === "".concat(target.id.split('-')[1]);
  });
  if (tab) {
    tab.isLoading = true;
  }
  (0, Tab_1.updateTabs)(renderer_1.tabs);
};
var loadstop = function loadstop(event) {
  var target = event.target;
  var tab = renderer_1.tabs.find(function (tab) {
    return tab.id === "".concat(target.id.split('-')[1]);
  });
  if (tab) {
    tab.isLoading = false;
  }
  (0, Tab_1.updateTabs)(renderer_1.tabs);
  (0, exports.updateSearchBar)(renderSearchBar(target.id.split('-')[1], target.src), tab.isActive);
  (0, Bookmark_1.updateBookmarkIcon)();
};
var addWebViewEventListers = function addWebViewEventListers() {
  var webviews = document.querySelectorAll('.webview');
  webviews.forEach(function (webview) {
    webview.addEventListener('did-start-loading', loadstart);
    webview.addEventListener('did-stop-loading', loadstop);
    webview.addEventListener('page-favicon-updated', function (event) {
      var favicon = event.favicons[0];
      var webid = event.target.id.split('-')[1];
      var web = document.getElementById("web-".concat(webid));
      var title = web === null || web === void 0 ? void 0 : web.getTitle();
      var tab = renderer_1.tabs.find(function (tab) {
        return tab.id === webid;
      });
      if (tab) {
        tab.favicon = favicon;
        tab.title = title;
      }
      (0, Tab_1.updateTabs)(renderer_1.tabs);
    });
  });
};
},{"./Bookmark":"Bookmark.js","./Tab":"Tab.js","./dom":"dom.js","./renderer":"renderer.js"}],"Tab.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTab = exports.switchToTab = exports.createNewTab = exports.updateTabs = void 0;
var dom_1 = __importDefault(require("./dom"));
var renderer_1 = require("./renderer");
var utils_1 = require("./utils");
var webview_1 = require("./webview");
var Tab = /*#__PURE__*/_createClass(function Tab(id) {
  _classCallCheck(this, Tab);
  this.id = id;
  this.favicon = '';
  this.title = '';
  this.isActive = true;
  this.isLoading = true;
  this.url = '';
});
exports.default = Tab;
var updateTabs = function updateTabs(tabs) {
  dom_1.default.tabsContainer.innerHTML = ''; // clear tab container
  tabs.forEach(function (tab) {
    dom_1.default.tabsContainer.insertAdjacentHTML('beforeend', "<div class=\"tab ".concat(tab.isActive && !renderer_1.isDarkMode ? 'active' : '', " ").concat(renderer_1.isDarkMode ? 'darkMode' : '', " ").concat(tab.isActive && renderer_1.isDarkMode ? 'active-dark' : '', "\" id=\"tab-").concat(tab.id, "\">\n                        <div class=\"tab-icon ").concat(!tab.isLoading ? 'hidden' : '', "\">\n                            <span class=\"material-symbols-outlined loading-icon ").concat(!tab.isLoading ? 'hidden' : '', "\"\n                                >progress_activity\n                            </span>\n                        </div>\n                        <div class=\"favicon ").concat(tab.isLoading ? 'hidden' : '', "\">\n                            <img src=\"").concat(tab.favicon || "".concat(renderer_1.isDarkMode ? 'assets/tab.png' : 'assets/tab-light.png'), "\" alt=\"\" width=\"20\" />\n                        </div>\n                        <div class=\"tab-title\">").concat("".concat((0, utils_1.limitString)(tab.title, 20)) || 'New Tab', "</div>\n                        <div class=\"close-tab ").concat(renderer_1.isDarkMode ? 'close-tab-dark' : '', "\">\n                            <span class=\"material-symbols-outlined close\">close</span>\n                        </div>\n                    </div>"));
  });
};
exports.updateTabs = updateTabs;
var createNewTab = function createNewTab(tabs) {
  var tabId = (0, utils_1.generateId)(tabs.map(function (tab) {
    return tab.id;
  }), 10);
  tabs.push(new Tab(tabId));
  (0, exports.updateTabs)(tabs);
  (0, webview_1.addWebView)(tabId);
  (0, exports.switchToTab)(tabId);
};
exports.createNewTab = createNewTab;
var switchToTab = function switchToTab(tabid) {
  renderer_1.tabs.forEach(function (tab) {
    tab.isActive = false;
  });
  var tab = renderer_1.tabs.find(function (tab) {
    return tab.id === tabid;
  });
  if (tab) tab.isActive = true;
  (0, exports.updateTabs)(renderer_1.tabs);
  (0, webview_1.updateWebView)(tabid);
};
exports.switchToTab = switchToTab;
var removeTab = function removeTab(tabId) {
  var tab = renderer_1.tabs.find(function (tab) {
    return tab.id === tabId;
  });
  var webview = document.getElementById("web-".concat(tab.id));
  webview.remove();
  var index = renderer_1.tabs.indexOf(tab);
  if (tab.isActive) renderer_1.tabs[index - 1].isActive = true;
  renderer_1.tabs.splice(index, 1);
  (0, exports.updateTabs)(renderer_1.tabs);
  (0, webview_1.updateWebView)(renderer_1.tabs.find(function (tab) {
    return tab.isActive === true;
  }).id);
};
exports.removeTab = removeTab;
},{"./dom":"dom.js","./renderer":"renderer.js","./utils":"utils.js","./webview":"webview.js"}],"renderer.js":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDarkMode = exports.tabs = void 0;
var Bookmark_1 = __importStar(require("./Bookmark"));
var dom_1 = __importStar(require("./dom"));
var Tab_1 = require("./Tab");
var utils_1 = require("./utils");
var webview_1 = require("./webview");
exports.tabs = [];
exports.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
var searchHandler = function searchHandler() {
  var _a;
  var query = dom_1.default.searchInput.value;
  if (!query) return;
  var url = "https://www.google.com/search?q=".concat(query);
  var tabId = (_a = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var web = document.getElementById("web-".concat(tabId));
  try {
    var urlObject = new URL(query);
    web.src = urlObject.href;
  } catch (error) {
    web.src = url;
  }
  dom_1.default.searchInput.blur();
};
var reloadTab = function reloadTab() {
  var _a;
  var tabid = (_a = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var webview = document.getElementById("web-".concat(tabid));
  webview.src = webview.src;
};
function main() {
  (0, Tab_1.createNewTab)(exports.tabs);
  if (exports.isDarkMode) (0, dom_1.toggleDarkMode)();
  if (!(0, Bookmark_1.getAllBookmarks)()) localStorage.setItem('bookmarks', JSON.stringify([]));
  (0, Bookmark_1.updateBookMarks)();
}
main();
dom_1.default.bardButton.addEventListener('click', function () {
  dom_1.default.barcContainer.classList.toggle('hidden');
});
dom_1.default.newTabButton.addEventListener('click', function () {
  (0, Tab_1.createNewTab)(exports.tabs);
});
dom_1.default.tabsContainer.addEventListener('click', function (event) {
  var _a, _b, _c, _d;
  var target = event.target;
  var tabId = "".concat((_b = target.id || ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id)) === null || _b === void 0 ? void 0 : _b.split('-')[1]);
  if (tabId !== 'undefined') {
    (0, Tab_1.switchToTab)(tabId);
    var tab = exports.tabs.find(function (tab) {
      return tab.id === tabId;
    });
    (0, webview_1.updateSearchBar)(tab.url, tab.isActive);
    (0, Bookmark_1.updateBookmarkIcon)();
  }
  if (target.classList.contains('close')) {
    var id = "".concat((_d = (_c = target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.id.split('-')[1]);
    (0, Tab_1.removeTab)(id);
    (0, Bookmark_1.updateBookmarkIcon)();
  }
});
dom_1.default.searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') searchHandler();
});
(_a = dom_1.default.searchButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
  searchHandler();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
  exports.isDarkMode = event.matches;
  (0, dom_1.toggleDarkMode)();
  (0, Tab_1.updateTabs)(exports.tabs);
});
(_b = dom_1.default.homeButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
  var _a;
  var tabid = (_a = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var webview = document.getElementById("web-".concat(tabid));
  webview.src = 'home-page.html';
});
(_c = dom_1.default.reloadButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
  reloadTab();
});
(_d = dom_1.default.previousButton) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
  var _a;
  var tabid = (_a = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var webview = document.getElementById("web-".concat(tabid));
  webview.goBack();
});
(_e = dom_1.default.bookmarkButton) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
  var tab = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  });
  var webview = document.getElementById("web-".concat(tab === null || tab === void 0 ? void 0 : tab.id));
  if ((0, Bookmark_1.getAllBookmarks)().map(function (b) {
    return b.url;
  }).includes(webview.src)) return;
  var id = (0, utils_1.generateId)((0, Bookmark_1.getAllBookmarks)().map(function (bm) {
    return bm.id;
  }), 10);
  var newBookmark = new Bookmark_1.default(id, webview.getTitle(), webview.src, "".concat(tab === null || tab === void 0 ? void 0 : tab.favicon));
  (0, Bookmark_1.addNewBookmark)(newBookmark);
  (0, Bookmark_1.updateBookMarks)();
  (0, Bookmark_1.updateBookmarkIcon)();
});
dom_1.default.bookmarksContainer.addEventListener('click', function (event) {
  var _a;
  var target = event.target;
  if (target.innerText === 'close') {
    var id = target.parentElement.parentElement.id.split('-')[1];
    (0, Bookmark_1.deleteBookmark)(id);
    (0, Bookmark_1.updateBookMarks)();
    (0, Bookmark_1.updateBookmarkIcon)();
  }
  var url = target.getAttribute('url') || target.parentElement.getAttribute('url');
  var tabid = (_a = exports.tabs.find(function (tab) {
    return tab.isActive === true;
  })) === null || _a === void 0 ? void 0 : _a.id;
  var webview = document.getElementById("web-".concat(tabid));
  webview.src = url;
});
},{"./Bookmark":"Bookmark.js","./dom":"dom.js","./Tab":"Tab.js","./utils":"utils.js","./webview":"webview.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54549" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","renderer.js"], null)
//# sourceMappingURL=/bundle.js.map