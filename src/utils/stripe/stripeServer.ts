import Stripe from "stripe";

/**
 *
 * 1. 이메일 등록 후 customer_id 생성.
 * 2. 카드를 등록하여 PaymentMethod.id를 받음.
 * 3. PaymentMethod.id로 PaymentIntent를 생성
 * 4. PaymentIntent에서 client_secret을 받은 후 클라이언트에서 결제 승인
 */
class StripeServer {
  private static instance: StripeServer;
  private stripe: Stripe;

  private constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY_TEST as string, {});
  }

  public static getInstance(): StripeServer {
    if (!StripeServer.instance) {
      StripeServer.instance = new StripeServer();
    }
    return StripeServer.instance;
  }

  public getStripe(): Stripe {
    return this.stripe;
  }

  /**
   * 모든 고객 조회
   */
  public async getAllCustomer(): Promise<Stripe.ApiListPromise<Stripe.Customer>> {
    return await this.stripe.customers.list();
  }

  /**
   * 고객 정보 조회 by email
   * @param email
   * @returns
   */
  public async getCustomerByEmail(email: string): Promise<Stripe.ApiListPromise<Stripe.Customer>> {
    return await this.stripe.customers.list({ email });
  }

  /**
   * 고객 정보 조회 by customer_id
   * @param customerId
   * @returns name, email, 결제수단
   */
  public async getCustomerByCustomerId(customerId: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return await this.stripe.customers.retrieve(customerId);
  }

  /**
   * customer_id 생성 by email
   * @param email
   * @returns
   */
  public async createCustomer(email: string): Promise<Stripe.Response<Stripe.Customer>> {
    return await this.stripe.customers.create({
      email,
    });
  }

  /**
   * client_secret 생성 by customer_id
   * @param customerId
   * @param amount
   * @param currency
   * @returns
   */
  public async createPaymentIntentByCustomerId(customerId: string, amount: number, currency: string = "usd"): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.create({
      customer: customerId,
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
        // allow_redirects: "never",
      },
    });
  }

  /**
   * client_secret 생성 by payment_method
   * @param paymentMethod
   * @param amount
   * @param currency
   * @returns
   */
  public async createPaymentIntentByPaymentMethod(
    paymentMethod: string,
    amount: number,
    currency: string = "usd"
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.create({
      payment_method: paymentMethod,
      amount,
      currency,
      confirm: true, // 즉시 결제 진행
      automatic_payment_methods: {
        enabled: true,
        // allow_redirects: "never",
        allow_redirects: "always",
      },
      return_url: "http://localhost:3000/stripe",

      // confirmation_method: "manual",
    });
  }

  /**
   * 결제내역 조회 by customer_id
   * @param customerId
   * @param limit default 5
   * @returns
   */
  public async getCustomerPaymentHistory(customerId: string, limit: number = 5): Promise<Stripe.ApiListPromise<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.list({
      customer: customerId,
      limit,
    });
  }

  /**
   * 모든 결제내역 조회
   * @param limit default 5
   * @returns
   */
  public async getAllCustomerPaymentHistory(limit: number = 5): Promise<Stripe.ApiListPromise<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.list({
      limit,
    });
  }

  /**
   * 모든 결제내역 조회 by date
   * @param startDate
   * @param endDate
   * @param limit default 10
   * @returns
   */
  public async getAllCustomerPaymentHistoryWithDate(
    startDate: number,
    endDate: number,
    limit: number = 10
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.list({
      created: {
        gte: startDate,
        lte: endDate,
      },
      limit,
    });
  }

  /**
   * 결제 새뷰 내역 조회
   * @param paymentIntent
   * @returns 결제상태, 결제수단, 고객정보
   */
  public async getPaymentDetailByPamentIntent(paymentIntent: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.retrieve(paymentIntent);
  }

  /**
   * 저장된 결제 수단 조회
   * @param customer_id
   * @param type
   * @returns 카드 브랜드, 카드 마지막 4자리, 카드 만료일
   */
  public async getListPaymentMethodByCustomerId(
    customerId: string,
    type: Stripe.PaymentMethodListParams.Type = "card"
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentMethod>> {
    return await this.stripe.paymentMethods.list({
      customer: customerId,
      type, // 카드 정보만 가져오기
    });
  }

  /**
   * 환불 내역 조회 by payment_method
   * @param paymentMethod
   * @param limit default 5
   * @returns
   */
  public async getListRefunds(paymentMethod: string, limit: number = 5) {
    return await this.stripe.refunds.list({
      payment_intent: paymentMethod, // 특정 결제의 환불 내역
      limit,
    });
  }

  /**
   * 결제 수단 세부내역 조회
   * @param paymentMethod
   * @returns 카드정보, 소유자 정보, 결제 수단
   */
  public async getPaymentMethodDetailByPaymentMethod(paymentMethod: string): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return await this.stripe.paymentMethods.retrieve(paymentMethod);
  }

  /**
   * 결제 실패 이벤트 조회
   * @param customerId
   * @param limit default 5
   * @returns 결제 성공 여부, 실패 이유, 결제 세부 정보
   */
  public async getListChargeByCustomerId(customerId: string, limit: number = 5): Promise<Stripe.ApiListPromise<Stripe.Charge>> {
    return await this.stripe.charges.list({
      customer: customerId,
      limit,
    });
  }
}

export default StripeServer;
