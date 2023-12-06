import { createSlice } from '@reduxjs/toolkit'

export const soundSlice = createSlice({
    name: "sound",
    initialState: {
        sound: null
    },
    reducers: {
        setsound: (state, action) => {
            state.sound = action.payload
        }
    }
})

export const { setsound } = soundSlice.actions;
export default soundSlice.reducer;