import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi=createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8100/api/'}),
    tagTypes: ['employee'],

    endpoints:(builder)=>({

        getUsers:builder.query({
            query:()=>'employee',
            providesTags: ['employee']
        }),

        addUsers:builder.mutation({
            query: (employee)=>({
                url: 'employee',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['employee']
        })

    })
})


export const {useGetUsersQuery, useAddUsersMutation}=userApi