/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/receiver/index.mjs":
/*!********************************!*\
  !*** ./src/receiver/index.mjs ***!
  \********************************/
/*! no exports provided */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _receiver_manager_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./receiver-manager.mjs */ "./src/receiver/receiver-manager.mjs");


const receiver = new _receiver_manager_mjs__WEBPACK_IMPORTED_MODULE_0__["ReceiverManager"]();
receiver();

/***/ }),

/***/ "./src/receiver/receiver-manager.mjs":
/*!*******************************************!*\
  !*** ./src/receiver/receiver-manager.mjs ***!
  \*******************************************/
/*! exports provided: ReceiverManager */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverManager", function() { return ReceiverManager; });
class ReceiverManager {
  constructor() {
    this._context = cast.framework.CastReceiverContext.getInstance();
    this._player = this._context.getPlayerManager();
    this._addListeners();
    this._enableLogger();
    /** DEBUG **/
    this._context.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
    /** for Touch devices **/
    // this._playerData = new cast.framework.ui.PlayerData();
    // this._playerDataBinder = new cast.framework.ui.PlayerDataBinder(_playerData);
    // this._touchControls = new cast.framework.ui.Controls.getInstance();
  }

  start() {
    const playbackConfig = new cast.framework.PlaybackConfig();
    const options = new cast.framework.CastReceiverOptions();

    this._context.start({
      playbackConfig: playbackConfig,
      options: options
    });
    this._castDebugLogger.info('MyApp.LOG', 'START');
  }

  onLoadMedia() {
    this._castDebugLogger.info('MyApp.LOG', 'Intercepting LOAD request');
    this._reset();
    // Fetch content repository by requested contentId
    apiClient('GET', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4')
    .then(function (data) {
      var item = data[request.media.contentId];
      if(!item) {
        reject();
      } else {
        // Adjusting request to make requested content playable
        request.media.contentId = item.stream.hls;
        request.media.contentType = 'application/x-mpegurl';

        // Add metadata
        var metadata = new cast.framework.messages.MediaMetadata();
        metadata.metadataType = cast.framework.messages.MetadataType.GENERIC;
        metadata.title = item.title;
        metadata.subtitle = item.author;

        request.media.metadata = metadata;
        resolve(request);
      }
    });
  }

  apiClient(method, url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }

  _reset() {
    this._player.reset();
  }

  _addListeners() {
    this._player.setMessageInterceptor(
      cast.framework.messages.MessageType.LOAD,
      request => {
        if (request.media && request.media.entity) {
          request.media.contentId = request.media.entity;
        }
        return new Promise((resolve, reject) => {
          if(request.media.contentType == 'video/mp4') {
            this._castDebugLogger.info('MyApp.LOG', 'b');
            return resolve(request);
          }
          this._castDebugLogger.info('MyApp.LOG', 'c');
          this.onLoadMedia();
        });
    });
  }

  _enableLogger() {
    this._castDebugLogger = cast.debug.CastDebugLogger.getInstance();
    this._castDebugLogger.setEnabled(true);
    this._castDebugLogger.showDebugLogs(true);
    // Set verbosity level for custom tags
    this._castDebugLogger.loggerLevelByTags = {
      'EVENT.CORE': cast.framework.LoggerLevel.DEBUG,
      'MyAPP.LOG': cast.framework.LoggerLevel.WARNING,
      "DEV.LOG": cast.framework.LoggerLevel.INFO
    };
  }

  _getBrowseItems() {
    const browseItems = [];
    makeRequest('GET', 'https://tse-summit.firebaseio.com/content.json')
    .then(function (data) {
      for (let key in data) {
        const item = new cast.framework.ui.BrowseItem();
        item.entity = key;
        item.title = data[key].title;
        item.subtitle = data[key].description;
        item.image = new cast.framework.messages.Image(data[key].poster);
        item.imageType = cast.framework.ui.BrowseImageType.MOVIE;
        browseItems.push(item);
      }
    });
    return browseItems;
  }

  _setBrowseConent() {
    const browseContent = new cast.framework.ui.BrowseContent();
    browseContent.title = 'Up Next';
    browseContent.items = this._getBrowseItems();
    browseContent.targetAspectRatio =
      cast.framework.ui.BrowseImageAspectRatio.LANDSCAPE_16_TO_9;

    _touchControls.setBrowseContent(browseContent);
  }

  _assignSlot() {
    // Clear default buttons and re-assign
    _touchControls.clearDefaultSlotAssignments(); 
    // Assign buttons to control slots.
    controls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_1,
      cast.framework.ui.ControlsButton.QUEUE_PREV
    )
    controls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_2,
      cast.framework.ui.ControlsButton.CAPTIONS
    )
    controls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_3,
      cast.framework.ui.ControlsButton.SEEK_FORWARD_15
    )
    controls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_4,
      cast.framework.ui.ControlsButton.QUEUE_NEXT
    )
  }
}

