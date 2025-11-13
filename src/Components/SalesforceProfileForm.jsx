import React, { useState } from 'react';
import { useCreateSalesforceAccountMutation } from './authApi';

const SalesforceProfileForm = () => {
  const [createSalesforceAccount, { isLoading, isSuccess, error }] = useCreateSalesforceAccountMutation();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: localStorage.getItem('userEmail') || '',
    phone: '',
    companyName: '',
    industry: '',
    website: '',
    jobTitle: '',
    department: '',
    street: '',
    city: '',
    country: '',
    leadSource: 'Website Registration'
  });

  const handleSubmit = async() => {
    try {
      await createSalesforceAccount(formData).unwrap();
      // Показать сообщение об успехе
    } catch (err) {
      console.error('Failed to create Salesforce account:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h3>✅ Profile successfully synced with Salesforce!</h3>
        <p>Your information has been saved in our CRM system.</p>
      </div>
    );
  }

  return (
    <div className="salesforce-form">
      <h2>Complete Your CRM Profile</h2>
      <p>Fill out this form to sync your profile with our customer management system.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Company Information</h3>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />
          <select name="industry" value={formData.industry} onChange={handleChange}>
            <option value="">Select Industry</option>
            <option value="IT">Information Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="url"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Address (Optional)</h3>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving to CRM...' : 'Save to Salesforce CRM'}
        </button>
        
        {error && (
          <div className="error-message">
            Error: {('data' in error && (error.data).displayMessage) || 'Failed to save profile'}
          </div>
        )}
      </form>
    </div>
  );
};

export default SalesforceProfileForm;