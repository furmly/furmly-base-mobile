import styled from "styled-components/native";
import { titleText, containerPadding, labelColor } from "../../variables";
export default styled.Text`
  font-size: ${titleText};
  font-weight: bold;
  padding: 0px ${containerPadding}px;
  color: ${labelColor};
`;
