import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        currentEmotionMeter: null
    },
    reducers: {
        setuser: (state, action) => {
            state.user = action.payload
        },
        
        setCurrentEmotionMeter: (state, action) => {
            state.currentEmotionMeter = action.payload
        }
    }
})

export const { setuser, setCurrentEmotionMeter } = userSlice.actions;
export default userSlice.reducer;