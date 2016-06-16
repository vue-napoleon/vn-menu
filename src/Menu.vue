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

<style lang="less" src="ant-theme/index.less"></style>
