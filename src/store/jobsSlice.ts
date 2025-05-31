
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  logo?: string;
  applicants?: number;
  isFeatured?: boolean;
}

export interface JobsState {
  jobs: Job[];
  featuredJobs: Job[];
  currentJob: Job | null;
  savedJobs: string[];
  loading: boolean;
  error: string | null;
}

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced frontend developer to join our team and help build our next-generation web applications.',
    requirements: [
      'Strong experience with React',
      '5+ years of frontend development',
      'Experience with TypeScript',
      'Experience with state management libraries',
    ],
    postedDate: '2023-06-15',
    logo: 'https://picsum.photos/seed/company1/300/300',
    applicants: 42,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Join our design team to create beautiful and intuitive user experiences for our clients.',
    requirements: [
      'Strong portfolio showing UI/UX work',
      '3+ years of design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Understanding of user research and testing',
    ],
    postedDate: '2023-06-20',
    logo: 'https://picsum.photos/seed/company2/300/300',
    applicants: 35,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'ServerPro',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'We need an experienced backend developer to build scalable and maintainable APIs for our SaaS platform.',
    requirements: [
      'Strong experience with Node.js',
      'Knowledge of database systems',
      'Experience with cloud platforms like AWS or GCP',
      'Understanding of microservices architecture',
    ],
    postedDate: '2023-06-25',
    logo: 'https://picsum.photos/seed/company3/300/300',
    applicants: 28,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'ProductLabs',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description: 'Lead our product team in creating innovative solutions that meet market demands and customer needs.',
    requirements: [
      '5+ years of product management experience',
      'Experience in agile environments',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
    ],
    postedDate: '2023-06-28',
    logo: 'https://picsum.photos/seed/company4/300/300',
    applicants: 47,
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataInsights',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125,000 - $155,000',
    description: 'Join our data science team to extract insights from complex datasets and build predictive models.',
    requirements: [
      'Advanced degree in Data Science, Statistics, or related field',
      'Experience with machine learning frameworks',
      'Proficiency in Python and SQL',
      'Experience with big data technologies',
    ],
    postedDate: '2023-07-01',
    logo: 'https://picsum.photos/seed/company5/300/300',
    applicants: 39,
    isFeatured: false,
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudOps',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$115,000 - $145,000',
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      'Experience with AWS or Azure',
      'Knowledge of containerization and orchestration tools',
      'Experience with CI/CD pipelines',
      'Infrastructure as code experience (Terraform, CloudFormation)',
    ],
    postedDate: '2023-07-05',
    logo: 'https://picsum.photos/seed/company6/300/300',
    applicants: 33,
    isFeatured: true,
  },
];

// Mock API functions
const mockFetchJobs = async (): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockJobs;
};

const mockFetchJobById = async (id: string): Promise<Job> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const job = mockJobs.find(j => j.id === id);
  if (!job) {
    throw new Error('Job not found');
  }
  return job;
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      return await mockFetchJobs();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockFetchJobById(id);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Initial state
const initialState: JobsState = {
  jobs: [],
  featuredJobs: [],
  currentJob: null,
  savedJobs: [],
  loading: false,
  error: null,
};

// Slice
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    saveJob: (state, action: PayloadAction<string>) => {
      if (!state.savedJobs.includes(action.payload)) {
        state.savedJobs.push(action.payload);
      }
    },
    unsaveJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(id => id !== action.payload);
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
        state.featuredJobs = action.payload.filter(job => job.isFeatured);
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { saveJob, unsaveJob, clearCurrentJob } = jobsSlice.actions;
export default jobsSlice.reducer;
