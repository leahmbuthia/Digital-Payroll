import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleApi = createApi({
  reducerPath: "ScheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  tagTypes: ["Schedule"],
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => "schedule",
      providesTags: ["Schedule"],
    }),

    getSchedule: builder.query({
      query: (EmployeeID) => `schedule/user/${EmployeeID}`,
      providesTags: ["Schedule"],
    }),

    addSchedule: builder.mutation({
      query: (schedule) => ({
        url: "schedule",
        method: "POST",
        body: schedule,
      }),
      invalidatesTags: ["Schedule"],
    }),

    updateSchedule: builder.mutation({
      query: ({ schedule }) => ({
        url: `schedule/${schedule.ScheduleID}`,
        method: "PUT",
        body: schedule,
      }),
      invalidatesTags: ["Schedule"],
    }),

    deleteSchedule: builder.mutation({
      query: (scheduleID) => ({
        url: `schedule/${scheduleID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
