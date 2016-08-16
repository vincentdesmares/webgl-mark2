/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n__webpack_require__(4);\n\nvar _aframeSingleJellyfish = __webpack_require__(7);\n\nvar _aframeSingleJellyfish2 = _interopRequireDefault(_aframeSingleJellyfish);\n\nvar _aframeInstancedJellyfish = __webpack_require__(25);\n\nvar _aframeInstancedJellyfish2 = _interopRequireDefault(_aframeInstancedJellyfish);\n\nvar _aframeGradient = __webpack_require__(26);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nAFRAME.registerComponent(\"single-jellyfish\", _aframeSingleJellyfish2.default);\nAFRAME.registerComponent(\"instanced-jellyfish\", _aframeInstancedJellyfish2.default);\nAFRAME.registerComponent(\"gradient\", _aframeGradient.gradient);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/aframe/aframe-register.js\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/jellyfish/aframe/aframe-register.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar MAX_NUMBER = exports.MAX_NUMBER = 1000;\nvar WIDTH = exports.WIDTH = 5;\nvar CAMERA = exports.CAMERA = { ANGLE: 100, NEAR: 0.1, FAR: 120 }; // NEAR < 1.4 (<sqrt2) if we want to see the gradient\nvar USE_FOG = exports.USE_FOG = false; // If set to true and Webgl, don't forget to bind the uniforms\nvar UPDATE_FPS_RATE = exports.UPDATE_FPS_RATE = 5000;\nvar SCALE = exports.SCALE = { x: 5, y: 5, z: 5 };\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/data/const.js\n ** module id = 1\n ** module chunks = 0 1 2 3\n **/\n//# sourceURL=webpack:///./src/data/const.js?");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;\nvar apply = Function.prototype.apply;\nvar slice = Array.prototype.slice;\nvar immediateIds = {};\nvar nextImmediateId = 0;\n\n// DOM APIs, for completeness\n\nexports.setTimeout = function() {\n  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);\n};\nexports.setInterval = function() {\n  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);\n};\nexports.clearTimeout =\nexports.clearInterval = function(timeout) { timeout.close(); };\n\nfunction Timeout(id, clearFn) {\n  this._id = id;\n  this._clearFn = clearFn;\n}\nTimeout.prototype.unref = Timeout.prototype.ref = function() {};\nTimeout.prototype.close = function() {\n  this._clearFn.call(window, this._id);\n};\n\n// Does not start the time, just sets up the members needed.\nexports.enroll = function(item, msecs) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = msecs;\n};\n\nexports.unenroll = function(item) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = -1;\n};\n\nexports._unrefActive = exports.active = function(item) {\n  clearTimeout(item._idleTimeoutId);\n\n  var msecs = item._idleTimeout;\n  if (msecs >= 0) {\n    item._idleTimeoutId = setTimeout(function onTimeout() {\n      if (item._onTimeout)\n        item._onTimeout();\n    }, msecs);\n  }\n};\n\n// That's not how node.js implements it but the exposed api is the same.\nexports.setImmediate = typeof setImmediate === \"function\" ? setImmediate : function(fn) {\n  var id = nextImmediateId++;\n  var args = arguments.length < 2 ? false : slice.call(arguments, 1);\n\n  immediateIds[id] = true;\n\n  nextTick(function onNextTick() {\n    if (immediateIds[id]) {\n      // fn.call() is faster so we optimize for the common use-case\n      // @see http://jsperf.com/call-apply-segu\n      if (args) {\n        fn.apply(null, args);\n      } else {\n        fn.call(null);\n      }\n      // Prevent ids from leaking\n      exports.clearImmediate(id);\n    }\n  });\n\n  return id;\n};\n\nexports.clearImmediate = typeof clearImmediate === \"function\" ? clearImmediate : function(id) {\n  delete immediateIds[id];\n};\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))\n\n/*****************\n ** WEBPACK FOOTER\n ** (webpack)/~/node-libs-browser/~/timers-browserify/main.js\n ** module id = 5\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///(webpack)/~/node-libs-browser/~/timers-browserify/main.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\n(function () {\n    try {\n        cachedSetTimeout = setTimeout;\n    } catch (e) {\n        cachedSetTimeout = function () {\n            throw new Error('setTimeout is not defined');\n        }\n    }\n    try {\n        cachedClearTimeout = clearTimeout;\n    } catch (e) {\n        cachedClearTimeout = function () {\n            throw new Error('clearTimeout is not defined');\n        }\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n/*****************\n ** WEBPACK FOOTER\n ** (webpack)/~/node-libs-browser/~/process/browser.js\n ** module id = 6\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///(webpack)/~/node-libs-browser/~/process/browser.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _aframeAbstractJellyfish = __webpack_require__(8);\n\nvar _aframeAbstractJellyfish2 = _interopRequireDefault(_aframeAbstractJellyfish);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/** The single jellyfish object, that \"extends\" the abstract jellyfish object */\nvar singleJellyfish = {};\nObject.assign(singleJellyfish, _aframeAbstractJellyfish2.default);\n\nsingleJellyfish.createGeometry = function () {\n\treturn new THREE.BufferGeometry();\n};\n\nexports.default = singleJellyfish;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/aframe/aframe-single-jellyfish.js\n ** module id = 7\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/jellyfish/aframe/aframe-single-jellyfish.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _timer = __webpack_require__(9);\n\nvar _timer2 = _interopRequireDefault(_timer);\n\nvar _util = __webpack_require__(10);\n\nvar _const = __webpack_require__(1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/** The abstract jellyfish object. */\nvar abstractJellyfish = {\n  schema: {\n    count: { type: 'int', default: 3 },\n    position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }\n  },\n  /**\r\n   * The init function of the component (as defined in AFRAME docs)\r\n   * Load all the attributes, the shaders and images for the jellyfish\r\n   */\n  init: function init() {\n    this.timer = new _timer2.default();\n    var jellyfish = {\n      shaders: { VS: __webpack_require__(17), FS: __webpack_require__(18) },\n      position: __webpack_require__(19),\n      normal: __webpack_require__(20),\n      texture: __webpack_require__(21),\n      color: __webpack_require__(22),\n      index: __webpack_require__(23)\n    };\n\n    this.textures = (0, _util.getTexturesJellyfish)(__webpack_require__(24));\n\n    this.setMesh(jellyfish);\n  },\n  update: function update() {\n    this.el.getObject3D('mesh', THREE.Mesh).geometry.maxInstancedCount = this.data.count;\n  },\n\n  /**\r\n   * The tick function of the component (as defined in AFRAME docs)\r\n   * Moves the jellyfish between two frames.\r\n   * @param {double} time\r\n   * @param {double} delta\r\n   */\n  tick: function tick(time, delta) {\n    this.timer.updateTime();\n    this.timer.rotation += 2.0 * delta / 1000.0;\n\n    var mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);\n\n    if (mesh.material.uniforms) {\n      mesh.material.uniforms.uCurrentTime.value = time / 1000.0;\n      mesh.material.uniforms.uSampler1.value = this.textures[Math.floor(time / 1000.0 * 30 % 32) + 1];\n      mesh.position.setX(this.data.position.x);\n      mesh.position.setY(this.data.position.y);\n      mesh.position.setZ(this.data.position.z);\n      mesh.rotation.x = 0;\n      mesh.rotation.y = 0;\n      mesh.rotation.z = 0;\n\n      mesh.translateY(+5.0);\n      mesh.translateZ(-75.0);\n      mesh.rotateY(Math.PI / 180 * (Math.sin(this.timer.rotation / 10.0) * 30.0));\n      mesh.rotateX(Math.PI / 180 * (Math.sin(this.timer.rotation / 20.0) * 30.0));\n      mesh.translateY(Math.sin(this.timer.rotation / 10.0) * 2.5 * _const.SCALE.y);\n    }\n  },\n\n  /**\r\n   * The remove function of the component (as defined in AFRAME docs)\r\n   * Reset the mesh of the\r\n   */\n  remove: function remove() {\n    //this.el.getOrCreateObject3D('mesh',THREE.Mesh) = THREE.Mesh;\n    //this.el.getObject3D(\"mesh\").geometry = new THREE.Geometry(); \n    //this.el.setObject3D('mesh',mesh);\n  },\n\n  /**\r\n   * The setMesh function. Hand-made.\r\n   * Create and set the Mesh corresponding to the single-jellyfish or instanced-jellyfish component.\r\n   * @param {Object} jellyfish - An object containing the necessary data for a jellyfish.\r\n   */\n  setMesh: function setMesh(jellyfish) {\n    var geometry = this.createGeometry();\n\n    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(jellyfish.position), 3));\n    geometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(jellyfish.normal), 3));\n    geometry.addAttribute('texture', new THREE.BufferAttribute(new Float32Array(jellyfish.texture), 3));\n    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(jellyfish.color), 3));\n    this.addOffsetAttribute(geometry); // Only effective for instanced jellyfish\n    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(jellyfish.index), 1));\n\n    var material = new THREE.ShaderMaterial({\n      vertexShader: jellyfish.shaders.VS,\n      fragmentShader: jellyfish.shaders.FS,\n      side: THREE.DoubleSide,\n      depthTest: false,\n      transparent: true,\n      defines: { THREE_JS: true },\n      uniforms: {\n        uSampler: { type: \"t\", value: this.textures[0] },\n        uSampler1: { type: \"t\", value: this.textures[1] },\n        uLightPos: { value: new THREE.Vector3(10.0, 40.0, -60.0) },\n        uLightRadius: { value: 200.0 },\n        uLightCol: { value: new THREE.Vector4(0.8, 1.3, 1.1, 1.0) },\n        uAmbientCol: { value: new THREE.Vector4(0.3, 0.2, 1.0, 1.0) },\n        uFresnelCol: { value: new THREE.Vector4(0.8, 0.7, 0.6, 1.1) },\n        uFresnelPower: { value: 1.0 },\n        uCurrentTime: { value: 0.0 }\n      }\n    });\n    this.modifyMaterial(material); // Only effective for instanced jellyfish\n\n    var mesh = new THREE.Mesh(geometry, material);\n    mesh.scale.set(_const.SCALE.x, _const.SCALE.y, _const.SCALE.z);\n    this.el.setObject3D('mesh', mesh);\n  },\n\n  /**\r\n   * The createGeometry function, to override\r\n   * @return {Object} - an instance of THREE.Geometry\r\n   */\n  createGeometry: function createGeometry() {\n    throw \"This function has to be overridden\";\n  },\n\n  /**\r\n   * The addOffsetAttribute function.\r\n   * Will only be overridden by the InstancedJellyfish to add the missing attribute.\r\n   */\n  addOffsetAttribute: function addOffsetAttribute() {},\n\n  /**\r\n   * The modifyMaterial function.\r\n   * Will only be overridden by the InstancedJellyfish to modify the shader.\r\n   */\n  modifyMaterial: function modifyMaterial() {}\n};\n\nexports.default = abstractJellyfish;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/aframe/aframe-abstract-jellyfish.js\n ** module id = 8\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/jellyfish/aframe/aframe-abstract-jellyfish.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _const = __webpack_require__(1);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/** Class representing a timer. */\nvar Timer = function () {\n  function Timer() {\n    _classCallCheck(this, Timer);\n\n    this.rotation = 0;\n    this.lastUpdateTime = this.startTime = new Date().getTime();\n    this.countForFPS = 0;\n    this.averageFPS = \"Wait for FPS update\";\n  }\n\n  _createClass(Timer, [{\n    key: \"updateTime\",\n    value: function updateTime() {\n      this.now = new Date().getTime(); // We are here in ms\n      this.elapsedTime = this.now - this.lastUpdateTime;\n      this.lastUpdateTime = this.now;\n\n      // Display the time only every 200 FPS - otherwise, the influence is not negligible.\n      // Using gui.dat from Google for the nice interface doesn't impact performance since\n      // We manually refresh the FPS at our desired rate (every 500 frames, for instance)...\n\n      if (this.countForFPS++ == _const.UPDATE_FPS_RATE) {\n        this.endTime = this.now;\n        this.countForFPS = 0;\n        this.averageFPS = (_const.UPDATE_FPS_RATE * 1000 / (this.endTime - this.startTime)).toPrecision(4);\n\n        var parent = document.getElementById(\"averageFPS\");\n        parent.removeChild(parent.children[0]);\n        var input = document.createElement(\"input\");\n        input.setAttribute(\"type\", \"text\");\n        input.setAttribute(\"value\", this.averageFPS);\n        parent.appendChild(input);\n\n        this.startTime = this.endTime;\n      }\n    }\n  }]);\n\n  return Timer;\n}();\n\nexports.default = Timer;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/timer.js\n ** module id = 9\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/jellyfish/timer.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getNewCanvas = __webpack_require__(11);\n\nObject.defineProperty(exports, 'getNewCanvas', {\n  enumerable: true,\n  get: function get() {\n    return _getNewCanvas.getNewCanvas;\n  }\n});\n\nvar _getTextAndImages = __webpack_require__(12);\n\nObject.defineProperty(exports, 'getText', {\n  enumerable: true,\n  get: function get() {\n    return _getTextAndImages.getText;\n  }\n});\nObject.defineProperty(exports, 'getImages', {\n  enumerable: true,\n  get: function get() {\n    return _getTextAndImages.getImages;\n  }\n});\n\nvar _addDefines = __webpack_require__(13);\n\nObject.defineProperty(exports, 'addDefines', {\n  enumerable: true,\n  get: function get() {\n    return _addDefines.addDefines;\n  }\n});\n\nvar _createTexture = __webpack_require__(14);\n\nObject.defineProperty(exports, 'createTexture', {\n  enumerable: true,\n  get: function get() {\n    return _createTexture.createTexture;\n  }\n});\nObject.defineProperty(exports, 'getTexturesJellyfish', {\n  enumerable: true,\n  get: function get() {\n    return _createTexture.getTexturesJellyfish;\n  }\n});\n\nvar _createProgramFromShaders = __webpack_require__(16);\n\nObject.defineProperty(exports, 'createProgramFromShaders', {\n  enumerable: true,\n  get: function get() {\n    return _createProgramFromShaders.createProgramFromShaders;\n  }\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/util.js\n ** module id = 10\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/util.js?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.getNewCanvas = getNewCanvas;\n/**\n  * The getNewCanvas function\n  * @param {object} canvas_container - A container that will append the future canvas.\n  * @return {object} canvas - A newly created canvas.\n  */\nfunction getNewCanvas(canvas_container) {\n\twhile (canvas_container.firstChild) {\n\t\tcanvas_container.removeChild(canvas_container.firstChild);\n\t}\n\tvar canvas = document.createElement('canvas');\n\tcanvas.setAttribute('id', 'canvas_webgl');\n\tcanvas_container.appendChild(canvas);\n\treturn canvas;\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/getNewCanvas.js\n ** module id = 11\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/getNewCanvas.js?");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getText = getText;\nexports.getImages = getImages;\n/**\n  * The getText function\n  * @param {string} url - The url of the text to load.\n  * @return {Promise} - A promise of the loaded text.\n  */\nfunction getText(url) {\n  return new Promise(function (resolve, reject) {\n    var request = new XMLHttpRequest();\n    request.open('GET', url, true);\n    request.onload = function () {\n      if (request.status < 200 || request.status > 299) {\n        reject('Error: HTTP Status ' + request.status + ' on resource ' + url);\n      } else {\n        resolve(request.responseText);\n      }\n    };\n    request.send();\n  });\n};\n\n/**\n  * The getImages function\n  * @param {Array} list - An array of strings for the locations of the images.\n  * @return {Array} - A array of promises for this web loaded images.\n  */\nfunction getImages(list) {\n  return Promise.all(list.map(function (url) {\n    return getImage(url);\n  }));\n  function getImage(url) {\n    return new Promise(function (resolve, reject) {\n      var image = new Image();\n      image.onload = function () {\n        return resolve(image);\n      };\n      image.src = url;\n    });\n  }\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/getTextAndImages.js\n ** module id = 12\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/getTextAndImages.js?");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.addDefines = addDefines;\n/**\n  * The addDefines function - inspried from Three.js\n  * @param {string} shader - The input shader that needs to be added some define.\n  * @param {object} defines - An object of {name:value} that we want to be defined in the shader.\n  * @return {string} shader - The modified shader with the #define.\n  */\nfunction addDefines(shader, defines) {\n  var chunks = [];\n  for (var name in defines) {\n    var value = defines[name];\n    if (value === false) continue;\n    chunks.push('#define ' + name + ' ' + value);\n  }\n  chunks = chunks.join('\\n');\n  return chunks + '\\n' + shader;\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/addDefines.js\n ** module id = 13\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/addDefines.js?");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createTexture = createTexture;\nexports.getTexturesJellyfish = getTexturesJellyfish;\n\nvar _three = __webpack_require__(15);\n\nvar _three2 = _interopRequireDefault(_three);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n  * The createTexture function\n  * @param {Array} images - An array of web loaded images.\n  * @param {WebGLRenderingContext} GL - The webgl rendering context.\n  * @return {Array} - An array of WebGLTexture objects.\n  */\n\nfunction createTexture(images, GL) {\n  return images.map(function (img, i) {\n    var texture = GL.createTexture();\n    GL.bindTexture(GL.TEXTURE_2D, texture);\n    GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);\n    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, i > 0 ? GL.REPEAT : GL.CLAMP_TO_EDGE);\n    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, i > 0 ? GL.REPEAT : GL.CLAMP_TO_EDGE);\n    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);\n    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);\n    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, img);\n    GL.bindTexture(GL.TEXTURE_2D, null);\n    return texture;\n  });\n}\n\n/**\n  * The getTexturesJellyfish function\n  * @param {Array} list - An array of strings for the locations of the images.\n  * @return {Array} - The loaded texture.\n  */\nfunction getTexturesJellyfish(imagesList) {\n  var loader = new _three2.default.TextureLoader();\n  return imagesList.map(function (url, i) {\n    return loader.load(url, function (texture) {\n      texture.minFilter = _three2.default.LinearFilter;\n      texture.magFilter = _three2.default.LinearFilter;\n      texture.wrapS = i > 0 ? _three2.default.RepeatWrapping : _three2.default.ClampToEdgeWrapping;\n      texture.wrapT = i > 0 ? _three2.default.RepeatWrapping : _three2.default.ClampToEdgeWrapping;\n      return texture;\n    });\n  });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/createTexture.js\n ** module id = 14\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/createTexture.js?");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {


