<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
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
  ready () {
    this.$children.forEach(item => {
      item.$on('muen-item-click', this.muenItemClick)
      item.$on('muen-group-click', this.muenGroupClick)
    })
  },
  methods: {
    muenItemClick (event) {
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
    muenGroupClick (event) {
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
