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
___CSS_LOADER_EXPORT___.push([module.id, "::-webkit-scrollbar {\n  width: 10px; /* Width of the scrollbar */\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: rgb(141, 130, 130); /* Color of the scrollbar thumb */\n  border-radius: 10px; /* Rounded corners of the scrollbar thumb */\n}\n\n::-webkit-scrollbar-track {\n  background-color: #f1f1f1; /* Color of the scrollbar track */\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\";\n}\n\nbody {\n  background-color: white;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\nh1 {\n  font-family: \"Cedarville Cursive\";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n  font-weight: bolder;\n  margin-top: 1.8rem;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.recipes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 50px;\n  align-items: flex-start;\n  justify-content: center;\n  height: 850px;\n  width: 80%;\n  overflow-y: scroll;\n  font-weight: bolder;\n  padding-top: 2em;\n  padding-bottom: 1em;\n}\n\n.recipe-card {\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: 2px #d9dadd;\n  align-items: center;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  border-radius: 35px;\n}\n\n.recipe-card:hover {\n  cursor: pointer;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.title-recipe {\n  width: 250px;\n  height: 50px;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n  padding: 1.25em;\n}\n\n.title-recipe:hover {\n  cursor: pointer;\n}\n\nimg {\n  height: 200px;\n  width: 250px;\n  border-radius: 15px;\n}\n\nimg:hover {\n  cursor: pointer;\n}\n\n.view-saved {\n  height: 50px;\n  width: 200px;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(144, 147, 149, 0.5);\n  display: grid;\n  place-items: center;\n  visibility: hidden;\n  z-index: -10;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.99);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.open-modal {\n  visibility: visible;\n  z-index: 10;\n  animation: fadeIn 0.4s linear; /* Add a fade-in animation */\n}\n\n.modal-container {\n  background-image: linear-gradient(rgba(15, 15, 15, 0.2), rgba(15, 15, 15, 0.2)), url(https://spoonacular.com/recipeImages/595736-556x370.jpg);\n  background-size: cover;\n  color: white;\n  width: 90vw;\n  opacity: 0.95;\n  height: 60vh;\n  text-align: center;\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n\n.close-btn {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  font-size: 2rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n\n.close-btn:hover {\n  transform: scale(1.2);\n  color: red;\n}\n\n.modal-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal-title-directions {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n  width: 50vw;\n  height: 60vh;\n  overflow-y: auto;\n}\n\n.modal-tags {\n  display: flex;\n  flex-direction: column;\n  width: 12vw;\n  height: 60vh;\n  margin-top: 55px;\n  overflow-y: auto;\n}\n\nul {\n  list-style-type: none;\n}\n\n.modal-ingredients-cost {\n  width: 30vw;\n  height: 60vh;\n  overflow-y: auto;\n}\n\n.modal-directions {\n  overflow-y: auto;\n}\n\n.btn {\n  height: 20px;\n  width: 100px;\n}\n\n.btn:hover {\n  transform: scale(1.1);\n}\n\n.tag-buttons {\n  display: flex;\n  overflow-x: auto;\n  width: 775px;\n  gap: 50px;\n  background-color: white;\n  border: 2px dotted #d9dadd;\n  padding: 10px;\n  border-radius: 35px;\n}\n\np {\n  text-align: center;\n}\n\n.save-recipe-btn {\n  margin: 10px;\n  width: 120px;\n  height: 35px;\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 0.8rem;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.save-recipe-btn:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.input-name {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.input-name::placeholder {\n  font-size: 15px;\n}\n\n.input-ingredient::placeholder {\n  font-size: 15px;\n}\n\n.input-ingredient {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.title-recipe {\n  font-size: 18px;\n  font-family: \"Roboto\";\n  font-weight: 300;\n}\n\n.view-saved {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.3rem;\n  width: 17rem;\n  margin-bottom: 30px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.view-saved:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.tag-btn {\n  height: 50px;\n  width: 50px;\n  border-radius: 15px;\n  margin: 2px;\n  filter: grayscale(60%);\n}\n\ntag-btn:hover {\n  cursor: pointer;\n}\n\n.tag-btn:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.2);\n  filter: grayscale(30%);\n}\n\n.tag-btn-active {\n  filter: grayscale(30%);\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.2);\n}\n\n.food-icon {\n  height: 20px;\n  width: 20px;\n}\n\n.modal-title {\n  margin-top: 100px;\n  font-size: 2.2rem;\n}\n\n.modal-cost {\n  font-size: 1.4rem;\n  margin-top: 100px;\n  margin-bottom: 20px;\n  font-weight: 300;\n}\n\n.modal-container {\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 50px;\n  padding-bottom: 50px;\n  gap: 100px;\n}\n\n.modal-ingredients-list {\n  font-size: 1.1rem;\n  margin-top: 10px;\n}\n\n.modal-ingredients {\n  font-size: 1.3rem;\n  margin-bottom: 10px;\n  margin-top: 20px;\n}\n\n.modal-directions {\n  font-size: 1.8rem;\n}\n\n.modal-directions-list {\n  font-size: 1.2rem;\n}\n\n.modal-tags {\n  font-size: 1.1rem;\n}\n\nli {\n  font-weight: 300;\n  text-align: left;\n}\n\n.bold {\n  font-weight: bold;\n}\n\n.choose-currency {\n  font-size: 18px;\n}\n\n.currencies-dropdown {\n  font-size: 18px;\n}\n\n.is-saved {\n  background-color: #89ce94;\n}\n\n.is-not-saved {\n  background-color: #e5e7e9;\n}\n\n.none-saved {\n  color: red;\n  padding-top: 22px;\n  font-size: 16px;\n}\n\n#ing-checkbox {\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n  margin-right: 5px;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["::-webkit-scrollbar {\n  width: 10px; /* Width of the scrollbar */\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: rgb(141, 130, 130); /* Color of the scrollbar thumb */\n  border-radius: 10px; /* Rounded corners of the scrollbar thumb */\n}\n\n::-webkit-scrollbar-track {\n  background-color: #f1f1f1; /* Color of the scrollbar track */\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\";\n}\n\nbody {\n  background-color: white;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\nh1 {\n  font-family: \"Cedarville Cursive\";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n  font-weight: bolder;\n  margin-top: 1.8rem;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.recipes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 50px;\n  align-items: flex-start;\n  justify-content: center;\n  height: 850px;\n  width: 80%;\n  overflow-y: scroll;\n  font-weight: bolder;\n  padding-top: 2em;\n  padding-bottom: 1em;\n}\n\n.recipe-card {\n  display: flex;\n  flex-direction: column;\n\n  background-color: white;\n  border: 2px #d9dadd;\n  align-items: center;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n\n  border-radius: 35px;\n}\n.recipe-card:hover {\n  cursor: pointer;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.title-recipe {\n  width: 250px;\n  height: 50px;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n  padding: 1.25em;\n}\n\n.title-recipe:hover {\n  cursor: pointer;\n}\n\nimg {\n  height: 200px;\n  width: 250px;\n  border-radius: 15px;\n}\n\nimg:hover {\n  cursor: pointer;\n}\n\n.view-saved {\n  height: 50px;\n  width: 200px;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(144, 147, 149, 0.5);\n  display: grid;\n  place-items: center;\n  visibility: hidden;\n  z-index: -10;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; \n    transform: scale(0.99); \n  }\n  to {\n    opacity: 1; \n    transform: scale(1); \n  }\n}\n\n.open-modal {\n  visibility: visible;\n  z-index: 10;\n  animation: fadeIn 0.4s linear; /* Add a fade-in animation */\n}\n.modal-container {\n  background-image: linear-gradient(\n      rgba(15, 15, 15, 0.2),\n      rgba(15, 15, 15, 0.2)\n    ),\n    url(https://spoonacular.com/recipeImages/595736-556x370.jpg);\n  background-size: cover;\n  color: white;\n  width: 90vw;\n  opacity: 0.95;\n  height: 60vh;\n  text-align: center;\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n\n.close-btn {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  font-size: 2rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  height: 50px;\n  width: 50px;\n}\n.close-btn:hover {\n  transform: scale(1.2);\n  color: red;\n}\n\n.modal-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.modal-title-directions {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n  width: 50vw;\n  height: 60vh;\n  overflow-y: auto;\n}\n\n.modal-tags {\n  display: flex;\n  flex-direction: column;\n  width: 12vw;\n  height: 60vh;\n  margin-top: 55px;\n  overflow-y: auto;\n}\n\nul {\n  list-style-type: none;\n}\n\n.modal-ingredients-cost {\n  width: 30vw;\n  height: 60vh;\n  overflow-y: auto;\n}\n\n.modal-directions {\n  overflow-y: auto;\n}\n\n.btn {\n  height: 20px;\n  width: 100px;\n}\n\n.btn:hover {\n  transform: scale(1.1);\n}\n\n.tag-buttons {\n  display: flex;\n  overflow-x: auto;\n  width: 775px;\n  gap: 50px;\n  background-color: white;\n  border: 2px dotted #d9dadd;\n  padding: 10px;\n  border-radius: 35px;\n}\n\np {\n  text-align: center;\n}\n\n.save-recipe-btn {\n  margin: 10px;\n  width: 120px;\n  height: 35px;\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 0.8rem;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n.save-recipe-btn:hover {\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.input-name {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n.input-name::placeholder {\n  font-size: 15px;\n}\n.input-ingredient::placeholder {\n  font-size: 15px;\n}\n\n.input-ingredient {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.2rem;\n  width: 30rem;\n}\n\n.title-recipe {\n  font-size: 18px;\n  font-family: \"Roboto\";\n  font-weight: 300;\n}\n\n.view-saved {\n  background-color: #d9dadd;\n  border: none;\n  border-radius: 100rem;\n  padding: 0.8rem;\n  font-size: 1.3rem;\n  width: 17rem;\n  margin-bottom: 30px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);\n  font-weight: 300;\n}\n\n.view-saved:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.1);\n}\n\n.tag-btn {\n  height: 50px;\n  width: 50px;\n  border-radius: 15px;\n  margin: 2px;\n  filter: grayscale(60%);\n}\n\ntag-btn:hover {\n  cursor: pointer;\n}\n\n.tag-btn:hover {\n  background-color: #cccccc;\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.2);\n  filter:grayscale(30%)\n}\n\n.tag-btn-active {\n  filter:grayscale(30%);\n  transition: transform 0.3s ease-in-out;\n  transform: scale(1.2);\n}\n\n.food-icon {\n  height: 20px;\n  width: 20px;\n}\n\n.modal-title {\n  margin-top: 100px;\n  font-size: 2.2rem;\n}\n\n.modal-cost {\n  font-size: 1.4rem;\n  margin-top: 100px;\n  margin-bottom: 20px;\n  font-weight: 300;\n}\n\n.modal-container {\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 50px;\n  padding-bottom: 50px;\n  gap: 100px;\n}\n\n.modal-ingredients-list {\n  font-size: 1.1rem;\n  margin-top: 10px;\n}\n\n.modal-ingredients {\n  font-size: 1.3rem;\n  margin-bottom: 10px;\n  margin-top: 20px;\n}\n\n.modal-directions {\n  font-size: 1.8rem;\n}\n.modal-directions-list {\n  font-size: 1.2rem;\n}\n\n.modal-tags {\n  font-size: 1.1rem;\n}\n\nli {\n  font-weight: 300;\n  text-align: left;\n}\n\n.bold {\n  font-weight: bold;\n}\n\n.choose-currency {\n  font-size: 18px;\n}\n\n.currencies-dropdown {\n  font-size: 18px;\n}\n\n.is-saved {\n  background-color: #89ce94;\n}\n\n.is-not-saved {\n  background-color: #e5e7e9;\n}\n\n.none-saved {\n  color: red;\n  padding-top: 22px;\n  font-size: 16px;\n}\n\n#ing-checkbox {\n  cursor:pointer;\n  width: 20px;\n  height: 20px;\n  margin-right: 5px;\n}"],"sourceRoot":""}]);
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
/* harmony export */   displayFilteredRecipes: () => (/* binding */ displayFilteredRecipes),
/* harmony export */   displayRecipes: () => (/* binding */ displayRecipes),
/* harmony export */   displayTags: () => (/* binding */ displayTags)
/* harmony export */ });
/* harmony import */ var _src_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const recipeDisplay = document.querySelector(".recipes");
const tagButtons = document.querySelector(".tag-buttons");

function displayRecipes(recipes, innerText) {
  let recipeHTML = ``;
  recipes.forEach((recipeEl) => {
    recipeHTML += `<div tabindex="0" class="recipe-card" id=${recipeEl.id}><div class="title-recipe" id="${recipeEl.id}">${recipeEl.name}</div>
    <img
      src="${recipeEl.image}"
      alt="${recipeEl.image}"
      id="${recipeEl.id}"
    />
    <button class="save-recipe-btn">${innerText}</button>
    </div>`;
  });
  recipeDisplay.innerHTML = recipeHTML;
}

function displayTags(recipes) {
  const tags = (0,_src_functions_js__WEBPACK_IMPORTED_MODULE_0__.returnListOfUniqueTags)(recipes);
  let tagsHtml = "";
  tags.forEach((tagEl) => {
    tagsHtml += `<div><img tabindex="0" class="tag-btn" alt="${tagEl}" id="${tagEl}" src="/images/${tagEl}.png"><p>${tagEl}</p></div>
    `;
  });
  tagButtons.innerHTML = tagsHtml;
}

function displayFilteredRecipes(recipeData, currentUserRecipes) {
  // store user recipes ids
  const savedRecipeIDs = currentUserRecipes.map((userRecipe) => userRecipe.id);

  // display on html
  let filteredRecipeHTML = ``;
  let innerText = ``;
  let buttonClass = ``;

  recipeData.forEach((recipe) => {
    // changing innerText and setting buttonClass for DOM
    const isSaved = savedRecipeIDs.includes(recipe.id);
    if (isSaved) {
      innerText = `✓ Saved`;
      buttonClass = "is-saved";
    } else {
      innerText = `Save Recipe`;
      buttonClass = "is-not-saved";
    }

    filteredRecipeHTML += `<div class="recipe-card" id=${recipe.id}><div class="title-recipe" id=${recipe.id}>${recipe.name}</div>
    <img
      src="${recipe.image}"
      alt="recipe-img"
      id=${recipe.id}
    />
    <button class="save-recipe-btn ${buttonClass}">${innerText}</button>
    </div>`;
  });

  recipeDisplay.innerHTML = filteredRecipeHTML;
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
function returnFilteredTag(recipes, tag) {
  const filteredRecipe = recipes.filter((recipeEl) => {
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

function returnRecipeCost(recipes, ingredients, id) {
  const filteredRecipe = recipes.find((recipeEl) => {
    return recipeEl.id === parseInt(id);
  });
  if (filteredRecipe) {
    const ingredientsArr = filteredRecipe.ingredients;
    const totalCost = ingredientsArr.reduce((acc, ingredientEl) => {
      const matchingIngredient = ingredients.find((ingredientsObjEl) => {
        return ingredientEl.id === ingredientsObjEl.id;
      });
      if (matchingIngredient) {
        acc +=
          (ingredientEl.quantity.amount *
            matchingIngredient.estimatedCostInCents) /
          100;
      }
      return acc;
    }, 0);
    return Math.round(totalCost);
  }
}
function returnIngredientNames(recipes, ingredients, id) {
  const filteredRecipe = recipes.find((recipeEl) => {
    return recipeEl.id === parseInt(id);
  });
  if (filteredRecipe) {
    const ingredientsArr = filteredRecipe.ingredients;
    return ingredientsArr.map((ingredientEl) => {
      const matchingIngredient = ingredients.find((ingredientsObjEl) => {
        return ingredientEl.id === ingredientsObjEl.id;
      });
      if (matchingIngredient) {
        return matchingIngredient.name;
      }
    });
  }
  return [];
}
function returnRecipeDirections(recipes, id) {
  const filteredRecipe = recipes.find((recipeEl) => {
    return recipeEl.id === parseInt(id);
  });

  if (filteredRecipe) {
    return filteredRecipe.instructions.map((instructionsObj) => {
      return instructionsObj.instruction;
    });
  } else {
    return [];
  }
}

function returnFilteredListName(recipes, name) {
  return recipes
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

function returnRecipeTitle(recipes, id) {
  return recipes
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(id);
    })
    .map((oneRecipeEl) => {
      return oneRecipeEl.name;
    });
}

function returnRecipeTags(recipes, id) {
  return recipes
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(id);
    })
    .flatMap((recipeEl) => {
      return recipeEl.tags;
    });
}

function returnRecipeImgUrl(recipes, id) {
  return recipes
    .filter((recipeEl) => {
      return recipeEl.id === parseInt(id);
    })
    .map((filteredRecipeEl) => {
      return filteredRecipeEl.image;
    });
}

function returnListOfUniqueTags(recipes) {
  return recipes.reduce((acc, currentRecipe) => {
    currentRecipe.tags.forEach((tagEl) => {
      if (!acc.includes(tagEl)) {
        acc.push(tagEl);
      }
    });
    return acc;
  }, []);
}

function returnFilteredRecipeArrayByTagID(arrayTagsID, recipes) {
  return recipes.filter((recipesEl) => {
    return arrayTagsID.some((idEl) => {
      return idEl === recipesEl.id;
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
/* harmony export */   fetchCurrencies: () => (/* binding */ fetchCurrencies),
/* harmony export */   fetchCurrenciesCode: () => (/* binding */ fetchCurrenciesCode),
/* harmony export */   fetchIngredients: () => (/* binding */ fetchIngredients),
/* harmony export */   fetchRecipes: () => (/* binding */ fetchRecipes),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers),
/* harmony export */   sendDeleteRequest: () => (/* binding */ sendDeleteRequest),
/* harmony export */   sendPostRequest: () => (/* binding */ sendPostRequest)
/* harmony export */ });
// Your fetch requests will live here!
function fetchCurrenciesCode() {
  return fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching currencies code:", error);
      throw error;
    });
}

function fetchCurrencies() {
  return fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching currencies:", error);
      throw error;
    });
}