/***/ },
/* 16 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.createProgramFromShaders = createProgramFromShaders;\n/**\n  * The createProgramFromShaders function\n  * @param {WebGLRenderingContext} GL - The webgl rendering context.\n  * @param {Object} shaders - Object containing both a vertex and a fragment shader.\n  * @param {string} shaders.VS - The vertex shader.\n  * @param {string} shaders.FS - The fragment shader.\n  */\nfunction createProgramFromShaders(GL, shaders) {\n    var vertexShader = GL.createShader(GL.VERTEX_SHADER);\n    GL.shaderSource(vertexShader, shaders.VS);\n    GL.compileShader(vertexShader);\n\n    if (!GL.getShaderParameter(vertexShader, GL.COMPILE_STATUS)) {\n        console.log(GL.getShaderInfoLog(vertexShader));\n        return null;\n    }\n\n    var fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);\n    GL.shaderSource(fragmentShader, shaders.FS);\n    GL.compileShader(fragmentShader);\n\n    if (!GL.getShaderParameter(fragmentShader, GL.COMPILE_STATUS)) {\n        console.log(GL.getShaderInfoLog(fragmentShader));\n        return null;\n    }\n\n    var shaderProgram = GL.createProgram();\n    GL.attachShader(shaderProgram, vertexShader);\n    GL.attachShader(shaderProgram, fragmentShader);\n\n    GL.linkProgram(shaderProgram);\n\n    if (!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)) {\n        var info = GL.getProgramInfoLog(shaderProgram);\n        throw \"Could not compile WebGL program. \\n\\n\" + info;\n    }\n    return shaderProgram;\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util/createProgramFromShaders.js\n ** module id = 16\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/util/createProgramFromShaders.js?");

