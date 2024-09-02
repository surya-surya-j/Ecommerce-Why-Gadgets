import React from "react";
import Categorylist from "../components/Categorylist";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProducts";

function Home() {
  return (
    <div>
      <Categorylist />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular watches"}
      />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"} />
      <VerticalCardProduct category={"printers"} heading={"Printers"} />
      <VerticalCardProduct category={"processor"} heading={"processors"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
}

export default Home;
