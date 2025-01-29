import { configureStore } from '@reduxjs/toolkit'
import updateState from '../Features/updateState.js'
export const store = configureStore({
  reducer: {
    updater: updateState,
  },
  devTools: process.env.NODE_ENV !== "production",
}) 