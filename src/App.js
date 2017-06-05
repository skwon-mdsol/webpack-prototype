import React, { Component } from 'react';
import * as Axios from 'axios';
import Paginate from 'lego/lib/Paginate';
import 'sandman-bower/assets/platform.css'
//TODO: Figure out sandman styles

const studiesRow = (study, cols) => {
  return (<tr>
    {
      cols.map((c, i) => (
        <td key={`td_${i}`}>{study[c]}</td>
      ))
    }
  </tr>);
};

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
    const {page, perPage} = this.state;

    return (
      <div>
        <Paginate
          onPaginate={this.onPaginate}
          totalItems={100}
          currentPage={page}
          {...{perPage}}
          translations={{of: " of ", totalResults: "Total Result(s)", perPage: "Per Page"}}
          perPageSizes={[10, 25, 50]} />
        {studiesTableLayout(this.state.rawData.data, page, perPage)}
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
