import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ApiResponse<LoginResponse>, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    loginUser: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),

      transformResponse: (response: ApiResponse<LoginResponse>) => {
        console.log(response);
        if (response.isSuccess && response.result && response.returnUrl) {
          localStorage.setItem('returnUrl', response.returnUrl);
          localStorage.setItem('userName', response.result.userName);
          localStorage.setItem('userEmail', response.result.email);
        }
        if (response.isSuccess && response.result && response.result.Status != 'Blocked') {
          localStorage.setItem('userId', response.result.id);
          localStorage.setItem('userEmail', response.result.email);
          localStorage.setItem('emailConfirmed', response.result.emailConfirmed.toString());
          localStorage.setItem('status', response.result.Status);
          localStorage.setItem('theme', response.result.theme);
          localStorage.setItem('role', response.result.role);
        }
        console.log(localStorage);
        return response;
      },
    }),
    registerUser: builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) => {
        return response;
      },
    }),
    forgotPassword: builder.mutation<ApiResponse<boolean>, string>({
      query: (forgotPasswordRequest) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: forgotPasswordRequest,
      }),
    }),
    createSalesforceAccount: builder.mutation<ApiResponse<boolean>, UserAdditionalInfoDto>({
      query: (userInfo) => ({
        url: '/auth/create-salesforce-account',
        method: 'POST',
        body: userInfo,
        credentials: 'include',
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<boolean>, ResetPasswordDto>({
      query: (resetPasswordRequest) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: resetPasswordRequest,
      }),
    }),
    logoutUser: builder.mutation<ApiResponse<boolean>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('emailConfirmed');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('status');
          localStorage.removeItem('role');
          dispatch(authApi.util.resetApiState());
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCreateSalesforceAccountMutation,
} = authApi;

interface LoginRequest {
  userName: string;
  password: string;
  returnUrl: string;
}

interface LoginResponse {
  accessToken: string;
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  Status: string;
  theme: string;
  language: string;
  role: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  id: string;
  userName: string;
  email: string;
}
interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  displayMessage: string | null;
  errorMessages: string[] | null;
  returnUrl: string;
}

interface ResetPasswordDto {
  email: string;
  newPassword: string;
  token: string;
}

interface UserAdditionalInfoDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  website?: string;
  jobTitle?: string;
  department?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  leadSource?: string;
  description?: string;
}
