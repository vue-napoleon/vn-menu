import Menu from 'src/Menu.vue'
import MenuItem from 'src/MenuItem.vue'
import MenuGroup from 'src/MenuGroup.vue'
import Vue from 'Vue'

describe('MenuGroup', function () {
  let mv, menu, menuGroup1, menuGroup2, el
  beforeEach(function () {
    el = document.createElement('div')
    document.body.appendChild(el)
    Vue.component('menu', Menu)
    Vue.component('menu-item', MenuItem)
    Vue.component('menu-group', MenuGroup)

    mv = new Vue({
      el () {
        return el
      },
      template: '<menu>' +
                  '<menu-group><menu-item key="fristA">1A</menu-item><menu-item key="fristB">2B</menu-item></menu-group>' +
                  '<menu-group><menu-item key="secondA">2A</menu-item><menu-item key="secondB">2B</menu-item></menu-group>' +
                  '<menu-item key="third">3</menu-item>' +
                '</menu>'
    })
    menu = mv.$children[0]
    menuGroup1 = menu.$children[0]
    menuGroup2 = menu.$children[1]
    // menuItem = menu.$children[2]
  })

  afterEach(function () {
    document.body.removeChild(mv.$el)
  })

  it('不同状态的 wrapClassNames', () => {
    expect(menuGroup1.wrapClassNames).toEqual('vn-menu-group vn-menu-group-shrink')

    menuGroup1.isExpand = true
    expect(menuGroup1.wrapClassNames).toEqual('vn-menu-group vn-menu-group-expand')

    menuGroup1.disabled = true
    expect(menuGroup1.wrapClassNames).toEqual('vn-menu-group vn-menu-group-expand vn-menu-group-disabled')

    menuGroup1.isExpand = false
    expect(menuGroup1.wrapClassNames).toEqual('vn-menu-group vn-menu-group-shrink vn-menu-group-disabled')

    menuGroup1.class = 'my-class'
    expect(menuGroup1.wrapClassNames).toEqual('vn-menu-group vn-menu-group-shrink vn-menu-group-disabled my-class')
  })

  it('不同层级 titleStyle', () => {
    expect(menuGroup1.titleStyle).toEqual({ 'paddingLeft': '20px' })

    menuGroup1.level = 0
    expect(menuGroup1.titleStyle).toEqual({ 'paddingLeft': '0px' })
  })

  it('单击展开子菜单', () => {
    menuGroup1.handleClick()
    expect(menuGroup1.isExpand).toBeTruthy()
    expect(menuGroup2.isExpand).toBeFalsy()

    menuGroup2.handleClick()
    expect(menuGroup1.isExpand).toBeFalsy()
    expect(menuGroup2.isExpand).toBeTruthy()
  })

  it('禁用状态下单击，不展开子菜单', () => {
    menuGroup1.disabled = true
    menuGroup1.handleClick()
    expect(menuGroup1.isExpand).toBeFalsy()
  })

  it('展开多个菜单', () => {
    menu.isMultipleExpand = true
    menuGroup1.handleClick()
    menuGroup2.handleClick()
    expect(menuGroup1.isExpand).toBeTruthy()
    expect(menuGroup2.isExpand).toBeTruthy()
  })
})
