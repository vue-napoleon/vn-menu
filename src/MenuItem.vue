<template>
  <li :title="title" :class="classNames" @click="handleClick" :style="style">
    <slot></slot>
  </li>
</template>

<script>
import cn from 'classnames'
import Guid from 'guid'
export default {
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
      default: function () {
        return Guid.raw()
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
    handleClick (e) {
      if (this.disabled === false) {
        const info = {
          item: this,
          domEvent: e
        }
        this.$dispatch('muen-item-click', info)
        if (!this.selected) {
          this.$dispatch('muen-item-selected', info)
        }
      }
    }
  },
  computed: {
    classNames () {
      return cn({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-active`]: !this.disabled && this.active,
        [`${this.prefixCls}-selected`]: this.selected,
        [`${this.prefixCls}-disabled`]: this.disabled,
        [`${this.class}`]: !!this.class
      })
    },
    style () {
      return {
        paddingLeft: this.level * this.slideIndent + 'px'
      }
    }
  }
}
</script>
