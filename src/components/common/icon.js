import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { iconSize } from "../../variables";

const StyledIcon = styled(Icon).attrs(props => ({
  size: props.size || iconSize(props)
}))`
  align-self: center;
  color: ${props =>
    (typeof props.color === "string" && props.color) ||
    (typeof props.color === "function" && props.color(props)) ||
    props.theme.iconColor};
`;
export default StyledIcon;
