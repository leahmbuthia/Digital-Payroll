import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    getAttendances: builder.query({
      query: () => "attendance",
      providesTags: ["Attendance"],
    }),

    getAttendance: builder.query({
      query: (attendanceId) => `attendance/${AttendanceId}`,
      providesTags: ["Attendance"],
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
      query: ({ attendanceId, ...attendance }) => ({
        url: `attendance/${attendanceId}`,
        method: "PUT",
        body: attendance,
      }),
      invalidatesTags: ["Attendance"],
    }),

    deleteAttendance: builder.mutation({
      query: (attendanceId) => ({
        url: `attendance/${attendanceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendancesQuery,
  useGetAttendanceQuery,
  useAddAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
