export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const updateNavBarSelection = (selectedValue) => (dispatch) => {
  dispatch({
    type: UPDATE_SELECTED,
    selectedValue,
  });
};