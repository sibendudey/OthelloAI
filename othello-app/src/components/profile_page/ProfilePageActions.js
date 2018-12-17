
export const SET_PROFILE = 'SET_PROFILE';
export const profileSuccess = (response, socketClient) => (dispatch) => {
  localStorage.setItem("email", response.email);
  dispatch({
    type: SET_PROFILE,
    profile: {emailId: response.email, userName: response.userName, id: response.id, client: socketClient},
  });
};
