import React from "react";

const styles = {
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 30px",
  display: "flex",
  flexDirection: "column",
};
const Container = ({ children }) => {
  return <div style={styles}>{children}</div>;
};

export default Container;