/***/ },
/* 17 */
/***/ function(module, exports) {

	eval("module.exports = \"#ifndef THREE_JS\\nattribute vec3 position;\\nattribute vec3 normal;\\n#endif\\n\\nattribute vec3 color;\\nattribute vec3 texture;\\n#ifdef USE_INSTANCED\\n    attribute vec3 offset;\\n#endif\\n\\n#ifndef THREE_JS\\nuniform mat4 modelMatrix;// uWorld -> modelMatrix\\nuniform mat4 modelViewMatrix;// -> projectionMatrix * modelViewMatrix\\nuniform mat4 projectionMatrix; // -> projectionMatrix * modelViewMatrix\\nuniform mat4 normalMatrix; // -> normalMatrix\\n#endif\\n\\nuniform vec3 uLightPos;\\nuniform float uLightRadius;\\nuniform vec4 uLightCol;\\nuniform vec4 uAmbientCol;\\nuniform vec4 uFresnelCol;\\nuniform float uFresnelPower;\\nuniform float uCurrentTime;\\n\\nvarying vec2 vTextureCoord;\\nvarying vec4 vWorld;\\nvarying vec3 vDiffuse;\\nvarying vec3 vAmbient;\\nvarying vec3 vFresnel;\\n  \\nvoid main(void)\\n{ \\n    #ifndef USE_INSTANCED\\n        vec3 offset = vec3(0.);\\n    #endif\\n    //Vertex Animation\\n    float speed = uCurrentTime / 15.0;\\n    float localoffset = smoothstep(0.0, 1.0, max(0.0, -position.y-0.8) / 10.0);\\n    vec3 pos = position + offset +\\n        color / 12.0 *\\n        sin(speed * 15.0 + position.y / 2.0) * (1.0 - localoffset);\\n    pos = pos + color / 8.0 *\\n        sin(speed * 30.0 + position.y / 0.5) * (1.0 - localoffset);\\n    vec4 pos4 = vec4(pos, 1.0);\\n    gl_Position = projectionMatrix * modelViewMatrix * pos4; \\n\\n    vWorld = modelMatrix * pos4;\\n    #ifndef THREE_JS\\n    vec3 vVertexNormal = normalize(normalMatrix * vec4(normal.xyz,1.0)).xyz;\\n    #else\\n    vec3 vVertexNormal = normalize(normalMatrix * normal);\\n    #endif\\n\\n    //diffuse\\n    vec3 lightDir = normalize(uLightPos - vWorld.xyz);\\n    float diffuseProduct = max(dot(normalize(vVertexNormal.xyz), lightDir), 0.0);\\n    float lightFalloff = pow(max(1.0-(distance(uLightPos, vWorld.xyz)/uLightRadius), 0.0),2.0);\\n    vDiffuse = uLightCol.rgb * vec3(diffuseProduct * lightFalloff * uLightCol.a);\\n\\n    //ambient (top)\\n    vAmbient = uAmbientCol.rgb * vec3(uAmbientCol.a) * vVertexNormal.y;\\n\\n    //fresnel\\n    vec4 worldPos = modelMatrix * pos4;\\n    vec3 vWorldEyeVec = normalize(worldPos.xyz/worldPos.w); \\n    float fresnelProduct = pow(abs(1.0 - max(abs(dot(vVertexNormal, -vWorldEyeVec)), 0.0)), uFresnelPower);\\n    vFresnel = uFresnelCol.rgb * vec3(uFresnelCol.a * fresnelProduct);\\n\\n    // texcoord\\n    vTextureCoord = texture.xy;\\n}\"\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/shaders/jellyfish/jellyfish.vert\n ** module id = 17\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/shaders/jellyfish/jellyfish.vert?");

/***/ },
/* 18 */
/***/ function(module, exports) {

	eval("module.exports = \"precision highp float;\\n\\nuniform sampler2D uSampler;\\nuniform sampler2D uSampler1;\\nuniform float uCurrentTime;\\n\\nvarying vec2 vTextureCoord;\\nvarying vec4 vWorld;\\nvarying vec3 vDiffuse;\\nvarying vec3 vAmbient;\\nvarying vec3 vFresnel;\\n\\n#ifdef USE_FOG\\n\\tuniform vec3 fogColor;\\n\\t#ifdef FOG_EXP2\\n\\t\\tuniform float fogDensity;\\n\\t#else\\n\\t\\tuniform float fogNear;\\n\\t\\tuniform float fogFar;\\n\\t#endif\\n#endif\\n\\nvoid main(void)\\n{\\n    vec4 caustics = texture2D(uSampler1, vec2(vWorld.x / 24.0 + uCurrentTime / 20.0, (vWorld.z - vWorld.y)/48.0 + uCurrentTime / 40.0));\\n    vec4 colorMap = texture2D(uSampler, vTextureCoord);\\n    float transparency = colorMap.a + pow(vFresnel.r, 2.0) - 0.3;\\n    gl_FragColor = vec4(((vAmbient + vDiffuse + caustics.rgb) * colorMap.rgb), transparency);\\n\\n    #ifdef USE_FOG\\n\\t\\t#ifdef USE_LOGDEPTHBUF_EXT\\n\\t\\t\\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\\n\\t\\t#else\\n\\t\\t\\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\\n\\t\\t#endif\\n\\t\\t#ifdef FOG_EXP2\\n\\t\\t\\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\\n\\t\\t#else\\n\\t\\t\\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\\n\\t\\t#endif\\n\\t\\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\\n\\t#endif\\n}\\n\"\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/shaders/jellyfish/jellyfish.frag\n ** module id = 18\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/shaders/jellyfish/jellyfish.frag?");

/***/ },
/* 19 */
/***/ function(module, exports) {


/***/ },
/* 20 */
/***/ function(module, exports) {


/***/ },
/* 21 */
/***/ function(module, exports) {


/***/ },
/* 22 */
/***/ function(module, exports) {


/***/ },
/* 23 */
/***/ function(module, exports) {


/***/ },
/* 24 */
/***/ function(module, exports) {

	eval("module.exports = [\n\t\"./data/img/jellyfish256White.bmp\",\n\t\"./data/img/jellyfish-caustics-01.bmp\",\n\t\"./data/img/jellyfish-caustics-02.bmp\",\n\t\"./data/img/jellyfish-caustics-03.bmp\",\n\t\"./data/img/jellyfish-caustics-04.bmp\",\n\t\"./data/img/jellyfish-caustics-05.bmp\",\n\t\"./data/img/jellyfish-caustics-06.bmp\",\n\t\"./data/img/jellyfish-caustics-07.bmp\",\n\t\"./data/img/jellyfish-caustics-08.bmp\",\n\t\"./data/img/jellyfish-caustics-09.bmp\",\n\t\"./data/img/jellyfish-caustics-10.bmp\",\n\t\"./data/img/jellyfish-caustics-11.bmp\",\n\t\"./data/img/jellyfish-caustics-12.bmp\",\n\t\"./data/img/jellyfish-caustics-13.bmp\",\n\t\"./data/img/jellyfish-caustics-14.bmp\",\n\t\"./data/img/jellyfish-caustics-15.bmp\",\n\t\"./data/img/jellyfish-caustics-16.bmp\",\n\t\"./data/img/jellyfish-caustics-17.bmp\",\n\t\"./data/img/jellyfish-caustics-18.bmp\",\n\t\"./data/img/jellyfish-caustics-19.bmp\",\n\t\"./data/img/jellyfish-caustics-20.bmp\",\n\t\"./data/img/jellyfish-caustics-21.bmp\",\n\t\"./data/img/jellyfish-caustics-22.bmp\",\n\t\"./data/img/jellyfish-caustics-23.bmp\",\n\t\"./data/img/jellyfish-caustics-24.bmp\",\n\t\"./data/img/jellyfish-caustics-25.bmp\",\n\t\"./data/img/jellyfish-caustics-26.bmp\",\n\t\"./data/img/jellyfish-caustics-27.bmp\",\n\t\"./data/img/jellyfish-caustics-28.bmp\",\n\t\"./data/img/jellyfish-caustics-29.bmp\",\n\t\"./data/img/jellyfish-caustics-30.bmp\",\n\t\"./data/img/jellyfish-caustics-31.bmp\",\n\t\"./data/img/jellyfish-caustics-32.bmp\"\n];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/data/img/list.json\n ** module id = 24\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/data/img/list.json?");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _aframeAbstractJellyfish = __webpack_require__(8);\n\nvar _aframeAbstractJellyfish2 = _interopRequireDefault(_aframeAbstractJellyfish);\n\nvar _const = __webpack_require__(1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/** The instanced jellyfish object, that \"extends\" the abstract jellyfish object */\nvar instancedJellyfish = {};\nObject.assign(instancedJellyfish, _aframeAbstractJellyfish2.default);\n\ninstancedJellyfish.createGeometry = function () {\n  return new THREE.InstancedBufferGeometry();\n};\n\ninstancedJellyfish.addOffsetAttribute = function (geometry) {\n  var offset = [];\n  for (var i = 0; i < _const.MAX_NUMBER; i++) {\n    offset = offset.concat([2 * (Math.random() - 0.5) * _const.WIDTH, 2 * (Math.random() - 0.5) * _const.WIDTH, 2 * (Math.random() - 0.5) * _const.WIDTH]);\n  }\n  geometry.addAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offset), 3, 1));\n};\n\ninstancedJellyfish.modifyMaterial = function (material) {\n  material.defines.USE_INSTANCED = true;\n};\n\nexports.default = instancedJellyfish;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/aframe/aframe-instanced-jellyfish.js\n ** module id = 25\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/jellyfish/aframe/aframe-instanced-jellyfish.js?");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar gradient = {\n  schema: {\n    topColor: { type: 'vec3', default: { x: 0.360784314, y: 0.584313725, z: 1.0 } },\n    bottomColor: { type: 'vec3', default: { x: 0.074509804, y: 0.156862745, z: 0.619607843 } }\n  },\n  init: function init() {\n    var geometry = new THREE.PlaneBufferGeometry(2, 2, 0, 0);\n\n    var uv = new THREE.BufferAttribute(new Float32Array(8), 2);\n    uv.setXY(0, 0, 0);\n    uv.setXY(1, 0, 0);\n    uv.setXY(2, 1, 1);\n    uv.setXY(3, 1, 1);\n    geometry.addAttribute('uv', uv);\n\n    var topColor = this.data.topColor;\n    var bottomColor = this.data.bottomColor;\n    var material = new THREE.ShaderMaterial({\n      vertexShader: __webpack_require__(27),\n      fragmentShader: __webpack_require__(28),\n      defines: { THREE_JS: true },\n      uniforms: {\n        color1: { value: new THREE.Vector3(topColor.x, topColor.y, topColor.z) },\n        color2: { value: new THREE.Vector3(bottomColor.x, bottomColor.y, bottomColor.z) }\n      }\n    });\n\n    this.el.setObject3D('mesh', new THREE.Mesh(geometry, material));\n  }\n};\n\nexports.gradient = gradient;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/jellyfish/aframe/aframe-gradient.js\n ** module id = 26\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/jellyfish/aframe/aframe-gradient.js?");

/***/ },
/* 27 */
/***/ function(module, exports) {

	eval("module.exports = \"#ifndef THREE_JS\\n\\tattribute vec2 position;\\n\\tattribute vec2 uv;\\n#endif\\n\\nvarying vec2 uv2;\\n\\nvoid main()\\n{\\n    uv2 = uv;\\n    gl_Position = vec4(position.x, position.y,0.0, 1.0);\\n}\\n\"\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/shaders/gradient/gradient.vert\n ** module id = 27\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/shaders/gradient/gradient.vert?");

/***/ },
/* 28 */
/***/ function(module, exports) {

	eval("module.exports = \"precision mediump float;\\n\\nuniform vec3 color1;\\nuniform vec3 color2;\\n\\nvarying vec2 uv2;\\n\\nvoid main()\\n{\\n    vec3 color = mix(color1, color2, uv2.x * uv2.y);\\n    gl_FragColor = vec4(color, 1.0);\\n}\\n\"\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/shaders/gradient/gradient.frag\n ** module id = 28\n ** module chunks = 1 2 3\n **/\n//# sourceURL=webpack:///./src/shaders/gradient/gradient.frag?");

/***/ }
/******/ ]);