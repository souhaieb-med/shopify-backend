import stripe from "stripe";

const Stripe = stripe(process.env.STRIPE_KEY);

export const payment = (req, res) => {
  Stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (StripeErr, StripeRes) => {
      if (StripeErr) return res.status(500).json(StripeErr);
      res.status(200).json(StripeRes);
    }
  );
};