const fetchUsers = fetch("http://localhost:3001/api/v1/users")
  .then((response) => {
    if(!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.users;
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    throw error;
  });

const fetchIngredients = fetch(
  "http://localhost:3001/api/v1/ingredients"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.ingredients;
  })
  .catch((error) => {
    console.error("Error fetching ingredients:", error);
    throw error;
  })

  const fetchRecipes = fetch("http://localhost:3001/api/v1/recipes")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.recipes;
  })
  .catch((error) => {
    console.error("Error fetching recipes:", error);
    throw error;
  });

function sendPostRequest(currentUser, clickedRecipe) {
  return fetch("http://localhost:3001/api/v1/usersRecipes", {
    method: 'POST',
    body: JSON.stringify({
      userID: currentUser.id,
      recipeID: clickedRecipe
    }),
    headers: {
       'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw newError(`Response failed with status: ${response.status}`);
    }
    return response.json()
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending POST request:", error);
    throw error;
  });
}

function sendDeleteRequest(currentUser, clickedRecipe) {
  return fetch("http://localhost:3001/api/v1/usersRecipes", {
    method: 'DELETE',
    body: JSON.stringify({
      userID: currentUser.id,
      recipeID: clickedRecipe
    }),
    headers: {
       'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending DELETE request:", error);
    throw error;
  });
}

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






























const recipeDisplay = document.querySelector(".recipes");
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
const headerMsg = document.querySelector(".header-msg");

// User
let currentUser = {};
let clickedRecipe = null;

let usersData = null;
let ingredientsData = null;
let recipeData = null;
let idClicked = null;

// Currency
let fetchedCodes = null;
let fetchedRates = null;

let fetchedCad = null;
let fetchedUsd = null;
let fetchedEuro = null;
let fetchedYen = null;
let fetchedGbp = null;
let fetchedNzd = null;
let fetchedPeso = null;
let fetchedBtc = null;

(0,_apiCalls__WEBPACK_IMPORTED_MODULE_22__.fetchCurrenciesCode)().then((currencies) => {
  fetchedCodes = currencies;
  console.log(fetchedCodes);
});

(0,_apiCalls__WEBPACK_IMPORTED_MODULE_22__.fetchCurrencies)().then((currenciesRates) => {
  fetchedRates = currenciesRates;
  console.log(fetchedRates);
  fetchedCad = fetchedRates.usd["cad"];
  fetchedUsd = fetchedRates.usd["usd"];
  fetchedEuro = fetchedRates.usd["eur"];
  fetchedYen = fetchedRates.usd["jpy"];
  fetchedGbp = fetchedRates.usd["gbp"];
  fetchedNzd = fetchedRates.usd["nzd"];
  fetchedPeso = fetchedRates.usd["mxn"];
  fetchedBtc = fetchedRates.usd["btc"];
  console.log(fetchedCad);
  console.log(fetchedUsd);
  console.log(fetchedEuro);
  console.log(fetchedYen);
});

function createRandomUser(users) {
  const randIndex = Math.floor(Math.random() * users.length);

  const randomUser = users.find((userEl) => {
    return userEl.id == randIndex;
  });
  currentUser.name = randomUser.name;
  currentUser.id = randomUser.id;
  currentUser.recipesToCook = [];
  console.log(currentUser);
  headerMsg.innerText = `What's Cookin', ${currentUser.name}?`

  return currentUser;
}

const viewSavedRecipes = (recipeData) => {
    if (savedRecipesBtn.innerText === "View Saved Recipes") {
      (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(currentUser.recipesToCook, "Remove Recipe");
      savedRecipesBtn.innerText = "View All";
      (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(currentUser.recipesToCook);
    } else {
      (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(recipeData, currentUser.recipesToCook);
      savedRecipesBtn.innerText = "View Saved Recipes";
      (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(recipeData);
    }
};

let isMsgDisplayed = false; // initialize message
let isBtnDisabled = false; // initialize button status

savedRecipesBtn.addEventListener("click", (event) => {
  if (!isBtnDisabled) {
   if (currentUser.recipesToCook.length === 0 && !isMsgDisplayed && savedRecipesBtn.innerText === "View Saved Recipes") {
     const pTag = document.createElement("p");
     pTag.className = "none-saved";
     pTag.textContent = `You don't have any recipes saved!`;
 
     savedRecipesBtn.appendChild(pTag);
     // display message
     isMsgDisplayed = true;
     // disable button
     isBtnDisabled = true;
 
     setTimeout(() => {
       pTag.remove();
       // reset message
       isMsgDisplayed = false;
       // reset button
       isBtnDisabled = false;
     }, 2000)
    } else {
  viewSavedRecipes(recipeData);
    }
  }
});

recipeDisplay.addEventListener("click", (event) => {
  let clickedId = event.target.parentNode.firstChild.id;

  if (event.target.innerText === "Save Recipe") {
    event.target.innerText = "✓ Saved";
    event.target.style.backgroundColor = "#89ce94";
    clickedRecipe = clickedId; // update clickedrecipe with correct id
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.saveRecipe)(recipeData, currentUser.recipesToCook, clickedId);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_22__.sendPostRequest)(currentUser, clickedRecipe);
  } else if (event.target.innerText === "✓ Saved") {
    event.target.innerText = "Save Recipe";
    event.target.style.backgroundColor = "#e5e7e9";
    clickedRecipe = clickedId; // update clickedrecipe with correct id
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_22__.sendDeleteRequest)(currentUser, clickedRecipe);
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.deleteRecipe)(currentUser.recipesToCook, clickedId);
  } else if (event.target.innerText === "Remove Recipe") {
    clickedRecipe = clickedId; // update clickedrecipe with correct id
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_22__.sendDeleteRequest)(currentUser, clickedRecipe);
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.deleteRecipe)(currentUser.recipesToCook, clickedId);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(currentUser.recipesToCook, "Remove Recipe");
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(currentUser.recipesToCook);
  }
});

