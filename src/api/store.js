import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/UserSlice";
import jobSlice from "../features/job/JobSlice";
import allJobsSlice from "../features/job/allJobsSlice";


export const store = configureStore({
    reducer : {
        user: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice,
    }
})