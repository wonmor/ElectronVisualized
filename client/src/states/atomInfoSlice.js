import { createSlice } from '@reduxjs/toolkit'

export const atomInfoSlice = createSlice({
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