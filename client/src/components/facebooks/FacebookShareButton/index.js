import { useEffect } from "react";
import { useSelector } from "react-redux";

function FacebookShareButton({ href, ...props }) {
  const { facebookSDKWasInitialized } = useSelector(
    (state) => state.facebookSDK
  );

  useEffect(() => {
    if (facebookSDKWasInitialized) {
      window.FB.XFBML.parse();
    }
  }, [facebookSDKWasInitialized]);

  return (
    <div {...props}>
      <div
        className="fb-share-button"
        data-href={href}
        data-layout=""
        data-size=""
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          className="fb-xfbml-parse-ignore"
        >
          Share
        </a>
      </div>
    </div>
  );
}

export default FacebookShareButton;
