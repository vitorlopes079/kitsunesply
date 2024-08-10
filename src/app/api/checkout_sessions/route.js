import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe without specifying the API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    // Validate that 'items' is an array
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid items array.");
    }

    const transformedItems = items.map((item) => {
      // Validate each item
      if (typeof item.name !== "string" || item.name.trim() === "") {
        throw new Error("Invalid item name.");
      }
      if (typeof item.price !== "number" || item.price <= 0) {
        throw new Error("Invalid item price.");
      }
      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        throw new Error("Invalid item quantity.");
      }

      // Log the transformation process
      console.log(
        `Transforming item: ${item.name}, Price in Cents: ${item.price}, Quantity: ${item.quantity}`
      );

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price, // Price is assumed to be in cents
        },
        quantity: item.quantity,
      };
    });

    // Log the final transformed items
    console.log("Transformed Items:", transformedItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancelled`,
    });

    // Log the session creation result
    console.log("Stripe session created:", session);

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json(
      { error: { message: err.message } },
      { status: 500 }
    );
  }
}
