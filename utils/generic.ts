import { Dimensions } from "react-native";
import { Platform } from "react-native";
import { StatusBar } from "react-native";

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get("window");

export const isIPhoneX = () => {
console.log(`into is IPHONEX.... `, width, height);

return Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS
? (width >= X_WIDTH && height >= X_HEIGHT) ||
(width >= XSMAX_WIDTH && height >= XSMAX_HEIGHT)
: false;
};

export const marginTop = Platform.select({
    ios: isIPhoneX() ? 0.05 : 0.02,
    android: 0,
    default: 0,
});

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));