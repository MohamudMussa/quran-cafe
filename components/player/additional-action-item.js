import Link from "next/link";
import { Tooltip as ReactTooltip } from 'react-tooltip'

function AdditionalActionItem({ item }) {
  return (
    <div className="px-1">
      <button className="twitter-share-button"
        data-tip data-for={`${item.text}-tooltip`}>
        <Link href={item.link} rel="noreferrer" target="_blank">
          {item.icon}
        </Link>
      </button>
      <ReactTooltip id={`${item.text}-tooltip`} place="top" type="light" effect="float" >
        <span>{item.text}</span>
      </ReactTooltip>
    </div >
  );
}

export default AdditionalActionItem;
