import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY_TEST as string);
export default stripe;