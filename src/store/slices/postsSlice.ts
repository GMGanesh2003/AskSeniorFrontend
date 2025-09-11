// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   community: string;
//   upvotes: number;
//   downvotes: number;
//   userVote?: 'up' | 'down';
//   comments: number;
//   createdAt: string;
//   tags: string[];
//   saved: boolean;
// }

// export interface PostsState {
//   posts: Post[];
//   sortBy: 'hot' | 'new' | 'top' | 'rising';
//   searchQuery: string;
//   activeFilters: string[];
// }

// const mockPosts: Post[] = [
//   {
//     id: '1',
//     title: 'How to prepare for Amazon SDE interview in final year? Need urgent help!',
//     content: "I'm in my final year CSE and have Amazon interview next month. What should be my strategy for DSA and system design preparation? Any specific resources you'd recommend? I've been practicing on LeetCode but feeling overwhelmed with the topics to cover. Any seniors who cracked Amazon recently, please share your experience and timeline.",
//     author: 'desperate_student_23',
//     community: 'Placements',
//     upvotes: 119,
//     downvotes: 0,
//     comments: 43,
//     createdAt: '2 hours ago',
//     tags: ['Amazon', 'Interview', 'DSA', 'System Design', 'Help'],
//     saved: false,
//   },
//   {
//     id: '2',
//     title: 'Best way to improve CGPA in 3rd year? Currently at 7.2 and stressed about placements',
//     content: "My CGPA is currently 7.2 and I want to improve it for better placement opportunities. What strategies worked for you in 3rd year? Should I focus more on projects or academics? I've heard some companies have strict CGPA cutoffs. Also, how much does CGPA really matter vs projects and skills? Please share your experiences.",
//     author: 'worried_junior',
//     community: 'Academics',
//     upvotes: 77,
//     downvotes: 0,
//     comments: 67,
//     createdAt: '5 hours ago',
//     tags: ['CGPA', 'Academics', 'Placement', 'Advice'],
//     saved: false,
//   },
//   {
//     id: '3',
//     title: '[Resume Review] Software engineer positions - roast my resume please',
//     content: "Could someone review my resume? I'm applying for SDE roles and want to make sure it stands out. I have 2 internships and 3 projects, but not getting many interview calls. What am I missing?",
//     author: 'resume_newbie',
//     community: 'Resume_Review',
//     upvotes: 151,
//     downvotes: 0,
//     comments: 89,
//     createdAt: '1 day ago',
//     tags: ['Resume', 'Software Engineer', 'Career', 'Review'],
//     saved: false,
//   },
// ];

// const initialState: PostsState = {
//   posts: mockPosts,
//   sortBy: 'hot',
//   searchQuery: '',
//   activeFilters: ['r/Placements', 'Today'],
// };

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     addPost: (state, action: PayloadAction<Omit<Post, 'id' | 'upvotes' | 'downvotes' | 'comments' | 'saved'>>) => {
//       const newPost: Post = {
//         ...action.payload,
//         id: Date.now().toString(),
//         upvotes: 1,
//         downvotes: 0,
//         comments: 0,
//         saved: false,
//       };
//       state.posts.unshift(newPost);
//     },
//     votePost: (state, action: PayloadAction<{ postId: string; voteType: 'up' | 'down' }>) => {
//       const { postId, voteType } = action.payload;
//       const post = state.posts.find(p => p.id === postId);
//       if (post) {
//         if (post.userVote === voteType) {
//           // Remove vote
//           if (voteType === 'up') post.upvotes--;
//           else post.downvotes--;
//           post.userVote = undefined;
//         } else {
//           // Change or add vote
//           if (post.userVote === 'up') post.upvotes--;
//           else if (post.userVote === 'down') post.downvotes--;

//           if (voteType === 'up') post.upvotes++;
//           else post.downvotes++;
//           post.userVote = voteType;
//         }
//       }
//     },
//     toggleSavePost: (state, action: PayloadAction<string>) => {
//       const post = state.posts.find(p => p.id === action.payload);
//       if (post) {
//         post.saved = !post.saved;
//       }
//     },
//     setSortBy: (state, action: PayloadAction<'hot' | 'new' | 'top' | 'rising'>) => {
//       state.sortBy = action.payload;
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload;
//     },
//     addFilter: (state, action: PayloadAction<string>) => {
//       if (!state.activeFilters.includes(action.payload)) {
//         state.activeFilters.push(action.payload);
//       }
//     },
//     removeFilter: (state, action: PayloadAction<string>) => {
//       state.activeFilters = state.activeFilters.filter(f => f !== action.payload);
//     },
//     clearFilters: (state) => {
//       state.activeFilters = [];
//     },
//   },
// });

// export const {
//   addPost,
//   votePost,
//   toggleSavePost,
//   setSortBy,
//   setSearchQuery,
//   addFilter,
//   removeFilter,
//   clearFilters,
// } = postsSlice.actions;

// export default postsSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface PostAuthor {
  _id: string;
  username: string;
}

export interface Post {
  _id: string;
  id: string;
  title: string;
  content: string;
  author: PostAuthor;
  community: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'upvote' | 'downvote';
  comments: number;
  createdAt: string;
  tags: string[];
  saved: boolean;
}

export interface PostsState {
  posts: Post[];
  sortBy: 'hot' | 'new' | 'top' | 'rising';
  searchQuery: string;
  activeFilters: string[];
  loading: boolean;
  error: string | null;
}
const BASE_URL = 'https://askseniorbackend.onrender.com/api/v1/question/ques';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',

  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch(BASE_URL, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dataResponse = await response.json();
      console.log(dataResponse);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data: Post[] = dataResponse.questions;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);


// Initial state
const initialState: PostsState = {
  posts: [],
  sortBy: 'hot',
  searchQuery: '',
  activeFilters: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, 'id' | 'upvotes' | 'downvotes' | 'comments' | 'saved'>>) => {
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        saved: false,
      };
      state.posts.unshift(newPost);
    },

    votePost: (state, action: PayloadAction<{ postId: string; voteType: 'upvote' | 'downvote' }>) => {
      const { postId, voteType } = action.payload;

      const post = state.posts.find(p => p._id === postId);
      if (post) {
        if (post.userVote === voteType) {
          if (voteType === 'upvote') post.upvotes--;
          else post.downvotes--;
          post.userVote = undefined;
        } else {
          if (post.userVote === 'upvote') post.upvotes--;
          else if (post.userVote === 'downvote') post.downvotes--;
          if (voteType === 'upvote') post.upvotes++;
          else post.downvotes++;
          post.userVote = voteType;
        }
      }
    },

    toggleSavePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.saved = !post.saved;
      }
    },
    setSortBy: (state, action: PayloadAction<'hot' | 'new' | 'top' | 'rising'>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addFilter: (state, action: PayloadAction<string>) => {
      if (!state.activeFilters.includes(action.payload)) {
        state.activeFilters.push(action.payload);
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.activeFilters = state.activeFilters.filter(f => f !== action.payload);
    },
    clearFilters: (state) => {
      state.activeFilters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addPost,
  votePost,
  toggleSavePost,
  setSortBy,
  setSearchQuery,
  addFilter,
  removeFilter,
  clearFilters,
} = postsSlice.actions;

export default postsSlice.reducer;

// export { fetchPosts };
