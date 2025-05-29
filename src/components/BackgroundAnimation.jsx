import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lottieAnimation.json";

const BackgroundAnimation = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default BackgroundAnimation;
