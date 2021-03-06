import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import css from './app.scss';

const Orders = props => {
  return (
    <div id="ordersDiv">
      <div className="b-card b-orders-card">
        <div
          id="orders-container"
          className="b-card__header b-orders-card__header--orange">
          <span className="b-card__header-title">Orders
            <span style={emptySpan} className="fa fa-chevron-up pull-right"></span>
          </span>
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
                {props
                  .ordersData
                  .map((c, index) => (
                    <tr className="b-table__tr" key={index}>
                      <td>{c.description}</td>
                      <td>{c.date}</td>
                      <td
                        className={(c.administeredDate
                        ? ''
                        : 'empty-orders-cell')}>{c.administeredDate}</td>
                      {c.source
                        ? <td>{c
                              .source
                              .name
                              .map((x, index) => (
                                <div key={index}>{x.given} {x.family}</div>
                              ))}</td>
                        : <td className="empty-orders-cell"></td>}
                      <td>{c.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Orders.propTypes = {
  ordersData: PropTypes
    .arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    source: PropTypes.shape({
      //todo: add object props.
    }).isRequired
  })).isRequired
}

var emptySpan = {
  color: '#005491',
  padding: '0px 18px 0px 0px',
  fontSize: '16px'
};

module.exports = Orders;