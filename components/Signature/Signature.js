import Image from "next/image";
import signature from "../../assets/images/signature.png";

const Signature = () => {
  return (
    <div className="signature">
      <Image src={signature} width={243} height={85}/>
    </div>
  )
};

export default Signature;