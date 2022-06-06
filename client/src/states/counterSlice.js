import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    /*
    This function creates a new reducer (takes an action and the previous state of the application and returns the new state)
    for React-Redux library (acts as a global variable)

    Parameters
    ----------
    None

    Returns
    -------
    None
    */
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            /*
            Redux Toolkit allows us to write "mutating" logic in reducers. It
            doesn't actually mutate the state because it uses the Immer library,
            which detects changes to a "draft state" and produces a brand new
            immutable state based off those changes
            */
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer