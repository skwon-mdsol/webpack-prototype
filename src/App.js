import React, { Component } from 'react';
import * as Axios from 'axios';
import Paginate from 'lego/lib/Paginate';
import 'sandman-bower/assets/platform.css'
//TODO: Figure out sandman styles

const studiesRow = (study) => {
  return (<tr>
    <td>{study.protocol_id}</td>
    <td>{study.name}</td>
    <td>{study.status_oid}</td>
    <td>{study.riskPlanDetails.riskPlan}</td>
    <td>{study.riskPlanDetails.planStatus}</td>
    <td>{study.lastUpdated}</td>
    <td>{study.riskPlanDetails}</td>
  </tr>);
};

const studiesTableLayout = (studies = []) => {
  return (
    <table className="table table-hover studies-table study-list-table">
      <thead>
        <tr>
          <th>Protocol ID</th>
          <th>Study Name</th>
          <th>Study Status</th>
          <th>Risk Plan</th>
          <th>Plan Status</th>
          <th>Last Updated</th>
          <th>Updated By</th>
        </tr>
      </thead>
      <tbody>
      {studies.map(study => studiesRow(study))}
      </tbody>
    </table>
  )
};

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: {},
      currPage: 1,
      maxPage: 10,
      currData: []
    };

    ['onPaginate'].forEach(f => { this[f] = this[f].bind(this) });
  }

  componentDidMount() {
    Axios.get('http://localhost:3456/studies').then(data => this.setState({rawData: data}));
  }

  onPaginate(options) {
    console.log(options);
  }

  render() {
    console.log(this.state.rawData);

    return (
      <div>
        <Paginate
          onPaginate={this.onPaginate}
          totalItems={100}
          currentPage={1}
          perPage={10}
          translations={{of: " of ", totalResults: "Total Result(s)", perPage: "Per Page"}}
          perPageSizes={[10, 25, 50]} />
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
