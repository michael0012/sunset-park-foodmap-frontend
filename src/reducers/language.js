const initialState = {
    language: 'en',
    selected: false,
}
export const SET_LANG = 'SET_LANG';
export const SELECTING = 'SELECTING';
export const CHANGE_LANG = 'CHANGE_LANG'; 
export const language = (state = initialState, action) => {

    switch(action.type){
        case SET_LANG:
            return {
                ...state,
                language: action.language
            };
        case SELECTING:
            return {
                ...state,
                language: action.language,
                selected: true,
            };
        case CHANGE_LANG:
            return {
                ...state,
                selected: false,
            };
        default:
            return state;
    }
}