<template>
  <li :title="title" :class="classNames" :onClick="handleClick" :style="style">
    <slot></slot>
  </li>
</template>

<script>
import cn from 'classnames'
export default {
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
    handleClick (e) {
      if (this.disabled === false) {
        const info = {
          item: this,
          domEvent: e
        }
        this.$emit('muen-item-click', info)
        if (!this.selected) {
          this.$emit('muen-item-selected', info)
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
        paddingLeft: this.level * 24 + 'px'
      }
    }
  }
}
</script>
