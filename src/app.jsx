import React from 'react';
import ReactDOM from 'react-dom';
import {getOrders, assembleOrders} from './helpers/fetch-build.orders.js'
import Orders from './orders.component.jsx'

const css = require('./app.scss');

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
      resp.json()
        .then(ret => {
          var patientOrders = assembleOrders(ret);
          this.setState({ordersData: patientOrders});
        });
    });
  }
  render() {
    if (this.state.ordersData.length > 1) {
        console.log('ordersData array length:', this.state.ordersData.length)

      //For example only: state update.
      if (this.state.ordersData.length < 50) {
        setTimeout(() => {
          var arr = this.state.ordersData.concat(this.state.ordersData);
          this.setState({ordersData: arr});
        }, 4000)
      }

      return <Orders ordersData={this.state.ordersData} />;
    }
    return <div>Loading...</div>;
  }
}

ReactDOM.render(
  <Container/>, document.getElementById('root'));
