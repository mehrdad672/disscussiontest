import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  avatar?: string;
}
interface IComment {
  id: number;
  date: number;
  user: IUser;
  text: string;
  likes: number;
  iLikedIt: boolean;
}
interface IDiscussion extends IComment {
  replies: IComment[];
}
interface initialProps {
  alldis: IDiscussion[];
}
interface postcomment extends IComment {
  did: number;
}
interface CId {
  cid: number;
  did: number;
}
interface DId {
  id: number;
}
const initialState: initialProps = {
  alldis: [
    {
      id: 3,
      date: 1672576574000,
      user: {
        name: "Bessie Cooper",
        avatar:
          "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
      },
      text: "I think for our second compaign we can try to target a different audience. How does it sound for you?",
      likes: 2,
      iLikedIt: false,
      replies: [
        {
          id: 5,
          date: 1672581014000,
          user: {
            name: "Marvin McKinney",
            avatar:
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          },
          text: "Yes, that sounds good! I can think about this tomorrow. Then do we plan to start that compaign?",
          likes: 3,
          iLikedIt: true,
        },
        {
          id: 6,
          date: 1672581614000,
          user: {
            name: "Bessie Cooper",
            avatar:
              "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
          },
          text: "We plan to run the compaign on Friday - as far as I know. Do you think you will get this done by Thursday @Marvin?",
          likes: 0,
          iLikedIt: false,
        },
      ],
    },
    {
      id: 2,
      date: 1672232414000,
      user: {
        name: "Marvin McKinney",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
      text: "The first compaign went smoothly. Please make sure to see all attachments with the results to understand the flow.",
      likes: 2,
      iLikedIt: false,
      replies: [],
    },
    {
      id: 1,
      date: 1671886814000,
      user: {
        name: "Savannah Nguyen",
      },
      text: "We have just published the first campaign. Let's see the results in the 5 days and we will iterate on this.",
      likes: 50,
      iLikedIt: true,
      replies: [],
    },
  ],
};

const disSlice = createSlice({
  name: "disSlice",
  initialState,
  reducers: {
    postDiscussion(state, action: PayloadAction<IDiscussion>) {
      var curDiscussions = state.alldis;
      curDiscussions.push(action.payload);
      state.alldis = curDiscussions;
    },
    postComment(state, action: PayloadAction<postcomment>) {
      const index = state.alldis.findIndex(
        (item) => item.id === action.payload.did
      );
      const newData: IComment = {
        id: action.payload.id,
        text: action.payload.text,
        likes: action.payload.likes,
        iLikedIt: action.payload.iLikedIt,
        date: action.payload.date,
        user: action.payload.user,
      };
      state.alldis[index].replies.push(newData);
    },
    likeComment(state, action: PayloadAction<CId>) {
      const dindex = state.alldis.findIndex(
        (item) => item.id === action.payload.did
      );
      const cindex = state.alldis[dindex].replies.findIndex(
        (item) => item.id === action.payload.cid
      );
      if (state.alldis[dindex].replies[cindex].iLikedIt) {
        state.alldis[dindex].replies[cindex].iLikedIt = false;
        state.alldis[dindex].replies[cindex].likes -= 1;
      } else {
        state.alldis[dindex].replies[cindex].iLikedIt = true;
        state.alldis[dindex].replies[cindex].likes += 1;
      }
    },
    likePost(state, action: PayloadAction<DId>) {
      const index = state.alldis.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.alldis[index].iLikedIt) {
        state.alldis[index].iLikedIt = false;
        state.alldis[index].likes -= 1;
      } else {
        state.alldis[index].iLikedIt = true;
        state.alldis[index].likes += 1;
      }
    },
  },
});

export default disSlice.reducer;
export const { postDiscussion, postComment, likeComment,likePost } = disSlice.actions;
