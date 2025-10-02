import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';
import { logout } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error?.originalStatus === 403) {
      window.location.href = '#/theapp/login?error=Your account has been blocked';
      return { data: undefined, error: undefined };
    }
    if (result?.Status === 500 && result.data.ErrorMessages[0].includes('User not found')) {
      window.location.href = '#/theapp/login?error=Your account has been delete';
      return { data: undefined, error: undefined };
    }
    return result;
  } catch (error) {
    window.location.hash = '#/theapp/login?error=Unexpected error occurred';
    return { data: undefined, error: undefined };
  }
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserDto[], void>({
      query: () => '/users',
      transformResponse: (response: ResponseDto) => {
        if (response?.isSuccess && response?.result) {
          return response.result;
        }
        throw new Error(response.errorMessages?.join('.') || 'Failed to fetch users');
      },
      providesTags: ['Users'],
    }),
    updateActivity: builder.mutation<void, void>({
      query: () => ({
        url: '/users/activity',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    blockUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/users/block',
        method: 'PATCH',
        body: userIds,
      }),
      onQueryStarted: async (userIds, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.isSuccess && data.result) {
            dispatch(
              usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
                return data.result;
              }),
            );
          }
        } catch (error) {}
      },
    }),
    unblockUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/users/unblock',
        method: 'PATCH',
        body: userIds,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/users',
        method: 'DELETE',
        body: userIds,
        credentials: 'include',
      }),
      onQueryStarted: async (userIds, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.isSuccess && data.result) {
            dispatch(
              usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
                return data.result;
              }),
            );
          }
        } catch (error) {}
      },
    }),
    deleteUnverifyUsers: builder.mutation<ResponseDto, void>({
      query: () => ({
        url: '/users/unconfirmedUsers',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useDeleteUsersMutation,
  useUpdateActivityMutation,
  useDeleteUnverifyUsersMutation,
} = usersApi;

interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  job: string;
  lastActivity: string;
  status: string;
}

interface ResponseDto {
  isSuccess: boolean;
  result: UserDto[];
  displayMessage: string | null;
  errorMessages: string[] | null;
}
