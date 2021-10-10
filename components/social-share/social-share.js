import { TwitterShareButton } from "react-twitter-embed";

function SocialShare() {
  return (
    <div className="pr-2">
      <TwitterShareButton
        url="https://quran.cafe/"
        options={{
          text: `I'm currently Listen to Quran on @QuranCafe and you should too!`,
          via: "qurancafe",
        }}
      />
    </div>
  );
}

export default SocialShare;
