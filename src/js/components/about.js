import React from 'react';
import { Grid, Well } from 'react-bootstrap';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Grid>
        <Well>
          About 
        </Well>
      </Grid>
    )
  }
}
