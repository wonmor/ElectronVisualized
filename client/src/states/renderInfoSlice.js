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
            "animation": false,
            "disableButton": false,
            "preRender": true,
            "serverError": false,
            "statusText": "Rendering in Progress..."
        },
    },
    reducers: {
        setGlobalRenderInfo: (state, action) => {
            if (state.globalRenderInfo !== action.payload) {
                state.globalRenderInfo = action.payload
            }
        },
        // By specifying the return value, the redux state updates instantaneously after the update (resetting)...
        appendGlobalRenderInfo: (state, action) => {
            if (state.globalAtomInfo !== action.payload) {
                return {...state, globalRenderInfo: {...state.globalAtomInfo, ...action.payload } };
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalRenderInfo, appendGlobalRenderInfo } = renderInfoSlice.actions

export default renderInfoSlice.reducer