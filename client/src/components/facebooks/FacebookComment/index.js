import { useEffect } from "react";
import { useSelector } from "react-redux";

function FacebookComment(props) {
  const { href, width } = props;
  const { facebookSDKWasInitialized } = useSelector(
    (state) => state.facebookSDK
  );

  useEffect(() => {
    if (facebookSDKWasInitialized) {
      window.FB.XFBML.parse(document.querySelector(".joya-fb-comments"));
    }
  }, [facebookSDKWasInitialized, href]);
  return (
    <div className="joya-fb-comments">
      <div
        className="fb-comments border"
        data-colorscheme="light"
        data-lazy={true}
        data-href={href}
        data-width={width}
        data-numposts={5}
      ></div>
    </div>
  );
}

export default FacebookComment;
