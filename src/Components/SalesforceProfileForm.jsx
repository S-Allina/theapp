import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  MenuItem,
  InputAdornment,
  Container,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useCreateSalesforceAccountMutation } from '../services/authApi';
import { useSelector } from 'react-redux';

const SalesforceProfileForm = () => {
  const [createSalesforceAccount, { isLoading, isSuccess, error }] =
    useCreateSalesforceAccountMutation();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    website: '',
    jobTitle: '',
    department: '',
    street: '',
    city: '',
    country: '',
    leadSource: 'Website Registration',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        companyName: user.companyName || '',
        jobTitle: user.jobTitle || '',
      }));
    }
  }, [user]);

  const industries = [
    { value: '', label: 'Select Industry' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Other', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSalesforceAccount(formData).unwrap();
    } catch (err) {
      console.error('Failed to create Salesforce account:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
            Complete Your CRM Profile
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user
              ? `Welcome back, ${user.firstName}! Complete your Salesforce profile.`
              : 'Sync your profile with our Salesforce CRM'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PersonIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="600">
                      Personal Information
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name *"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder={user?.firstName ? `Current: ${user.firstName}` : ''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name *"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder={user?.lastName ? `Current: ${user.lastName}` : ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        placeholder={user?.email ? `Current: ${user.email}` : ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        placeholder={user?.phone ? `Current: ${user.phone}` : 'Add phone number'}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <BusinessIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="600">
                      Company Information
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder={
                          user?.companyName
                            ? `Current: ${user.companyName}`
                            : 'Enter your company name'
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WorkIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        placeholder={
                          user?.jobTitle ? `Current: ${user.jobTitle}` : 'Enter your job title'
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder="Enter your department"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        style={{ minWidth: '120px' }}
                      >
                        {industries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LanguageIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter company website"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LocationIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="600">
                      Address Information (Optional)
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder="Enter street address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder="Enter city"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        disabled={isSuccess}
                        placeholder="Enter country"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {user && (
            <Alert severity="info" sx={{ mt: 3, mb: 2 }}>
              <Typography variant="body2">
                <strong>Your current profile:</strong> {user.firstName} {user.lastName} •{' '}
                {user.email}
                {user.companyName && ` • ${user.companyName}`}
                {user.jobTitle && ` • ${user.jobTitle}`}
                {user.role && ` • ${user.role}`}
              </Typography>
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              Error: {('data' in error && error.data.displayMessage) || 'Failed to save profile'}
            </Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={
                isLoading ||
                isSuccess ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.email
              }
              startIcon={
                isLoading ? <CircularProgress size={20} /> : isSuccess ? <CheckCircleIcon /> : null
              }
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                ...(isSuccess && {
                  backgroundColor: 'success.main',
                  '&:hover': {
                    backgroundColor: 'success.dark',
                  },
                }),
              }}
            >
              {isLoading
                ? 'Saving to CRM...'
                : isSuccess
                ? 'Successfully Saved to CRM!'
                : 'Save to Salesforce CRM'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SalesforceProfileForm;
