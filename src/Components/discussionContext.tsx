import React, { createContext, ReactNode, useContext, useState } from "react";
interface IUser {
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
type Props = {
  children: ReactNode;
};
type discussionContextType = {
  discussions: IDiscussion[];
  postDiscussion: (data: IDiscussion) => void;
  discussionLikeDislike: (id: number) => void;
  postComment: (data: IComment, did: number) => void;
  commentLikeDislike: (did: number, cid: number) => void;
  fetchDiscussions: () => void;
};
const discussionContextDefaultValues: discussionContextType = {
  discussions: [],
  postDiscussion: (data: IDiscussion) => {},
  discussionLikeDislike: (id: number) => {},
  postComment: (data: IComment, did: number) => {},
  commentLikeDislike: (did: number, cid: number) => {},
  fetchDiscussions: () => {},
};

export const DiscussionContext = createContext<discussionContextType>(
  discussionContextDefaultValues
);

export function useDiscuss() {
  return useContext(DiscussionContext);
}

export function DiscussionProvider({ children }: Props) {
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);

  const fetchDiscussions = () => {
    fetch("http://localhost:3000/api/discussions")
      .then((res) => res.json())
      .then((data) => setDiscussions(data));
  };

  const discussionLikeDislike = (id: number) => {
    const index = discussions.findIndex((item) => item.id === id);
    var curDiscusions = discussions;
    if (!curDiscusions[index].iLikedIt) {
      curDiscusions[index].iLikedIt = true;
      curDiscusions[index].likes += 1;
    } else {
      curDiscusions[index].iLikedIt = false;
      curDiscusions[index].likes -= 1;
    }
    setDiscussions(curDiscusions);
    console.log(curDiscusions)
  };
  const postDiscussion = (data: IDiscussion) => {
    const curDiscussions = discussions;
    curDiscussions.push(data);
    setDiscussions(curDiscussions);
    console.log(curDiscussions)
  };

  const postComment = (data: IComment, did: number) => {
    const curDiscussions = discussions;
    const index = discussions.findIndex((item) => item.id === did);
    curDiscussions[index].replies.push(data);
    setDiscussions(curDiscussions);
  };

  const commentLikeDislike = (did: number, cid: number) => {
    const dindex = discussions.findIndex((item) => item.id === did);
    const cindex = discussions[dindex].replies.findIndex(
      (item) => item.id === cid
    );
    const curDiscusions = discussions;
    if (!curDiscusions[dindex].replies[cindex].iLikedIt) {
      curDiscusions[dindex].replies[cindex].iLikedIt = true;
      curDiscusions[dindex].replies[cindex].likes += 1;
    } else {
      curDiscusions[dindex].replies[cindex].iLikedIt = false;
      curDiscusions[dindex].replies[cindex].likes -= 1;
    }
    setDiscussions(curDiscusions);
  };

  const value = {
    discussions,
    postDiscussion,
    discussionLikeDislike,
    postComment,
    commentLikeDislike,
    fetchDiscussions,
  };
  return (
    <>
      <DiscussionContext.Provider value={value}>
        {children}
      </DiscussionContext.Provider>
    </>
  );
}
