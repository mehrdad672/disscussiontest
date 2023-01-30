import React, { useState } from "react";
import { postDiscussion } from "./disSlice";
import { useAppDispatch } from "./store";

type Props = {};
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
const PostForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const [enteredText, setEnteredText] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (enteredText.trim().length === 0) {
      setIsValid(false);
      return;
    }
    const curDate = new Date();

    const newDiscussion: IDiscussion = {
      id: Math.floor(Math.random() * 1000),
      date: curDate.getTime(),
      user: {
        name: "Mehrdad Roienyan",
        avatar: "https://s2.uupload.ir/files/me_um2w.jpg",
      },
      text: enteredText,
      likes: 0,
      iLikedIt: false,
      replies: [],
    };
    dispatch(postDiscussion(newDiscussion));
    setEnteredText("");
  };

  return (
    <div className="w-[650px] bg-gray-100 py-5 mx-auto rounded-t-lg space-x-4 border border-gray-200 flex justify-center items-center">
      <img
        className="w-12 h-12 rounded-full"
        src="https://s2.uupload.ir/files/me_um2w.jpg"
        alt="user avatar"
      />
      <form onSubmit={submitHandler}>
        <input
          placeholder="Start a discussion"
          className={`w-[550px] focus:outline-none px-4 h-12 rounded-lg border bg-white ${
            isValid
              ? "border-gray-200 focus:border-gray-600"
              : "border-rose-500 focus:border-rose-500"
          }`}
          type="text"
          value={enteredText}
          onChange={(e) => {
            setEnteredText(e.target.value);
            setIsValid(true);
          }}
        />
        {!isValid && (
          <p className="text-rose-700">Please Enter Your Message!</p>
        )}
      </form>
    </div>
  );
};

export default PostForm;
