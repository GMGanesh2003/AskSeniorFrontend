import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
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
}

const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    content: 'Focus on medium level problems on LeetCode. Practice 2-3 problems daily and understand the patterns. System design - start with Grokking the System Design course.',
    author: 'amazon_sde_2021',
    upvotes: 45,
    downvotes: 2,
    createdAt: '1 hour ago',
    replies: [
      {
        id: '2',
        postId: '1',
        parentId: '1',
        content: 'This is solid advice. Also, don\'t forget behavioral questions - Amazon focuses heavily on leadership principles.',
        author: 'tech_senior',
        upvotes: 23,
        downvotes: 0,
        createdAt: '45 minutes ago',
        replies: [],
      },
    ],
  },
];

const initialState: CommentsState = {
  comments: mockComments,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Omit<Comment, 'id' | 'upvotes' | 'downvotes' | 'replies'>>) => {
      const newComment: Comment = {
        ...action.payload,
        id: Date.now().toString(),
        upvotes: 1,
        downvotes: 0,
        replies: [],
      };
      
      if (action.payload.parentId) {
        // This is a reply
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
        // This is a top-level comment
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
          if (findAndVoteComment(comment.replies)) {
            return true;
          }
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
          if (findAndEditComment(comment.replies)) {
            return true;
          }
        }
        return false;
      };
      
      findAndEditComment(state.comments);
    },
    toggleEditComment: (state, action: PayloadAction<string>) => {
      const findAndToggleEdit = (comments: Comment[]): boolean => {
        for (const comment of comments) {
          if (comment.id === action.payload) {
            comment.isEditing = !comment.isEditing;
            return true;
          }
          if (findAndToggleEdit(comment.replies)) {
            return true;
          }
        }
        return false;
      };
      
      findAndToggleEdit(state.comments);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const findAndDeleteComment = (comments: Comment[], parentComments: Comment[]): boolean => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === action.payload) {
            comments.splice(i, 1);
            return true;
          }
          if (findAndDeleteComment(comments[i].replies, comments)) {
            return true;
          }
        }
        return false;
      };
      
      findAndDeleteComment(state.comments, state.comments);
    },
  },
});

export const {
  addComment,
  voteComment,
  editComment,
  toggleEditComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;