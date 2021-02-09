import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FiltersInterface, GroupInterface, Sort} from "../types/app";
import {AppThunk} from "./index";
import getGroups from "./getGroups";

interface SelectGroupsState {
    groups: GroupInterface[],
    selectedGroups: GroupInterface[],
    sort: Sort,
    filters: FiltersInterface,
    after: any[] | null,
    before: any[] | null,
    isLoading: boolean,
    error: string | null
}

const initialState: SelectGroupsState = {
    groups: [],
    selectedGroups: [],
    filters: {
        price: {
            min: 0,
            max: 9000
        },
        subscribers: {
            min: 0,
            max: 1400
        },
    },
    after: [],
    before: [],
    isLoading: false,
    error: null,
    sort: "by_price"
}

const selectGroupsSlice = createSlice({
    name: "selectGroups",
    initialState,
    reducers: {
        fetchGroupsStart: (state) => {
            state.error = null
            state.isLoading = true
        },
        fetchGroupsSuccess: (state, action: PayloadAction<{ data: GroupInterface[], after: any[] | null, before: any[] | null }>) => {
            state.groups = action.payload.data.filter(e => !state.selectedGroups.find(el => e.id === el.id))
            state.after = action.payload.after && action.payload.after.length ? action.payload.after : null
            state.before = action.payload.before && action.payload.before.length ? action.payload.before : null
            state.isLoading = false
        },
        fetchGroupsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        clearGroups: state => {
            state.groups = []
            state.before = null
            state.after = null
        },
        setFilters: (state, action: PayloadAction<FiltersInterface>) => {
            state.filters = action.payload
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload
        },
        selectGroup: (state, action: PayloadAction<GroupInterface>) => {
            state.selectedGroups.push(action.payload)
            state.groups = state.groups.filter(el => el.id !== action.payload.id)
        }
    }
})

export const fetchGroups = (direction: "backward" | "forward"): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(selectGroupsSlice.actions.fetchGroupsStart())
        const data = await getGroups(getState().selectGroups.filters,
            direction === "backward" ? getState().selectGroups.before : null,
            direction === "forward" ? getState().selectGroups.after : null,
            getState().selectGroups.sort
        )
        dispatch(selectGroupsSlice.actions.fetchGroupsSuccess(data))

    } catch (err) {
        dispatch(selectGroupsSlice.actions.fetchGroupsFailure(err))
    }
}

export const updateFilters = (filters: FiltersInterface): AppThunk => async (dispatch, getState) =>{
    dispatch(selectGroupsSlice.actions.setFilters(filters))
    dispatch(selectGroupsSlice.actions.clearGroups())
    dispatch(fetchGroups("forward"))
}

export const updateSort = (sort: Sort): AppThunk => async (dispatch, getState) =>{
    dispatch(selectGroupsSlice.actions.setSort(sort))
    dispatch(selectGroupsSlice.actions.clearGroups())
    dispatch(fetchGroups("forward"))
}

export default selectGroupsSlice