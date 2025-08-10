
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export type UserRole = 'jobseeker' | 'employer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Mock auth API functions
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock authentication logic
  if (email === 'user@example.com' && password === 'password') {
    return {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'jobseeker',
    };
  } else if (email === 'employer@example.com' && password === 'password') {
    return {
      id: '2',
      email: 'employer@example.com',
      name: 'Acme Corp',
      role: 'employer',
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockRegister = async (
  email: string, 
  password: string, 
  name: string, 
  role: UserRole
): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock registration
  return {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    role,
  };
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await mockLogin(email, password);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, name, role }: { email: string; password: string; name: string; role: UserRole },
    { rejectWithValue }
  ) => {
    try {
      return await mockRegister(email, password, name, role);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
