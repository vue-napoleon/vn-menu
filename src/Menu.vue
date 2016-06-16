<template>
  <ul :class="wrapCls" >
    <slot></slot>
  </ul>
</template>

<script>
import cn from 'classnames'
const noop = () => {}
export default {
  data () {
    return {
      selectItem: null,
      expandGroups: []
    }
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
  compiled () {
    this.$children.forEach(item => {
      item.slideIndent = this.slideIndent
    })
  },
  computed: {
    wrapCls () {
      return cn({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-inline`]: 1,
        [`${this.class}`]: !!this.class
      })
    }
  },
  events: {
    'muen-item-click' (event) {
      if (this.selectItem !== event.item) {
        event.item.selected = true
        // 把取消己选择的选项
        if (this.selectItem && this.selectItem !== event.item) {
          this.selectItem.selected = false
          this.onDeselect(this.selectItem)
        }
        this.onSelected(event.item)
        this.selectItem = event.item
      }
    },
    'muen-group-click' (event) {
      // 控制 muenGroup 的展开和收缩
      if (this.isMultipleExpand) {
        var index = this.expandGroups.indexOf(event.item)
        if (index >= 0) {
          // 收缩子菜单
          this.expandGroups[index].isExpand = false
          this.expandGroups.splice(index, 1)
          this.onShrink(this.expandGroups[index])
        } else {
          // 展开子菜单
          event.item.isExpand = true
          this.expandGroups.push(event.item)
          this.onExpand(this.expandGroups[0])
        }
      } else {
        // 收缩原来已展开的菜单
        if (this.expandGroups[0]) {
          this.expandGroups[0].isExpand = false
          this.onShrink(this.expandGroups[0])
        }
        event.item.isExpand = true
        this.expandGroups = [event.item]
        this.onExpand(this.expandGroups[0])
      }
    }
  }
}
</script>

<style lang="less">
@import "../node_modules/ant-theme/index.less";
@menu-prefix-cls: vn-menu;

// default theme
.@{menu-prefix-cls} {
  outline: none;
  margin-bottom: 0;
  padding-left: 0; // Override default ul/ol
  list-style: none;
  z-index: @zindex-dropdown;
  box-shadow: @box-shadow-base;
  color: @text-color;
  background: #fff;
  line-height: 46px;

  &-item,
  &-group-title {
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0 20px;
    position: relative;
    display: block;
    white-space: nowrap;
  }
  // Disabled state sets text to gray and nukes hover/tab effects
  &-item-disabled{
    color: #999 !important;
    cursor: not-allowed;
  }
  &-group-disabled {
    > .@{menu-prefix-cls}-group-title{
      color: #999 !important;
      cursor: not-allowed;
    }
  }


  &-item-active,
  &-group-title:hover {
    transform: translateZ(0);
    background-color: tint(@primary-color, 90%);
  }

  &-item-selected {
    color: @primary-color;
    // fix chrome render bug
    transform: translateZ(0);
    > a,
    > a:hover {
      color: @primary-color;
    }
  }

  &-inline{
    border-right: 1px solid @border-color-split;
    .@{menu-prefix-cls}-item {
      border-right: 1px solid @border-color-split;
      margin-left: -1px;
      left: 1px;
      position: relative;
      z-index: 1;
    }
    .@{menu-prefix-cls}-selected,
    .@{menu-prefix-cls}-item-selected {
      border-right: 2px solid @primary-color;
      transform: translateZ(0);
    }
  }

  & > &-item-divider {
    height: 1px;
    margin: 1px 0;
    overflow: hidden;
    padding: 0;
    line-height: 0;
    background-color: #e5e5e5;
  }

  &-group {
    position: relative;

    .@{menu-prefix-cls}-group-title:after {
      font-family: "anticon" !important;
      font-style: normal;
      vertical-align: baseline;
      text-align: center;
      text-transform: none;
      text-rendering: auto;
      position: absolute;
      transition: transform .3s ease;
      content: "\e603";
      right: 16px;
      top: 0;
      .iconfont-size-under-12px(8px);
    }

    &-expand {
      .@{menu-prefix-cls}-group-title:after {
        .ie-rotate(1);
        transform: rotate(180deg) scale(0.75);
      }
    }
  }
}
</style>
