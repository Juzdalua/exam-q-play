import axios from "axios";
import { PaymentCode } from "./payLetterTypes";

// https://www.payletter.com/ko/technical/index#integration-preparation
class PayLetter {
  public static instance: PayLetter;
  private PAYLETTER_BASE_URL = "https://testpgapi.payletter.com";
  private PAYLETTER_CLIENT_ID = "pay_test";
  private PAYLETTER_API_KEY_PAYMENT = `PLKEY MTFBNTAzNTEwNDAxQUIyMjlCQzgwNTg1MkU4MkZENDA=`;
  private PAYLETTER_API_KEY_SEARCH = `PLKEY MUI3MjM0RUExQTgyRDA1ODZGRDUyOEM4OTY2QTVCN0Y=`;

  // private PAYLETTER_API_KEY_PAYMENT = `PLKEY a`;
  // private PAYLETTER_API_KEY_SEARCH = `PLKEY a`;
  // private PAYLETTER_BASE_URL = "https://pgapi.payletter.com";
  // private PAYLETTER_CLIENT_ID = "";

  constructor() {}

  public static getInstance(): PayLetter {
    if (!this.instance) {
      this.instance = new PayLetter();
    }
    return this.instance;
  }

  // https://www.payletter.com/ko/technical/index#payment-request
  public async reqPayment(pgcode: PaymentCode, product_name: string, user_id: string, amount: number): Promise<any> {
    try {
      const res = await axios({
        method: "post",
        url: `${this.PAYLETTER_BASE_URL}/v1.0/payments/request`,
        headers: {
          Authorization: this.PAYLETTER_API_KEY_PAYMENT,
        },
        data: {
          pgcode, // 필수
          client_id: this.PAYLETTER_CLIENT_ID, // 필수
          amount, //필수
          product_name, //필수
          user_id, // 필수 - email or id
          user_name: "테스터",
          service_name: "페이레터",
          order_no: "1234567890",
          taxfree_amount: 100,
          tax_amount: 20,
          email_flag: "Y",
          email_addr: "payletter@payletter.com",
          autopay_flag: "N",
          receipt_flag: "Y",
          custom_parameter: "this is custom parameter",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/pay-letter/res-payment`, // 필수
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/pay-letter/callback-payment`, // 필수
          cancel_url: "https://testpg.payletter.com/cancel", // 취소버튼시 이동 url
        },
      });

      return {
        success: true,
        token: res.data.token,
        online_url: res.data.online_url,
        mobile_url: res.data.mobile_url,
      };
    } catch (error) {
      console.log(`Request Payment Error: ${error}`);
      return {
        success: false,
        error: {
          msg: error,
          code: -1
        }
      };
    }
  }
}

export default PayLetter;
