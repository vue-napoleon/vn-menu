<template>
  <li :class="wrapClassNames" :onClick="handleClick">
    <div class="${this.prefixCls}-title" :style="titleStyle">
      {{ title }}
    </div>
    <slot></slot>
  </li>
</template>

<script>
import cn from 'classnames'
export default {
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
    handleClick (e) {
      if (this.disabled === false) {
        const info = {
          item: this,
          domEvent: e
        }
        this.$emit('muen-group-click', info)
      }
    }
  },
  computed: {
    wrapClassNames () {
      return cn({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-selected`]: !this.disabled && this.selected,
        [`${this.prefixCls}-expand`]: this.isExpand,
        [`${this.prefixCls}-shrink`]: !this.isExpand,
        [`${this.prefixCls}-disabled`]: this.disabled,
        [`${this.class}`]: !!this.class
      })
    },
    titleClassNames () {
      return this.prefixCls + '-title'
    },
    titleStyle () {
      return {
        paddingLeft: this.level * 24 + 'px'
      }
    }
  }
}
</script>
