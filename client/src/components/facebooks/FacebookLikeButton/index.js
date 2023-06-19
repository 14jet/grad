import { useEffect } from "react";
import { useSelector } from "react-redux";

function FacebookLikeButton({ href, ...props }) {
  const { facebookSDKWasInitialized } = useSelector(
    (state) => state.facebookSDK
  );

  useEffect(() => {
    if (facebookSDKWasInitialized) {
      console.log("LIKE BUTTON RE-RENDER");
      window.FB.XFBML.parse(document.querySelector(".joya-fb-like"));
    }
  }, [facebookSDKWasInitialized, href]);
  return (
    <div {...props} className="joya-fb-like w-100 overflow-hidden">
      <div
        className="fb-like"
        data-href={href}
        data-width=""
        data-layout=""
        data-action=""
        data-size=""
        data-share="true"
      ></div>
    </div>
  );
}

export default FacebookLikeButton;
