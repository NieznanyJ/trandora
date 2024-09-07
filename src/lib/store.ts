import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './features/filterSlice'
import cartSlice from './features/cartSlice'

export const store = () => {
  return configureStore({
    reducer: {filterSlice, cartSlice},
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']