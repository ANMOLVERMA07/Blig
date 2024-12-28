import { createSlice} from '@reduxjs/toolkit'


const initialState = {
    status : false,
    userData : null,
}

// ye jo slice wala kaam h ye authentictaion track krne ke liye hai , ye hum btaega ki user authenticated h ya nhi , ye mei store se har baar puchunga
const authSlice = createSlice({
    name: "auth",   // rule h phle koi user-defined naam dena h,fir initial state or fir reducers
    initialState,
    reducers : {
        login : (state,action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const { login , logout } = authSlice.actions

export default authSlice.reducers;
