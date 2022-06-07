import { createSlice } from '@reduxjs/toolkit'

export const selectedElementSlice = createSlice({
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
    name: 'selectedElement',
    initialState: {
        globalSelectedElement: { 'element': 'H2', 'name': 'Hydrogen Gas' },
    },
    reducers: {
        setGlobalSelectedElement: (state, action) => {
            state.globalSelectedElement = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalSelectedElement } = selectedElementSlice.actions

export default selectedElementSlice.reducer