inputName.addEventListener("keyup", (event) => {
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

inputIngredient.addEventListener("keyup", (event) => {
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
  handleTagButtonClick(event);
});

tagButtons.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleTagButtonClick(event);
  }
});

function handleTagButtonClick(event) {
  let tagClicked;
  tagClicked = event.target.id;

  const clickedTag = event.target;

  if (clickedTag.classList.contains("tag-btn")) {
    const allTagButtons = tagButtons.querySelectorAll(".tag-btn");

    allTagButtons.forEach((tagButton) => {
      if (tagButton === clickedTag) {
        clickedTag.nextSibling.classList.toggle('bold');
        clickedTag.classList.toggle('tag-btn-active')
      } else {
        tagButton.nextSibling.classList.remove('bold')
        tagButton.classList.remove('tag-btn-active')
      }
    });
  }

    // user clicks on view saved recipes button
  if (clickedTag === savedRecipesBtn) {
    const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(recipeData, tagClicked);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayRecipes)(filteredRecipeIDByTag, "Remove Recipe");
    // user clicks on a tag while in main display
  } else if (clickedTag.nextSibling.classList.contains("bold") && savedRecipesBtn.innerHTML === "View Saved Recipes") {
    const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(recipeData, tagClicked);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(filteredRecipeIDByTag, currentUser.recipesToCook)
    // user deselects tag while in view all display
  } else if (!clickedTag.nextSibling.classList.contains("bold") && savedRecipesBtn.innerHTML === "View Saved Recipes") {
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(recipeData, currentUser.recipesToCook)
    // user clicks on a tag while in view saved recipes display
  } else if (clickedTag.nextSibling.classList.contains("bold") && savedRecipesBtn.innerHTML === "View All") {
    const filteredRecipeIDByTag = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnFilteredTag)(currentUser.recipesToCook, tagClicked);
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(filteredRecipeIDByTag, currentUser.recipesToCook)
    // user deselects tag while in view saved recipes display
  } else if (!clickedTag.nextSibling.classList.contains("bold") && savedRecipesBtn.innerHTML === "View All") {
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(currentUser.recipesToCook, currentUser.recipesToCook)
  } else {
    // no tags are selected
    (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayFilteredRecipes)(recipeData, currentUser.recipesToCook)
  }
}

