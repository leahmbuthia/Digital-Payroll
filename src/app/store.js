import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { employeeApi } from '../features/employee/employeeApi';

// import { friendApi } from '../features/friends/friendsApi';
// import { postApi } from '../features/posts/postsApi';
// import { userApi } from '../features/users/usersApi';
// import { commentApi } from '../features/Comments/CommentsApi';
// import { EventsApi } from '../features/event/EventApi';
// import { photosApi } from '../features/photos/photosApi';
// import { groupsApi } from '../features/groups/groupsApi';
// import { notificationApi } from '../features/Notifications/notificationApi';


export const store=configureStore({
    reducer:{
        // [friendApi.reducerPath]:friendApi.reducer,
        // [postApi.reducerPath]:postApi.reducer,
        // [userApi.reducerPath]:userApi.reducer,
        // [commentApi.reducerPath]:commentApi.reducer,
        // [EventsApi.reducerPath]:EventsApi.reducer,
        // [photosApi.reducerPath]: photosApi.reducer,
        // [groupsApi.reducerPath]: groupsApi.reducer,
        // [notificationApi.reducerPath]: notificationApi.reducer
         [employeeApi.reducerPath]: employeeApi.reducer
    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat( employeeApi.middleware)


})


setupListeners(store.dispatch)