/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\";\n}\n\nbody {\n  background-color: white;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\nh1 {\n  font-family: \"Cedarville Cursive\";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n  font-weight: bolder;\n  margin-top: 1.8rem;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.recipes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 50px;\n  align-items: center;\n  justify-content: center;\n  height: 750px;\n  width: 80%;\n  overflow: scroll;\n  font-weight: bolder;\n  /* background-color: white; */\n  padding-top: 2em;\n}\n\n.recipe-card {\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: 2px #d9dadd;\n  align-items: center;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  border-radius: 35px;\n}\n\n.recipe-card:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.title-recipe {\n  width: 250px;\n  height: 50px;\n  overflow: scroll;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n  padding: 1.25em;\n}\n\n.title-recipe:hover {\n  cursor: pointer;\n}\n\nimg {\n  height: 200px;\n  width: 250px;\n  border-radius: 15px;\n}\n\nimg:hover {\n  cursor: pointer;\n}\n\n.view-saved {\n  height: 50px;\n  width: 200px;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(144, 147, 149, 0.5);\n  display: grid;\n  place-items: center;\n  visibility: hidden;\n  z-index: -10;\n}\n\n.open-modal {\n  visibility: visible;\n  z-index: 10;\n}\n\n.modal-container {\n  background-image: linear-gradient(rgba(15, 15, 15, 0.2), rgba(15, 15, 15, 0.2)), url(https://spoonacular.com/recipeImages/595736-556x370.jpg);\n  background-size: cover;\n  color: white;\n  width: 90vw;\n  opacity: 0.95;\n  height: 60vh;\n  text-align: center;\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n\n.close-btn {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  font-size: 2rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n\n.close-btn:hover {\n  transform: scale(1.3);\n}\n\n.modal-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal-title-directions {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  width: 50vw;\n  height: 60vh;\n  overflow: scroll;\n}\n\n.modal-tags {\n  display: flex;\n  flex-direction: column;\n  width: 10vw;\n}\n\nul {\n  list-style-type: none;\n}\n\n.modal-ingredients-cost {\n  width: 30vw;\n  height: 60vh;\n  overflow: scroll;\n}\n\n.modal-directions {\n  overflow: scroll;\n}\n\n.btn {\n  height: 20px;\n  width: 100px;\n}\n\n.btn:hover {\n  transform: scale(1.1);\n}\n\n.tag-buttons {\n  display: flex;\n  overflow: scroll;\n  width: 775px;\n  gap: 50px;\n  background-color: white;\n  border: 2px dotted #d9dadd;\n  padding: 10px;\n  border-radius: 35px;\n}\n\np {\n  text-align: center;\n}\n\n.save-recipe-btn {\n  margin: 10px;\n  width: 120px;\n  height: 35px;\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 0.8rem;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.save-recipe-btn:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.input-name {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.input-name::placeholder {\n  font-family: \"Cedarville Cursive\";\n}\n\n.input-ingredient::placeholder {\n  font-family: \"Cedarville Cursive\";\n}\n\n.input-ingredient {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.title-recipe {\n  font-size: 18px;\n  font-family: \"Roboto\";\n  font-weight: 300;\n}\n\n.view-saved {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 15rem;\n  margin-bottom: 10px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.view-saved:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.tag-btn {\n  height: 50px;\n  width: 50px;\n  border-radius: 15px;\n  margin: 2px;\n  filter: grayscale(60%);\n}\n\ntag-btn:hover {\n  cursor: pointer;\n}\n\n.tag-btn:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.food-icon {\n  height: 20px;\n  width: 20px;\n}\n\n.modal-title {\n  margin-top: 100px;\n  font-size: 48px;\n}\n\n.modal-cost {\n  font-size: 24px;\n  margin-top: 100px;\n  margin-bottom: 50px;\n  font-weight: 300;\n}\n\n.modal-container {\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 50px;\n  padding-bottom: 50px;\n  gap: 100px;\n}\n\n.modal-ingredients-list {\n  font-size: 24px;\n}\n\n.modal-ingredients {\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\n.modal-directions {\n  font-size: 32px;\n}\n\n.modal-directions-list {\n  font-size: 24px;\n}\n\n.modal-tags {\n  font-size: 24px;\n}\n\np {\n  font-weight: 300;\n}\n\nli {\n  font-weight: 300;\n  text-align: left;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\";\n}\n\nbody {\n  background-color: white;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\nh1 {\n  font-family: \"Cedarville Cursive\";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n  font-weight: bolder;\n  margin-top: 1.8rem;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.recipes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 50px;\n  align-items: center;\n  justify-content: center;\n  height: 750px;\n  width: 80%;\n  overflow: scroll;\n  font-weight: bolder;\n  /* background-color: white; */\n  padding-top: 2em;\n}\n\n.recipe-card {\n  display: flex;\n  flex-direction: column;\n\n  background-color: white;\n  border: 2px #d9dadd;\n  align-items: center;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n\n  border-radius: 35px;\n}\n.recipe-card:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.title-recipe {\n  width: 250px;\n  height: 50px;\n  overflow: scroll;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n  padding: 1.25em\n}\n\n.title-recipe:hover {\n  cursor: pointer;\n}\n\nimg {\n  height: 200px;\n  width: 250px;\n  border-radius: 15px;\n}\n\nimg:hover {\n  cursor: pointer;\n}\n\n.view-saved {\n  height: 50px;\n  width: 200px;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(144, 147, 149, 0.5);\n  display: grid;\n  place-items: center;\n  visibility: hidden;\n  z-index: -10;\n}\n\n.open-modal {\n  visibility: visible;\n  z-index: 10;\n}\n.modal-container {\n  background-image: linear-gradient(\n      rgba(15, 15, 15, 0.2),\n      rgba(15, 15, 15, 0.2)\n    ),\n    url(https://spoonacular.com/recipeImages/595736-556x370.jpg);\n  background-size: cover;\n  color: white;\n  width: 90vw;\n  opacity: 0.95;\n  height: 60vh;\n  text-align: center;\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n\n.close-btn {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  font-size: 2rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n.close-btn:hover {\n  transform: scale(1.3);\n}\n\n.modal-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal-title-directions {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  width: 50vw;\n  height: 60vh;\n  overflow: scroll;\n}\n\n.modal-tags {\n  display: flex;\n  flex-direction: column;\n  width: 10vw;\n}\n\nul {\n  list-style-type: none;\n}\n\n.modal-ingredients-cost {\n  width: 30vw;\n  height: 60vh;\n  overflow: scroll;\n}\n\n.modal-directions {\n  overflow: scroll;\n}\n\n.btn {\n  height: 20px;\n  width: 100px;\n}\n\n.btn:hover {\n  transform: scale(1.1);\n}\n\n.tag-buttons {\n  display: flex;\n  overflow: scroll;\n  width: 775px;\n  gap: 50px;\n  background-color: white;\n  border: 2px dotted #d9dadd;\n  padding: 10px;\n  border-radius: 35px;\n}\n\np {\n  text-align: center;\n}\n\n.save-recipe-btn {\n  margin: 10px;\n  width: 120px;\n  height: 35px;\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 0.8rem;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n.save-recipe-btn:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.input-name {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n.input-name::placeholder {\n  font-family: \"Cedarville Cursive\";\n}\n.input-ingredient::placeholder {\n  font-family: \"Cedarville Cursive\";\n}\n\n.input-ingredient {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.title-recipe {\n  font-size: 18px;\n  font-family: \"Roboto\";\n  font-weight: 300;\n}\n\n.view-saved {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 15rem;\n  margin-bottom: 10px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.view-saved:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.tag-btn {\n  height: 50px;\n  width: 50px;\n  border-radius: 15px;\n  margin: 2px;\n  filter: grayscale(60%);\n}\n\ntag-btn:hover {\n  cursor: pointer;\n}\n\n.tag-btn:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.food-icon {\n  height: 20px;\n  width: 20px;\n}\n\n.modal-title {\n  margin-top: 100px;\n  font-size: 48px;\n}\n\n.modal-cost {\n  font-size: 24px;\n  margin-top: 100px;\n  margin-bottom: 50px;\n  font-weight: 300;\n}\n\n.modal-container {\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 50px;\n  padding-bottom: 50px;\n  gap: 100px;\n}\n\n.modal-ingredients-list {\n  font-size: 24px;\n}\n\n.modal-ingredients {\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\n.modal-directions {\n  font-size: 32px;\n}\n.modal-directions-list {\n  font-size: 24px;\n}\n\n.modal-tags {\n  font-size: 24px;\n}\n\np {\n  font-weight: 300;\n}\n\nli {\n  font-weight: 300;\n  text-align: left;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayRecipes: () => (/* binding */ displayRecipes),
/* harmony export */   displayTags: () => (/* binding */ displayTags)
/* harmony export */ });
/* harmony import */ var _src_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const recipeDisplay = document.querySelector(".recipes");
const tagButtons = document.querySelector(".tag-buttons");

