import React from 'react';
import "../styles/FuelQuote.css";
import Navbar from "../Navbar";

/*
- Fuel Quote Form with following fields: (We are not building pricing module yet)
	- Gallons Requested (numeric, required)
	- Delivery Address (Non-editable, comes from client profile)
	- Delivery Date (Calender, date picker)
	- Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module 
        - we are not building pricing module yet)
	- Total Amount Due (numeric non-editable, calculated (gallons * price))

*/
const FuelQuote = ({ quotes }) => {
    return (
      <div className="quote-page">
        <div className="nav">
            <Navbar />
        </div>
        <div className="quote-container">
          <center>
            <h2>FUEL QUOTE FORM</h2> {}
          </center>
            <form>
            <table>     
                <tr>
                    <td><label htmlFor="name">Gallons Requested:</label></td>
                    <td><input type="number" id="name" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="name">Delivery Address:</label></td>
                    <td><input type="text" id="address" value="123 Main Str" /></td>
                </tr>
                <tr>
                    <td><label htmlFor="email">Delivery Date:</label></td>
                    <td><input type="date" id="date" /></td>
                </tr>
                <tr>
                    <td><label htmlFor="email">Suggested Price:</label> </td>
                    <td><input type="number" id="price" value={69} /> </td>
                </tr>
                <tr>
                    <td><label htmlFor="email">Total Amount Due:</label></td>
                    <td><input type="number" id="totalDue" value={69*4.20}/></td>
                </tr>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </table>
            </form>
            
        </div>
      </div>
    );
};

export default FuelQuote;