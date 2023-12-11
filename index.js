import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
import TimeAgo from "javascript-time-ago";
import { registerRootComponent } from "expo";
import en from "javascript-time-ago/locale/en.json";
import AppProviders from "./src/providers/Providers";
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

TimeAgo.addDefaultLocale(en);

global.Buffer = Buffer;

if (typeof BigInt === "undefined") {
  global.BigInt = require("big-integer");
}
if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("text-encoding").TextEncoder;
}
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("text-encoding").TextDecoder;
}

// getRandomValues polyfill
class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(window, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

registerRootComponent(AppProviders);
