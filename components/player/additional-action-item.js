function AdditionalActionItem({ text, link }) {
  return (
    <div className="pr-2 mr-5">
      <a className="twitter-share-button"
        href={link} target="_blank" rel="noreferrer">
      {text}</a>
    </div>
  );
}

export default AdditionalActionItem;
