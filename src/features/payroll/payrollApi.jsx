import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const payrollApi = createApi({
  reducerPath: "payrollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  tagTypes: ["Payroll"],
  endpoints: (builder) => ({
    getPayrolls: builder.query({
      query: () => "payrolls",
      providesTags: ["Payroll"],
    }),

    getPayroll: builder.query({
      query: (Employee) => `payrolls/user/${Employee.EmployeeID}`,
      providesTags: ["Payroll"],
    }),
    getPayrollByID: builder.query({
      query: (PayrollID) => `payrolls/${PayrollID}`,
      providesTags: ["Payroll"],
    }),
    addPayroll: builder.mutation({
      query: (payroll) => ({
        url: "payrolls",
        method: "POST",
        body: payroll,
      }),
      invalidatesTags: ["Payroll"],
    }),

    updatePayroll: builder.mutation({
      query: ({ payroll }) => ({
        url: `payrolls/${payroll.PayrollID}`,
        method: "PUT",
        body: payroll,
      }),
      invalidatesTags: ["Payroll"],
    }),

    deletePayroll: builder.mutation({
      query: (PayrollID) => ({
        url: `payrolls/${PayrollID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const {
  useGetPayrollsQuery,
  useGetPayrollQuery,
  useGetPayrollByIDQuery,
  useAddPayrollMutation,
  useUpdatePayrollMutation,
  useDeletePayrollMutation,
} = payrollApi;
