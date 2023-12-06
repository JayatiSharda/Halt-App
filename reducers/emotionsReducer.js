import { createSlice } from '@reduxjs/toolkit'

export const emotionsSlice = createSlice({
    name: "emotions",
    initialState: {
        confused: ['Flustered', 'Uncertain', 'Confused', 'Disturbed', 'Trapped', 'Misunderstood'],
        fear: ['Uneasy', 'Panic', 'Anxious', 'Afraid', 'Stressed', 'Awkward', 'Uneasy'],
        angry: ['Annoyed', 'Bugged', 'Outrage', 'Stress', 'Sullen', 'Furious', 'Aggravate'],
        hurt: ['Troubled', 'Annoyed', 'Hurt', 'Neglected', 'Stress', 'Devastated'],
        bored: ['Mundane' , 'Repetitive', 'Discouraged', 'Lethargic', 'Distracted'],
        emotions: ['Bored','Fear', 'Hurt', 'Angry', 'Confused', 'Remorse', 'Lonely', 'Inadequate', 'Depressed']
    },
})

export default emotionsSlice.reducer;