import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, PlayCircle, Instagram, Facebook, Pinterest, MapPin } from "lucide-react";

/**
 * Cart page converted from cart.html, cart.css, and cart.js → React + Tailwind.
 * ----------------------------------------------------------
 *  • Hero video with play button overlay
 *  • Ingredients / Steps accordion
 *  • Add‑to‑Cart kit card with quantity selector
 *  • Footer with socials
 * ----------------------------------------------------------
 * Usage:  <Cart />
 */

export default function Cart() {
  const [qty, setQty] = useState(1);
  const price = 199; // ₹
  const total = qty * price;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Hero />

      <main className="flex-1 container mx-auto px-4 py-12 grid gap-12 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-10">
          <Ingredients />
          <Steps />
        </section>

        <aside className="lg:col-span-1">
          <KitCard qty={qty} setQty={setQty} total={total} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative aspect-video w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.pixabay.com/video/2019/12/17/31516-383049092_large.mp4"
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <Button size="icon" className="rounded-full h-20 w-20 backdrop-blur">
          <PlayCircle className="h-10 w-10" />
        </Button>
      </div>
      <h1 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white drop-shadow-md">
        Chole Bhature Kit
      </h1>
    </section>
  );
}

function Ingredients() {
  const list = [
    "2 cups chickpeas (soaked overnight)",
    "2 onions, finely chopped",
    "3 tomatoes, pureed",
    "1 tbsp ginger‑garlic paste",
    "Whole & ground spices (bay leaf, cumin, coriander, garam masala)",
    "Fresh coriander & lemon wedges for garnish",
  ];
  return (
    <article>
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="space-y-2 pl-5 list-disc text-gray-700">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function Steps() {
  const steps = [
    "Pressure‑cook soaked chickpeas with salt until soft (6–7 whistles).",
    "Sauté onions in oil until golden. Add ginger‑garlic paste; cook 1 min.",
    "Add tomato purée, spices; simmer until oil separates.",
    "Tip in cooked chickpeas; mash a few for thicker gravy. Simmer 15 min.",
    "Garnish with coriander. Serve hot with fluffy bhature & lemon wedges.",
  ];
  return (
    <article>
      <h2 className="text-2xl font-semibold mb-4">Method</h2>
      <ol className="space-y-3 pl-5 list-decimal text-gray-700">
        {steps.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </article>
  );
}

function KitCard({ qty, setQty, total }) {
  return (
    <div className="sticky top-24 space-y-6 p-6 rounded-2xl shadow-xl bg-white">
      <img
        src="https://images.pexels.com/photos/9403028/pexels-photo-9403028.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Chole Bhature Kit"
        className="rounded-xl w-full object-cover h-48 mb-4"
      />
      <h3 className="text-xl font-semibold">Chole Bhature Kit</h3>
      <p className="text-gray-600 text-sm mb-2">Makes 4 generous servings</p>

      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          −
        </Button>
        <span className="px-4 py-2 border rounded">{qty}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setQty(qty + 1)}
        >
          +
        </Button>
      </div>

      <div className="flex justify-between items-center text-lg font-medium">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <Button className="w-full flex gap-2">
        <ShoppingCart className="h-5 w-5" /> Add to Cart
      </Button>

      <p className="flex items-center text-xs text-green-600">
        <Check className="h-4 w-4 mr-1" /> In stock. Ships within 24 hrs.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <p>New Delhi, India</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Desi Delights</p>
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:text-white" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="h-5 w-5 hover:text-white" />
          </a>
          <a href="#" aria-label="Pinterest">
            <Pinterest className="h-5 w-5 hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
