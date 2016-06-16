import MenuItem from 'src/MenuItem.vue'
import Vue from 'Vue'

describe('MenuItem', function () {
  let menuItem, el
  beforeEach(function () {
    el = document.createElement('div')
    document.body.appendChild(el)
    MenuItem.el = function () {
      return el
    }
    menuItem = new Vue(MenuItem)
  })

  afterEach(function () {
    document.body.removeChild(menuItem.$el)
  })

  it('测试不同状态的 classNames', function () {
    expect(menuItem.classNames).toEqual('vn-menu-item')

    menuItem.active = true
    expect(menuItem.classNames).toEqual('vn-menu-item vn-menu-item-active')

    menuItem.disabled = true
    expect(menuItem.classNames).toEqual('vn-menu-item vn-menu-item-disabled')

    menuItem.selected = true
    expect(menuItem.classNames).toEqual('vn-menu-item vn-menu-item-selected vn-menu-item-disabled')

    menuItem.disabled = false
    expect(menuItem.classNames).toEqual('vn-menu-item vn-menu-item-active vn-menu-item-selected')

    menuItem.class = 'my-class'
    expect(menuItem.classNames).toEqual('vn-menu-item vn-menu-item-active vn-menu-item-selected my-class')
  })

  it('单击触发单击事件', () => {
    var clickFn = jasmine.createSpy('clickFn').and.callFake(info => {
      expect(info.item).toEqual(menuItem)
      expect(info.domEvent).toEqual('单击事件')
    })
    menuItem.$on('muen-item-click', clickFn)
    menuItem.handleClick('单击事件')
    expect(clickFn.calls.count()).toEqual(1)
    // 禁用状态不会触发单击事件
    menuItem.disabled = true
    menuItem.handleClick('单击事件')
    expect(clickFn.calls.count()).toEqual(1)
  })

  it('正常状态单击不触发选择事件', () => {
    menuItem.$on('muen-item-selected', info => {
      expect(info.item).toEqual(menuItem)
      expect(info.domEvent).toEqual('选择事件')
    })
    menuItem.handleClick('选择事件')
  })

  it('禁用状态单击不触发选择事件', () => {
    menuItem.$on('muen-item-selected', info => {
      throw new TypeError('禁用状态下不能触发该事件')
    })
    menuItem.disabled = true
    menuItem.handleClick('选择事件')
  })

  it('不同层级 titleStyle', () => {
    expect(menuItem.style).toEqual({ 'paddingLeft': '20px' })

    menuItem.level = 0
    expect(menuItem.style).toEqual({ 'paddingLeft': '0px' })
  })
})
