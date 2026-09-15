import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartProvider, useCart } from "@/context/cart";

import heroCan from "@/assets/hero-can.jpg";
import canStatic from "@/assets/can-static.jpg";
import canVolt from "@/assets/can-volt.jpg";
import canBurn from "@/assets/can-burn.jpg";
import canSurge from "@/assets/can-surge.jpg";
import canMidnight from "@/assets/can-midnight.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rage Energy | Unleash the Voltage" },
      {
        name: "description",
        content:
          "Rage Energy — zero-sugar, high-voltage energy drinks for the midnight set. Shop Static, Volt, Burn, Surge and limited drops.",
      },
      { property: "og:title", content: "Rage Energy | Unleash the Voltage" },
      {
        property: "og:description",
        content: "Zero-sugar, high-voltage energy drinks for the midnight set.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@RageEnergy" },
    ],
  }),
});

const products = [
  {
    id: "static",
    name: "STATIC",
    price: 6.5,
    size: "0.5L · 200mg",
    image: canStatic,
    tagline: "Lime · 200mg",
  },
  {
    id: "volt",
    name: "VOLT",
    price: 7.0,
    size: "0.5L · 250mg",
    image: canVolt,
    tagline: "Berry · 250mg",
  },
  {
    id: "burn",
    name: "BURN",
    price: 6.5,
    size: "0.5L · 200mg",
    image: canBurn,
    tagline: "Citrus · 200mg",
  },
  {
    id: "surge",
    name: "SURGE",
    price: 7.5,
    size: "0.5L · 300mg",
    image: canSurge,
    tagline: "Grape · 300mg",
  },
  {
    id: "midnight",
    name: "MIDNIGHT SURGE",
    price: 39.0,
    size: "6-can case · 300mg",
    image: canMidnight,
    tagline: "6-can case",
  },
];

const staticProduct = products.find((p) => p.id === "static")!;
const midnightProduct = products.find((p) => p.id === "midnight")!;

function Index() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}

