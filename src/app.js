const css = require('./app.scss');
import jsonData from './mock.json';

import React from 'react';
import ReactDOM from 'react-dom';

var moment = require('moment');
var _ = require('underscore');
var now = moment().format();

import {getOrders, assembleOrders} from './helpers/fetch-build.orders.js'
import Orders from './orders.component.js'

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersData: []
    }
  }

  componentDidMount() {
    const url = 'https://patientsummary-app-int.chenmed.local/PatientSummaryService/patientSummary/orderSummary/26669';
    getOrders(url).then((resp) => {
      resp
        .json()
        .then(ret => {
          var patientOrders = assembleOrders(ret);
          this.setState({ordersData: patientOrders});
        });
    });
  }
  render() {
    if (this.state.ordersData.length > 1) {
      return <Orders ordersData={this.state.ordersData}/>;
    }
    return <div>Loading...</div>;
  }
}

ReactDOM.render(
  <Container/>, document.getElementById('root'));
