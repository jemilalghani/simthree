const initialState = {
    user: null
};

const USER_LOGIN = "USER_LOGIN"

function reducer(state=initialState, action){
    switch(action.type){
        case USER_LOGIN:
            return Object.assign({}, state, {user:action.payload})
        default: return state
    }
}
export function userLogin(user){
    return {
        type: USER_LOGIN,
        payload: user
    }
}
export default reducer;