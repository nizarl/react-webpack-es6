const css = require('./app.scss');
import jsonData from './mock.json';

import React from 'react';
import ReactDOM from 'react-dom';

var moment = require('moment');
var _ = require('underscore');
var now = moment().format();

import  Orders from './orders.component.js'

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersData: []
    }
  }

  componentDidMount() {
    fetch('https://patientsummary-app-int.chenmed.local/PatientSummaryService/patientSummar' +
        'y/orderSummary/26669').then((response) => {
      return response.json();
    }).then((resp) => {
      var assembled = assembleOrders(resp)
       this.setState({ordersData: assembled})
    })

     function assembleOrders(data) {
        var temp = [];
        var immunizations = buildImmunization(data.immunizations);
        var assembled = temp.concat(data.orders, immunizations, data.referrals);
        var patientOrders = buildOrdersVM(assembled);
        return patientOrders
       
    }
    function buildImmunization(array) {
        var immun = array.map(function (element) {
            var date = moment(element.date, "MM/DD/YYYY");
            var f = moment(date).format('MM/DD/YY');
            element.date = element.orderDate;
            element.administeredDate = f;
            delete element.orderDate;
            return element;
        }, this);

        return immun;

    }

    function buildOrdersVM(array) {
        var sort = sortOrdersDefault(array);
        var formatDate = formatOrdersDate(sort);
        var patientOrders = formatDate;
        return patientOrders;
       // var addDataNotAval = addDataNotAvailable(formatDate);
       // ordersModel.patientOrders = angular.copy(addDataNotAval);
       // ordersModel.displayedCollection = angular.copy(addDataNotAval);
    }
    function sortOrdersDefault(array) {
        var sortedCollection = _.sortBy(array, function (order) {
            return moment(order.date, "MM-DD-YYYY");
        });

        sortedCollection.reverse();
        return sortedCollection;
    }

    function formatOrdersDate(array) {
        var formattedDates = array.map(function (element) {
            var date = moment(element.date, "MM/DD/YYYY");
            var f = moment(date).format('MM/DD/YY');
            var reason;
            element.date = f;
            return element;
        }, this);

        return formattedDates;
    }

    function addDataNotAvailable(array) {

        //this return is placeholder:
        //todo: add 'data is not available'
        return array;
    }

  }
  render() {
    if (this.state.ordersData.length > 1) {
    return <Orders ordersData={this.state.ordersData} />;
  }
   return <div>Loading...</div>;

    // return <Orders ordersData={this.state.ordersData} immunoData={this.state.immunoData} referralData={this.state.referralData}/>;
    
  }
}

ReactDOM.render(
  <Container/>, document.getElementById('root'));
