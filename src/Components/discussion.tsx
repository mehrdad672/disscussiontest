import React from "react";

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
interface IProps {
  comments: IComment[];
}

const Discussion = ({
  id,
  date,
  user,
  text,
  likes,
  iLikedIt,
  replies,
}: IDiscussion) => {
  const timeStampConvert = (time: number) => {
    const current = new Date().getTime();
    const diff = Math.floor((current - time) / 1000);
    const month = Math.floor(diff / 2592000);
    const day = Math.floor((diff - month * 2592000) / 86400);
    const hour = Math.floor((diff - (month * 2592000 + day * 86400)) / 3600);
    const min = Math.floor(
      (diff - (month * 2592000 + day * 86400 + hour * 3600)) / 60
    );

    return `${month >= 1 ? month + "m" : ""} ${day >= 1 ? day + "d" : ""} ${
      hour >= 1 ? hour + "h" : ""
    } ${min >= 1 && hour === 0 ? min + "minutes" : ""}`;
  };
  const disTime = timeStampConvert(date);
  return (
    <div className="w-[700px] flex mx-auto bg-white border  border-gray-100 ">
      <div className="flex h-72 space-y-3  flex-col px-2 py-2 items-center justify-center">
        <img
          className="w-12 h-12 rounded-full"
          src={user.avatar}
          alt="useravatar"
        />
        <div className="border flex-grow border-gray-300 w-[2px]"></div>
      </div>
      <div>
        <div role="discussion_body">
          <span className="flex items-center space-x-2">
            <h5 className="font-bold text-gray-600 text-xl">{user.name}</h5>
            <h6 className="text-gray-400">{disTime.toString()} ago</h6>
          </span>
          <p className="w-[500px] text-gray-500">{text}</p>
          <div></div>
          <div></div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Discussion;
