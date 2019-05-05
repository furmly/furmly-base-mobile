export const ns = "furmly";
export const lineHeight = 1.3;
export const smallText = props => props.theme.factor * 14;
export const smallestText = props => props.theme.factor * 12;
export const bodyText = props => props.theme.factor * 16;
export const titleText = props => props.theme.factor * 18;
export const labelBackgroundColor = props =>
  props.theme.labelBackgroundColor || "transparent";
export const labelPadding = props => props.theme.factor * 5;
export const secondaryBackgroundColor = props =>
  props.theme.secondaryBackgroundColor || "transparent";
export const secondaryColor = props => props.theme.secondaryColor || "white";
export const accentColor = props => props.theme.accentColor || "#783196";
export const labelColor = props => props.theme.labelColor || "black";
export const errorColor = props => props.theme.errorColor || "red";
export const elementPadding = props => props.theme.factor * 8;
export const borderColor = props => props.theme.borderColor || "gray";
export const labelSize = props =>
  2 * props.theme.factor * 5 + props.theme.factor * 14 * lineHeight;
export const dropDownMenuColor = props =>
  props.theme.dropDownMenuColor || "white";
export const minimumInputHeight = props =>
  (props.large && props.theme.factor * 10 + 50) || props.theme.factor * 40;
export const containerPadding = props => props.theme.factor * 10;
export const minimumModalHeight = props =>
  props.theme.minimumModalHeight || "auto";
export const minimumModalWidth = props =>
  props.theme.minimumModalWidth || "40%";
export const dividerColor = props => props.theme.dividerColor || "black";
export const highLightColor = props =>
  props.theme.highLightColor || "rgba(0,0,0,0.1)";
export const inputColor = props => props.theme.inputColor || "black";
export const progressBarColor = props =>
  props.theme.progressBarColor || "black";
export const inputBackgroundColor = props =>
  props.theme.inputBackgroundColor || "rgba(53, 53, 53, 0.08)";
export const inputPadding = props => props.inputPadding || `0px 5px`;
export const verticalInputPadding = props => props.verticalInputPadding || 5;
export const iconSize = props => props.size || props.theme.factor * 10;
export const largeIconSize = props => props.size || props.theme.factor * 20;
export const buttonDefaults = "display: block;  border: none;";
export const formComponentBackgroundColor = props =>
  props.theme.formComponentBackgroundColor || "rgba(0,0,0,0.01)";
export const modalBackgroundColor = props =>
  props.theme.modalBackgroundColor || "white";
export const primaryButtonForegroundColor = props =>
  props.theme.primaryButtonForegroundColor || "black";
export const dropShadowColor = "rgba(0,0,0,0.18)";
export const boxShadow = `box-shadow:0px 0px 14px 0px ${dropShadowColor}`;
export const largerBoxShadow = `box-shadow:0px 5px 4px -1px ${dropShadowColor}`;
export const iconDropShadow = `filter: drop-shadow(0px 3px 1px ${dropShadowColor})`;
export const formLineWidth = props => props.theme.factor * 2;
export const aboveOthers = "z-index:1";
