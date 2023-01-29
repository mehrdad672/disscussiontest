import React from "react";

type Props = {};

const PostForm = (props: Props) => {
  return (
    <div className="w-[700px] px-2 py-2 bg-gray-100 h-32 mx-auto rounded-t-lg space-x-4 border border-gray-200 flex justify-center items-center">
      <img
        className="w-12 h-12 rounded-full"
        src="https://s2.uupload.ir/files/me_um2w.jpg"
        alt="user avatar"
      />
      <input
        placeholder="Start a discussion"
        className="w-[550px] focus:outline-none focus:border-cyan-300 px-4 h-12 rounded-lg border border-gray-200 bg-white"
        type="text"
      />
    </div>
  );
};

export default PostForm;
