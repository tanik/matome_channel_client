import React from 'react'
import { mount } from 'enzyme'
import Contact from '../../src/js/components/contact'

import {
  Grid,
  Well,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

function setup(posted=false, errors={}) {
  const props = {
    posted: posted,
    errors: errors,
    setContactErrors: jest.fn(),
    postContact: jest.fn(),
  }

  const enzymeWrapper = mount(<Contact {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Contact', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('h3').text()).toBe('お問い合わせ')
      expect(enzymeWrapper.find('FormGroup').length).toBe(3)
      expect(enzymeWrapper.find('Col').at(0).text()).toBe('メールアドレス')
      expect(enzymeWrapper.find('Col').at(2).text()).toBe('お問い合わせ内容')
      expect(enzymeWrapper.find('FormControl').at(0).props().type).toBe('email')
      expect(enzymeWrapper.find('FormControl').at(1).props().rows).toBe('10')
    })
  })
})
