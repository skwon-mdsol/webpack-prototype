import React, { Component } from 'react';
import * as Axios from 'axios';
import Paginate from 'lego/lib/Paginate';
import 'sandman-bower/assets/platform.css'

const MEDIDATA_LOGO = "https://dsw6ye8s2ocl7.cloudfront.net/apps/checkmate/sandbox/assets/Medidata_Logo_white-c175f17f00a766df95d0f4663da812e90b4ef6d7041728e89e3f31bbccb97432.png";

const header = (
  <header className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <div className="logos">
          <a className="navbar-brand" href="#home">
            <div><img src={MEDIDATA_LOGO} alt="Medidata logo white" width="115" height="18" /></div>
          </a>
        </div>
      </div>
    </div>
  </header>
);

class CardContainer extends React.PureComponent {
  render() {
    return <div className='card-container'>
      {this.props.children}
    </div>
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { role, access } = this.props;
    return <div className='card'>
      <div className='card-status-bar'></div>
      <div className='card-block'>

        {/* header */}
        <div className='card-header'>
          <div className='icon'>
            <i className='fa fa-clipboard' />
          </div>
          <div className='header-text'>
            <div>
              <b>{role}</b>
              <span className='info'>Site Internal Personnel</span>
            </div>
          </div>
          <b>Status</b>
        </div>
        <hr />

        {/* body */}
        <div className='card-body'>
          <h5>Access To</h5>
          {access.map(a => <h6>{a}</h6>)}
        </div>

        {/* footer */}
        <div className='card-footer'>
          <div className='footer-spacer'></div>
          <div className='footer-controls'>
            <button className='btn btn-xs btn-default'>Edit</button>
            <button className='btn btn-xs btn-default'>Remove</button>
          </div>
        </div>
      </div>
    </div>
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        {header}
        <div id='main'>
          <div className='mcc-row'>
            <div className='mcc-col mcc-sidebar mcc-sidebar-left'>
              <div className='sidebar-scroll'>
                <ul className='sidebar-nav'>
                  <li>Example Sidebar</li>
                </ul>
              </div>
            </div>
            <div className='mcc-content container-fluid mcc-col'>
              <CardContainer>
                <Card role='Admin' access={['cloud administration', 'ract ui', 'design optimizer', 'wu tang clan']}/>
                <Card role='Customer Admin' access={['cloud administration']}/>
                <Card role='Design Optimizer Admin' access={['cloud administration']}/>
                <Card role='Design Optimizer Power User' access={['design optimizer']}/>
                <Card role='Design Optimizer Read Only' access={['juno']}/>
              </CardContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
