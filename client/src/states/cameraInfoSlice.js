import { createSlice } from '@reduxjs/toolkit'

export const cameraInfoSlice = createSlice({
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
    name: 'cameraInfo',
    initialState: {
        globalCameraInfo: null,
    },
    reducers: {
        setCameraInfo: (state, action) => {
            if (state.globalCameraInfo !== action.payload) {
                state.globalCameraInfo = action.payload;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCameraInfo } = cameraInfoSlice.actions

export default cameraInfoSlice.reducer