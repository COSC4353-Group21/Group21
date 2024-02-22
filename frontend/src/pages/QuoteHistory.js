import React from 'react';
import "../styles/QuoteHistory.css";

const QuoteHistory = ({ quotes }) => {
    return (
      <div className="history-page"> 
        <div className="history-container">
          <center>
            <h2>FUEL QUOTE HISTORY</h2> {}
          </center>
          <div className='tablebox'>
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
      </div>
    );
};

// Default prop in case quotes are not provided
QuoteHistory.defaultProps = {
  quotes: []
};

export default QuoteHistory;