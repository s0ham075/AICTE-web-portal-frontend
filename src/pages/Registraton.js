import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [instituteName, setInstituteName] = useState('');
  const [confirmEmail, setConfirmEmail] = useState();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [contactPersonData, setContactPersonData] = useState({
    cpFirstName: '',
    cpLastName: '',
    cpDesignation: '',
    cpNumber: '',
    cpEmail: '',
    address: ''
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setContactPersonData({
      ...contactPersonData,
       [name]: value,
      });
  }

  const navigate = useNavigate();

  const onSubmitHandler = () => {
    navigate('/payment-process');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:3500/auth/register', {
        instituteName,
        firstName : contactPersonData.cpFirstName,
        lastName : contactPersonData.cpLastName,
        designation : contactPersonData.cpDesignation,
        address : contactPersonData.address,
        email : contactPersonData.cpEmail,
        contactNumber : contactPersonData.cpNumber,
      });
      console.log(response.data.success)
      // Redirect or perform other actions based on the response
    } catch (error) {
      console.error('Error during registration:', error);
    }
    navigate('/dashboard')
  };

  const emailIdHandler = (confirmEmail) => {
    if(confirmEmail === contactPersonData.cpEmail){
      setConfirmEmail(confirmEmail);
    }
    else{
      setConfirmEmail("");
      alert("Wrong email");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label htmlFor="instituteName" className="block text-sm font-medium text-gray-600">
            Institute Name
          </label>
          <input
            type="text"
            id="instituteName"
            className="mt-1 p-2 border rounded w-full"
            value={instituteName}
            onChange={e => setInstituteName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact-person-fn" className="block text-sm font-medium text-gray-600">
            contact-person-first-name
          </label>
          <input
            type="text"
            id="cp-fname"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.cpFirstName}
            name='cpFirstName'
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cp-ln" className="block text-sm font-medium text-gray-600">
            Contact-person-last-name
          </label>
          <input
            type="text"
            id="cp-lname"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.cpLastName}
            name='cpLastName'
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cp-design" className="block text-sm font-medium text-gray-600">
            Contact-person-Designation
          </label>
          <input
            type="text"
            id="cp-designation"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.cpDesignation}
            name='cpDesignation'
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            rows="3"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.address}
            name='address'
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="cpEmail" className="block text-sm font-medium text-gray-600">
            Contact-person-Email
          </label>
          <input
            type="text"
            id="cp-email"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.cpEmail}
            name='cpEmail'
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-emailId" className="block text-sm font-medium text-gray-600">
            Confirm Email-Id
          </label>
          <input
            type="text"
            id="confirm-email"
            className="mt-1 p-2 border rounded w-full"
            value={confirmEmail}
            onChange={(e) => emailIdHandler(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cp-num" className="block text-sm font-medium text-gray-600">
            Contact-person-Contact-number
          </label>
          <input
            type="text"
            id="cp-number"
            className="mt-1 p-2 border rounded w-full"
            value={contactPersonData.cpNumber}
            name='cpNumber'
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            id="acceptTerms"
            className="mr-2"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-600">
            I accept the terms and conditions
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;