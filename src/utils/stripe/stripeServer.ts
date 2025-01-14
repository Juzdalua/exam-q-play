import Stripe from "stripe";

/**
 *
 * 1. 이메일 등록 후 고객 ID 생성.
 * 2. 카드를 등록하여 PaymentMethod.id를 받음.
 * 3. PaymentMethod.id로 PaymentIntent를 생성
 * 4. client_secret을 받은 후 클라이언트에서 결제 승인
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

  public async getAllCustomer(): Promise<Stripe.ApiListPromise<Stripe.Customer>> {
    return await this.stripe.customers.list();
  }

  public async createCustomer(email: string): Promise<Stripe.Response<Stripe.Customer>> {
    return await this.stripe.customers.create({
      email,
    });
  }

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

  public async createPaymentIntentByPaymentId(paymentMethod: string, amount: number, currency: string = "usd"): Promise<Stripe.Response<Stripe.PaymentIntent>> {
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
}

export default StripeServer;
