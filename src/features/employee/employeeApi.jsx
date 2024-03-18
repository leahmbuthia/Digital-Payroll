import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "employee",
      providesTags: ["Employee"],
    }),
    getEmployee: builder.query({
      query: (EmployeeID) => `employee/${EmployeeID}`,
      providesTags: ["Employee"],
    }),
    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "employee",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),
    authenticateEmployee: builder.mutation({
      query: (employee) => ({
        url: "employee/auth/login",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `employee/${employee.EmployeeID}`,
        method: "PUT",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (EmployeeID) => ({
        url: `employee/${EmployeeID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useAuthenticateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;

