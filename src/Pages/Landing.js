import React from "react";
import Header from "./Header";
import TurnThis from "../Images/turn-this.png";
import IntoThis from "../Images/into-this.png";
import { Link as LinkR } from "react-router-dom";
import LoopyArrow from "../Images/loopy-arrow.png";
import { AiFillGithub } from "react-icons/ai";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="h-screen min-h-[1200px] md:min-h-[1300px] lg:min-h-[650px] lg:h-[calc(100vh-130px)] w-full bg-gradient-to-t from-dark-blue to-black flex flex-col justify-center items-center gap-12">
        <div className="text-white text-[30px] md:text-[35px] lg:text-[40px] font-bold text-center font-kdam">
          Transform any LEGO® Mosiac set into your own custom image
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-[10px] w-screen">
          <img src={TurnThis} className="h-[325px] md:h-[350px]" />
          <img src={LoopyArrow} className="h-[125px] invert" />
          <img src={IntoThis} className="h-[325px] md:h-[350px]" />
        </div>

        <LinkR
          to="/image-settings"
          className="text-white text-xl font-bold p-[10px] rounded border-4 w-fit"
        >
          Get Started
        </LinkR>
      </div>
      <div className="h-[150px] md:h-[75px] lg:h-[30px] w-screen flex justify-evenly items-center bg-dark-blue px-[10px]">
        <div className="max-w-[180px] md:max-w-[500px] lg:max-w-[1200px]">
          *LEGO® is a trademark of the LEGO Group of companies which does not
          sponsor, authorize or endorse this site
        </div>
        <a
          href="https://github.com/azeng4499/brickify-lab"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center gap-2 text-white"
        >
          Source Code <AiFillGithub />
        </a>
      </div>
    </>
  );
};

export default Landing;
