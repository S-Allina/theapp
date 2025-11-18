import React from 'react';
import { useCreateSalesforceAccountMutation } from '../services/authApi';
import SalesforceProfileForm from '../Components/SalesforceProfileForm';

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
      <div className="profile-sections">
        
        <section className="crm-integration">
          <SalesforceProfileForm />
          <TestSalesforceButton/>
        </section>
      </div>
    </div>
  );
};