import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { employeeApi } from '../features/employee/employeeApi';
import { attendanceApi } from '../features/attendance/AttendanceApi';
import { payrollApi } from '../features/payroll/payrollApi';
import { scheduleApi } from '../features/Schedule/ScheduleApi';

export const store=configureStore({
    reducer:{
    
         [employeeApi.reducerPath]: employeeApi.reducer,
         [attendanceApi.reducerPath]: attendanceApi.reducer,
         [payrollApi.reducerPath]: payrollApi.reducer,
         [scheduleApi.reducerPath]: scheduleApi.reducer
    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat( employeeApi.middleware, attendanceApi.middleware, payrollApi.middleware,scheduleApi.middleware)


})


setupListeners(store.dispatch)