function displayRecipes(array, innerText) {
  let recipeHTML = ``;
  array.forEach((recipeEl) => {
    recipeHTML += `<div class="recipe-card"><div class="title-recipe" id=${recipeEl.id}>${recipeEl.name}</div>
    <img
      src="${recipeEl.image}"
      alt="recipe-img"
      id=${recipeEl.id}
    />
    <button class="save-recipe-btn">${innerText}</button>
    </div>`;
  });
  recipeDisplay.innerHTML = recipeHTML;
}

function displayTags(array) {
  const tagsArray = (0,_src_functions_js__WEBPACK_IMPORTED_MODULE_0__.returnListOfUniqueTags)(array);
  let tagsHtml = "";
  tagsArray.forEach((tagEl) => {
    tagsHtml += `<div><img src="https://joh-ann.github.io/whats-cookin/images/${tagEl}.png" class="tag-btn" id="${tagEl}"><p>${tagEl}</p></div>
    `;
  });
  tagButtons.innerHTML = tagsHtml;
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFunction: () => (/* binding */ createFunction),
/* harmony export */   deleteRecipe: () => (/* binding */ deleteRecipe),
/* harmony export */   findRecipeByIngredient: () => (/* binding */ findRecipeByIngredient),
/* harmony export */   findRecipeByName: () => (/* binding */ findRecipeByName),
/* harmony export */   getUserInput: () => (/* binding */ getUserInput),
/* harmony export */   returnFilteredListName: () => (/* binding */ returnFilteredListName),
/* harmony export */   returnFilteredRecipeArrayByTagID: () => (/* binding */ returnFilteredRecipeArrayByTagID),
/* harmony export */   returnFilteredTag: () => (/* binding */ returnFilteredTag),
/* harmony export */   returnIngredientNames: () => (/* binding */ returnIngredientNames),
/* harmony export */   returnListOfUniqueTags: () => (/* binding */ returnListOfUniqueTags),
/* harmony export */   returnRecipeCost: () => (/* binding */ returnRecipeCost),
/* harmony export */   returnRecipeDirections: () => (/* binding */ returnRecipeDirections),
/* harmony export */   returnRecipeImgUrl: () => (/* binding */ returnRecipeImgUrl),
/* harmony export */   returnRecipeTags: () => (/* binding */ returnRecipeTags),
/* harmony export */   returnRecipeTitle: () => (/* binding */ returnRecipeTitle),
/* harmony export */   saveRecipe: () => (/* binding */ saveRecipe)
/* harmony export */ });
function createFunction(array) {
  return array;
}

