import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: '/identity/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      transformResponse: (response: ApiResponse<LoginResponse>) => {
        console.log(response);
        if (response.isSuccess && response.result && response.result.Status != 'Blocked') {
          localStorage.setItem('Id', response.result.Id);
          localStorage.setItem(
            'userName',
            response.result.firstName + ' ' + response.result.lastName,
          );
          localStorage.setItem('userEmail', response.result.email);
          localStorage.setItem('emailConfirmed', response.result.emailConfirmed.toString());
          localStorage.setItem('status', response.result.Status);
        }
        return response;
      },
    }),
    registerUser: builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
      query: (userData) => ({
        url: '/identity/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) => {
        console.log('Register Response:', response);
        return response;
      },
    }),
    forgotPassword: builder.mutation<ApiResponse<boolean>, string>({
      query: (forgotPasswordRequest) => ({
        url: '/identity/forgot-password',
        method: 'POST',
        body: forgotPasswordRequest,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<boolean>, ResetPasswordDto>({
      query: (resetPasswordRequest) => ({
        url: '/identity/reset-password',
        method: 'POST',
        body: resetPasswordRequest,
      }),
    }),
    logoutUser: builder.mutation<ApiResponse<boolean>, void>({
      query: () => ({
        url: '/identity/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('emailConfirmed');
          localStorage.removeItem('Id');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('status');
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
} = authApi;

interface LoginRequest {
  userName: string;
  password: string;
}

interface ResetPasswordDto {
  email: string;
  newPassword: string;
  token: string;
}

interface LoginResponse {
  Id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  lastActivity: Date;
  Status: string;
}

interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  userId: string;
  userName: string;
  email: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  displayMessage: string | null;
  errorMessages: string[] | null;
}
