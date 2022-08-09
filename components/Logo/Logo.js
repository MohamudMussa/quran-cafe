import Image from "next/image"
import logo from "../../assets/images/logo.png";

const Logo = () => (
  <div className="logo">
    <Image src={logo} width={120} height={120}/>
  </div>
);

export default Logo;