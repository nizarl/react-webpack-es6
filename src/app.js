const css = require('./app.scss');
import jsonData from './mock.json';

import React from 'react';
import ReactDOM from 'react-dom';

const Orders = props => {
  return (
    <div id="ordersDiv">
      <ul>
        {props
          .ordersData
          .map(c => (
            <li>{c.date}</li>
          ))}
      </ul>
      <ul>
        {props
          .immunoData
          .map(c => (
            <li>{c.date}</li>
          ))}
      </ul>
      {/*<ul>
        {props
          .referralData
          .map(c => (
            <li>{c.date}</li>
          ))}
      </ul>*/}
      <div className="b-card b-orders-card">
        <div
          id="orders-container"
          className="b-card__header b-orders-card__header--orange">
          <span className="b-card__header-title">Orders</span>
          <a
            href="#"
            data-toggle="collapse"
            data-target="#orders"
            data-collapse-group="myDivs">
            <span className="b-card__header-arrow"></span>
          </a>
        </div>
        <div className="b-card__body">
          <div id="orders" className="collapse in">
            <table id="tableOrders" className="b-table table-orders table table-hover">
              <thead className="b-table__thead">
                <tr>
                  <th className="b-table__th--hidden">Row</th>
                  <th id="ord-desc-header" className="pointer b-table__th"></th>
                  <th className="pointer b-table__th"></th>
                  <th className="pointer b-table__th">Performed Date</th>
                  <th className="pointer b-table__th">Ordered By</th>
                  <th className="pointer b-table__th">Status</th>
                </tr>
              </thead>
              <tbody className="b-table__tbody">
                <tr className="b-table__tr">
                  <td className="b-table__td--hidden"></td>
                  <td className="b-table__td" id="ord-desc-content">
                    <strong></strong>
                  </td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersData: [],
      immunoData: [],
      referalData:[]
    }
  }

  componentDidMount() {
    fetch('https://patientsummary-app-int.chenmed.local/PatientSummaryService/patientSummar' +
        'y/orderSummary/26669').then((response) => {
      return response.json();
    }).then((resp) => {

      this.setState({ordersData: resp.orders})
      this.setState({immunoData: resp.immunizations})
      this.setState({referralData: []})
      console.log('resp', resp);
    })

  }
  render() {
    return <Orders ordersData={this.state.ordersData} immunoData={this.state.immunoData} referralData={this.state.referralData}/>;
  }
}

ReactDOM.render(
  <Container/>, document.getElementById('root'));
