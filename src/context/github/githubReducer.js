import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false, // we don't need to set loading to false in the method anymore
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state, // spread operator copies whatever is in the current state
                loading: true,
            };
        default:
            return state;
    }
};
