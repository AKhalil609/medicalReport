import {FETCH_RESULTS, SET_LOADING} from "../actions/types";

const initialState = {loading:true};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_RESULTS:
            return {
                ...state,
                data: action.payload,
                config: action.config,
                history: action.history
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