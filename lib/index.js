webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.vnMenuGroup = exports.vnMenuItem = exports.vnMenu = undefined;

	var _Menu = __webpack_require__(29);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(31);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _MenuGroup = __webpack_require__(30);

	var _MenuGroup2 = _interopRequireDefault(_MenuGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.vnMenu = _Menu2.default;
	exports.vnMenuItem = _MenuItem2.default;
	exports.vnMenuGroup = _MenuGroup2.default;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(2);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var noop = function noop() {};
	exports.default = {
	  data: function data() {
	    return {
	      selectItem: null,
	      expandGroups: []
	    };
	  },

	  props: {
	    prefixCls: {
	      type: String,
	      default: 'vn-menu'
	    },
	    slideIndent: {
	      type: Number,
	      default: 20
	    },
	    onExpand: {
	      type: Function,
	      default: noop
	    },
	    onShrink: {
	      type: Function,
	      default: noop
	    },
	    onSelected: {
	      type: Function,
	      default: noop
	    },
	    onDeselect: {
	      type: Function,
	      default: noop
	    },
	    isMultipleExpand: {
	      type: Boolean,
	      default: false
	    }
	  },
	  compiled: function compiled() {
	    var _this = this;

	    this.$children.forEach(function (item) {
	      item.slideIndent = _this.slideIndent;
	    });
	  },

	  computed: {
	    wrapCls: function wrapCls() {
	      var _cn;

	      return (0, _classnames2.default)((_cn = {}, (0, _defineProperty3.default)(_cn, '' + this.prefixCls, 1), (0, _defineProperty3.default)(_cn, this.prefixCls + '-inline', 1), (0, _defineProperty3.default)(_cn, '' + this.class, !!this.class), _cn));
	    }
	  },
	  events: {
	    'muen-item-click': function muenItemClick(event) {
	      if (this.selectItem !== event.item) {
	        event.item.selected = true;

	        if (this.selectItem && this.selectItem !== event.item) {
	          this.selectItem.selected = false;
	          this.onDeselect(this.selectItem);
	        }
	        this.onSelected(event.item);
	        this.selectItem = event.item;
	      }
	    },
	    'muen-group-click': function muenGroupClick(event) {
	      if (this.isMultipleExpand) {
	        var index = this.expandGroups.indexOf(event.item);
	        if (index >= 0) {
	          this.expandGroups[index].isExpand = false;
	          this.expandGroups.splice(index, 1);
	          this.onShrink(this.expandGroups[index]);
	        } else {
	          event.item.isExpand = true;
	          this.expandGroups.push(event.item);
	          this.onExpand(this.expandGroups[0]);
	        }
	      } else {
	        if (this.expandGroups[0]) {
	          this.expandGroups[0].isExpand = false;
	          this.onShrink(this.expandGroups[0]);
	        }
	        event.item.isExpand = true;
	        this.expandGroups = [event.item];
	        this.onExpand(this.expandGroups[0]);
	      }
	    }
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(2);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _guid = __webpack_require__(9);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'vn-menu-group'
	    },
	    title: {
	      type: [String, Object],
	      default: ''
	    },
	    slideIndent: {
	      type: Number,
	      default: 20
	    },
	    key: {
	      type: String,
	      default: function _default() {
	        return _guid2.default.raw();
	      }
	    },
	    level: {
	      type: Number,
	      default: 1
	    },
	    isExpand: {
	      type: Boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },
	    class: {
	      type: String
	    }
	  },
	  compiled: function compiled() {
	    var _this = this;

	    this.$children.forEach(function (item) {
	      item.level = _this.level + 1;
	      item.slideIndent = _this.slideIndent;
	    });
	  },

	  methods: {
	    handleClick: function handleClick(e) {
	      if (this.disabled === false) {
	        var info = {
	          item: this,
	          domEvent: e
	        };
	        this.$dispatch('muen-group-click', info);
	      }
	    }
	  },
	  computed: {
	    wrapClassNames: function wrapClassNames() {
	      var _cn;

	      return (0, _classnames2.default)((_cn = {}, (0, _defineProperty3.default)(_cn, '' + this.prefixCls, 1), (0, _defineProperty3.default)(_cn, this.prefixCls + '-selected', !this.disabled && this.selected), (0, _defineProperty3.default)(_cn, this.prefixCls + '-expand', this.isExpand), (0, _defineProperty3.default)(_cn, this.prefixCls + '-shrink', !this.isExpand), (0, _defineProperty3.default)(_cn, this.prefixCls + '-disabled', this.disabled), (0, _defineProperty3.default)(_cn, '' + this.class, !!this.class), _cn));
	    },
	    titleStyle: function titleStyle() {
	      return {
	        paddingLeft: this.level * this.slideIndent + 'px'
	      };
	    }
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(2);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _guid = __webpack_require__(9);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'vn-menu-item'
	    },
	    title: {
	      type: [String, Object],
	      default: ''
	    },
	    slideIndent: {
	      type: Number,
	      default: 20
	    },
	    key: {
	      type: String,
	      default: function _default() {
	        return _guid2.default.raw();
	      }
	    },
	    active: {
	      type: Boolean,
	      default: false
	    },
	    selected: {
	      type: Boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },
	    level: {
	      type: Number,
	      default: 1
	    },
	    class: {
	      type: String
	    }
	  },
	  methods: {
	    handleClick: function handleClick(e) {
	      if (this.disabled === false) {
	        var info = {
	          item: this,
	          domEvent: e
	        };
	        this.$dispatch('muen-item-click', info);
	        if (!this.selected) {
	          this.$dispatch('muen-item-selected', info);
	        }
	      }
	    }
	  },
	  computed: {
	    classNames: function classNames() {
	      var _cn;

	      return (0, _classnames2.default)((_cn = {}, (0, _defineProperty3.default)(_cn, '' + this.prefixCls, 1), (0, _defineProperty3.default)(_cn, this.prefixCls + '-active', !this.disabled && this.active), (0, _defineProperty3.default)(_cn, this.prefixCls + '-selected', this.selected), (0, _defineProperty3.default)(_cn, this.prefixCls + '-disabled', this.disabled), (0, _defineProperty3.default)(_cn, '' + this.class, !!this.class), _cn));
	    },
	    style: function style() {
	      return {
	        paddingLeft: this.level * this.slideIndent + 'px'
	      };
	    }
	  }
	};

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n<ul :class=\"wrapCls\" >\n  <slot></slot>\n</ul>\n";

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "\n<li :class=\"wrapClassNames\" @click=\"handleClick\">\n  <div :class=\"prefixCls + '-title'\" :style=\"titleStyle\">\n    {{ title }}\n  </div>\n  <ul v-show=\"isExpand\">\n    <slot></slot>\n  </ul>\n</li>\n";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "\n<li :title=\"title\" :class=\"classNames\" @click=\"handleClick\" :style=\"style\">\n  <slot></slot>\n</li>\n";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(25)
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/Menu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/MenuGroup.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(12)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/MenuItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(28)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ }
]);