function Storefront() {
  const { items, count, total, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAdd = (product: (typeof products)[number]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      image: product.image,
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1000);
    setCheckoutStep("cart");
    setCartOpen(true);
  };

  const startCheckout = () => {
    if (items.length === 0) return;
    setCheckoutStep("checkout");
  };

  const placeOrder = () => {
    clearCart();
    setCheckoutStep("success");
    setTimeout(() => {
      setCartOpen(false);
      setCheckoutStep("cart");
    }, 2500);
  };

  const closeCart = () => {
    setCartOpen(false);
    setTimeout(() => setCheckoutStep("cart"), 300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void font-body text-bone">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[600px] rounded-full bg-volt/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 size-[500px] rounded-full bg-ice/10 blur-[130px]" />

      {/* NAV */}
      <header className="relative z-20 mx-auto max-w-7xl px-6 pt-6">
        <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10 backdrop-blur-2xl">
          <div className="font-display text-2xl tracking-wide">
            RAGE<span className="text-volt">.</span>
          </div>
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-mute sm:flex">
            <a
              href="#catalog"
              className="transition-transform hover:-translate-y-0.5 hover:text-bone"
            >
              Catalog
            </a>
            <a
              href="#featured"
              className="transition-transform hover:-translate-y-0.5 hover:text-bone"
            >
              Drops
            </a>
            <a
              href="#checkout"
              className="transition-transform hover:-translate-y-0.5 hover:text-bone"
            >
              Manifest
            </a>
          </nav>
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-3" aria-label="Open cart">
                <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-mute sm:inline">
                  Cart
                </span>
                <span className="rounded-full bg-volt px-2.5 py-1 font-mono text-xs font-bold text-void">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col border-white/10 bg-ash/95 text-bone backdrop-blur-2xl sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-2xl tracking-tight text-bone">
                  YOUR CART
                </SheetTitle>
              </SheetHeader>

              {checkoutStep === "cart" && (
                <div className="mt-6 flex flex-1 flex-col">
                  {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <ShoppingBag className="mb-4 size-10 text-mute" />
                      <p className="text-mute">Your cart is empty.</p>
                      <button
                        onClick={closeCart}
                        className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-volt transition-opacity hover:opacity-80"
                      >
                        Shop the drop
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 space-y-4 overflow-auto py-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="size-16 rounded-xl object-cover"
                              width={64}
                              height={64}
                              loading="lazy"
                            />
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-display text-sm leading-none">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
                                    {item.size}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-mute transition-colors hover:text-flare"
                                  aria-label={`Remove ${item.name}`}
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="p-1 text-bone transition-colors hover:text-volt"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="size-3" />
                                  </button>
                                  <span className="min-w-[1ch] text-center font-mono text-xs">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="p-1 text-bone transition-colors hover:text-volt"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="size-3" />
                                  </button>
                                </div>
                                <span className="font-mono text-sm">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <div className="flex items-center justify-between font-mono text-sm">
                          <span className="uppercase tracking-[0.2em] text-mute">Total</span>
                          <span className="font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={startCheckout}
                          className="mt-4 w-full rounded-xl bg-volt py-3 text-sm font-semibold text-void ring-1 ring-volt transition-transform hover:scale-[1.02]"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {checkoutStep === "checkout" && (
                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex-1 overflow-auto">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
                      {items.length} item{items.length === 1 ? "" : "s"} · ${total.toFixed(2)}
                    </p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Rager One"
                          className="mt-1 w-full rounded-xl bg-white/5 px-4 py-2.5 text-sm text-bone ring-1 ring-white/10 placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-volt"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@rage.com"
                          className="mt-1 w-full rounded-xl bg-white/5 px-4 py-2.5 text-sm text-bone ring-1 ring-white/10 placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-volt"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={placeOrder}
                      className="w-full rounded-xl bg-volt py-3 text-sm font-semibold text-void ring-1 ring-volt transition-transform hover:scale-[1.02]"
                    >
                      Place order
                    </button>
                    <button
                      onClick={() => setCheckoutStep("cart")}
                      className="w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-bone ring-1 ring-white/15 transition-transform hover:scale-[1.02]"
                    >
                      Back to cart
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="mt-6 flex flex-1 flex-col items-center justify-center text-center">
                  <div className="mb-4 size-12 rounded-full bg-volt/20 p-3 text-volt">
                    <ShoppingBag className="size-6" />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">ORDER PLACED</h3>
                  <p className="mt-2 max-w-[24ch] text-sm text-mute">
                    Your voltage is on the way. Crack cold.
                  </p>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-volt">
              <span className="flicker size-1.5 rounded-full bg-volt" />
              Cold can · midnight · electric
            </p>
            <h1 className="relative max-w-[20ch] font-display text-[clamp(3.5rem,11vw,9rem)] leading-none tracking-tight">
              <span className="relative block">
                <span className="glitch-red absolute inset-0 select-none text-volt" aria-hidden="true">
                  UNLEASH
                </span>
                <span className="glitch-cyan absolute inset-0 select-none text-ice" aria-hidden="true">
                  UNLEASH
                </span>
                <span className="relative">UNLEASH</span>
              </span>
              <span className="block text-bone/90">THE RAGE.</span>
            </h1>
            <p className="mt-8 max-w-[46ch] text-pretty text-base leading-relaxed text-mute">
              No sugar. No syrup. No mercy. A single electric surge engineered to crack open at the
              exact moment your night goes loud.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="group inline-flex items-center rounded-xl bg-volt py-3 pr-4 pl-3 text-sm font-semibold text-void ring-1 ring-volt transition-transform hover:scale-[1.03]"
              >
                Shop the drop
                <span className="ml-2 size-4 shrink-0">→</span>
              </a>
              <button
                onClick={() => alert("The Rage film is loading...")}
                className="inline-flex items-center rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-bone ring-1 ring-white/15 transition-transform hover:scale-[1.03]"
              >
                Watch the film
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <span className="shimmer-bar absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                <span>Featured</span>
                <span className="text-volt">In stock</span>
              </div>
              <div className="relative mt-4 grid place-items-center">
                <img
                  src={heroCan}
                  alt="Rage STATIC energy drink can"
                  className="relative size-52 rounded-xl object-cover"
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="relative mt-6 flex items-end justify-between">
                <div>
                  <p className="font-display text-2xl leading-none">STATIC</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-mute">
                    0.5L · 200mg
                  </p>
                </div>
                <p className="font-body text-xl font-semibold">$6.50</p>
              </div>
              <button
                onClick={() => handleAdd(products[0])}
                className="relative mt-4 w-full rounded-xl bg-volt py-3 text-sm font-semibold text-void ring-1 ring-volt transition-transform hover:scale-[1.02]"
              >
                {justAdded === "static" ? "Added to cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">The lineup</p>
            <h2 className="mt-2 max-w-[35ch] font-display text-4xl leading-none tracking-tight">
              FOUR FLAVORS OF VOLTAGE
            </h2>
          </div>
          <a
            href="#catalog"
            className="hidden font-mono text-xs uppercase tracking-[0.2em] text-mute transition-transform hover:translate-x-1 sm:inline"
          >
            View all →
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10 backdrop-blur-md transition-transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={`Rage ${product.name} energy drink can`}
                className="relative aspect-square w-full rounded-xl object-cover"
                width={1024}
                height={1024}
                loading="lazy"
              />
              <div className="mt-4 flex items-end justify-between">
                <p className="font-display text-xl leading-none">{product.name}</p>
                <p className="font-mono text-xs text-volt">${product.price.toFixed(2)}</p>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
                {product.tagline}
              </p>
              <button
                onClick={() => handleAdd(product)}
                className="mt-4 w-full rounded-lg bg-white/5 py-2.5 text-xs font-medium text-bone ring-1 ring-white/15 transition-transform hover:scale-[1.02]"
              >
                {justAdded === product.id ? "Added" : "Add"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED STRIP */}
      <section id="featured" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10 backdrop-blur-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-ice/10 blur-[100px]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <img
              src={canMidnight}
              alt="Rage Midnight Surge limited energy drink case"
              className="relative aspect-square w-full rounded-xl object-cover"
              width={1024}
              height={1024}
              loading="lazy"
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-volt">
                Limited · Drop 004
              </p>
              <h3 className="mt-3 max-w-[20ch] font-display text-5xl leading-none tracking-tight">
                MIDNIGHT SURGE
              </h3>
              <p className="mt-5 max-w-[48ch] text-pretty text-base leading-relaxed text-mute">
                Only 400 cases. A 300mg violet surge built for the deepest hour. When it&apos;s gone,
                it&apos;s gone — no restock, no apology.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleAdd(products[4])}
                  className="inline-flex items-center rounded-xl bg-volt py-3 pr-4 pl-3 text-sm font-semibold text-void ring-1 ring-volt transition-transform hover:scale-[1.03]"
                >
                  Reserve a case
                  <span className="ml-2 size-4 shrink-0">→</span>
                </button>
                <span className="font-mono text-sm text-bone">
                  $39.00 <span className="text-mute">/ 6-can</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKOUT CTA */}
      <section id="checkout" className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-volt p-8 ring-1 ring-volt sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="max-w-[24ch] font-display text-5xl leading-none tracking-tight text-void">
                FEEL THE FIRST BZZT.
              </h3>
              <p className="mt-4 max-w-[44ch] text-pretty text-base leading-relaxed text-void/70">
                Free shipping over $40. Crisp, cold, and at your door before the next drop.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-void/60">
                Your cart · {count} item{count === 1 ? "" : "s"}
              </div>
              <button
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center rounded-xl bg-void py-3 pr-4 pl-3 text-sm font-semibold text-bone ring-1 ring-void transition-transform hover:scale-[1.03]"
              >
                Cart total ${total.toFixed(2)}
                <span className="ml-2 size-4 shrink-0">→</span>
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center rounded-xl bg-void/10 px-4 py-3 text-sm font-medium text-void ring-1 ring-void/30 transition-transform hover:scale-[1.03]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-display text-lg tracking-wide">
            RAGE<span className="text-volt">.</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
            © 2024 Rage Beverages · Drink responsibly · 200mg+ caffeine
          </p>
        </div>
      </footer>
    </div>
  );
}
