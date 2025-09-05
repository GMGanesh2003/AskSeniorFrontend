import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Community {
  id: string;
  name: string;
  displayName: string;
  description: string;
  members: number;
  online: number;
  createdAt: string;
  isJoined: boolean;
  icon: string;
}

export interface CommunitiesState {
  communities: Community[];
  joinedCommunities: Community[];
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Placements',
    displayName: 'r/Placements',
    description: 'Discussion about placements, interviews, and job opportunities',
    members: 15200,
    online: 1800,
    createdAt: 'Jan 15, 2020',
    isJoined: true,
    icon: '📋',
  },
  {
    id: '2',
    name: 'DSA_Help',
    displayName: 'r/DSA_Help',
    description: 'Get help with Data Structures and Algorithms',
    members: 12800,
    online: 950,
    createdAt: 'Mar 10, 2020',
    isJoined: true,
    icon: '🔢',
  },
  {
    id: '3',
    name: 'Resume_Review',
    displayName: 'r/Resume_Review',
    description: 'Get your resume reviewed by seniors and professionals',
    members: 8400,
    online: 420,
    createdAt: 'Jun 5, 2020',
    isJoined: true,
    icon: '📄',
  },
  {
    id: '4',
    name: 'Interview_Prep',
    displayName: 'r/Interview_Prep',
    description: 'Preparation tips and experiences for technical interviews',
    members: 9700,
    online: 650,
    createdAt: 'Apr 20, 2020',
    isJoined: true,
    icon: '💼',
  },
  {
    id: '5',
    name: 'CSE_Students',
    displayName: 'r/CSE_Students',
    description: 'Community for Computer Science Engineering students',
    members: 22100,
    online: 1200,
    createdAt: 'Jan 1, 2020',
    isJoined: true,
    icon: '💻',
  },
  {
    id: '6',
    name: 'ECE_Hub',
    displayName: 'r/ECE_Hub',
    description: 'Electronics and Communication Engineering discussions',
    members: 11300,
    online: 780,
    createdAt: 'Feb 14, 2020',
    isJoined: false,
    icon: '⚡',
  },
  {
    id: '7',
    name: 'Internships',
    displayName: 'r/Internships',
    description: 'Find and discuss internship opportunities',
    members: 7900,
    online: 320,
    createdAt: 'May 8, 2020',
    isJoined: true,
    icon: '🎓',
  },
  {
    id: '8',
    name: 'CGPA_Tips',
    displayName: 'r/CGPA_Tips',
    description: 'Tips and strategies to improve your academic performance',
    members: 5600,
    online: 210,
    createdAt: 'Aug 12, 2020',
    isJoined: false,
    icon: '📚',
  },
  {
    id: '9',
    name: 'Academics',
    displayName: 'r/Academics',
    description: 'General academic discussions and help',
    members: 18500,
    online: 950,
    createdAt: 'Dec 3, 2019',
    isJoined: false,
    icon: '🎯',
  },
];

const initialState: CommunitiesState = {
  communities: mockCommunities,
  joinedCommunities: mockCommunities.filter(c => c.isJoined),
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    toggleJoinCommunity: (state, action: PayloadAction<string>) => {
      const community = state.communities.find(c => c.id === action.payload);
      if (community) {
        community.isJoined = !community.isJoined;
        if (community.isJoined) {
          community.members++;
          state.joinedCommunities.push(community);
        } else {
          community.members--;
          state.joinedCommunities = state.joinedCommunities.filter(c => c.id !== action.payload);
        }
      }
    },
    createCommunity: (state, action: PayloadAction<Omit<Community, 'id' | 'members' | 'online' | 'isJoined'>>) => {
      const newCommunity: Community = {
        ...action.payload,
        id: Date.now().toString(),
        members: 1,
        online: 1,
        isJoined: true,
      };
      state.communities.push(newCommunity);
      state.joinedCommunities.push(newCommunity);
    },
  },
});

export const { toggleJoinCommunity, createCommunity } = communitiesSlice.actions;
export default communitiesSlice.reducer;