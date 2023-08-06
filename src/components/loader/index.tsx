import { Spin } from "antd";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <Spin
      size="large"
      style={{
        position: "fixed",
        left: 0,
        top: "40%",
        width: "100%",
        height: "100%",
      }}
    />
  );
};
