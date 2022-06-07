import { createSlice } from '@reduxjs/toolkit'

export const renderInfoSlice = createSlice({
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
    name: 'renderInfo',
    initialState: {
        globalRenderInfo: {
            "animation": true,
            "disableButton": false,
            "preRender": true,
            "serverError": false,
            "statusText": "Rendering in Progress..."
        },
    },
    reducers: {
        setGlobalRenderInfo: (state, action) => {
            state.globalRenderInfo = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalRenderInfo } = renderInfoSlice.actions

export default renderInfoSlice.reducer