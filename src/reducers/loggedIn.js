const initialState = {
    loggedIn: false,
    user: null
}
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT'; 
export const loggedIn = (state = initialState, action) => {

    switch(action.type){
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                user: {
                    email: action.email,
                    admin: action.admin,
                }
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null
            };
        default:
            return state;
    }
}