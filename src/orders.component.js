const css = require('./app.scss');
import jsonData from './mock.json';

import React from 'react';
import ReactDOM from 'react-dom';

var moment = require('moment');
var _ = require('underscore');
var now = moment().format();
import keyIndex from 'react-key-index';


const Orders = props => {
    var OrdersWithKeys = keyIndex(props.ordersData, 1)
  return (
    <div id="ordersDiv">
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
                  <th className="pointer b-table__th">Description</th>
                  <th className="pointer b-table__th">Order Date</th>
                  <th className="pointer b-table__th">Performed Date</th>
                  <th className="pointer b-table__th">Ordered By</th>
                  <th className="pointer b-table__th">Status</th>
                </tr>
              </thead>
              <tbody className="b-table__tbody">
                   {OrdersWithKeys.map((c, index) => (
                    <tr key={index}>
                    <td>{c.description}</td>
                    <td>{c.date}</td>
                    <td>{c.administeredDate}</td>
                    {c.source ? <td>{c.source.name.map(x => (<div key={x.given}>{x.given} {x.family}</div>
                        ))}</td>: <td></td>}
                    <td>{c.status}</td>
                    </tr>
                    ))}
                {/*<tr className="b-table__tr">
                  <td className="b-table__td--hidden"></td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                  <td className="b-table__td"></td>
                </tr>*/}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Orders;