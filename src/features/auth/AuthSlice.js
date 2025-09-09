import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data
const mockUsers = [
  {
    id: 'user1',
    email: 'tithcholna742@gmail.com',
    password: 'password123',
    name: 'Tith Cholna',
    role: 'admin'
  },
  {
    id: 'user2',
    email: 'monsreynet2409@example.com',
    password: 'password123',
    name: 'Mon Sreynet',
    role: 'user'
  }
];

// Async login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user
      const user = mockUsers.find(u => u.email === email);
      
      // Check credentials
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  lastLogin: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastLogin = new Date().toISOString();
      state.error = null;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastLogin = new Date().toISOString();
        // Simulate token storage
        state.token = 'mock-jwt-token';
        state.refreshToken = 'mock-refresh-token';
        localStorage.setItem('token', state.token);
        localStorage.setItem('refreshToken', state.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Action creators
export const { 
  login, 
  logout, 
  updateUser, 
  setError, 
  clearError 
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectLastLogin = (state) => state.auth.lastLogin;

export default authSlice.reducer;