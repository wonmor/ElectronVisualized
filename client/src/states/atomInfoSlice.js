import { createSlice } from '@reduxjs/toolkit'

export const atomInfoSlice = createSlice({
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
    name: 'atomInfo',
    initialState: {
        value: null
    },
    reducers: {
        setGlobalAtomInfo: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalAtomInfo } = atomInfoSlice.actions

export default atomInfoSlice.reducer