import React from "react";

type Props = { userName: string };

const DummyAvatar = ({userName}: Props) => {
    const words=userName.split(" ")
   var text = "";
for (let i = 0; i < words.length; i++) {
  text += words[i][0]
}
  return (
    <div className="w-12 h-12 rounded-full flex justify-center items-center uppercase font-bold bg-cyan-100 text-sky-600">
      <p>{text}</p>
    </div>
  );
};

export default DummyAvatar;
