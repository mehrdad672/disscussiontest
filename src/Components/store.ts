import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import disSlice from './disSlice'

export const store = configureStore({
    reducer: {
     disSlice:disSlice
    },
  })

  export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
  export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;