recipeDisplay.addEventListener("click", handleRecipeDisplayEvent);

recipeDisplay.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleRecipeDisplayEvent(event);
  }
});

function handleRecipeDisplayEvent(event) {
  idClicked = event.target.id;
  console.log(idClicked)
  if (idClicked.length === 6) {
    createModal();
    updateCost();
    createCurrencyDropdown();
    updateTitle();
    updateDirections();
    updateIngredients();
    updateTags();
  }
}

closeBtn.addEventListener("click", function () {
  closeDropdownAndModal();
});

closeBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    closeDropdownAndModal();
  }
});

function closeDropdownAndModal() {
  const currencyDropDown = document.querySelector("#currencies-dropdown");
  const currencyLabel = document.querySelector(".choose-currency");
  if (currencyDropDown && currencyLabel) {
    currencyDropDown.remove();
    currencyLabel.remove();
  }

  modalOverlay.classList.remove("open-modal");
}

modalOverlay.addEventListener("click", (event) => {
  const currencyDropDown = document.querySelector("#currencies-dropdown");
  const currencyLabel = document.querySelector(".choose-currency");
  if (event.target.id === "modal-overlay") {
  modalOverlay.classList.remove("open-modal");
  currencyDropDown.remove();
  currencyLabel.remove();
 }
});

