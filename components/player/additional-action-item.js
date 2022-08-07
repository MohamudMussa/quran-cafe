function AdditionalActionItem({ text, link }) {
  return (
    <div className="pr-2">
      <a className="twitter-share-button"
        href={link} target="_blank" rel="noreferrer">
      {text}</a>
    </div>
  );
}

export default AdditionalActionItem;
