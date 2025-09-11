import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// -----------------------------------
// Types
// -----------------------------------

export interface CommentAuthor {
  _id: string;
  username: string;
}

export interface Comment {
  _id: string;
  id: string;
  postId: string;
  content: string;
  author: CommentAuthor;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  createdAt: string;
  parentId?: string;
  replies: Comment[];
  isEditing?: boolean;
}

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

// -----------------------------------
// Constants & Initial State
// -----------------------------------

const BASE_URL = 'https://askseniorbackend.onrender.com/api/v1/answer/comments';

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

// -----------------------------------
// Thunk to Fetch All Comments
// -----------------------------------

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchComments',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      console.log(data.comments);
      
      return data.comments; // Assumes API returns { comments: [...] }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// -----------------------------------
// Slice
// -----------------------------------

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Omit<Comment, 'id' | 'upvotes' | 'downvotes' | 'replies'>>) => {
      const newComment: Comment = {
        ...action.payload,
        id: Date.now().toString(),
        upvotes: 0  ,
        downvotes: 0,
        replies: [],
      };

      if (action.payload.parentId) {
        // Add as a reply
        const findAndAddReply = (comments: Comment[]): boolean => {
          for (const comment of comments) {
            if (comment.id === action.payload.parentId) {
              comment.replies.push(newComment);
              return true;
            }
            if (findAndAddReply(comment.replies)) {
              return true;
            }
          }
          return false;
        };
        findAndAddReply(state.comments);
      } else {
        // Top-level comment
        state.comments.push(newComment);
      }
    },
    voteComment: (state, action: PayloadAction<{ commentId: string; voteType: 'up' | 'down' }>) => {
      const { commentId, voteType } = action.payload;

      const findAndVoteComment = (comments: Comment[]): boolean => {
        for (const comment of comments) {
          if (comment.id === commentId) {
            if (comment.userVote === voteType) {
              // Remove vote
              if (voteType === 'up') comment.upvotes--;
              else comment.downvotes--;
              comment.userVote = undefined;
            } else {
              // Change or add vote
              if (comment.userVote === 'up') comment.upvotes--;
              else if (comment.userVote === 'down') comment.downvotes--;

              if (voteType === 'up') comment.upvotes++;
              else comment.downvotes++;

              comment.userVote = voteType;
            }
            return true;
          }
          if (findAndVoteComment(comment.replies)) return true;
        }
        return false;
      };

      findAndVoteComment(state.comments);
    },
    editComment: (state, action: PayloadAction<{ commentId: string; content: string }>) => {
      const { commentId, content } = action.payload;

      const findAndEditComment = (comments: Comment[]): boolean => {
        for (const comment of comments) {
          if (comment.id === commentId) {
            comment.content = content;
            comment.isEditing = false;
            return true;
          }
          if (findAndEditComment(comment.replies)) return true;
        }
        return false;
      };

      findAndEditComment(state.comments);
    },
    toggleEditComment: (state, action: PayloadAction<string>) => {
      const findAndToggleEdit = (comments: Comment[]): boolean => {
        console.log("here...", comments);
        
        for (const comment of comments) {
          if (comment._id === action.payload) {
            comment.isEditing = !comment.isEditing;
            return true;
          }
          if (findAndToggleEdit(comment.replies)) return true;
        }
        return false;
      };

      findAndToggleEdit(state.comments);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const findAndDeleteComment = (comments: Comment[]): boolean => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === action.payload) {
            comments.splice(i, 1);
            return true;
          }
          if (findAndDeleteComment(comments[i].replies)) return true;
        }
        return false;
      };

      findAndDeleteComment(state.comments);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// -----------------------------------
// Exports
// -----------------------------------

export const {
  addComment,
  voteComment,
  editComment,
  toggleEditComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
