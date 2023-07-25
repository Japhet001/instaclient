import React from "react";
import noidea from "../images/no-idea.svg";

const NoIdeas = () => {
  const styles = {
    gridColumn: "4 / 6",
    gridRow: "3 / 4",
    textAlign: "center",
    lineHeight: "1.6",
  };
  return (
    <div style={styles} className="no_ideas">
      <img style={{ width: "20%" }} src={noidea} />
      <h2 style={{fontSize : "2rem"}}>Have No shared posts yet!! Follow others to see their posts</h2>
    </div>
  );
};

export default NoIdeas;
