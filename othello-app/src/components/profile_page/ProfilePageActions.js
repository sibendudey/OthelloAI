
export const SET_PROFILE = 'SET_PROFILE';
export const profileSuccess = (response, socketClient) => (dispatch) => {
  localStorage.setItem("email", response.email);
  dispatch({
    type: SET_PROFILE,
    profile: {winPercentage: response.winPercentage, emailId: response.email, userName: response.userName, id: response.id, client: socketClient},
  });
};


export const RESET_PROFILE = 'RESET_PROFILE';
export const profileReset = () => (dispatch) => {
  localStorage.removeItem("email");
  dispatch({
    type: RESET_PROFILE,
  });
};