import {Action, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineReducers} from "redux"
import selectGroupsSlice from "./selectGroupsSlice";
import {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
    selectGroups: selectGroupsSlice.reducer
})

export default configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>