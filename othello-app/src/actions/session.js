export function setSession(history, userName)    {

    return (dispatch) => {
        dispatch({
            type: "set_session",
            userName: userName
        });
    }
}

export function disableSession(userName)    {
    return (dispatch) => {
        dispatch({
           type: "remove_session",
        });
    }
}