document.addEventListener("keydown", (event) => {
  const currencyDropDown = document.querySelector("#currencies-dropdown");
  const currencyLabel = document.querySelector(".choose-currency");
  if (event.key === "Escape") {
    modalOverlay.classList.remove("open-modal");
    currencyDropDown.remove();
    currencyLabel.remove();
  }
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

function createModal() {
  const url = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeImgUrl)(recipeData, idClicked);

  modalOverlay.classList.add("open-modal");

  modalOverlay.id = "modal-overlay";

  modalContainer.style.backgroundImage = `linear-gradient(
    rgba(15, 15, 15, 0.7),
    rgba(15, 15, 15, 0.7)
  ), url(${url})`;
}

function updateCost() {
  const cost = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeCost)(recipeData, ingredientsData, idClicked);
  modalCost.innerText = `Estimated Cost of Ingredients: ${cost} USD`;
}

function updateTitle() {
  const title = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeTitle)(recipeData, idClicked);
  modalTitle.innerHTML = title;
}

function updateDirections() {
  const directions = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeDirections)(recipeData, idClicked);
  let directionsHtml = "";
  directions.forEach((directionsEl, index) => {
    let stepNumber = index + 1;
    directionsHtml += `<li><strong>Step ${stepNumber}:</strong> ${directionsEl}</li><br>`;
  });
  modalDirections.innerHTML = directionsHtml;
}

