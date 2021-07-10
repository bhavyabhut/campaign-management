export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState) {
      const temp = JSON.parse(serializedState);
      const data = {};
      Object.keys(temp).forEach(k => {
        data[k] = temp[k];
      });
      return data;
    }
    return undefined;
  } catch (err) {
    return err;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    return serializedState;
  } catch (err) {
    return err;
  }
};