/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi ./src/receiver/index.mjs ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/a14504/sandbox/caf-receiver/src/receiver/index.mjs */"./src/receiver/index.mjs");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY2VpdmVyL2luZGV4Lm1qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVjZWl2ZXIvcmVjZWl2ZXItbWFuYWdlci5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXlEOztBQUV6RCxxQkFBcUIscUVBQWU7QUFDcEMsVzs7Ozs7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHsgUmVjZWl2ZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWNlaXZlci1tYW5hZ2VyLm1qcyc7XG5cbmNvbnN0IHJlY2VpdmVyID0gbmV3IFJlY2VpdmVyTWFuYWdlcigpO1xucmVjZWl2ZXIoKTsiLCJleHBvcnQgY2xhc3MgUmVjZWl2ZXJNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNhc3QuZnJhbWV3b3JrLkNhc3RSZWNlaXZlckNvbnRleHQuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLl9wbGF5ZXIgPSB0aGlzLl9jb250ZXh0LmdldFBsYXllck1hbmFnZXIoKTtcbiAgICB0aGlzLl9hZGRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9lbmFibGVMb2dnZXIoKTtcbiAgICAvKiogREVCVUcgKiovXG4gICAgdGhpcy5fY29udGV4dC5zZXRMb2dnZXJMZXZlbChjYXN0LmZyYW1ld29yay5Mb2dnZXJMZXZlbC5ERUJVRyk7XG4gICAgLyoqIGZvciBUb3VjaCBkZXZpY2VzICoqL1xuICAgIC8vIHRoaXMuX3BsYXllckRhdGEgPSBuZXcgY2FzdC5mcmFtZXdvcmsudWkuUGxheWVyRGF0YSgpO1xuICAgIC8vIHRoaXMuX3BsYXllckRhdGFCaW5kZXIgPSBuZXcgY2FzdC5mcmFtZXdvcmsudWkuUGxheWVyRGF0YUJpbmRlcihfcGxheWVyRGF0YSk7XG4gICAgLy8gdGhpcy5fdG91Y2hDb250cm9scyA9IG5ldyBjYXN0LmZyYW1ld29yay51aS5Db250cm9scy5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgcGxheWJhY2tDb25maWcgPSBuZXcgY2FzdC5mcmFtZXdvcmsuUGxheWJhY2tDb25maWcoKTtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IGNhc3QuZnJhbWV3b3JrLkNhc3RSZWNlaXZlck9wdGlvbnMoKTtcblxuICAgIHRoaXMuX2NvbnRleHQuc3RhcnQoe1xuICAgICAgcGxheWJhY2tDb25maWc6IHBsYXliYWNrQ29uZmlnLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH0pO1xuICAgIHRoaXMuX2Nhc3REZWJ1Z0xvZ2dlci5pbmZvKCdNeUFwcC5MT0cnLCAnU1RBUlQnKTtcbiAgfVxuXG4gIG9uTG9hZE1lZGlhKCkge1xuICAgIHRoaXMuX2Nhc3REZWJ1Z0xvZ2dlci5pbmZvKCdNeUFwcC5MT0cnLCAnSW50ZXJjZXB0aW5nIExPQUQgcmVxdWVzdCcpO1xuICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgLy8gRmV0Y2ggY29udGVudCByZXBvc2l0b3J5IGJ5IHJlcXVlc3RlZCBjb250ZW50SWRcbiAgICBhcGlDbGllbnQoJ0dFVCcsICdodHRwOi8vY29tbW9uZGF0YXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vZ3R2LXZpZGVvcy1idWNrZXQvYmlnX2J1Y2tfYnVubnlfMTA4MHAubXA0JylcbiAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIGl0ZW0gPSBkYXRhW3JlcXVlc3QubWVkaWEuY29udGVudElkXTtcbiAgICAgIGlmKCFpdGVtKSB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRqdXN0aW5nIHJlcXVlc3QgdG8gbWFrZSByZXF1ZXN0ZWQgY29udGVudCBwbGF5YWJsZVxuICAgICAgICByZXF1ZXN0Lm1lZGlhLmNvbnRlbnRJZCA9IGl0ZW0uc3RyZWFtLmhscztcbiAgICAgICAgcmVxdWVzdC5tZWRpYS5jb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LW1wZWd1cmwnO1xuXG4gICAgICAgIC8vIEFkZCBtZXRhZGF0YVxuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgY2FzdC5mcmFtZXdvcmsubWVzc2FnZXMuTWVkaWFNZXRhZGF0YSgpO1xuICAgICAgICBtZXRhZGF0YS5tZXRhZGF0YVR5cGUgPSBjYXN0LmZyYW1ld29yay5tZXNzYWdlcy5NZXRhZGF0YVR5cGUuR0VORVJJQztcbiAgICAgICAgbWV0YWRhdGEudGl0bGUgPSBpdGVtLnRpdGxlO1xuICAgICAgICBtZXRhZGF0YS5zdWJ0aXRsZSA9IGl0ZW0uYXV0aG9yO1xuXG4gICAgICAgIHJlcXVlc3QubWVkaWEubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgcmVzb2x2ZShyZXF1ZXN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFwaUNsaWVudChtZXRob2QsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLl9wbGF5ZXIucmVzZXQoKTtcbiAgfVxuXG4gIF9hZGRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fcGxheWVyLnNldE1lc3NhZ2VJbnRlcmNlcHRvcihcbiAgICAgIGNhc3QuZnJhbWV3b3JrLm1lc3NhZ2VzLk1lc3NhZ2VUeXBlLkxPQUQsXG4gICAgICByZXF1ZXN0ID0+IHtcbiAgICAgICAgaWYgKHJlcXVlc3QubWVkaWEgJiYgcmVxdWVzdC5tZWRpYS5lbnRpdHkpIHtcbiAgICAgICAgICByZXF1ZXN0Lm1lZGlhLmNvbnRlbnRJZCA9IHJlcXVlc3QubWVkaWEuZW50aXR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaWYocmVxdWVzdC5tZWRpYS5jb250ZW50VHlwZSA9PSAndmlkZW8vbXA0Jykge1xuICAgICAgICAgICAgdGhpcy5fY2FzdERlYnVnTG9nZ2VyLmluZm8oJ015QXBwLkxPRycsICdiJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXF1ZXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY2FzdERlYnVnTG9nZ2VyLmluZm8oJ015QXBwLkxPRycsICdjJyk7XG4gICAgICAgICAgdGhpcy5vbkxvYWRNZWRpYSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9lbmFibGVMb2dnZXIoKSB7XG4gICAgdGhpcy5fY2FzdERlYnVnTG9nZ2VyID0gY2FzdC5kZWJ1Zy5DYXN0RGVidWdMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLl9jYXN0RGVidWdMb2dnZXIuc2V0RW5hYmxlZCh0cnVlKTtcbiAgICB0aGlzLl9jYXN0RGVidWdMb2dnZXIuc2hvd0RlYnVnTG9ncyh0cnVlKTtcbiAgICAvLyBTZXQgdmVyYm9zaXR5IGxldmVsIGZvciBjdXN0b20gdGFnc1xuICAgIHRoaXMuX2Nhc3REZWJ1Z0xvZ2dlci5sb2dnZXJMZXZlbEJ5VGFncyA9IHtcbiAgICAgICdFVkVOVC5DT1JFJzogY2FzdC5mcmFtZXdvcmsuTG9nZ2VyTGV2ZWwuREVCVUcsXG4gICAgICAnTXlBUFAuTE9HJzogY2FzdC5mcmFtZXdvcmsuTG9nZ2VyTGV2ZWwuV0FSTklORyxcbiAgICAgIFwiREVWLkxPR1wiOiBjYXN0LmZyYW1ld29yay5Mb2dnZXJMZXZlbC5JTkZPXG4gICAgfTtcbiAgfVxuXG4gIF9nZXRCcm93c2VJdGVtcygpIHtcbiAgICBjb25zdCBicm93c2VJdGVtcyA9IFtdO1xuICAgIG1ha2VSZXF1ZXN0KCdHRVQnLCAnaHR0cHM6Ly90c2Utc3VtbWl0LmZpcmViYXNlaW8uY29tL2NvbnRlbnQuanNvbicpXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgY2FzdC5mcmFtZXdvcmsudWkuQnJvd3NlSXRlbSgpO1xuICAgICAgICBpdGVtLmVudGl0eSA9IGtleTtcbiAgICAgICAgaXRlbS50aXRsZSA9IGRhdGFba2V5XS50aXRsZTtcbiAgICAgICAgaXRlbS5zdWJ0aXRsZSA9IGRhdGFba2V5XS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaXRlbS5pbWFnZSA9IG5ldyBjYXN0LmZyYW1ld29yay5tZXNzYWdlcy5JbWFnZShkYXRhW2tleV0ucG9zdGVyKTtcbiAgICAgICAgaXRlbS5pbWFnZVR5cGUgPSBjYXN0LmZyYW1ld29yay51aS5Ccm93c2VJbWFnZVR5cGUuTU9WSUU7XG4gICAgICAgIGJyb3dzZUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJyb3dzZUl0ZW1zO1xuICB9XG5cbiAgX3NldEJyb3dzZUNvbmVudCgpIHtcbiAgICBjb25zdCBicm93c2VDb250ZW50ID0gbmV3IGNhc3QuZnJhbWV3b3JrLnVpLkJyb3dzZUNvbnRlbnQoKTtcbiAgICBicm93c2VDb250ZW50LnRpdGxlID0gJ1VwIE5leHQnO1xuICAgIGJyb3dzZUNvbnRlbnQuaXRlbXMgPSB0aGlzLl9nZXRCcm93c2VJdGVtcygpO1xuICAgIGJyb3dzZUNvbnRlbnQudGFyZ2V0QXNwZWN0UmF0aW8gPVxuICAgICAgY2FzdC5mcmFtZXdvcmsudWkuQnJvd3NlSW1hZ2VBc3BlY3RSYXRpby5MQU5EU0NBUEVfMTZfVE9fOTtcblxuICAgIF90b3VjaENvbnRyb2xzLnNldEJyb3dzZUNvbnRlbnQoYnJvd3NlQ29udGVudCk7XG4gIH1cblxuICBfYXNzaWduU2xvdCgpIHtcbiAgICAvLyBDbGVhciBkZWZhdWx0IGJ1dHRvbnMgYW5kIHJlLWFzc2lnblxuICAgIF90b3VjaENvbnRyb2xzLmNsZWFyRGVmYXVsdFNsb3RBc3NpZ25tZW50cygpOyBcbiAgICAvLyBBc3NpZ24gYnV0dG9ucyB0byBjb250cm9sIHNsb3RzLlxuICAgIGNvbnRyb2xzLmFzc2lnbkJ1dHRvbihcbiAgICAgIGNhc3QuZnJhbWV3b3JrLnVpLkNvbnRyb2xzU2xvdC5TTE9UXzEsXG4gICAgICBjYXN0LmZyYW1ld29yay51aS5Db250cm9sc0J1dHRvbi5RVUVVRV9QUkVWXG4gICAgKVxuICAgIGNvbnRyb2xzLmFzc2lnbkJ1dHRvbihcbiAgICAgIGNhc3QuZnJhbWV3b3JrLnVpLkNvbnRyb2xzU2xvdC5TTE9UXzIsXG4gICAgICBjYXN0LmZyYW1ld29yay51aS5Db250cm9sc0J1dHRvbi5DQVBUSU9OU1xuICAgIClcbiAgICBjb250cm9scy5hc3NpZ25CdXR0b24oXG4gICAgICBjYXN0LmZyYW1ld29yay51aS5Db250cm9sc1Nsb3QuU0xPVF8zLFxuICAgICAgY2FzdC5mcmFtZXdvcmsudWkuQ29udHJvbHNCdXR0b24uU0VFS19GT1JXQVJEXzE1XG4gICAgKVxuICAgIGNvbnRyb2xzLmFzc2lnbkJ1dHRvbihcbiAgICAgIGNhc3QuZnJhbWV3b3JrLnVpLkNvbnRyb2xzU2xvdC5TTE9UXzQsXG4gICAgICBjYXN0LmZyYW1ld29yay51aS5Db250cm9sc0J1dHRvbi5RVUVVRV9ORVhUXG4gICAgKVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==