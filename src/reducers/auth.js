import { 
    LOGIN_START, 
    LOGIN_FAIL, 
    LOGIN_FINISHED, 
    SET_CURRENT_USER, 
    LOGOUT, 
    SIGNUP_START, 
    SIGNUP_FINISHED, 
    SIGNUP_FAIL,
    ACT_INSERT,
    STORY_DETAILS,
    STORY_CONTENT 
} from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
    isAuthenticated: null,
    user: null,
    actData: null,
    storyData: null,
    storyContent: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_START: 
            return {
                isAuthenticated: null,
                user: null
            }
        case LOGIN_FAIL:
            return {
              isAuthenticated: false,
              user: null
            }
        case LOGIN_FINISHED:
            return {
                isAuthenticated: true,
                user: null
            }
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case LOGOUT:
            return {
                isAuthenticated: null,
                user: null
            }
        case SIGNUP_START: 
            return {
                isAuthenticated: null,
                user: null
            }
        case SIGNUP_FAIL:
            return {
                isAuthenticated: false,
                user: null
            }
        case SIGNUP_FINISHED:
            return {
                isAuthenticated: true,
                user: null
            }
        case ACT_INSERT:
            return {
                ...state,
                actData: action.payload
            }
        case STORY_DETAILS:
            return {
                ...state,
                storyData: action.payload
            }
        case STORY_CONTENT:
            return {
                ...state,
                storyContent: action.payload
            }
        default:
            return state
    }
}
export default authReducer;