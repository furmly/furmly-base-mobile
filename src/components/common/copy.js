import styled from "styled-components/native";
import { smallestText, labelPadding } from "../../variables";
export default styled.Text`
  color: ${props => props.theme.copyColor || "gray"};
  padding: 0 ${labelPadding}px;
  padding-left: 0;
  font-size: ${smallestText}px;
`;
