import React from "react";
import "../styles/QuoteHistory.css";
import Navbar from "./Navbar";
import Footer from './Footer';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const QuoteHistory = ({ quotes }) => {
  return (
    <div className="history-page">
      <div className="nav">
        <Navbar />
      </div>
      <div className="history-container">
        <center>
          <h2>FUEL QUOTE HISTORY</h2> {}
        </center>
        <div className="tablebox">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Gallons</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Suggested Price</th>
                <th>Total Amount Due</th>
              </tr>
            </thead>
            <tbody>

            {quotes.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.date}</td>
                  <td>{value.gallons}</td>
                  <td>{value.address}</td>
                  <td>{value.city}</td>
                  <td>{value.state }</td>
                  <td>{value.zipcode}</td>
                  <td>{formatter.format(value.price)}</td>
                  <td>{formatter.format(value.due)}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

// Default prop in case quotes are not provided
QuoteHistory.defaultProps = {
  quotes: [],
};

export default QuoteHistory;
