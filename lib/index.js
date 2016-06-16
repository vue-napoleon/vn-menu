webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Menu = __webpack_require__(27);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(29);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _MenuGroup = __webpack_require__(28);

	var _MenuGroup2 = _interopRequireDefault(_MenuGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { vnMenu: _Menu2.default, vnMenuItem: _MenuItem2.default, vnMenuGroup: _MenuGroup2.default };

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
	      default: 'menu'
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
	  ready: function ready() {
	    var _this = this;

	    this.$children.forEach(function (item) {
	      item.$on('muen-item-click', _this.muenItemClick);
	      item.$on('muen-group-click', _this.muenGroupClick);
	    });
	  },

	  methods: {
	    muenItemClick: function muenItemClick(event) {
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
	    muenGroupClick: function muenGroupClick(event) {
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(3);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'menu-group'
	    },
	    title: {
	      type: [String, Object],
	      default: ''
	    },
	    key: {
	      type: String,
	      default: ''
	    },
	    level: {
	      type: Number,
	      default: 0
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
	  methods: {
	    handleClick: function handleClick(e) {
	      if (this.disabled === false) {
	        var info = {
	          item: this,
	          domEvent: e
	        };
	        this.$emit('muen-group-click', info);
	      }
	    }
	  },
	  computed: {
	    wrapClassNames: function wrapClassNames() {
	      var _cn;

	      return (0, _classnames2.default)((_cn = {}, (0, _defineProperty3.default)(_cn, '' + this.prefixCls, 1), (0, _defineProperty3.default)(_cn, this.prefixCls + '-selected', !this.disabled && this.selected), (0, _defineProperty3.default)(_cn, this.prefixCls + '-expand', this.isExpand), (0, _defineProperty3.default)(_cn, this.prefixCls + '-shrink', !this.isExpand), (0, _defineProperty3.default)(_cn, this.prefixCls + '-disabled', this.disabled), (0, _defineProperty3.default)(_cn, '' + this.class, !!this.class), _cn));
	    },
	    titleClassNames: function titleClassNames() {
	      return this.prefixCls + '-title';
	    },
	    titleStyle: function titleStyle() {
	      return {
	        paddingLeft: this.level * 24 + 'px'
	      };
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

	var _defineProperty2 = __webpack_require__(3);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    prefixCls: {
	      type: String,
	      default: 'menu-item'
	    },
	    title: {
	      type: [String, Object],
	      default: ''
	    },
	    key: {
	      type: String,
	      default: ''
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
	      default: 0
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
	        this.$emit('muen-item-click', info);
	        if (!this.selected) {
	          this.$emit('muen-item-selected', info);
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
	        paddingLeft: this.level * 24 + 'px'
	      };
	    }
	  }
	};

/***/ },
/* 12 */,
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
/* 24 */
/***/ function(module, exports) {

	module.exports = "\n<ul>\n  <slot></slot>\n</ul>\n";

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "\n<li :class=\"wrapClassNames\" :onClick=\"handleClick\">\n  <div class=\"${this.prefixCls}-title\" :style=\"titleStyle\">\n    {{ title }}\n  </div>\n  <slot></slot>\n</li>\n";

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n<li :title=\"title\" :class=\"classNames\" :onClick=\"handleClick\" :style=\"style\">\n  <slot></slot>\n</li>\n";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(9)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/Menu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(24)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/MenuGroup.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/MenuItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ }
]);