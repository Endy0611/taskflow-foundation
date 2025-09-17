import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the project',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-09-20',
    assignedTo: 'user1',
    workspaceId: 1,
    createdBy: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    labels: ['documentation', 'urgent'],
    comments: []
  },
  {
    id: 2,
    title: 'Setup development environment',
    description: 'Configure development tools and dependencies',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-09-15',
    assignedTo: 'user2',
    workspaceId: 1,
    createdBy: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    labels: ['setup', 'development'],
    comments: []
  }
];

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (workspaceId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTasks.filter(task => task.workspaceId === workspaceId);
  }
);

export const taskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    REVIEW: 'review',
    COMPLETED: 'completed',
};

const initialState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    assignedTo: null,
    searchQuery: '',
    labels: []
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        labels: action.payload.labels || []
      });
    },

    updateTask: (state, action) => {
      const { id, changes } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        Object.assign(task, {
          ...changes,
          updatedAt: new Date().toISOString()
        });
      }
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.currentTask?.id === action.payload) {
        state.currentTask = null;
      }
    },

    setCurrentTask: (state, action) => {
      state.currentTask = state.tasks.find(t => t.id === action.payload);
    },

    addComment: (state, action) => {
      const { taskId, comment } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.comments.push({
          id: Date.now(),
          text: comment,
          createdAt: new Date().toISOString(),
          createdBy: action.payload.userId
        });
      }
    },

    addLabel: (state, action) => {
      const { taskId, label } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && !task.labels.includes(label)) {
        task.labels.push(label);
      }
    },

    removeLabel: (state, action) => {
      const { taskId, label } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.labels = task.labels.filter(l => l !== label);
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
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// Action creators
export const {
  addTask,
  updateTask,
  removeTask,
  setCurrentTask,
  addComment,
  addLabel,
  removeLabel,
  setFilters,
  clearFilters
} = taskSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectCurrentTask = (state) => state.tasks.currentTask;
export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find(t => t.id === taskId);
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectError = (state) => state.tasks.error;
export const selectFilters = (state) => state.tasks.filters;

// Memoized selector for filtered tasks
export const selectFilteredTasks = (state) => {
  const { tasks } = state.tasks;
  const { status, priority, assignedTo, searchQuery, labels } = state.tasks.filters;

  let filtered = [...tasks];

  if (status !== 'all') {
    filtered = filtered.filter(t => t.status === status);
  }

  if (priority !== 'all') {
    filtered = filtered.filter(t => t.priority === priority);
  }

  if (assignedTo) {
    filtered = filtered.filter(t => t.assignedTo === assignedTo);
  }

  if (searchQuery) {
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (labels.length > 0) {
    filtered = filtered.filter(t =>
      labels.some(label => t.labels.includes(label))
    );
  }

  return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export default taskSlice.reducer;