function returnFilteredTag(array, tag) {
  const filteredRecipe = array.filter((recipeEl) => {
    return recipeEl.tags.includes(tag);
  });
  if (filteredRecipe) {
    return filteredRecipe.map((recipeEl) => {
      return recipeEl;
    });
  } else {
    return [];
  }
}

function returnRecipeCost(arrayRecipe, arrayIngredients, recipeID) {
  const filteredRecipe = arrayRecipe.find((recipeEl) => {
    return recipeEl.id === parseInt(recipeID);
  });
  if (filteredRecipe) {
    const ingredientsArr = filteredRecipe.ingredients;
    let totalCost = 0;

    ingredientsArr.forEach((ingredientEl) => {
      const matchingIngredient = arrayIngredients.find((ingredientsObjEl) => {
        return ingredientEl.id === ingredientsObjEl.id;
      });
      if (matchingIngredient) {
        totalCost +=
          (ingredientEl.quantity.amount *
            matchingIngredient.estimatedCostInCents) /
          100;
      }
    });
    return Math.round(totalCost);
  }
}

function returnIngredientNames(arrayRecipe, arrayIngredients, recipeID) {
  const filteredRecipe = arrayRecipe.find((recipeEl) => {
    return recipeEl.id === parseInt(recipeID);
  });
  if (filteredRecipe) {
    const ingredientsArr = filteredRecipe.ingredients;
    return ingredientsArr.map((ingredientEl) => {
      const matchingIngredient = arrayIngredients.find((ingredientsObjEl) => {
        return ingredientEl.id === ingredientsObjEl.id;
      });
      if (matchingIngredient) {
        return matchingIngredient.name;
      }
    });
  }
  return [];
}
function returnRecipeDirections(array, recipeID) {
  const filteredRecipe = array.find((recipeEl) => {
    return recipeEl.id === parseInt(recipeID);
    //recipeEl.id was a number
    //recipeId was a string
    // write a test case for different data types.
  });

  if (filteredRecipe) {
    return filteredRecipe.instructions.map((instructionsObj) => {
      return instructionsObj.instruction;
    });
  } else {
    return [];
  }
}

