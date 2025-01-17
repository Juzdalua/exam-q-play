"use client";

import Script from "next/script";

const KCPPage = () => {
  const email = 'test@test.test'
  const handlePayment = () => {
    try {
      const form = document.getElementById("paymentForm") as HTMLFormElement;
      //@ts-ignore
      window.KCP_Pay_Execute_Web(form);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <>
      <Script src="https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js" strategy="afterInteractive" onLoad={() => console.log("KCP script loaded")} />
      <div>
        <form id="paymentForm" name="order_info" action="https://stg-spl.kcp.co.kr/gw/enc/v1/payment" method="post">
          <input type="hidden" name="site_cd" value="T0000" />
          <input type="hidden" name="site_name" value="pprk_quel" />
          <input type="hidden" name="pay_method" value="100000000000" />
          <input type="hidden" name="ordr_idxx" value="1234567890" />
          <input type="hidden" name="good_name" value="Test Item" />
          <input type="hidden" name="good_mny" value="1000" />
          <input type="hidden" name="buyr_name" value={email} />
          <input type="hidden" name="buyr_tel1" value="01012345678" />
          <input type="hidden" name="buyr_mail" value="test@example.com" />
        </form>
        <button onClick={handlePayment}>결제하기</button>
      </div>
    </>
  );
};

export default KCPPage;
