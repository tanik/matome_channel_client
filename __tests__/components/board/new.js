import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import NewBoard from '../../../src/js/components/board/new'
import '../../../__mock__/localstrage'

const categories = [{
  id: 1,
  parent_id: null,
  name: "test",
}]

function setup(categories=[]) {
  const props = {
    show: false,
    categories: categories,
    post_board_result: {},
    postBoard: jest.fn(),
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
      // TODO
      const { wrapper, props } = setup()
    })
  })
})
