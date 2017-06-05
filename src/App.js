import React, { Component } from 'react';
import * as Axios from 'axios';
import Paginate from 'lego/lib/Paginate';
import 'sandman-bower/assets/platform.css'

const studiesRow = (study) => {
  return (<tr key={study.protocolId}>
    <td>{study.protocolId}</td>
    <td>{study.studyName}</td>
    <td>{study.studyStatus}</td>
    <td>{study.riskPlan}</td>
    <td>{study.planStatus}</td>
    <td>{study.lastUpdated}</td>
    <td>{study.updatedBy}</td>
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
      rawData: [],
      currPage: 1,
      maxPage: 10,
      currData: [],
    };

    ['onPaginate'].forEach(f => { this[f] = this[f].bind(this) });
  }

  getCurrPageData(arr, pageNumber) {
    return arr.slice((pageNumber - 1) * 10, pageNumber * 10);
  }

  componentDidMount() {
    Axios.get('http://localhost:3456/studies').then(res => this.setState({rawData: res.data, currData: this.getCurrPageData(res.data, this.state.currPage)}));
  }

  onPaginate(options) {
    this.setState({
      currPage: options.page,
      currData: this.getCurrPageData(this.state.rawData, options.page)
    })
  }

  render() {
    const { currPage, rawData} = this.state;
    const table = studiesTableLayout(rawData.slice((currPage - 1) * 10, currPage * 10));
    return (
      <div>
        { table }
        <Paginate
          onPaginate={this.onPaginate}
          totalItems={100}
          currentPage={this.state.currPage}
          perPage={this.state.maxPage}
          translations={{of: " of ", totalResults: "Total Result(s)", perPage: "Per Page"}} />
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
