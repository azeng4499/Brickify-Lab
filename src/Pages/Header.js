import React from "react";
import Logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-[100px] w-screen bg-black flex justify-center items-center gap-3"
      onClick={() => navigate("/")}
    >
      <img src={Logo} className="h-[50px]" />
    </div>
  );
};

export default Header;
