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
        globalAtomInfo: null,
    },
    reducers: {
        setGlobalAtomInfo: (state, action) => {
            if (state.globalAtomInfo !== action.payload) {
                state.globalAtomInfo = action.payload;
            }
        },

        appendGlobalAtomInfo: (state, action) => {
            if (state.globalAtomInfo !== action.payload) {
                state.globalAtomInfo = {...state.globalAtomInfo, ...action.payload };
                console.log(state.globalAtomInfo);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalAtomInfo, appendGlobalAtomInfo } = atomInfoSlice.actions

export default atomInfoSlice.reducer