<template>
  <li :class="wrapClassNames" @click="handleClick">
    <div :class="prefixCls + '-title'" :style="titleStyle">
      {{ title }}
    </div>
    <ul v-show="isExpand">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import cn from 'classnames'
import uuid from 'node-uuid'
export default {
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
      default: function () {
        return uuid.v1()
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
  compiled () {
    this.$children.forEach(item => {
      item.level = this.level + 1
      item.slideIndent = this.slideIndent
    })
  },
  methods: {
    handleClick (e) {
      if (this.disabled === false) {
        const info = {
          item: this,
          domEvent: e
        }
        this.$dispatch('muen-group-click', info)
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
    titleStyle () {
      return {
        paddingLeft: this.level * this.slideIndent + 'px'
      }
    }
  }
}
</script>
