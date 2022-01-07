import React from "react";
import styled from "@emotion/styled";

const StyledDp = styled.div`
  width: 32px;
  height: 32px;
  background-color: white;
  color: #353535;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export default function PlaceholderDp({ initial }) {
  return <StyledDp>{initial.charAt(0).toUpperCase()}</StyledDp>;
}
