import React, { Component } from 'react'
import { Grid } from 'react-bootstrap';

export default class Home extends Component {
  render() { 
    return (
      <div className="home">
        <Grid>
          <div className="jumbotron">
            <h1 className="display-3">まとめちゃんねる</h1>
            <hr className="my-4" />
            <p className="lead">仮設 Home</p>
            <p>そのうち作る‥かも？</p>
          </div>
        </Grid>
      </div>
    )
  }
}
