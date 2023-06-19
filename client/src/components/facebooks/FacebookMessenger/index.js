import { useEffect } from "react";
import { useSelector } from "react-redux";

function FacebookMessenger() {
  const { facebookSDKWasInitialized } = useSelector(
    (state) => state.facebookSDK
  );

  useEffect(() => {
    if (facebookSDKWasInitialized) {
      var chatbox = document.getElementById("fb-customer-chat");
      chatbox.setAttribute("page_id", "103629576057115");
      chatbox.setAttribute("attribution", "biz_inbox");

      window.FB.XFBML.parse(document.getElementById("joya-fb-customer-chat"));
    }
  }, [facebookSDKWasInitialized]);
  return (
    <div id="joya-fb-customer-chat">
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </div>
  );
}

export default FacebookMessenger;
