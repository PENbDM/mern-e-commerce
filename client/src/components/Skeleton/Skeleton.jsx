import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
const StyledLoader = styled(ContentLoader)`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const MyLoader = (props) => (
  <StyledLoader
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
  </StyledLoader>
);

export default MyLoader;
