import { url } from "inspector";
import Image from "next/image";

export default function Home() {
 return(
  <div className="bg-[#FE2C55] h-screen" >
    <div>
      <Image src={'/image 348.svg'} alt="" layout="fill" object-cover />
      <div className="flex flex-col-1 justify-center h-screen">
        <Image src={'/Frame 1000006975.svg'} width={192} height={35} alt="" />
     
      </div>
    </div>
  </div>
 )
}
