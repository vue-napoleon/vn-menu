<template>
  <vn-menu>
    <vn-menu-group title="选项组1">
      <vn-menu-item>选项1</vn-menu-item>
    </vn-menu-group>
    <vn-menu-group title="选项组2">
      <vn-menu-item :disabled="true" >禁用选项2</vn-menu-item>
      <vn-menu-item>选项3</vn-menu-item>
    </vn-menu-group>
    <vn-menu-group :disabled="true" title="禁用分组">
      <vn-menu-item>选项4</vn-menu-item>
      <vn-menu-item>选项5</vn-menu-item>
    </vn-menu-group>
    <vn-menu-group title="嵌套分组">
      <vn-menu-item>嵌套分组1</vn-menu-item>
      <vn-menu-group title="子分组">
        <vn-menu-item>子分组1</vn-menu-item>
        <vn-menu-item>子分组2</vn-menu-item>
      </vn-menu-group>
    </vn-menu-group>
  </vn-menu>

</template>

<script>
import {vnMenu, vnMenuGroup, vnMenuItem} from 'src/index.vue'
export default {
  components: {
    vnMenu,
    vnMenuGroup,
    vnMenuItem
  }
}
</script>

<style lang="less" src="ant-theme/index.less"></style>
