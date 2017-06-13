import React from 'react';
import { Grid, Well } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <footer className="footer">
        <Well className="footer-body">
          <Grid>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/contact">問い合わせ</Link></li>
              <li className="breadcrumb-item"><Link to="/about">まとめちゃんねるについて</Link></li>
              <li className="breadcrumb-item">
                <a href='https://github.com/tanik' target='_BLANK'>github</a>
              </li>
            </ol>
          </Grid>
        </Well>
      </footer>
    )
  }
}

