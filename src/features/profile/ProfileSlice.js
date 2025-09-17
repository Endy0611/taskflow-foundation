import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock profile data
const mockProfile = {
  id: 'user1',
  name: 'Tith Cholna',
  email: 'tithcholna742@gamil.com',
  avatar: '../../assets/members/cholna.jpg',
  role: 'user',
  bio: 'Software Developer',
  phone: '+1234567890',
  location: 'Toek Laok, Phnom Penh',
  joinedAt: new Date().toISOString(),
  settings: {
    notifications: true,
    theme: 'light',
    language: 'kh'
  }
};

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const user = mockProfile[userId];
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
  settings: {
    notifications: true,
    theme: 'light',
    language: 'en'
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
        updatedAt: new Date().toISOString()
      };
    },

    updateAvatar: (state, action) => {
      if (state.profile) {
        state.profile.avatar = action.payload;
        state.profile.updatedAt = new Date().toISOString();
      }
    },

    updateSettings: (state, action) => {
      state.settings = {
        ...state.settings,
        ...action.payload
      };
      if (state.profile) {
        state.profile.settings = state.settings;
      }
    },

    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// Action creators
export const {
  setProfile,
  updateProfile,
  updateAvatar,
  updateSettings,
  clearProfile
} = profileSlice.actions;

// Selectors
export const selectProfile = (state) => state.profile.profile;
export const selectIsLoading = (state) => state.profile.isLoading;
export const selectError = (state) => state.profile.error;
export const selectSettings = (state) => state.profile.settings;
export const selectTheme = (state) => state.profile.settings.theme;

export default profileSlice.reducer;