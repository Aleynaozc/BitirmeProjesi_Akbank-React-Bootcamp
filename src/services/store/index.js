import { configureStore } from '@reduxjs/toolkit';

import authStore from './auth/index'

const store = configureStore({
 reducer: {
   auth: authStore
 }
});

export default store;