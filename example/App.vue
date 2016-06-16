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
  </vn-menu>

</template>

<script>
import {vnMenu, vnMenuGroup, vnMenuItem} from 'src/index'
export default {
  components: {
    vnMenu,
    vnMenuGroup,
    vnMenuItem
  }
}
</script>

<style>

</style>
