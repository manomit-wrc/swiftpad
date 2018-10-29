import axios from '../axios-order';
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
} from './types';

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
};

export function login(e) {
    return async(dispatch) => {
        try {
            dispatch({
                type: LOGIN_START,
                payload: null
            });
            const response = await axios.post(`https://beta.api.swiftpad.co/auth/login`, e);
            const response_1 = await axios.post(`https://beta.api.swiftpad.co/auth/getlogin`);

            localStorage.setItem('data', response_1.data);

            dispatch(setCurrentUser(response_1.data));
            
            dispatch({
                type: LOGIN_FINISHED,
                payload: response.data
            })
        }
        catch(error) {
            
            dispatch({
                type: LOGIN_FAIL,
                payload: null
            })
        }
    }
}

export function signup(e) {
    return async(dispatch) => {
        try {
            dispatch({
                type: SIGNUP_START,
                payload: null
            })
            const response = await axios.post(`https://beta.api.swiftpad.co/auth/signup`, e);
            const response_1 = await axios.post(`https://beta.api.swiftpad.co/auth/getlogin`);

            localStorage.setItem('data', response_1.data);
            dispatch(setCurrentUser(response_1.data));
            
            dispatch({
                type: SIGNUP_FINISHED,
                payload: response.data
            })
        }
        catch(error) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: null
            })
        }
    }
}

export function getUser() {
    return async(dispatch) => {
        try {
            const response = await axios.post(`https://beta.api.swiftpad.co/auth/getlogin`);
            dispatch({
                type: SET_CURRENT_USER,
                payload: response.data
            })
            
        }
        catch(error) {

        }
    }
}

export function getLogout() {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/auth/logout`);
        localStorage.clear();
        dispatch({
            type: LOGOUT,
            payload: response.data
        })
        window.location.href = "/";
    }
}

export function insertAct(actData) {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/structure/insert`, actData);
        dispatch({
            type: ACT_INSERT,
            payload: response.data
        })
    }
}

export function insertStory(storyData) {
    return async(dispatch) => {
        
        const response = await axios.post(`https://beta.api.swiftpad.co/story/insert`, storyData);
        
        if(response.data.msgid === 200) {
            const response_1 = await axios.post(`https://beta.api.swiftpad.co/story/get`);
            if(response_1.data.msgid === 200) {
                dispatch({
                    type: STORY_CONTENT,
                    payload: response_1.data
                })
            }
        }
        
    }
}

export function getStories() {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/story/get`);
        if(response.data.msgid === 200) {
            dispatch({
                type: STORY_DETAILS,
                payload: response.data
            })
        }
    }
}

export function getStoryContent(story_id) {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/story/content`, story_id);
        if(response.data.msgid === 200) {
            dispatch({
                type: STORY_CONTENT,
                payload: response.data.msg.structures
            })
        }
    }
}

export function insertChapter(actData) {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/structure/insert`, actData);
        
    }
}

export function insertScene(chapterData) {
    return async(dispatch) => {
        const response = await axios.post(`https://beta.api.swiftpad.co/structure/insert`, chapterData);
    }
}
