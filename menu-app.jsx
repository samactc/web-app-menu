import React, { useState, useMemo } from "react";
import { ShoppingBag, Plus, Minus, X, Coffee } from "lucide-react";

const CATEGORIES = ["Beginnings", "Mains", "Sweet", "To Drink"];

const ITEMS = [
  { id: 1, cat: "Beginnings", name: "Baladi Bread & Dips", desc: "Warm oven bread, baba ghanoug, dukkah, olive oil", price: 85 },
  { id: 2, cat: "Beginnings", name: "Ta'meya Bites", desc: "Herb-forward fava fritters, tahini, pickled turnip", price: 70 },
  { id: 3, cat: "Beginnings", name: "Roasted Beetroot Salad", desc: "Labneh, walnuts, pomegranate molasses", price: 95 },
  { id: 4, cat: "Mains", name: "Molokhia & Rabbit", desc: "Slow-braised, garlic-coriander broth, vermicelli rice", price: 240, tag: "Chef's Pick" },
  { id: 5, cat: "Mains", name: "Grilled Sea Bass", desc: "Alexandrian spice rub, charred lemon, herb salad", price: 265 },
  { id: 6, cat: "Mains", name: "Koshari Bowl, Reimagined", desc: "Crisped lentils, smoked tomato sauce, garlic vinegar", price: 130 },
  { id: 7, cat: "Mains", name: "Hawawshi", desc: "Spiced lamb, baladi dough, tahini side", price: 150 },
  { id: 8, cat: "Sweet", name: "Om Ali Brûlée", desc: "Torched sugar crust, pistachio, milk custard", price: 95 },
  { id: 9, cat: "Sweet", name: "Basbousa & Mastic Ice Cream", desc: "Semolina cake, orange blossom syrup", price: 90 },
  { id: 10, cat: "To Drink", name: "Turkish Coffee", desc: "Cardamom, served with rahat lokum", price: 45 },
  { id: 11, cat: "To Drink", name: "Hibiscus Cold Brew", desc: "House-steeped karkade, citrus, mint", price: 55 },
  { id: 12, cat: "To Drink", name: "Sahlab", desc: "Coconut, cinnamon, toasted almond", price: 60 },
];

export default function MenuApp() {
  const [activeCat, setActiveCat] = useState("Mains");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const cartItems = useMemo(
    () =>
      Object.entries(cart).map(([id, qty]) => ({
        ...ITEMS.find((i) => i.id === Number(id)),
        qty,
      })),
    [cart]
  );

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const filtered = ITEMS.filter((i) => i.cat === activeCat);

  return (
    <div className="min-h-screen bg-[#FAF3E3] text-[#2C2A22] font-sans">
      {/* Header */}
      <header className="bg-[#1F4A3A] text-[#FAF3E3] px-6 py-6 sticky top-0 z-20 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8FC1A9] mb-1">Est. Cairo</p>
            <h1 className="text-2xl font-serif" style={{ fontFamily: "Georgia, serif" }}>
              Bayt El Ta'am
            </h1>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-[#2F6B52] hover:bg-[#3D8264] transition-colors rounded-full p-3"
          >
            <ShoppingBag size={20} />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8FC1A9] text-[#2C2A22] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* Category tabs */}
        <div className="max-w-2xl mx-auto flex gap-2 mt-5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                activeCat === cat
                  ? "bg-[#8FC1A9] text-[#2C2A22] font-medium"
                  : "bg-[#2F6B52] text-[#FAF3E3] hover:bg-[#3D8264]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Menu items */}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white/40 border border-[#2F6B52]/10 rounded-lg p-4 flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium text-base">{item.name}</h3>
                {item.tag && (
                  <span className="text-[10px] uppercase tracking-wide bg-[#2F6B52] text-[#FAF3E3] px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#2C2A22]/60 mt-1">{item.desc}</p>
              <p className="text-[#1F4A3A] font-serif mt-2" style={{ fontFamily: "Georgia, serif" }}>
                {item.price} LE
              </p>
            </div>
            <button
              onClick={() => addToCart(item.id)}
              className="shrink-0 bg-[#1F4A3A] text-[#FAF3E3] rounded-full p-2.5 hover:bg-[#2F6B52] transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        ))}
      </main>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-[#FAF3E3] h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2F6B52]/15">
              <h2 className="text-lg font-serif" style={{ fontFamily: "Georgia, serif" }}>
                Your Order
              </h2>
              <button onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-[#2C2A22]/50">
                  <Coffee size={32} className="mx-auto mb-3" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-[#2C2A22]/55">{item.price} LE</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-[#2F6B52]/10 flex items-center justify-center hover:bg-[#2F6B52]/20"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-7 h-7 rounded-full bg-[#2F6B52]/10 flex items-center justify-center hover:bg-[#2F6B52]/20"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-[#2F6B52]/15">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#2C2A22]/70">Total</span>
                  <span className="font-serif text-lg" style={{ fontFamily: "Georgia, serif" }}>
                    {total} LE
                  </span>
                </div>
                <button
                  onClick={() => {
                    setPlaced(true);
                    setTimeout(() => {
                      setPlaced(false);
                      setCart({});
                      setCartOpen(false);
                    }, 1800);
                  }}
                  className="w-full bg-[#1F4A3A] text-[#FAF3E3] rounded-full py-3 text-sm font-medium hover:bg-[#2F6B52] transition-colors"
                >
                  {placed ? "Order Placed ✓" : "Place Order"}
                </button>
                <p className="text-[10px] text-center text-[#2C2A22]/40 mt-3 uppercase tracking-wide">
                  Demo — connects to POST /api/orders
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
