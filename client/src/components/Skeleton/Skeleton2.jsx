import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const StyledLoader = styled(ContentLoader)`
  margin: 0 auto;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MyLoader2 = (props) => (
  <StyledLoader
    speed={2}
    width={320}
    height={300}
    viewBox="0 0 320 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="43" y="34" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="950" height="850" />
  </StyledLoader>
);

export default MyLoader2;
