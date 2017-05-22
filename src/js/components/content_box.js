import React from 'react';
import Menu from './menu.js';

export default class ContentBox extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div className="container">
        <Menu signed_in="test" />
      </div>
    )
  }
}
