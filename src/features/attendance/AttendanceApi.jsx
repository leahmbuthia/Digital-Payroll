import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    getAttendances: builder.query({
      query: () => "attendances",
      providesTags: ["Attendance"],
    }),

    getAttendance: builder.query({
      query: (attendance) => `attendance/employee/$EmployeeID`,
      providesTags: ["Attendance"],
    }),
    getDateAttendance: builder.query({
      query: () =>`attendance/$CreatedDate`,
      providesTags: ["Attendance"]
      
    }),

    addAttendance: builder.mutation({
      query: (attendance) => ({
        url: "attendance",
        method: "POST",
        body: attendance,
      }),
      invalidatesTags: ["Attendance"],
    }),

    updateAttendance: builder.mutation({
      query: (attendance ) => ({
        url: `attendance/${attendance.AttendanceID}`,
        method: "PUT",
        body: attendance,
      }),
      invalidatesTags: ["Attendance"],
    }),

    deleteAttendance: builder.mutation({
      query: (AttendanceID) => ({
        url: `attendance/${AttendanceID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendancesQuery,
  useGetAttendanceQuery,
  useGetDateAttendanceQuery,
  useAddAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
