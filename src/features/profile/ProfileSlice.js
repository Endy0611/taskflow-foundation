import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  avatar: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const { name, email, avatar } = action.payload;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setProfile, updateName, updateEmail } = profileSlice.actions;
export default profileSlice.reducer;
