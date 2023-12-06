import { createSlice } from '@reduxjs/toolkit'

// List of activities
export const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        confused: ['Witty Wordsmith', 'Hat tricks', 'Clarity Quest'],
        fear: ['Hide Out', 'Stretch out', 'Journalifying'],
        angry: ['Brain dump', 'Embrace the Burn', 'Zen in Ten'],
        hurt: ['Post cards', 'Comfort Corner', 'Humour Me'],
        bored: ['Creative Clue', 'See Sense Hear', 'Old is Gold']
    },
})

export default activitiesSlice.reducer;