import { clearAllJobsState } from "../job/allJobsSlice"
import { clearValues } from "../job/JobSlice"
import { logoutUser } from "./UserSlice"

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser(message))
        thunkAPI.dispatch(clearAllJobsState())
        thunkAPI.dispatch(clearValues())
        return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}