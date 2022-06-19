import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './states/counterSlice'
import atomInfoReducer from './states/atomInfoSlice'
import renderInfoReducer from './states/renderInfoSlice'
import cameraInfoReducer from './states/cameraInfoSlice'
import selectedElementReducer from './states/selectedElementSlice'

/*
╔═══╦═══╦═══╦═══╦════╗─╔═══╦═══╦═══╦╗─╔╦═╗╔═╗╔═══╦═══╦═══╦╗─╔╦═══╦═══╦═══╦═══╗
║╔═╗║╔══╣╔═╗║╔═╗║╔╗╔╗║─║╔═╗║╔══╩╗╔╗║║─║╠╗╚╝╔╝║╔═╗║╔══╩╗╔╗║║─║║╔═╗║╔══╣╔═╗║╔═╗║
║╚═╝║╚══╣║─║║║─╚╩╝║║╚╝─║╚═╝║╚══╗║║║║║─║║╚╗╔╝─║╚═╝║╚══╗║║║║║─║║║─╚╣╚══╣╚═╝║╚══╗
║╔╗╔╣╔══╣╚═╝║║─╔╗─║║╔══╣╔╗╔╣╔══╝║║║║║─║║╔╝╚╗─║╔╗╔╣╔══╝║║║║║─║║║─╔╣╔══╣╔╗╔╩══╗║
║║║╚╣╚══╣╔═╗║╚═╝║─║║╚══╣║║╚╣╚══╦╝╚╝║╚═╝╠╝╔╗╚╗║║║╚╣╚══╦╝╚╝║╚═╝║╚═╝║╚══╣║║╚╣╚═╝║
╚╝╚═╩═══╩╝─╚╩═══╝─╚╝───╚╝╚═╩═══╩═══╩═══╩═╝╚═╝╚╝╚═╩═══╩═══╩═══╩═══╩═══╩╝╚═╩═══╝
*/

export default configureStore({
    /*
    This function dictates the behaviour of a React-Redux reducer,
    which takes an action and the previous state of the application and returns the new state;
    essentially manipulating globally defined states

    Parameters
    ----------
    None

    Returns
    -------
    None
    */
    reducer: {
        counter: counterReducer,
        atomInfo: atomInfoReducer,
        renderInfo: renderInfoReducer,
        selectedElement: selectedElementReducer,
        cameraInfo: cameraInfoReducer
    },
})