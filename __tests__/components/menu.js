import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Menu from '../../src/js/components/menu'
import { StaticRouter } from 'react-router'
import '../../__mock__/localstrage'

function setup(pathname='') {
  const props = {
    location: {
      pathname: pathname
    },
    history: []
  }
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Menu {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Menu', () => {
    it('should render self and subcomponents when authorized', () => {
      window.localStorage.setItem('auth', JSON.stringify({
        auth: {
          'access-token': 'aaaaaaaaa',
          'client': 'bbbbbbbbb',
          'uid': 'test@example.com',
          'expiry': 1497951304,
        }
      }))
      const { wrapper } = setup()
      expect(wrapper.find('Link').at(0).props().to).toEqual('/')
      expect(wrapper.find('LinkContainer').at(0).props().to).toEqual('/boards')
      expect(wrapper.find('LinkContainer').at(1).props().to).toEqual('/my/boards')
      expect(wrapper.find('LinkContainer').at(2).props().to).toEqual('/my/comments')
      expect(wrapper.find('LinkContainer').at(3).props().to).toEqual('/my/favorite_boards')
      expect(wrapper.find('LinkContainer').at(4).props().to).toEqual('/my/favorite_comments')
      expect(wrapper.find('LinkContainer').at(5).props().to).toEqual('/my/histories')
      expect(wrapper.find('LinkContainer').at(6).props().to).toEqual('/logout')
    })

    it('should render self and subcomponents when not authorized', () => {
      window.localStorage.setItem('auth', JSON.stringify({
        auth: {
        }
      }))
      const { wrapper } = setup()
      expect(wrapper.find('Link').at(0).props().to).toEqual('/')
      expect(wrapper.find('LinkContainer').at(0).props().to).toEqual('/boards')
      expect(wrapper.find('Link').at(1).props().to).toEqual('/login')
    })

    it('should render search query', () => {
      const { wrapper, props } = setup('/boards/search/test')
      expect(wrapper.find('FormControl').at(0).props().value).toEqual('test')
    })

    it('should change input value', () => {
      const { wrapper, props } = setup()
      wrapper.find('FormControl').simulate('change', {target: {value: 'test'}})
      expect(wrapper.find('FormControl').at(0).props().value).toEqual('test')
    })

    it('should search with some word when enter return key', () => {
      const { wrapper, props } = setup()
      wrapper.find('FormControl').at(0).simulate('change', {target: {value: 'test'}})
      wrapper.find('FormControl').at(0).simulate('keydown', {keyCode: 13})
      expect(props.history[0]).toEqual('/boards/search/test')
    })
    it('should search with empty whenenter return key', () => {
      const { wrapper, props } = setup()
      wrapper.find('FormControl').at(0).simulate('keydown', {keyCode: 13})
      expect(props.history[0]).toEqual('/boards')
    })
  })
})
