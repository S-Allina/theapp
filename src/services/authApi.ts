// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { API_BASE_URL } from '../../config/api';

// interface ApiResponse<T> {
//   isSuccess: boolean;
//   result: T;
//   displayMessage: string | null;
//   errorMessages: string[] | null;
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: API_BASE_URL,
//   prepareHeaders: (headers) => {
//     return headers;
//   },
// });

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: baseQuery,
//   endpoints: (builder) => ({
//     loginUser: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
//       query: (credentials) => ({
//         url: '/Auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//       transformResponse: (response: ApiResponse<LoginResponse>) => {
//         console.log(response);
//         if (response.isSuccess && response.result && response.result.token) {
//           localStorage.setItem('token', response.result.token);
//           localStorage.setItem('userId', response.result.userId);
//           localStorage.setItem('userName', response.result.userName);
//           localStorage.setItem('userEmail', response.result.email);
//         }
//         return response;
//       },
//     }),
//     registerUser: builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
//       query: (userData) => ({
//         url: '/Auth/register',
//         method: 'POST',
//         body: userData,
//       }),
//       transformResponse: (response: ApiResponse<RegisterResponse>) => {
//         console.log('Register Response:', response);
//         return response;
//       },
//     }),
//     logoutUser: builder.mutation<ApiResponse<boolean>, void>({
//       query: () => ({
//         url: '/Auth/logout',
//         method: 'GET',
//       }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           localStorage.removeItem('token');
//           localStorage.removeItem('userId');
//           localStorage.removeItem('userName');
//           localStorage.removeItem('userEmail');
//           dispatch(authApi.util.resetApiState());
//         } catch (error) {
//           console.error('Logout error:', error);
//         }
//       },
//     }),

//     updateUser: builder.mutation({
//       query: (participant) => ({
//         url: `/participants`,
//         method: 'PUT',
//         body: participant,
//         prepareHeaders: (headers) => {
//           headers.set('Content-Type', 'application/json');
//           return headers;
//         },
//       }),
//     }),
//     getParticipantByUserId: builder.query({
//       query: (id) => `/participants/GetByUserId/${id}`,
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useLogoutUserMutation,
//   useRegisterUserMutation,
//   useUpdateUserMutation,
// } = authApi;

// interface LoginRequest {
//   userName: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
//   userId: string;
//   userName: string;
//   email: string;
// }
// interface RegisterRequest {
//   userName: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth?: string;
// }

// interface RegisterResponse {
//   userId: string;
//   userName: string;
//   email: string;
// }
