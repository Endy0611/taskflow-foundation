import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data
const mockUsers = [
  {
    createdAt: "2025-09-16T03:44:12.657784",
    lastModifiedAt: "2025-09-16T03:44:12.657784",
    createdBy: "taskflow",
    lastModifiedBy: "taskflow",
    username: "tithcholna",
    email: "tithcholna742@gmail.com",
    familyName: "tith",
    givenName: "cholna",
    gender: "Female",
    isDeleted: false,
    password: "password123", // For development only
    _links: {
      self: { href: "https://taskflow-api.istad.co/users/tithcholna" },
      role: { href: "https://taskflow-api.istad.co/users/tithcholna/role" },
      workspaceMembers: { href: "https://taskflow-api.istad.co/users/tithcholna/workspaceMembers" }
    }
  },
  {
    createdAt: "2025-09-13T03:55:12.813159",
    lastModifiedAt: "2025-09-13T03:55:12.813159",
    createdBy: "taskflow",
    lastModifiedBy: "taskflow",
    username: "sreynet",
    email: "monsreynet2409@example.com",
    familyName: "Mon",
    givenName: "Sreynet",
    gender: "Female",
    isDeleted: false,
    password: "password123", // For development only
    _links: {
      self: { href: "https://taskflow-api.istad.co/users/sreynet" },
      role: { href: "https://taskflow-api.istad.co/users/sreynet/role" },
      workspaceMembers: { href: "https://taskflow-api.istad.co/users/sreynet/workspaceMembers" }
    }
  }
];

// Async thunks
export const loginUser = createAsyncThunk(
  '/auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: `mock-jwt-${user.username}`,
        refreshToken: `mock-refresh-${user.username}`
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.find(u => u.email === userData.email || u.username === userData.username)) {
        throw new Error('User already exists');
      }

      const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString(),
        createdBy: "taskflow",
        lastModifiedBy: "taskflow",
        isDeleted: false,
        _links: {
          self: { href: `https://taskflow-api.istad.co/users/${userData.username}` },
          role: { href: `https://taskflow-api.istad.co/users/${userData.username}/role` },
          workspaceMembers: { href: `https://taskflow-api.istad.co/users/${userData.username}/workspaceMembers` }
        }
      };

      const { password: _, ...userWithoutPassword } = newUser;
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
  lastLogin: null,
  registrationSuccess: false
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
      state.lastLogin = null;
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
    },

    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.lastLogin = new Date().toISOString();
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      });
  }
});

// Action creators
export const { 
  login, 
  logout, 
  updateUser, 
  setError, 
  clearError,
  clearRegistrationSuccess 
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectLastLogin = (state) => state.auth.lastLogin;
export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess;

export default authSlice.reducer;