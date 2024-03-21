const API = import.meta.env.VITE_API_DOMAIN
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: 'users/auth/register',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation({
            query: (user) => ({
                url: 'users/auth/login',
                method: 'POST',
                body: user
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'users/auth/logout',
                method: 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (user) => {
                const { id, ...userWithoutId } = user;
                return {
                    url: `users/profile/${id}`,
                    method: 'PUT',
                    body: userWithoutId
                }
            }
        }),
        upload: builder.mutation({
            query: (file) => ({
                url: 'upload-user-profile',
                method: 'POST',
                body: file
            })
        }),
    })
})

export const { useUpdateUserMutation, useUploadMutation, useRegisterUserMutation, useLoginMutation, useLogoutMutation, useMeQuery } = usersApi;