function returnFilteredListName(array, name) {
  return array
    .filter((recipeEl) => {
      return (
        recipeEl.name.includes(name) ||
        recipeEl.name.toLowerCase().includes(name.toLowerCase())
      );
    })
    .map((filteredRecipeEl) => {
      return filteredRecipeEl;
    });
}

function returnRecipeTitle(array, recipeID) {
  return array
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(recipeID);
    })
    .map((oneRecipeEl) => {
      return oneRecipeEl.name;
    });
}

function returnRecipeTags(array, recipeID) {
  return array
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(recipeID);
    })
    .flatMap((recipeEl) => {
      return recipeEl.tags;
    });
}

function returnRecipeImgUrl(array, recipeID) {
  return array
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(recipeID);
    })
    .map((filteredRecipeEl) => {
      return filteredRecipeEl.image;
    });
}

function returnListOfUniqueTags(array) {
  return array.reduce((acc, curr) => {
    curr.tags.forEach((tagEl) => {
      if (!acc.includes(tagEl)) {
        acc.push(tagEl);
      }
    });
    return acc;
  }, []);
}

function returnFilteredRecipeArrayByTagID(arrayTagsID, arrayRecipe) {
  return arrayRecipe.filter((arrayRecipeEl) => {
    return arrayTagsID.some((idEl) => {
      return idEl === arrayRecipeEl.id;
    });
  });
}

function findRecipeByName(userInput, recipeData) {
  const storedRecipeIds = recipeData
    .filter((recipe) => {
      const recipeName = recipe.name.toLowerCase();
      return recipeName.includes(userInput);
    })
    .map((recipe) => recipe);
  return storedRecipeIds;
}

function findRecipeByIngredient(userInput, ingredientsData, recipeData) {
  const storedIngredientIds = ingredientsData
    .filter(
      (ingredient) => ingredient.name && ingredient.name.includes(userInput)
    )
    .map((ingredient) => ingredient.id);

  const recipesWithMatch = recipeData.filter((recipe) => {
    return recipe.ingredients.some((ingredient) =>
      storedIngredientIds.includes(ingredient.id)
    );
  });
  const recipeIdsWithMatch = recipesWithMatch.map((recipe) => recipe);
  return recipeIdsWithMatch;
}

function getUserInput(inputType) {
  const userInput = document.querySelector(inputType).value;
  return userInput.toLowerCase();
}

function saveRecipe(dataArray, savedArray, clickedId) {
  const savedRecipe = dataArray.find((recipeEl) => {
    return recipeEl.id === parseInt(clickedId);
  });
  if (!savedArray.includes(savedRecipe)) {
    savedArray.push(savedRecipe);
    return savedArray;
  }
}

