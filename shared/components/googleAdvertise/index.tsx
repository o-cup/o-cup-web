import React, { useEffect } from "react";

export const inFeedAdProps = {
  className: "adsbygoogle",
  client: "ca-pub-2524496852271657",
  slot: "1672880296",
  format: "fluid",
  responsive: "",
  layoutKey: "-69+e3+2n-6s+7r",
};

type AdProps = {
  className: string;
  client: string;
  slot: string;
  format: string;
  responsive: string;
  layoutKey: string;
}

const GoogleAdvertise = ({
                           className = "adsbygoogle",
                           client = "",
                           slot = "",
                           format = "",
                           responsive = "",
                           layoutKey = "",
                         }: AdProps) => {

  let { adsbygoogle } = window as any;

  useEffect(() => {
    try {
      (adsbygoogle = adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      console.error("AdvertiseError", e);
    }
  }, []);

  return (
    <ins
      className={className}
      style={{
        display: "block",
        overflowX: "hidden",
        overflowY: "hidden",
        boxShadow: "4px 4px 0 #000000",
        border: "2px solid #000000",
        width: "100%",
        minHeight: "50px",
        background: "#FFFFFF"
      }}
      data-adtest="on"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout-key={layoutKey}
    />
  );
};

export default GoogleAdvertise;