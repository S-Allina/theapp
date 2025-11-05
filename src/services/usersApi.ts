import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';
import { logout } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '#/theapp/login?error=Session expired';
      return { data: undefined, error: undefined };
    }
    if (result?.error?.status === 403) {
      window.location.href = '#/theapp/login?error=Your account has been blocked';
      return { data: undefined, error: undefined };
    }
    if (result?.error?.status === 404) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '#/theapp/login?error=User not found';
      return { data: undefined, error: undefined };
    }
    if (result?.error?.status === 'FETCH_ERROR') {
      window.location.href = '#/theapp/login?error=Network error, please try again';
      return { data: undefined, error: undefined };
    }

    return result;
  } catch (error) {
    window.location.href = '#/theapp/login?error=Unexpected error occurred';
    return { data: undefined, error: undefined };
  }
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserDto[], void>({
      query: () => '/user',
      transformResponse: (response: ResponseDto) => {
        if (response?.isSuccess && response?.result) {
          return response.result;
        }
        throw new Error(response.errorMessages?.join('.') || 'Failed to fetch users');
      },
      providesTags: ['Users'],
    }),
    getUserById: builder.query<UserDto, string>({
      query: (id) => `/user/${id}`,
      transformResponse: (response: ResponseDto) => {
        if (response?.isSuccess && response?.result) {
          return response.result;
        }
        throw new Error(response.errorMessages?.join('.') || 'Failed to fetch user');
      },
      providesTags: ['User'],
    }),
    blockUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/user/block',
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
        url: '/user/unblock',
        method: 'PATCH',
        body: userIds,
      }),
      invalidatesTags: ['Users'],
    }),
   changeRoleUsers: builder.mutation<ResponseDto, { userIds: string[], role: string }>({
  query: ({ userIds, role }) => ({
    url: '/user/role',
    method: 'PATCH',
    body: { userIds, role }, 
  }),
  invalidatesTags: ['Users'],
}),
    deleteUsers: builder.mutation<ResponseDto, string[]>({
      query: (userIds) => ({
        url: '/user',
        method: 'DELETE',
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
    deleteUnverifyUsers: builder.mutation<ResponseDto, void>({
      query: () => ({
        url: '/user/unconfirmedUsers',
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUsersMutation,
  useGetUserByIdQuery,
  useUnblockUsersMutation,
  useDeleteUsersMutation,
  useDeleteUnverifyUsersMutation,
  useChangeRoleUsersMutation,
} = usersApi;

interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  status: string;
}

interface ResponseDto {
  isSuccess: boolean;
  result: UserDto[];
  displayMessage: string | null;
  errorMessages: string[] | null;
}
