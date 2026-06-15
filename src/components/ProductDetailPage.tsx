import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLeft, Barcode, Calendar, Trash2, Shield, Heart, ShoppingBag, Sparkles, Check, Send } from "lucide-react";

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

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [emailInquirySent, setEmailInquirySent] = useState(false);

  const isNl = language === "nl";
  const isDe = language === "de";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCopyEan = () => {
    if (!product?.ean) return;
    navigator.clipboard.writeText(product.ean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOutOfStock = (product?.stock || 0) === 0;

  const mailToUrl = product
    ? `mailto:meneergroot@proton.me?subject=Inquiry on Product ${product.title} (EAN: ${product.ean})&body=Hello Stella Montis,%0D%0A%0D%0AI would like to inquire about the product: ${product.title} (Price: €${product.price.toFixed(2)}).%0D%0A%0D%0APlease let me know the availability and purchase steps.%0D%0A%0D%0AThank you!`
    : "#";

  const getTranslatedText = {
    backToShop: isNl ? "Terug naar winkel" : isDe ? "Zurück zum Shop" : "Back to Shop",
    outOfStock: isNl ? "Niet op voorraad" : isDe ? "Ausverkauft" : "Out of Stock",
    inStock: isNl ? "Direct leverbaar" : isDe ? "Auf Lager" : "In Stock",
    eanLabel: isNl ? "Artikelnummer (EAN)" : isDe ? "Artikelnummer (EAN)" : "Article Number (EAN)",
    stockLabel: isNl ? "Beschikbare voorraad" : isDe ? "Verfügbarer Lagerbestand" : "Available Stock",
    priceLabel: isNl ? "Consumentenprijs" : isDe ? "Verbraucherpreis" : "Retail Price",
    specifications: isNl ? "TECHNISCHE SPECIFICATIES" : isDe ? "TECHNISCHE SPEZIFIKATIONEN" : "TECHNICAL SPECIFICATIONS",
    inquireBtn: isNl ? "STUUR DIRECT PRODUCTAANVRAAG" : isDe ? "PRODUKTANFRAGE SENDEN" : "SEND PRODUCT INQUIRY",
    inquirySuccess: isNl ? "Mail-programma geopend met sjabloon!" : isDe ? "E-Mail-Programm mit Vorlage geöffnet!" : "Mail client opened with template!",
    securityBadge: isNl ? "OrigineelStella Montis Gecertificeerd" : isDe ? "Original Stella Montis Zertifiziert" : "Original Stella Montis Certified",
    copyEan: isNl ? "Klik om EAN te kopiëren" : isDe ? "Klicken um EAN zu kopieren" : "Click to copy EAN",
    copiedEan: isNl ? "Gekopieerd!" : isDe ? "Kopiert!" : "Copied!",
    notFound: isNl ? "Product niet gevonden." : isDe ? "Produkt nicht gefunden." : "Product not found.",
    noImages: isNl ? "Geen productplaatjes beschikbaar." : isDe ? "Keine Produktbilder verfügbar." : "No product images available.",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-nt-bg" id="detail-loading-wrapper">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-nt-light-gray border-t-nt-red rounded-full animate-spin mb-4" />
          <span className="font-mono text-xs text-nt-gray uppercase">Loading product records...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-nt-bg" id="detail-notfound-wrapper">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="font-display font-medium text-2xl uppercase text-nt-black mb-4">{getTranslatedText.notFound}</h2>
          <Link to="/shop" className="bg-nt-black text-nt-white px-6 py-3 rounded font-mono text-xs uppercase hover:bg-nt-red transition-all">
            {getTranslatedText.backToShop}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nt-bg" id="product-detail-wrapper">
      <Navbar />

      {/* Detail Content Section */}
      <main className="max-w-7xl mx-auto px-6 pt-36 pb-20">
        
        {/* Top Back Navigation link */}
        <div className="mb-8" id="detail-back-nav">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-xs text-nt-gray hover:text-nt-black tracking-wider uppercase transition-colors"
          >
            <ArrowLeft size={16} />
            {getTranslatedText.backToShop}
          </Link>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Image Carousel Board (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4" id="carousel-board">
            <div className="bg-nt-white border border-nt-light-gray rounded-2xl aspect-square overflow-hidden flex items-center justify-center p-6 relative shadow-sm">
              {/* Corner accent vectors */}
              <div className="absolute top-3 left-3 border-t-2 border-l-2 border-nt-light-gray w-5 h-5 pointer-events-none" />
              <div className="absolute top-3 right-3 border-t-2 border-r-2 border-nt-light-gray w-5 h-5 pointer-events-none" />
              <div className="absolute bottom-3 left-3 border-b-2 border-l-2 border-nt-light-gray w-5 h-5 pointer-events-none" />
              <div className="absolute bottom-3 right-3 border-b-2 border-r-2 border-nt-light-gray w-5 h-5 pointer-events-none" />

              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[activeImageIdx]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              ) : (
                <span className="font-mono text-xs text-nt-gray uppercase">{getTranslatedText.noImages}</span>
              )}

              {/* Status Signal LEDs */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-nt-white border border-nt-light-gray px-3 py-1 rounded shadow-sm text-[9px] font-mono font-bold uppercase tracking-wider">
                <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? "bg-nt-red animate-pulse" : "bg-emerald-500"}`} />
                <span>{isOutOfStock ? getOutOfStockLabel() : getInStockLabel()}</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2" id="carousel-thumbnails">
                {product.imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 bg-nt-white border rounded-lg overflow-hidden flex items-center justify-center p-1.5 shadow-sm transition-all focus:outline-none ${
                      activeImageIdx === idx 
                        ? "border-nt-red scale-105" 
                        : "border-nt-light-gray hover:border-nt-gray"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.title} view ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Spec Sheets & Information (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6" id="product-meta-board">
            
            {/* Title Block */}
            <div className="bg-nt-white border border-nt-light-gray rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm relative">
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div className="inline-flex items-center gap-1 bg-nt-bg border border-nt-light-gray px-2 py-0.5 rounded text-[9px] font-mono text-nt-gray uppercase">
                  <span>PRODUCT_ID: {product.id.substring(0, 8).toUpperCase()}</span>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 uppercase select-none">
                  <Shield size={12} />
                  <span>{getTranslatedText.securityBadge}</span>
                </div>
              </div>

              <h1 className="font-display font-bold uppercase tracking-tight text-3xl md:text-4xl text-nt-black">
                {product.title}
              </h1>

              <div className="font-mono text-2xl font-bold text-nt-black border-t border-b border-nt-bg py-4 my-2 flex items-center justify-between">
                <span>€ {product.price.toFixed(2)}</span>
                <span className="text-xs text-nt-gray font-normal lowercase uppercase">VAT incl. / BTW incl.</span>
              </div>

              <p className="text-xs font-mono text-nt-gray uppercase leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Technical Spec Sheet Drawer */}
            <div className="bg-nt-white border border-nt-light-gray rounded-2xl p-6 flex flex-col gap-4 shadow-sm" id="tech-specs-sheet">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-nt-black border-b border-nt-bg pb-2 mt-1">
                {getTranslatedText.specifications}
              </h3>

              <div className="flex flex-col gap-3 font-mono text-xs">
                {/* EAN spec row */}
                <div className="flex justify-between items-center bg-nt-bg px-4 py-3 rounded relative group border border-transparent hover:border-nt-light-gray transition-colors">
                  <div className="flex items-center gap-2">
                    <Barcode size={16} className="text-nt-gray" />
                    <span className="text-nt-gray uppercase text-[11px] font-bold">{getTranslatedText.eanLabel}</span>
                  </div>
                  <button 
                    onClick={handleCopyEan}
                    className="flex items-center gap-1.5 text-nt-black hover:text-nt-red transition-colors text-[11px] font-bold outline-none cursor-pointer"
                    title={getTranslatedText.copyEan}
                  >
                    <span>{product.ean || "N/A"}</span>
                    <span className="text-[10px] bg-nt-white border border-nt-light-gray px-1.5 py-0.5 rounded group-hover:bg-nt-red group-hover:text-nt-white transition-all text-xs">
                      {copied ? getTranslatedText.copiedEan : "COPY"}
                    </span>
                  </button>
                </div>

                {/* Stock status spec row */}
                <div className="flex justify-between items-center bg-nt-bg px-4 py-3 rounded border border-transparent hover:border-nt-light-gray transition-colors">
                  <span className="text-nt-gray uppercase text-[11px] font-bold">{getTranslatedText.stockLabel}</span>
                  <span className="text-nt-black text-[11px] font-bold uppercase">
                    {product.stock || 0} units / eenheden
                  </span>
                </div>

                {/* Author context spec row */}
                <div className="flex justify-between items-center bg-nt-bg px-4 py-3 rounded border border-transparent hover:border-nt-light-gray transition-colors">
                  <span className="text-nt-gray uppercase text-[11px] font-bold">RELEASE STATUS</span>
                  <span className="text-emerald-500 text-[11px] font-bold uppercase flex items-center gap-1 leading-none select-none animate-pulse">
                    <Check size={14} className="stroke-[3]" />
                    STABLE_PROD_1.0
                  </span>
                </div>
              </div>
            </div>

            {/* Email Sales Form Inquiry */}
            <div className="bg-nt-white border border-nt-light-gray rounded-2xl p-6 flex flex-col gap-4 shadow-sm" id="sales-actions">
              <a 
                href={mailToUrl}
                onClick={() => {
                  setEmailInquirySent(true);
                  setTimeout(() => setEmailInquirySent(false), 5000);
                }}
                className={`w-full text-center py-4 rounded-xl flex items-center justify-center gap-2 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all ${
                  isOutOfStock 
                    ? "bg-nt-charcoal text-nt-gray border border-nt-chacoal opacity-80" 
                    : "bg-nt-black text-nt-white hover:bg-nt-red hover:shadow-lg hover:scale-[1.01]"
                }`}
                id="btn-send-inquiry"
              >
                <Send size={14} />
                {getTranslatedText.inquireBtn}
              </a>

              {emailInquirySent && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-lg flex items-center justify-center gap-2 animate-fade-in text-center font-mono text-[10px] uppercase font-bold">
                  <Check size={14} />
                  <span>{getTranslatedText.inquirySuccess}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );

  function getOutOfStockLabel() {
    return isNl ? "Uitverkocht" : isDe ? "Ausverkauft" : "Out of Stock";
  }

  function getInStockLabel() {
    return isNl ? "Op Voorraad" : isDe ? "Auf Lager" : "In Stock";
  }
}
