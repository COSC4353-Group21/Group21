import React from "react";
import "../styles/QuoteHistory.css";
import Navbar from "./Navbar";
import Footer from './Footer';

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
                <th>Gallons Requested</th>
                <th>Delivery Address</th>
                <th>Delivery Date</th>
                <th>Suggested Price Per Gallon</th>
                <th>Total Amount Due</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder row for demonstration purposes */}
              <tr>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
                <td>No data </td>
              </tr>
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
