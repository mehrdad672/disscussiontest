import React, { useState } from "react";
import Comment from "./comment";
import { likePost, postComment } from "./disSlice";
import DummyAvatar from "./dummyAvatar";
import { useAppDispatch } from "./store";
import useTimeConvert from "./useTimeConverter";

interface IUser {
  name: string;
  avatar?: string;
}
interface DId {
    id:number
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


interface Props {
  allDiscussions: IDiscussion[];
  did: number;
  date: number;
  user: IUser;
  text: string;
  likes: number;
  iLikedIt: boolean;
  replies: IComment[];
}
interface postcomment extends IComment {
  did: number;
}
const Discussion = ({
  did,
  date,
  user,
  text,
  likes,
  iLikedIt,
  replies,
}: Props) => {
  const [enteredText, setEnteredText] = useState<string>("");
  const dispatch = useAppDispatch();
  const duration = useTimeConvert(date).toString();
  const [replyActive, setReplyActive] = useState(false);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (enteredText.trim().length === 0) {
      return;
    }
    const curDate = new Date();

    const newDiscussion: postcomment = {
      id: Math.floor(Math.random() * 1000),
      date: curDate.getTime(),
      user: {
        name: "Mehrdad Roienyan",
        avatar: "https://s2.uupload.ir/files/me_um2w.jpg",
      },
      text: enteredText,
      likes: 0,
      iLikedIt: false,
      did: did,
    };
    dispatch(postComment(newDiscussion));
    setEnteredText("");
  };
const ID:DId ={
    id:did
}
  const likeHandler=()=>{
    dispatch(likePost(ID))
  }

  const repliesList = replies.map(
    ({ id, date, user, text, likes, iLikedIt }) => {
      return (
        <Comment
          did={did}
          key={id}
          id={id}
          likes={likes}
          text={text}
          user={user}
          date={date}
          iLikedIt={iLikedIt}
        />
      );
    }
  );
  return (
    <div className="w-[650px] flex space-x-2 mx-auto px-2 py-3 bg-white border border-gray-100 ">
      <div className="flex space-y-3 flex-col px-2 py-2 items-center justify-start">
        {user.avatar ? (
          <img
            className="w-12 h-12 rounded-full"
            src={user.avatar}
            alt="useravatar"
          />
        ) : (
          <DummyAvatar userName={user.name} />
        )}
        {replies.length > 0 && (
          <div className="border flex-grow border-gray-300 w-[2px]"></div>
        )}
      </div>
      <div>
        <div role="discussion_body">
          <span className="flex items-center space-x-2">
            <h5 className="font-bold text-gray-600 text-lg">{user.name}</h5>
            <h6 className="text-gray-400">{duration} ago</h6>
          </span>
          <p className="w-[500px] text-gray-500">{text}</p>
          <div className="flex items-center space-x-5">
            <button
            onClick={likeHandler}
              className={` ${
                iLikedIt ? "bg-blue-700" : "bg-gray-100"
              } flex space-x-2 border-transparent border hover:border-gray-300 items-center px-4 rounded-2xl mt-2 py-1 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className={`w-5 h-5 ${
                  iLikedIt ? "fill-white stroke-white" : "fill-gray-500"
                } `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <p
                className={`${
                  iLikedIt ? "text-white" : "text-gray-600"
                } font-bold`}
              >
                {likes}
              </p>
            </button>
            <button
              onClick={() => {
                setReplyActive(true);
              }}
              className="font-bold flex items-center space-x-2 group text-sky-500"
            >
              <p>Reply</p>
              <span className="w-[1px] border border-gray-500 hidden group-hover:inline-flex  h-3 duration-100 animate-[pulse_1s_linear_infinite]"></span>
            </button>
          </div>
        </div>
        <div role="replies_container">{repliesList}</div>
        {replyActive && (
          <div className="flex space-x-3 items-center my-4" role="reply_form">
            <img
              className="w-12 h-12 rounded-full"
              src="https://s2.uupload.ir/files/me_um2w.jpg"
              alt="user avatar"
            />
            <form onSubmit={submitHandler}>
              <input
                placeholder="Reply"
                className="w-[450px] focus:outline-none focus:border-gray-600 px-4 h-12 rounded-lg border border-gray-200"
                type="text"
                value={enteredText}
                onChange={(e) => setEnteredText(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
