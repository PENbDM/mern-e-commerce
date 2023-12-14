import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={350}
    viewBox="0 0 320 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="43" y="34" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="320" height="350" />
  </ContentLoader>
);

export default MyLoader;
