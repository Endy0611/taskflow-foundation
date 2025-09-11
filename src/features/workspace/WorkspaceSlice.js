import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockWorkspaces = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'Main development project',
    members: [
      { id: 'user1', role: 'owner', joinedAt: new Date().toISOString() }
    ],
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1',
    settings: {
      theme: 'light',
      notifications: true,
      visibility: 'private'
    }
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'Secondary project',
    members: [
      { id: 'user1', role: 'member', joinedAt: new Date().toISOString() }
    ],
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user2',
    settings: {
      theme: 'dark',
      notifications: true,
      visibility: 'private'
    }
  }
];

// Async thunks for API calls
export const fetchWorkspaces = createAsyncThunk(
  'workspace/fetchWorkspaces',
  async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return filtered mock data
    return mockWorkspaces.filter(w => w.members.some(m => m.id === userId));
  }
);

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,
  filters: {
    sortBy: 'createdAt',
    searchQuery: '',
    filterByMember: null
  }
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces.push({
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description || '',
        members: [{ 
          id: action.payload.userId,
          role: 'owner',
          joinedAt: new Date().toISOString()
        }],
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: action.payload.userId,
        settings: {
          theme: 'light',
          notifications: true,
          visibility: 'private'
        }
      });
    },

    removeWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(
        (w) => w.id !== action.payload
      );
      if (state.currentWorkspace?.id === action.payload) {
        state.currentWorkspace = null;
      }
    },

    updateWorkspace: (state, action) => {
      const { id, changes } = action.payload;
      const workspace = state.workspaces.find((w) => w.id === id);
      if (workspace) {
        Object.assign(workspace, {
          ...changes,
          updatedAt: new Date().toISOString()
        });
      }
    },

    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = state.workspaces.find(
        (w) => w.id === action.payload
      );
    },

    addMember: (state, action) => {
      const { workspaceId, member } = action.payload;
      const workspace = state.workspaces.find((w) => w.id === workspaceId);
      if (workspace && !workspace.members.find(m => m.id === member.id)) {
        workspace.members.push({
          ...member,
          joinedAt: new Date().toISOString()
        });
      }
    },

    updateMemberRole: (state, action) => {
      const { workspaceId, memberId, newRole } = action.payload;
      const workspace = state.workspaces.find((w) => w.id === workspaceId);
      if (workspace) {
        const member = workspace.members.find(m => m.id === memberId);
        if (member) {
          member.role = newRole;
        }
      }
    },

    removeMember: (state, action) => {
      const { workspaceId, memberId } = action.payload;
      const workspace = state.workspaces.find((w) => w.id === workspaceId);
      if (workspace) {
        workspace.members = workspace.members.filter(m => m.id !== memberId);
      }
    },

    updateSettings: (state, action) => {
      const { workspaceId, settings } = action.payload;
      const workspace = state.workspaces.find((w) => w.id === workspaceId);
      if (workspace) {
        workspace.settings = { ...workspace.settings, ...settings };
      }
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// Action creators
export const {
  addWorkspace,
  removeWorkspace,
  updateWorkspace,
  setCurrentWorkspace,
  addMember,
  updateMemberRole,
  removeMember,
  updateSettings,
  setFilters,
  clearFilters
} = workspaceSlice.actions;

// Selectors
export const selectAllWorkspaces = (state) => state.workspace.workspaces;
export const selectCurrentWorkspace = (state) => state.workspace.currentWorkspace;
export const selectWorkspaceById = (state, workspaceId) =>
  state.workspace.workspaces.find((w) => w.id === workspaceId);
export const selectWorkspaceMembers = (state, workspaceId) =>
  state.workspace.workspaces.find((w) => w.id === workspaceId)?.members || [];
export const selectIsLoading = (state) => state.workspace.isLoading;
export const selectError = (state) => state.workspace.error;
export const selectFilters = (state) => state.workspace.filters;

// Memoized selectors for filtered/sorted workspaces
export const selectFilteredWorkspaces = (state) => {
  const { workspaces } = state.workspace;
  const { sortBy, searchQuery, filterByMember } = state.workspace.filters;

  let filtered = [...workspaces];

  if (searchQuery) {
    filtered = filtered.filter(w => 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterByMember) {
    filtered = filtered.filter(w =>
      w.members.some(m => m.id === filterByMember)
    );
  }

  return filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export default workspaceSlice.reducer;