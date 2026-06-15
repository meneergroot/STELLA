import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";
import { Search, SlidersHorizontal, ShoppingBag, Grid, Archive, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  stock: number;
  ean: string;
  price: number;
  imageUrls: string[];
  createdAt?: any;
  internalNotes?: string;
}

export default function ShopPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStock, setFilterStock] = useState<"all" | "instock" | "out">("all");
  const [sortBy, setSortBy] = useState<"newest" | "priceAsc" | "priceDesc">("newest");

  const isNl = language === "nl";
  const isDe = language === "de";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const prodList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(prodList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ean.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStock =
        filterStock === "all" ||
        (filterStock === "instock" && (p.stock || 0) > 0) ||
        (filterStock === "out" && (p.stock || 0) === 0);

      return matchesSearch && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      // newest
      return 0; // standard snapshot order is already by createdAt desc
    });

  const getTranslatedText = {
    title: isNl ? "PRODUCT CATALOGUS" : isDe ? "PRODUKTKATALOG" : "PRODUCT CATALOG",
    subtitle: isNl
      ? "Pure hardware ontwerpen en precisie-componenten."
      : isDe
      ? "Reines Hardware-Design und Präzisionskomponenten."
      : "Pure hardware designs and precision components.",
    searchPlaceholder: isNl ? "Zoek productnaam of EAN..." : isDe ? "Produkt oder EAN suchen..." : "Search product name or EAN...",
    filterAll: isNl ? "Alle voorraad" : isDe ? "Alle Bestände" : "All Stock",
    filterIn: isNl ? "Op voorraad" : isDe ? "Auf Lager" : "In Stock",
    filterOut: isNl ? "Niet op voorraad" : isDe ? "Ausverkauft" : "Out of Stock",
    sortNewest: isNl ? "Nieuwste eerst" : isDe ? "Neueste zuerst" : "Newest First",
    sortPriceAsc: isNl ? "Prijs (laag naar hoog)" : isDe ? "Preis (aufsteigend)" : "Price (Low to High)",
    sortPriceDesc: isNl ? "Prijs (hoog naar laag)" : isDe ? "Preis (absteigend)" : "Price (High to Low)",
    viewDetails: isNl ? "BEKIJK PRODUCT SKU" : isDe ? "PRODUKT SKU ANSEHEN" : "VIEW PRODUCT SKU",
    outOfStockBadge: isNl ? "UITVERKOCHT" : isDe ? "AUSVERKAUFT" : "OUT OF STOCK",
    inStockBadge: isNl ? "OP VOORRAAD" : isDe ? "IN STOCK" : "IN STOCK",
    noMatches: isNl ? "Geen producten gevonden die voldoen aan de criteria." : isDe ? "Keine Produkte gefunden, die den Kriterien entsprechen." : "No products found matching the criteria.",
    stockUnits: isNl ? "eenheden" : isDe ? "Einheiten" : "units",
  };

  return (
    <div className="min-h-screen bg-nt-bg" id="shop-page-wrapper">
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-36 pb-12 px-6 nt-dot-grid-light border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-red mb-4 uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
            <span>[05_HARDWARE_SKU_CATALOG]</span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-nt-black mb-3">
            {getTranslatedText.title}
          </h1>
          <p className="font-mono text-xs uppercase text-nt-gray max-w-xl">
            {getTranslatedText.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content & Filtering Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-stretch md:items-center justify-between" id="shop-controls">
          {/* Search bar with Nothing Tech outline style */}
          <div className="relative flex-1 max-w-lg">
            <span className="absolute inset-y-0 left-3 flex items-center text-nt-gray pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={getTranslatedText.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-nt-white border border-nt-light-gray rounded px-10 py-3 text-xs font-mono text-nt-black placeholder-nt-gray focus:outline-none focus:border-nt-black transition-colors shadow-sm"
              id="shop-search-input"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 items-center font-mono text-[11px]" id="shop-filters">
            <div className="flex items-center gap-1.5 bg-nt-white border border-nt-light-gray p-1 rounded shadow-sm">
              <button
                onClick={() => setFilterStock("all")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  filterStock === "all" ? "bg-nt-black text-nt-white font-bold" : "text-nt-gray hover:text-nt-black"
                }`}
              >
                {getTranslatedText.filterAll}
              </button>
              <button
                onClick={() => setFilterStock("instock")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  filterStock === "instock" ? "bg-nt-black text-nt-white font-bold" : "text-nt-gray hover:text-nt-black"
                }`}
              >
                {getTranslatedText.filterIn}
              </button>
              <button
                onClick={() => setFilterStock("out")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  filterStock === "out" ? "bg-nt-black text-nt-white font-bold" : "text-nt-gray hover:text-nt-black"
                }`}
              >
                {getTranslatedText.filterOut}
              </button>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-nt-white border border-nt-light-gray rounded px-3 py-2.5 text-[11px] font-mono font-bold text-nt-black focus:outline-none focus:border-nt-black cursor-pointer shadow-sm appearance-none pr-8"
                id="shop-sort-select"
              >
                <option value="newest">{getTranslatedText.sortNewest}</option>
                <option value="priceAsc">{getTranslatedText.sortPriceAsc}</option>
                <option value="priceDesc">{getTranslatedText.sortPriceDesc}</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-nt-gray pointer-events-none text-[9px]">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Loading placeholder cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="shop-loader">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-nt-white border border-nt-light-gray rounded-xl p-5 space-y-4 animate-pulse">
                <div className="aspect-square bg-nt-bg rounded border border-nt-light-gray" />
                <div className="h-4 bg-nt-bg rounded w-3/4" />
                <div className="h-3 bg-nt-bg rounded w-1/4" />
                <div className="h-8 bg-nt-bg rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-nt-white border border-nt-light-gray rounded-2xl p-6" id="shop-empty">
            <div className="w-16 h-16 bg-nt-bg rounded-full flex items-center justify-center text-nt-gray mx-auto mb-4 border border-nt-light-gray">
              <ShoppingBag size={24} />
            </div>
            <p className="font-mono text-xs text-nt-gray uppercase">
              {getTranslatedText.noMatches}
            </p>
          </div>
        ) : (
          /* Grid list products */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="shop-grid">
            {filteredProducts.map((p) => {
              const isOutOfStock = (p.stock || 0) === 0;
              const productThumb = p.imageUrls && p.imageUrls.length > 0
                ? p.imageUrls[0]
                : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600";

              return (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  className="bg-nt-white border border-nt-light-gray rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group h-full relative p-5 transition-all"
                  id={`product-card-${p.id}`}
                >
                  <Link to={`/shop/${p.id}`} className="block flex-1">
                    {/* Corner marks for aesthetic design */}
                    <div className="absolute top-2 left-2 border-t border-l border-nt-light-gray group-hover:border-nt-red w-3 h-3 group-hover:scale-105 transition-colors" />
                    <div className="absolute top-2 right-2 border-t border-r border-nt-light-gray group-hover:border-nt-red w-3 h-3 group-hover:scale-105 transition-colors" />
                    <div className="absolute bottom-2 left-2 border-b border-l border-nt-light-gray group-hover:border-nt-red w-3 h-3 group-hover:scale-105 transition-colors" />
                    <div className="absolute bottom-2 right-2 border-b border-r border-nt-light-gray group-hover:border-nt-red w-3 h-3 group-hover:scale-105 transition-colors" />

                    {/* Image Area */}
                    <div className="relative aspect-square w-full bg-nt-bg border border-nt-light-gray rounded overflow-hidden flex items-center justify-center p-3 mb-4">
                      <img
                        src={productThumb}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600";
                        }}
                      />
                      
                      {/* Active stock badge with signal styling */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-nt-white/95 border border-nt-light-gray px-2 py-0.5 rounded shadow-sm text-[8px] font-mono leading-none">
                        <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? "bg-nt-red animate-pulse" : "bg-emerald-500"}`} />
                        <span className="text-nt-charcoal font-bold uppercase">
                          {isOutOfStock ? getTranslatedText.outOfStockBadge : `${p.stock} ${getTranslatedText.stockUnits}`}
                        </span>
                      </div>
                    </div>

                    {/* Meta info EAN */}
                    <div className="font-mono text-[9px] text-nt-gray mb-1 flex justify-between uppercase">
                      <span>EAN: {p.ean || "N/A"}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-nt-black font-display font-bold uppercase tracking-tight text-sm mb-2 group-hover:text-nt-red transition-colors line-clamp-2 leading-tight">
                      {p.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-[10px] font-mono text-nt-gray line-clamp-3 mb-4 leading-relaxed uppercase">
                      {p.description}
                    </p>
                  </Link>

                  {/* Pricing and Action button footer */}
                  <div className="border-t border-nt-bg pt-3 flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-xs text-nt-black">
                        € {p.price.toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to={`/shop/${p.id}`}
                      className="bg-nt-black text-nt-white hover:bg-nt-red border border-transparent shadow px-3 py-1.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye size={10} />
                      {getTranslatedText.viewDetails}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
