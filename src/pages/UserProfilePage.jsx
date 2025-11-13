import React from 'react';
import SalesforceProfileForm from './SalesforceProfileForm';
import { useCreateSalesforceAccountMutation } from '../services/authApi';

// Можно добавить тестовую кнопку для разработки
const TestSalesforceButton = () => {
  const [createSalesforceAccount] = useCreateSalesforceAccountMutation();
  
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "+1234567890",
    companyName: "Test Company",
    industry: "IT",
    jobTitle: "Developer"
  };

  const handleTest = async () => {
    try {
      const result = await createSalesforceAccount(testData).unwrap();
      console.log('Salesforce creation result:', result);
    } catch (error) {
      console.error('Salesforce error:', error);
    }
  };

  return <button onClick={handleTest}>Test Salesforce Integration</button>;
};
export const UserProfilePage = () => {
  return (
    <div className="user-profile">
      <h1>My Profile</h1>
      
      <div className="profile-sections">
        {/* Основная информация пользователя */}
        <section className="basic-info">
          <h2>Basic Information</h2>
          {/* Твоя текущая форма профиля */}
        </section>
        
        {/* Salesforce интеграция */}
        <section className="crm-integration">
          <h2>CRM Integration</h2>
          <p>Complete your profile to sync with our customer management system.</p>
          <SalesforceProfileForm />
          <TestSalesforceButton/>
        </section>
      </div>
    </div>
  );
};