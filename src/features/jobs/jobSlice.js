import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobsList: [],
}

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        updateJobs: (state, action) => {
            state.jobsList = action?.payload
        },
    }
})

export const { updateJobs } = jobSlice.actions;

export default jobSlice.reducer;