function deleteRecipe(savedArray, clickedId) {
  const recipeIndex = savedArray.findIndex((savedRecipeEl) => {
    return savedRecipeEl.id === parseInt(clickedId);
  });
  if (recipeIndex !== -1) {
    savedArray.splice(recipeIndex, 1);
  }
  return savedArray;
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/antipasti.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/antipasto.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/appetizer.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/breakfast.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/brunch.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/condiment.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/dinner.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/dip.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hor d'oeuvre.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/lunch.png");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/main course.png");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/main dish.png");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/morning meal.png");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/salad.png");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/sauce.png");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/side dish.png");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/snack.png");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/spread.png");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/starter.png");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchIngredients: () => (/* binding */ fetchIngredients),
/* harmony export */   fetchRecipes: () => (/* binding */ fetchRecipes),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
// Your fetch requests will live here!

const fetchUsers = fetch(
  "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users"
)
  .then((response) => response.json())
  .then((data) => {
    return data.users;
  });

const fetchIngredients = fetch(
  "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients"
)
  .then((response) => response.json())
  .then((data) => {
    return data.ingredients;
  });

const fetchRecipes = fetch(
  " https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes"
)
  .then((response) => response.json())
  .then((data) => {
    return data.recipes;
  });

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_antipasti_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_antipasto_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_appetizer_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_breakfast_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_brunch_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_condiment_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _images_dinner_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _images_dip_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _images_hor_d_oeuvre_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);
/* harmony import */ var _images_lunch_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17);
/* harmony import */ var _images_main_course_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(18);
/* harmony import */ var _images_main_dish_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(19);
/* harmony import */ var _images_morning_meal_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20);
/* harmony import */ var _images_salad_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(21);
/* harmony import */ var _images_sauce_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(22);
/* harmony import */ var _images_side_dish_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(23);
/* harmony import */ var _images_snack_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(24);
/* harmony import */ var _images_spread_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(25);
/* harmony import */ var _images_starter_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(26);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(27);
//






























const recipeDisplay = document.querySelector(".recipes");

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal-title");
const modalTags = document.querySelector(".modal-tags");
const modalDirections = document.querySelector(".modal-directions-list");
const modalCost = document.querySelector(".modal-cost");
const modalIngredients = document.querySelector(".modal-ingredients-list");
const closeBtn = document.querySelector(".close-btn");
const tagButtons = document.querySelector(".tag-buttons");
const inputName = document.querySelector(".input-name");
const inputIngredient = document.querySelector(".input-ingredient");
const savedRecipesBtn = document.querySelector(".view-saved");

let currentUser = {};

let usersData = null;
let ingredientsData = null;
let recipeData = null;

function createRandomUser(array) {
  const randIndex = Math.floor(Math.random() * array.length);

  const randomUser = array.find((userEl) => {
    return userEl.id == randIndex;
  });
  currentUser.name = randomUser.name;
  currentUser.id = randomUser.id;
  currentUser.recipesToCook = [];
  console.log(currentUser);

  return currentUser;
}
const viewSavedRecipes = (recipeData) => {
  if (savedRecipesBtn.innerText === "View Saved Recipes") {
    // console.log(currentUser.recipesToCook);
    // console.log(currentUser);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(currentUser.recipesToCook, "Remove Recipe");
    savedRecipesBtn.innerText = "View All";
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(currentUser.recipesToCook);
  } else {
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeData, "Save Recipe");
    savedRecipesBtn.innerText = "View Saved Recipes";
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(recipeData);
  }
};

savedRecipesBtn.addEventListener("click", () => {
  viewSavedRecipes(recipeData);
});
recipeDisplay.addEventListener("click", (event) => {
  let clickedId = event.target.parentNode.firstChild.id;
  if (event.target.innerText === "Save Recipe") {
    event.target.innerText = "✓ Saved";
    event.target.style.backgroundColor = "#89ce94";
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.saveRecipe)(recipeData, currentUser.recipesToCook, clickedId);
  } else if (event.target.innerText === "✓ Saved") {
    event.target.innerText = "Save Recipe";
    event.target.style.backgroundColor = "#e5e7e9";
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.deleteRecipe)(currentUser.recipesToCook, clickedId);
  } else if (event.target.innerText === "Remove Recipe") {
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.deleteRecipe)(currentUser.recipesToCook, clickedId);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(currentUser.recipesToCook, "Remove Recipe");
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(currentUser.recipesToCook);
  }
});

