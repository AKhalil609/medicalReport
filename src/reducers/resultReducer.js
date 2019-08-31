import {FETCH_RESULTS, SET_LOADING, HISTORY_PAGE} from "../actions/types";

// init state
const initialState = {loading:true, historyPage:0};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_RESULTS:
            return {
                ...state,
                data: action.payload,
                config: action.config,
                history: action.history
              };
        case HISTORY_PAGE:
            return {
                ...state,
                historyPage: action.payload
              };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
              };
    
        default:
            return state;
    }
}