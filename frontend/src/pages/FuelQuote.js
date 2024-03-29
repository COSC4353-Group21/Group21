import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clientWithAuth } from '../services/axiosClient'
import '../styles/FuelQuote.css';
import Navbar from './Navbar';
import Footer from './Footer';
/*
- Fuel Quote Form with following fields: (We are not building pricing module yet)
	- Gallons Requested (numeric, required)
	- Delivery Address (Non-editable, comes from client profile)
	- Delivery Date (Calender, date picker)
	- Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module 
        - we are not building pricing module yet)
	- Total Amount Due (numeric non-editable, calculated (gallons * price))

*/



const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const FuelQuote = () => {
  const username = localStorage.getItem('username')
  const [gallons, setGallons] = useState('')
  const [date, setDate] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [FormValid, setFormValid] = useState(false)
  const [profile, setProfile] = useState({
    address1: '...',
    address2: '...',
    city: '...',
    state: '...',
    zipcode: '...',
  })

  const [quote, setQuote] = useState({
    price: '...',
    due: '...',
  })

  const handleCheckFormValid = () => {
    if (gallons !== '' && date !== '') {
      setFormValid(true)
    }
  }

  const handleGallonsChange = (e) => {
    setGallons(e.target.value)
    handleCheckFormValid()
  }

  const handleDateChange = (e) => {
    setDate(e.target.value)
    handleCheckFormValid()
  }

  const handleGetQuote = async (e) => {
    e.preventDefault()
    await clientWithAuth(token)
      .get('/quote/' + username + '/' + gallons)
      .then((response) => {
        setQuote(response.data)
      })
    handleCheckFormValid()
  }

  const handleQuoteSubmit = async (e) => {
    e.preventDefault()
    if (FormValid === false) {
      alert('Please complete the form !!')
      return
    }
    // DEBUG
    console.log(gallons)
    console.log(date)
    await clientWithAuth(token)
      .post('/quote', {
        username,
        address1: profile.address1,
        address2: profile.address2,
        city: profile.city,
        state: profile.state,
        zipcode: profile.zipcode,
        gallons,
        date,
        price: quote.price,
        due: quote.due,
      })
      .then((response) => {})
      .catch((error) => {
        const status = error.response.status
        if (status === 400) {
          alert('Submission failed!')
          navigate('/quote')
        }
      })
    navigate('/history')
  }

  useEffect(() => {
    if (!token) {
      localStorage.clear()
      navigate('/login')
    } else {
      clientWithAuth(token)
        .get('/profile/' + username)
        .then((response) => {
          if (response.data.full_name === null) {
            navigate('/profile/edit')
          }
          setProfile(response.data)
        })
    }
  }, [])

  return (
    <div className='quote-page'>
      <div className='nav'>
        <Navbar />
      </div>
      <div className='quote-container'>
        <center>
          <h2>FUEL QUOTE FORM</h2> {}
        </center>
        <form onSubmit={handleGetQuote}>
          <table>
            <tr>
              <td>
                <label className='label' htmlFor='Gallons_Requested'>
                  Gallons Requested:
                </label>
              </td>
              <td>
                <input
                type='number'
                id='Gallons_Requested'
                name='Gallons_Requested'
                placeholder='Enter Gallons of Fuel'
                min='1'
                onChange={handleGallonsChange}
                required />
              </td>
            </tr>
            <tr>
              <td>
                <label className='label' htmlFor='delivery_date'>
                  Delivery Date:
                </label>
              </td>
              <td>
                <input
                type='date'
                id='delivery_date'
                name ='delivery_date'
                min={new Date().toISOString().split('T')[0]}
                onChange={handleDateChange}
                required
              />
              </td>
            </tr>
            <tr>
              <td>
                <label className = 'label' htmlFor='delivery_address'>
                  Delivery Address:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='delivery_address'
                name='delivery_address'
                placeholder='Address'
                value={profile.address1 + ', ' + profile.address2}
                readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className = 'label' htmlFor='delivery_city'>
                  Delivery City:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='delivery_city'
                name='delivery_city'
                placeholder='City'
                value={profile.city}
                readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className = 'label' htmlFor='delivery_state'>
                  Delivery State:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='delivery_state'
                name='delivery_state'
                placeholder='State'
                value={profile.state}
                readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className = 'label' htmlFor='delivery_zip'>
                  Delivery Zipcode:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='delivery_zip'
                name='delivery_zip'
                placeholder='Zipcode'
                value={profile.zipcode}
                readOnly
                />
              </td>
            </tr>
              <button type='submit' onSubmit={handleGetQuote}>
              GET QUOTE
            </button>
          </table>
        </form>
        <form onSubmit={handleQuoteSubmit}>
          <table>
          <tr>
              <td>
                <label className = 'label' htmlFor='suggested_gallon_price'>
                  Suggested Price:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='suggested_gallon_price'
                name='suggested_gallon_price'
                value={formatter.format(quote.price)}
                readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className = 'label' htmlFor='total_amount'>
                  Total Amount Due:
                </label>
              </td>
              <td>
                <input
                type='text'
                id='total_amount'
                name='total_amount'
                placeholder='$'
                value={formatter.format(quote.due)}
                readOnly
                />
              </td>
            </tr>
            <button type='submit' onSubmit={handleQuoteSubmit}>
              SUBMIT
            </button>
          </table>
          </form>
      </div>
      <Footer/>
    </div>
  );
};

export default FuelQuote;
