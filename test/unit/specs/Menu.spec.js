import Menu from 'src/Menu.vue'
import MenuItem from 'src/MenuItem.vue'
import Vue from 'vue'

describe('Menu', function () {
  let mv, menu, menuItem1, menuItem2, el
  beforeEach(function () {
    el = document.createElement('div')
    document.body.appendChild(el)
    Vue.component('menu', Menu)
    Vue.component('menu-item', MenuItem)
    mv = new Vue({
      el () {
        return el
      },
      template: '<menu><menu-item key="frist">1</menu-item><menu-item key="second">2</menu-item></menu>'
    })
    menu = mv.$children[0]
    menuItem1 = menu.$children[0]
    menuItem2 = menu.$children[1]
  })

  afterEach(function () {
    mv.$destroy(true)
  })

  it('初始状态', () => {
    expect(menu.selectItem).toBeNull()
  })

  it('单击第一个 menu-item 元素', function () {
    menuItem1.handleClick('选择事件')
    expect(menu.selectItem.key).toEqual('frist')
    expect(menuItem1.selected).toBeTruthy()

    // 再次单击
    menuItem1.handleClick('选择事件')
    expect(menu.selectItem.key).toEqual('frist')
    expect(menuItem1.selected).toBeTruthy()
  })

  it('单击第一和第二个 menu-item 元素', function () {
    menuItem1.handleClick('选择事件')
    expect(menu.selectItem.key).toEqual('frist')
    expect(menuItem1.selected).toBeTruthy()
    expect(menuItem2.selected).toBeFalsy()
    // 再次单击
    menuItem2.handleClick('选择事件')
    expect(menu.selectItem.key).toEqual('second')
    expect(menuItem1.selected).toBeFalsy()
    expect(menuItem2.selected).toBeTruthy()
  })

  it('触发 onSelected 事件', () => {
    var selectedFn = jasmine.createSpy('selectedFn').and.callFake(item => {
      expect(item === menuItem1).toBeTruthy()
    })
    menu.onSelected = selectedFn
    menuItem1.handleClick()
    expect(menu.selectItem.key).toEqual('frist')
    expect(selectedFn.calls.count()).toEqual(1)
  })

  it('触发 onDeselect 事件', () => {
    var deselectFn = jasmine.createSpy('deselectFn').and.callFake(item => {
      expect(item === menuItem1).toBeTruthy()
    })
    menu.onDeselect = deselectFn
    menuItem1.handleClick()
    expect(menu.selectItem.key).toEqual('frist')
    expect(deselectFn.calls.count()).toEqual(0)

    menuItem2.handleClick()
    expect(deselectFn.calls.count()).toEqual(1)
  })
})
