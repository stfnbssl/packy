(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["jssThemeReactor"] = factory();
    else
        root["jssThemeReactor"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if (installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/
            }
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// identity function for calling harmony imports with the correct context
        /******/ 	__webpack_require__.i = function (value) { return value; };
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function (exports, name, getter) {
            /******/ 		if (!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, {
                    /******/ 				configurable: false,
                    /******/ 				enumerable: true,
                    /******/ 				get: getter
                    /******/
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function (module) {
            /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/
        };
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 4);
        /******/
    })
    /************************************************************************/
    /******/([
    /* 0 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _isInBrowser = __webpack_require__(1);

        var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

        var js = ''; /**
              * Export javascript style and css style vendor prefixes.
              * Based on "transform" support test.
              */

        var css = '';

        // We should not do anything if required serverside.
        if (_isInBrowser2['default']) {
            // Order matters. We need to check Webkit the last one because
            // other vendors use to add Webkit prefixes to some properties
            var jsCssMap = {
                Moz: '-moz-',
                // IE did it wrong again ...
                ms: '-ms-',
                O: '-o-',
                Webkit: '-webkit-'
            };
            var style = document.createElement('p').style;
            var testProp = 'Transform';

            for (var key in jsCssMap) {
                if (key + testProp in style) {
                    js = key;
                    css = jsCssMap[key];
                    break;
                }
            }
        }

        /**
         * Vendor prefix string for the current browser.
         *
         * @type {{js: String, css: String}}
         * @api public
         */
        exports['default'] = { js: js, css: css };

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        var isBrowser = exports.isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

        exports.default = isBrowser;

        /***/
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        exports.createStyleManager = createStyleManager;

        var _jssVendorPrefixer2 = __webpack_require__(10);

        var _jssVendorPrefixer3 = _interopRequireDefault(_jssVendorPrefixer2);

        var _murmurhash3_gc = __webpack_require__(11);

        var _murmurhash3_gc2 = _interopRequireDefault(_murmurhash3_gc);

        var _utils = __webpack_require__(5);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length) ; i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        var _jssVendorPrefixer = (0, _jssVendorPrefixer3.default)(),
            onProcessStyle = _jssVendorPrefixer.onProcessStyle;

        /**
         * Creates a new styleManager
         */


        function createStyleManager() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                jss = _ref.jss,
                _ref$theme = _ref.theme,
                theme = _ref$theme === undefined ? {} : _ref$theme;

            if (!jss) {
                throw new Error('No JSS instance provided');
            }

            var sheetMap = [];
            var sheetOrder = void 0;

            // Register custom jss generateClassName function
            jss.options.generateClassName = generateClassName;

            var ruleCounter = 0;

            function generateClassName(rule, sheet) {
                var str = '';

                ruleCounter += 1;
                str = rule.name ? rule.name + '-tr-' + ruleCounter : 'tr-' + ruleCounter;

                // Simplify after next release with new method signature
                if (sheet && sheet.options.name) {
                    return sheet.options.name + '-' + str;
                }
                return str;
            }

            /**
             * styleManager
             */
            var styleManager = {
                get sheetMap() {
                    return sheetMap;
                },
                get sheetOrder() {
                    return sheetOrder;
                },
                setSheetOrder: setSheetOrder,
                jss: jss,
                theme: theme,
                render: render,
                reset: reset,
                rerender: rerender,
                getClasses: getClasses,
                updateTheme: updateTheme,
                prepareInline: prepareInline,
                sheetsToString: sheetsToString
            };

            updateTheme(theme, false);

            function render(styleSheet) {
                var index = getMappingIndex(styleSheet.name);

                if (index === -1) {
                    return renderNew(styleSheet);
                }

                var mapping = sheetMap[index];

                if (mapping.styleSheet !== styleSheet) {
                    jss.removeStyleSheet(sheetMap[index].jssStyleSheet);
                    sheetMap.splice(index, 1);

                    return renderNew(styleSheet);
                }

                return mapping.classes;
            }

            /**
             * Get classes for a given styleSheet object
             */
            function getClasses(styleSheet) {
                var mapping = (0, _utils.find)(sheetMap, { styleSheet: styleSheet });
                return mapping ? mapping.classes : null;
            }

            /**
             * @private
             */
            function renderNew(styleSheet) {
                var name = styleSheet.name,
                    createRules = styleSheet.createRules,
                    options = styleSheet.options;

                var sheetMeta = name + '-' + styleManager.theme.id;

                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object') {
                    var element = document.querySelector('style[data-jss][data-meta="' + sheetMeta + '"]');
                    if (element) {
                        options.element = element;
                    }
                }

                var rules = createRules(styleManager.theme);
                var jssOptions = _extends({
                    name: name,
                    meta: sheetMeta
                }, options);

                if (sheetOrder && !jssOptions.hasOwnProperty('index')) {
                    var index = sheetOrder.indexOf(name);
                    if (index === -1) {
                        jssOptions.index = sheetOrder.length;
                    } else {
                        jssOptions.index = index;
                    }
                }

                var jssStyleSheet = jss.createStyleSheet(rules, jssOptions);

                var _jssStyleSheet$attach = jssStyleSheet.attach(),
                    classes = _jssStyleSheet$attach.classes;

                sheetMap.push({ name: name, classes: classes, styleSheet: styleSheet, jssStyleSheet: jssStyleSheet });

                return classes;
            }

            /**
             * @private
             */
            function getMappingIndex(name) {
                var index = (0, _utils.findIndex)(sheetMap, function (obj) {
                    if (!obj.hasOwnProperty('name') || obj.name !== name) {
                        return false;
                    }

                    return true;
                });

                return index;
            }

            /**
             * Set DOM rendering order by sheet names.
             */
            function setSheetOrder(sheetNames) {
                sheetOrder = sheetNames;
            }

            /**
             * Replace the current theme with a new theme
             */
            function updateTheme(newTheme) {
                var shouldUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                styleManager.theme = newTheme;
                if (!styleManager.theme.id) {
                    styleManager.theme.id = (0, _murmurhash3_gc2.default)(JSON.stringify(styleManager.theme));
                }
                if (shouldUpdate) {
                    rerender();
                }
            }

            /**
             * Reset JSS registry, remove sheets and empty the styleManager.
             */
            function reset() {
                sheetMap.forEach(function (_ref2) {
                    var jssStyleSheet = _ref2.jssStyleSheet;
                    jssStyleSheet.detach();
                });
                sheetMap = [];
            }

            /**
             * Reset and update all existing stylesheets
             *
             * @memberOf module:styleManager~styleManager
             */
            function rerender() {
                var sheets = [].concat(_toConsumableArray(sheetMap));
                reset();
                sheets.forEach(function (n) {
                    render(n.styleSheet);
                });
            }

            /**
             * Prepare inline styles using Theme Reactor
             */
            function prepareInline(declaration) {
                if (typeof declaration === 'function') {
                    declaration = declaration(theme);
                }

                var rule = {
                    type: 'regular',
                    style: declaration
                };

                onProcessStyle(rule.style, rule);

                return rule.style;
            }

            /**
             * Render sheets to an HTML string
             */
            function sheetsToString() {
                return sheetMap.sort(function (a, b) {
                    if (a.jssStyleSheet.options.index < b.jssStyleSheet.options.index) {
                        return -1;
                    }
                    if (a.jssStyleSheet.options.index > b.jssStyleSheet.options.index) {
                        return 1;
                    }
                    return 0;
                }).map(function (sheet) {
                    return sheet.jssStyleSheet.toString();
                }).join('\n');
            }

            return styleManager;
        }

        /***/
    }),
    /* 3 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

        exports.createStyleSheet = createStyleSheet;
        function createStyleSheet(name, callback) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!options.insertionPoint) {
                options.insertionPoint = 'jss-theme-reactor';
            }

            var styleSheet = {
                name: name,
                options: options,
                createRules: createRules
            };

            function createRules() {
                var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var rules = typeof callback === 'function' ? callback(theme) : callback;

                if (!theme.overrides || !theme.overrides[name]) {
                    return rules;
                }

                var overrides = theme.overrides[name];
                var rulesWithOverrides = _extends({}, rules);

                Object.keys(overrides).forEach(function (n) {
                    rulesWithOverrides[n] = Object.assign(rulesWithOverrides[n] || {}, overrides[n]);
                });

                return rulesWithOverrides;
            }

            return styleSheet;
        }

        /***/
    }),
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _styleManager = __webpack_require__(2);

        Object.defineProperty(exports, 'createStyleManager', {
            enumerable: true,
            get: function get() {
                return _styleManager.createStyleManager;
            }
        });

        var _styleSheet = __webpack_require__(3);

        Object.defineProperty(exports, 'createStyleSheet', {
            enumerable: true,
            get: function get() {
                return _styleSheet.createStyleSheet;
            }
        });

        /***/
    }),
    /* 5 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        exports.transform = transform;
        exports.find = find;
        exports.findIndex = findIndex;
        exports.contains = contains;

        /* eslint-disable no-bitwise, no-plusplus */

        function transform(obj, iteratee, accumulator) {
            Object.keys(obj).forEach(function (key) {
                iteratee(accumulator, obj[key], key);
            });
            return accumulator;
        }

        function find(arr, pred) {
            var index = findIndex(arr, pred);
            return index > -1 ? arr[index] : undefined;
        }

        function findIndex(arr, pred) {
            var predType = typeof pred === 'undefined' ? 'undefined' : _typeof(pred);
            for (var i = 0; i < arr.length; i++) {
                if (predType === 'function' && pred(arr[i], i, arr) === true) {
                    return i;
                }
                if (predType === 'object' && contains(arr[i], pred)) {
                    return i;
                }
                if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
                    return arr.indexOf(pred);
                }
            }
            return -1;
        }

        function contains(obj, pred) {
            for (var _key in pred) {
                if (!obj.hasOwnProperty(_key) || obj[_key] !== pred[_key]) {
                    return false;
                }
            }
            return true;
        }

        /***/
    }),
    /* 6 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports['default'] = camelize;
        var regExp = /[-\s]+(.)?/g;

        /**
         * Convert dash separated strings to camel cased.
         *
         * @param {String} str
         * @return {String}
         */
        function camelize(str) {
            return str.replace(regExp, toUpper);
        }

        function toUpper(match, c) {
            return c ? c.toUpperCase() : '';
        }

        /***/
    }),
    /* 7 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.supportedValue = exports.supportedProperty = exports.prefix = undefined;

        var _prefix = __webpack_require__(0);

        var _prefix2 = _interopRequireDefault(_prefix);

        var _supportedProperty = __webpack_require__(8);

        var _supportedProperty2 = _interopRequireDefault(_supportedProperty);

        var _supportedValue = __webpack_require__(9);

        var _supportedValue2 = _interopRequireDefault(_supportedValue);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

        exports['default'] = {
            prefix: _prefix2['default'],
            supportedProperty: _supportedProperty2['default'],
            supportedValue: _supportedValue2['default']
        }; /**
    * CSS Vendor prefix detection and property feature testing.
    *
    * @copyright Oleg Slobodskoi 2015
    * @website https://github.com/jsstyles/css-vendor
    * @license MIT
    */

        exports.prefix = _prefix2['default'];
        exports.supportedProperty = _supportedProperty2['default'];
        exports.supportedValue = _supportedValue2['default'];

        /***/
    }),
    /* 8 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports['default'] = supportedProperty;

        var _isInBrowser = __webpack_require__(1);

        var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

        var _prefix = __webpack_require__(0);

        var _prefix2 = _interopRequireDefault(_prefix);

        var _camelize = __webpack_require__(6);

        var _camelize2 = _interopRequireDefault(_camelize);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

        var el = void 0;
        var cache = {};

        if (_isInBrowser2['default']) {
            el = document.createElement('p');

            /**
             * We test every property on vendor prefix requirement.
             * Once tested, result is cached. It gives us up to 70% perf boost.
             * http://jsperf.com/element-style-object-access-vs-plain-object
             *
             * Prefill cache with known css properties to reduce amount of
             * properties we need to feature test at runtime.
             * http://davidwalsh.name/vendor-prefix
             */
            var computed = window.getComputedStyle(document.documentElement, '');
            for (var key in computed) {
                if (!isNaN(key)) cache[computed[key]] = computed[key];
            }
        }

        /**
         * Test if a property is supported, returns supported property with vendor
         * prefix if required. Returns `false` if not supported.
         *
         * @param {String} prop dash separated
         * @return {String|Boolean}
         * @api public
         */
        function supportedProperty(prop) {
            // For server-side rendering.
            if (!el) return prop;

            // We have not tested this prop yet, lets do the test.
            if (cache[prop] != null) return cache[prop];

            // Camelization is required because we can't test using
            // css syntax for e.g. in FF.
            // Test if property is supported as it is.
            if ((0, _camelize2['default'])(prop) in el.style) {
                cache[prop] = prop;
            }
                // Test if property is supported with vendor prefix.
            else if (_prefix2['default'].js + (0, _camelize2['default'])('-' + prop) in el.style) {
                cache[prop] = _prefix2['default'].css + prop;
            } else {
                cache[prop] = false;
            }

            return cache[prop];
        }

        /***/
    }),
    /* 9 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports['default'] = supportedValue;

        var _isInBrowser = __webpack_require__(1);

        var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

        var _prefix = __webpack_require__(0);

        var _prefix2 = _interopRequireDefault(_prefix);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

        var cache = {};
        var el = void 0;

        if (_isInBrowser2['default']) el = document.createElement('p');

        /**
         * Returns prefixed value if needed. Returns `false` if value is not supported.
         *
         * @param {String} property
         * @param {String} value
         * @return {String|Boolean}
         * @api public
         */
        function supportedValue(property, value) {
            // For server-side rendering.
            if (!el) return value;

            // It is a string or a number as a string like '1'.
            // We want only prefixable values here.
            if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value;

            var cacheKey = property + value;

            if (cache[cacheKey] != null) return cache[cacheKey];

            // IE can even throw an error in some cases, for e.g. style.content = 'bar'
            try {
                // Test value as it is.
                el.style[property] = value;
            } catch (err) {
                cache[cacheKey] = false;
                return false;
            }

            // Value is supported as it is.
            if (el.style[property] !== '') {
                cache[cacheKey] = value;
            } else {
                // Test value with vendor prefix.
                value = _prefix2['default'].css + value;

                // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
                if (value === '-ms-flex') value = '-ms-flexbox';

                el.style[property] = value;

                // Value is supported with vendor prefix.
                if (el.style[property] !== '') cache[cacheKey] = value;
            }

            if (!cache[cacheKey]) cache[cacheKey] = false;

            // Reset style value.
            el.style[property] = '';

            return cache[cacheKey];
        }

        /***/
    }),
    /* 10 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports['default'] = jssVendorPrefixer;

        var _cssVendor = __webpack_require__(7);

        var vendor = _interopRequireWildcard(_cssVendor);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

        /**
         * Add vendor prefix to a property name when needed.
         *
         * @param {Rule} rule
         * @api public
         */
        function jssVendorPrefixer() {
            function onProcessRule(rule) {
                if (rule.type === 'keyframe') {
                    rule.selector = '@' + vendor.prefix.css + rule.selector.substr(1);
                }
            }

            function onProcessStyle(style, rule) {
                if (rule.type !== 'regular') return style;

                for (var prop in style) {
                    var value = style[prop];

                    var changeProp = false;
                    var supportedProp = vendor.supportedProperty(prop);
                    if (supportedProp && supportedProp !== prop) changeProp = true;

                    var changeValue = false;
                    var supportedValue = vendor.supportedValue(supportedProp, value);
                    if (supportedValue && supportedValue !== value) changeValue = true;

                    if (changeProp || changeValue) {
                        if (changeProp) delete style[prop];
                        style[supportedProp || prop] = supportedValue || value;
                    }
                }

                return style;
            }

            function onChangeValue(value, prop) {
                return vendor.supportedValue(prop, value);
            }

            return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
        }

        /***/
    }),
    /* 11 */
    /***/ (function (module, exports, __webpack_require__) {

        /**
         * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
         * 
         * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
         * @see http://github.com/garycourt/murmurhash-js
         * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
         * @see http://sites.google.com/site/murmurhash/
         * 
         * @param {string} key ASCII only
         * @param {number} seed Positive integer only
         * @return {number} 32-bit positive integer hash 
         */

        function murmurhash3_32_gc(key, seed) {
            var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

            remainder = key.length & 3; // key.length % 4
            bytes = key.length - remainder;
            h1 = seed;
            c1 = 0xcc9e2d51;
            c2 = 0x1b873593;
            i = 0;

            while (i < bytes) {
                k1 =
                  ((key.charCodeAt(i) & 0xff)) |
                  ((key.charCodeAt(++i) & 0xff) << 8) |
                  ((key.charCodeAt(++i) & 0xff) << 16) |
                  ((key.charCodeAt(++i) & 0xff) << 24);
                ++i;

                k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
                h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
            }

            k1 = 0;

            switch (remainder) {
                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                case 1: k1 ^= (key.charCodeAt(i) & 0xff);

                    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                    k1 = (k1 << 15) | (k1 >>> 17);
                    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                    h1 ^= k1;
            }

            h1 ^= key.length;

            h1 ^= h1 >>> 16;
            h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= h1 >>> 16;

            return h1 >>> 0;
        }

        if (true) {
            module.exports = murmurhash3_32_gc
        }

        /***/
    })
    /******/]);
});