function updateIngredients() {
  const ingredients = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnIngredientNames)(
    recipeData,
    ingredientsData,
    idClicked
  );

  let ingredientsHtml = "";
  ingredients.forEach((ingredientEl) => {
    ingredientsHtml += `<li><input type="checkbox" id="ing-checkbox"> ${ingredientEl}</li>`;
  });
  modalIngredients.innerHTML = ingredientsHtml;
}

function updateTags() {
  const tags = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeTags)(recipeData, idClicked);
  let tagsHtml = "";
  tags.forEach((tagsEl) => {
    tagsHtml += `<li><img src="/images/${tagsEl}.png" alt="${tagsEl}" style="width: 30px; height: 30px;">  ${tagsEl}</li><br>`;
  });
  modalTags.innerHTML = tagsHtml;
}

function createCurrencyDropdown() {
  const currencyDropDown = document.createElement("div");
  currencyDropDown.innerHTML = `<label for="currencies" class="choose-currency">Choose a currency: </label>
    <select tabindex="0" name="currencies" class="currencies-dropdown" id="currencies-dropdown">
      <option value="USD">Choose Currency</option>
      <option value="usd">🇺🇸 US DOLLAR</option>
      <option value="cad">🇨🇦 CANADIAN DOLLAR</option>
      <option value="eur">🇪🇺 EUROS</option>
      <option value="jpy">🇯🇵 JAPANESE YEN</option>
      <option value="gpb">🇬🇧 ENGLISH POUND</option>
      <option value="nzd">🇳🇿 NEW ZEALAND DOLLAR</option>
      <option value="mxn">🇲🇽 MEXICAN PESOS</option>
      <option value="btc">₿ BITCOIN</option>
    </select>`;
    
  modalCost.insertAdjacentElement("afterend", currencyDropDown);
  
  const selectMenu = document.querySelector("#currencies-dropdown");
  selectMenu.focus();
}


