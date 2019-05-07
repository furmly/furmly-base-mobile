import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { iconSize } from "../../variables";

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.iconColor,
  size: props.size || iconSize(props)
}))`
  align-self: center;
`;
export default StyledIcon;
