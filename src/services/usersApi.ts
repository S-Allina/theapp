import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';

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

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserDto[], void>({
      query: () => '/api/users',
      transformResponse: (response: ResponseDto) => {
        if (response.isSuccess && response.result) {
          return response.result;
        }
        throw new Error(response.errorMessages?.join('.') || 'Failed to fetch users');
      },
      providesTags: ['Users'],
    }),
    updateActivity: builder.mutation<void, void>({
      query: () => ({
        url: '/api/users/activity',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    blockUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/api/users/block',
        method: 'PATCH',
        body: userIds,
      }),
      onQueryStarted: async (userIds, { dispatch, queryFulfilled }) => {
        try {
          console.log(userIds);
          const { data } = await queryFulfilled;
          if (data.isSuccess && data.result) {
            dispatch(
              usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
                return data.result;
              }),
            );
          }
        } catch (error) {
          console.error('Failed to update cache after blocking users:', error);
        }
      },
    }),
    unblockUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/api/users/unblock',
        method: 'PATCH',
        body: userIds,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/api/users',
        method: 'DELETE',
        body: userIds,
        credentials: 'include',
      }),
      onQueryStarted: async (userIds, { dispatch, queryFulfilled }) => {
        try {
          console.log(userIds);
          const { data } = await queryFulfilled;
          console.log(data);

          if (data.isSuccess && data.result) {
            dispatch(
              usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
                return data.result;
              }),
            );
          }
        } catch (error) {
          console.error('Failed to delete users:', error);
        }
      },
    }),
    deleteUnverifyUsers: builder.mutation<ResponseDto, void>({
      query: () => ({
        url: '/api/users/unconfirmedUsers',
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
