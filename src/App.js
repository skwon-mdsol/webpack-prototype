import React, { Component } from 'react';
import * as Axios from 'axios';
import Paginate from 'lego/lib/Paginate';
import 'sandman-bower/assets/platform.css'


const MEDIDATA_LOGO = "https://dsw6ye8s2ocl7.cloudfront.net/apps/checkmate/sandbox/assets/Medidata_Logo_white-c175f17f00a766df95d0f4663da812e90b4ef6d7041728e89e3f31bbccb97432.png";

const studiesRow = (study, cols) => {
  return (<tr key={study.protocolId}>
    {
      cols.map((c, i) => (
        <td key={`td_${i}`}>{study[c]}</td>
      ))
    }
  </tr>);
};

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

const studiesTableLayout = (studies = [], page = 0, perPage = 0) => {
  return (
    <table className="table table-hover studies-table study-list-table">
      <thead>
        <tr>
        {
          studies[0] && Object.keys(studies[0]).map((k, i) => (
            <th key={`th_${i}`}>{k}</th>
          ))
        }
        </tr>
      </thead>
      <tbody>
      {
        studies
          .filter((s, place) => (place >= ((page - 1) * perPage) && place < (page * perPage)))
          .map(study => studiesRow(study, Object.keys(studies[0])))
      }
      </tbody>
    </table>
  )
};

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: {},
      page: 1,
      perPage: 10,
      currData: []
    };

    ['onPaginate'].forEach(f => { this[f] = this[f].bind(this) });
  }

  componentDidMount() {
    Axios.get('http://localhost:3456/studies').then(data => this.setState({rawData: data}));
  }

  onPaginate({page, perPage}) {
    this.setState({page, perPage});
  }

  render() {
    const {page, perPage, rawData: {data = []} = {} } = this.state;

    return (
      <div>
        {header}
        <div id="main">
          <div className="mcc-col mcc-content">
            { studiesTableLayout(data, page, perPage) }
            <Paginate
              onPaginate={this.onPaginate}
              totalItems={data.length}
              currentPage={page}
              perPage={perPage}
              translations={{of: " of ", totalResults: "Total Result(s)", perPage: "Per Page"}} />
          </div>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TableContainer />
      </div>
    );
  }
}

export default App;
