import React from 'react';
import ReactDOM from 'react-dom';

var moment = require('moment');
var _ = require('underscore');
var now = moment().format();

export const getOrders = function (url) {
    return fetch(url);
}

export const assembleOrders = function assembleOrders(data) {
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
