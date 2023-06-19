import { changeFacebookSDKStatus } from "../../store/facebookSDK.slice";
import i18n from "../languages/i18n";

const initFacebookSDK = (store) => {
  const noScriptTag = document.querySelector("noscript");

  // add div#fb-root
  const fbRoot = document.createElement("div");
  fbRoot.id = "fb-root";
  noScriptTag.parentNode.insertBefore(fbRoot, noScriptTag);

  // add script#facebook-jssdk
  let languageCode = "vi_VN";
  if (i18n.language === "en") {
    languageCode = "en_US";
  }

  const scriptTag = document.createElement("script");
  scriptTag.id = "facebook-jssdk";
  scriptTag.src = `https://connect.facebook.net/${languageCode}/sdk/xfbml.customerchat.js`;

  scriptTag.setAttribute("crossorigin", "anonymous");
  scriptTag.setAttribute("defer", true);
  scriptTag.setAttribute("async", true);
  noScriptTag.parentNode.insertBefore(scriptTag, noScriptTag);

  // init fbSDK
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FACEBOOK_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: "v16.0",
    });
    store.dispatch(changeFacebookSDKStatus(true));
  };
};

export default initFacebookSDK;
