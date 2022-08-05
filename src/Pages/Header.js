import React from "react";
import { AiFillGithub } from "react-icons/ai";
import Logo from "../Images/logo.png";

const Header = () => {
  return (
    <div className="h-[100px] w-screen bg-black flex justify-center items-center gap-3">
      <img src={Logo} className="h-[50px]" />
    </div>
  );
};

export default Header;
