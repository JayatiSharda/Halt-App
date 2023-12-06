import { createSlice } from '@reduxjs/toolkit'

export const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        quotes: {
            Bored: {
                quote: "Is life not a thousand times too short for us to bore ourselves?",
                author: "Friedrich Nietzsche"
            },
            Fear: {
                quote: "Scared is what you're feeling. Brave is what you're doing.",
                author: "Emma Donoghue"
            },
            Confused: {
                quote: "When you are confused and can not conclude, follow your instincts.",
                author: "Invajy"
            },
            Angry: {
                quote: "There’s nothing wrong with anger, provided you use it constructively.",
                author: "Wayne Dyer"
            },
            Hurt: {
                quote: "Just like there's always time for pain, there's always time for healing.",
                author: "Jennifer Brown"
            },
        }
    },
})

export default quotesSlice.reducer;