document.addEventListener("change", (event) => {
  if (event.target.classList.contains("currencies-dropdown")) {
    const selectedCurrencyId = event.target.value;
    const costSelected = (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.returnRecipeCost)(
      recipeData,
      ingredientsData,
      idClicked
    );
    const convertedCost = returnUpdatedCost(selectedCurrencyId, costSelected);
    modalCost.innerText = `Estimated Cost of Ingredients: ${convertedCost} ${selectedCurrencyId.toUpperCase()}`;
  }
});

function returnUpdatedCost(currencySelected, costSelected) {
  if (currencySelected === "usd") {
    const usdCost = costSelected * fetchedUsd;
    return Math.round(usdCost);
  } else if (currencySelected === "cad") {
    const cadCost = costSelected * fetchedCad;
    return Math.round(cadCost);
  } else if (currencySelected === "eur") {
    const eurCost = costSelected * fetchedEuro;
    return Math.round(eurCost);
  } else if (currencySelected === "jpy") {
    const yenCost = costSelected * fetchedYen;
    return Math.round(yenCost);
  } else if (currencySelected === "gpb") {
    const gbpCost = costSelected * fetchedGbp;
    return Math.round(gbpCost);
  } else if (currencySelected === "nzd") {
    const nzdCost = costSelected * fetchedNzd;
    return Math.round(nzdCost);
  } else if (currencySelected === "mxn") {
    const mxnCost = costSelected * fetchedPeso;
    return Math.round(mxnCost);
  } else if (currencySelected === "btc") {
    const btcCost = costSelected * fetchedBtc;
    return btcCost.toFixed(4);
  } else {
    const usdCost = costSelected * fetchedUsd;
    return Math.round(usdCost);
  }
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map