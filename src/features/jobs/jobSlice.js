import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobsList: [],
    filteredJobList: [],
    minSalary: [{ value: 10, label: '10K' }, { value: 20, label: '20K' }, { value: 30, label: '30K' }, { value: 40, label: '40K' }, { value: 50, label: '50K' }, { value: 60, label: '60K' }, { value: 70, label: '70K' }, { value: 80, label: '80K' }, { value: 90, label: '90K' }, { value: 100, label: '100K' }],
    minExperience: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    jobRoles: [],
    locations: [],
}

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        updateJobs: (state, action) => {
            state.jobsList = action?.payload
        },
        updateFilteredJobs: (state, action) => {
            state.filteredJobList = action?.payload
        },
        updateJobRoles: (state, action) => {
            state.jobRoles = action?.payload
        },
        updateLocations: (state, action) => {
            state.locations = action?.payload
        },
    }
})

export const { updateJobs, updateFilteredJobs, updateJobRoles, updateLocations } = jobSlice.actions;

export default jobSlice.reducer;