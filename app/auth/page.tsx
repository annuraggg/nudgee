import React from "react";
import AuthInputs from "./AuthInputs";

const Auth = () => {
  return (
    <div className="flex">
      <div
        className="w-1/2 flex justify-end items-center"
        style={{ height: "90vh" }}
      >
        <div className="mockup-browser bg-base-300 h-5/6 w-full m-20">
          <div className="mockup-browser-toolbar">
            <div className="input">https://nudgee.com</div>
          </div>
          <div className="flex flex-col items-center gap-5 px-4 py-16 bg-base-200 h-full"></div>
        </div>
      </div>
      <div
        className="flex flex-col gap-10 items-center justify-center w-1/2 py-20 relative"
        style={{ height: "90vh" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute z-0 w-full h-full left-0 top-0"
          viewBox="0 0 800 800"
          opacity="1"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              x="-150%"
              y="-100%"
              width="400%"
              height="400%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                stdDeviation="80"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="SourceGraphic"
                edgeMode="none"
                result="blur"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              rx="35"
              ry="35"
              cx="470.0705010379172"
              cy="272.8878707486298"
              fill="hsl(37, 99%, 67%)"
            ></ellipse>
            <ellipse
              rx="35"
              ry="35"
              cx="370.5982707557878"
              cy="367.4199359354548"
              fill="hsl(316, 73%, 52%)"
            ></ellipse>
            <ellipse
              rx="35"
              ry="35"
              cx="325.52821485908873"
              cy="230.73481518810337"
              fill="hsl(185, 100%, 57%)"
            ></ellipse>
          </g>
        </svg>
        <div className="relative">
          <div className="relative">
            <h1 className="text-7xl" style={{ fontFamily: "Comfortaa" }}>
              Simple.
            </h1>
            <h1 className="text-7xl" style={{ fontFamily: "Comfortaa" }}>
              Secure.
            </h1>
            <h1 className="text-7xl" style={{ fontFamily: "Comfortaa" }}>
              Fast.
            </h1>
          </div>
          <div className="flex flex-col gap-5  mt-5">
            <AuthInputs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
