/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VantComponent: () => (/* binding */ VantComponent)
/* harmony export */ });
/* harmony import */ var _mixins_basic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

function mapKeys(source, target, map) {
  Object.keys(map).forEach(key => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}
function VantComponent(vantOptions) {
  const options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    watch: 'observers',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    destroyed: 'detached',
    classes: 'externalClasses'
  });
  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');
  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(_mixins_basic__WEBPACK_IMPORTED_MODULE_0__.basic);
  // add relations
  const {
    relation
  } = vantOptions;
  if (relation) {
    options.relations = relation.relations;
    options.behaviors.push(relation.mixin);
  }
  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }
  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  Component(options);
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   basic: () => (/* binding */ basic)
/* harmony export */ });
const basic = Behavior({
  methods: {
    $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set(data) {
      this.setData(data);
      return new Promise(resolve => wx.nextTick(resolve));
    }
  }
});

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   button: () => (/* binding */ button)
/* harmony export */ });
/* harmony import */ var _common_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

const button = Behavior({
  externalClasses: ['hover-class'],
  properties: {
    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
    openType: String,
    getUserProfileDesc: String
  },
  data: {
    canIUseGetUserProfile: (0,_common_version__WEBPACK_IMPORTED_MODULE_0__.canIUseGetUserProfile)()
  },
  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail);
    },
    onContact(event) {
      this.triggerEvent('contact', event.detail);
    },
    onGetPhoneNumber(event) {
      this.triggerEvent('getphonenumber', event.detail);
    },
    onGetRealTimePhoneNumber(event) {
      this.triggerEvent('getrealtimephonenumber', event.detail);
    },
    onError(event) {
      this.triggerEvent('error', event.detail);
    },
    onLaunchApp(event) {
      this.triggerEvent('launchapp', event.detail);
    },
    onOpenSetting(event) {
      this.triggerEvent('opensetting', event.detail);
    },
    onChooseAvatar(event) {
      this.triggerEvent('chooseavatar', event.detail);
    }
  }
});

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canIUseAnimate: () => (/* binding */ canIUseAnimate),
/* harmony export */   canIUseCanvas2d: () => (/* binding */ canIUseCanvas2d),
/* harmony export */   canIUseFormFieldButton: () => (/* binding */ canIUseFormFieldButton),
/* harmony export */   canIUseGetUserProfile: () => (/* binding */ canIUseGetUserProfile),
/* harmony export */   canIUseGroupSetData: () => (/* binding */ canIUseGroupSetData),
/* harmony export */   canIUseModel: () => (/* binding */ canIUseModel),
/* harmony export */   canIUseNextTick: () => (/* binding */ canIUseNextTick),
/* harmony export */   getSystemInfoSync: () => (/* binding */ getSystemInfoSync)
/* harmony export */ });
let systemInfo;
function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }
  return systemInfo;
}
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
function gte(version) {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, version) >= 0;
}
function canIUseModel() {
  return gte('2.9.3');
}
function canIUseFormFieldButton() {
  return gte('2.10.3');
}
function canIUseAnimate() {
  return gte('2.9.0');
}
function canIUseGroupSetData() {
  return gte('2.4.0');
}
function canIUseNextTick() {
  try {
    return wx.canIUse('nextTick');
  } catch (e) {
    return gte('2.7.1');
  }
}
function canIUseCanvas2d() {
  return gte('2.9.0');
}
function canIUseGetUserProfile() {
  return !!wx.getUserProfile;
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _mixins_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _common_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



const mixins = [_mixins_button__WEBPACK_IMPORTED_MODULE_1__.button];
if ((0,_common_version__WEBPACK_IMPORTED_MODULE_2__.canIUseFormFieldButton)()) {
  mixins.push('wx://form-field-button');
}
(0,_common_component__WEBPACK_IMPORTED_MODULE_0__.VantComponent)({
  mixins,
  classes: ['hover-class', 'loading-class'],
  data: {
    baseStyle: ''
  },
  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular'
    },
    type: {
      type: String,
      value: 'default'
    },
    dataset: null,
    size: {
      type: String,
      value: 'normal'
    },
    loadingSize: {
      type: String,
      value: '20px'
    },
    color: String
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
      const {
        canIUseGetUserProfile,
        openType,
        getUserProfileDesc,
        lang
      } = this.data;
      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: getUserProfileDesc || '  ',
          lang: lang || 'en',
          complete: userProfile => {
            this.$emit('getuserinfo', userProfile);
          }
        });
      }
    }
  }
});
})();

/******/ })()
;