inputName.addEventListener("keydown", (event) => {
  if (savedRecipesBtn.innerText === "View Saved Recipes") {
    const userInput = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.getUserInput)(".input-name");
    const recipeIdsByName = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.findRecipeByName)(userInput, recipeData);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeIdsByName, "Save Recipe");
  } else {
    const userInput = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.getUserInput)(".input-name");
    const recipeIdsByName = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.findRecipeByName)(
      userInput,
      currentUser.recipesToCook
    );
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeIdsByName, "Remove Recipe");
  }
});

    inputIngredient.addEventListener("keydown", (event) => {
      if (savedRecipesBtn.innerText === "View Saved Recipes") {
        const userInput = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.getUserInput)(".input-ingredient");
        const recipeIdsByIngredient = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.findRecipeByIngredient)(
          userInput,
          ingredientsData,
          recipeData
        );
        (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeIdsByIngredient, "Save Recipe");
      } else {
        const userInput = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.getUserInput)(".input-ingredient");
        const recipeIdsByIngredient = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.findRecipeByIngredient)(
          userInput,
          ingredientsData,
          currentUser.recipesToCook
        );
        (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeIdsByIngredient, "Remove Recipe");
      }
    });

    tagButtons.addEventListener("click", (event) => {
      let tagClicked;
      tagClicked = event.target.id;
      if (event.target === savedRecipesBtn) {
        const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(recipeData, tagClicked);
        (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(filteredRecipeIDByTag, "Remove Recipe");
      } else if (tagClicked !== '' && savedRecipesBtn.innerHTML !== 'View All') {
        const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(recipeData, tagClicked);
        (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(filteredRecipeIDByTag, "Save Recipe");
      } else if (tagClicked !== '' && savedRecipesBtn.innerHTML === 'View All') {
        const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(
          currentUser.recipesToCook,
          tagClicked
        );
        (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(filteredRecipeIDByTag, "Remove Recipe");
      }
    });

recipeDisplay.addEventListener("click", (event) => {
  let idClicked;
  idClicked = event.target.id;
  if (idClicked.length === 6) {
    const directions = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeDirections)(recipeData, idClicked);
    const cost = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeCost)(recipeData, ingredientsData, idClicked);
    modalCost.innerText = `Estimated Cost of Ingredients: $${cost}`;
    const ingredients = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnIngredientNames)(
      recipeData,
      ingredientsData,
      idClicked
    );
    const title = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeTitle)(recipeData, idClicked);
    modalTitle.innerHTML = title;

    const tags = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeTags)(recipeData, idClicked);
    const url = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeImgUrl)(recipeData, idClicked);

    let directionsHtml = "";
    directions.forEach((directionsEl, index) => {
      let stepNumber = index + 1;
      directionsHtml += `<li><strong>Step${stepNumber}:</strong> ${directionsEl}</li><br>`;
    });
    modalDirections.innerHTML = directionsHtml;

    let ingredientsHtml = "";
    ingredients.forEach((ingredientEl) => {
      ingredientsHtml += `<li>- ${ingredientEl}</li>`;
    });
    modalIngredients.innerHTML = ingredientsHtml;

    let tagsHtml = "";
    tags.forEach((tagsEl) => {
      tagsHtml += `<li>${tagsEl}</li>`;
    });
    modalTags.innerHTML = tagsHtml;

    modalOverlay.classList.add("open-modal");

    modalContainer.style.backgroundImage = `linear-gradient(
      rgba(15, 15, 15, 0.7),
      rgba(15, 15, 15, 0.7)
    ), url(${url})`;
  }
});

closeBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open-modal");
});

Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_22__.fetchUsers, _apiCalls__WEBPACK_IMPORTED_MODULE_22__.fetchIngredients, _apiCalls__WEBPACK_IMPORTED_MODULE_22__.fetchRecipes]).then(
  ([usersDataValue, ingredientsDataValue, recipeDataValue]) => {
    usersData = usersDataValue;
    ingredientsData = ingredientsDataValue;
    recipeData = recipeDataValue;

    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(recipeData, "Save Recipe");
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(recipeData);
    createRandomUser(usersData);
  }
);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map