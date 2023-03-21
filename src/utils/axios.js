import axios from "axios";
import { clearStore } from "../features/user/UserSlice";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    
})

// customFetch.interceptors.request.use((config) => {
//     const user = getUserFromLocalStorage()
//     if (user) {
//         config.headers['Authorization'] = `Bearer ${user.token}`
//     }
//     return config
// })

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue('Unathorized! Logging out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch