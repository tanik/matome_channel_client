import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import NewBoard from '../../../src/js/components/board/new'
import '../../../__mock__/localstrage'

const categories = [{
  id: 1,
  parent_id: null,
  name: "test",
}]

function setup(show=false,categories=[],post_board_result={}) {
  const props = {
    show: show,
    categories: categories,
    post_board_result: post_board_result,
    postBoard: jest.fn(),
    clearPostResult: jest.fn(),
    openNewBoardModal: jest.fn(),
    closeNewBoardModal: jest.fn(),
  }
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <NewBoard {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('NewBoard', () => {
    it('should render new board page', () => {
      const { wrapper, props } = setup(true, categories, {})
      expect(wrapper.find('Modal').at(0).props().show).toBe(true)
    })

    it('should post called when submit form with any values', () => {
      const { props } = setup(true, categories, {})
      const wrapper = shallow(<NewBoard {...props} />)
      wrapper.instance().board_category = {value: '1'}
      wrapper.instance().board_title = {value: 'title'}
      wrapper.instance().comment_name = {value: ''}
      wrapper.instance().comment_content = {value: 'content'}
      wrapper.find('form').props().onSubmit({preventDefault: jest.fn()})
      expect(props.postBoard.mock.calls.length).toBe(1)
    })

    it('should post do not called when submit form with empty values', () => {
      const { props } = setup(true, categories, {})
      const wrapper = shallow(<NewBoard {...props} />)
      wrapper.instance().board_category = {value: ''}
      wrapper.instance().board_title = {value: ''}
      wrapper.instance().comment_name = {value: ''}
      wrapper.instance().comment_content = {value: ''}
      wrapper.find('form').props().onSubmit({preventDefault: jest.fn()})
      expect(props.postBoard.mock.calls.length).toBe(0)
    })

    it('should redirect after post succeed', () => {
      const { wrapper, props } = setup(true, categories, {
        state: 'success',
        response: {
          id: 1,
        },
      })
      expect(wrapper.find('Redirect').props().to).toEqual('/boards/1')
      expect(props.clearPostResult.mock.calls.length).toBe(1)
    })
  })
})
