"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

// Ensure the publishable key is available or throw an error
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    (() => {
      throw new Error("Stripe publishable key is missing");
    })()
);

export default function CheckoutPage() {
  const router = useRouter();

  const handleCheckout = async () => {
    const items = [
      {
        name: "Product 1",
        price: 5000, // $50.00
        quantity: 1,
      },
      {
        name: "Product 2",
        price: 3000, // $30.00
        quantity: 2,
      },
    ];

    // Make the request to your API to create a Stripe Checkout session
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    // Parse the response from the API
    const session = await res.json();

    // Log the session to see what's being returned
    console.log(session); // This will show you the entire response object in the browser's console

    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe initialization failed.");
      return;
    }

    // Check if the session.id exists before trying to use it
    if (!session.id) {
      console.error("Session ID not returned");
      return;
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe Checkout error:", error);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button role="link" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}
