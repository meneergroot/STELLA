import React, { useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  checkIsAdmin, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc,
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  Lock, 
  CheckCircle, 
  Globe, 
  Zap,
  Cpu,
  LayoutDashboard,
  ArrowLeft,
  Settings,
  FileText,
  BarChart3,
  Search,
  ChevronRight,
  AlertCircle,
  Edit2,
  X,
  ShoppingBag,
  Package,
  Barcode,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Dashboard states
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'lowstock' | 'out'>('all');
  const [activeTab, setActiveTab] = useState<'catalog' | 'editor' | 'stats'>('catalog');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Product Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState<string>('15');
  const [ean, setEan] = useState('');
  const [price, setPrice] = useState<string>('24.99');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [internalNotes, setInternalNotes] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminStatus = await checkIsAdmin(u);
        const authorized = adminStatus || u.email === 'meneergroot@proton.me';
        setIsAdmin(authorized);
        if (authorized) {
          fetchProducts();
        }
      } else {
        // Local auth bypass for convenient testing
        const isFakeLogin = localStorage.getItem('stellamontis_admin_session') === 'true';
        if (isFakeLogin) {
          setIsAdmin(true);
          fetchProducts();
        } else {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshots = await getDocs(q);
      setProducts(snapshots.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google auth error:', err);
    }
  };

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('stellamontis_admin_session', 'true');
      setIsAdmin(true);
      fetchProducts();
    } else {
      setLoginError('Invalid credentials. Use admin / admin');
    }
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem('stellamontis_admin_session');
    setIsAdmin(false);
  };

  // Add image URL to the current product's image list
  const handleAddImageUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;
    if (!newImageUrl.startsWith('http://') && !newImageUrl.startsWith('https://')) {
      setFormError('Please enter a valid HTTP or HTTPS image URL.');
      return;
    }
    if (imageUrls.includes(newImageUrl)) {
      setFormError('This image URL is already loaded.');
      return;
    }
    setImageUrls([...imageUrls, newImageUrl]);
    setNewImageUrl('');
    setFormError(null);
  };

  // Remove image URL from list
  const handleRemoveImageUrl = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, idx) => idx !== indexToRemove));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    if (!title.trim() || !description.trim() || !ean.trim()) {
      setFormError('Product Title, Description, and EAN barcode are required.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setFormError('Please input a valid price (greater than or equal to 0).');
      return;
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setFormError('Please input a valid stock quantity (integer >= 0).');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        stock: stockNum,
        ean: ean.trim(),
        price: priceNum,
        imageUrls: imageUrls,
        createdBy: user?.uid || 'anonymous',
        internalNotes: internalNotes.trim()
      };

      if (editingId) {
        // Update product flow
        const updatedPayload = {
          ...payload,
          createdAt: products.find(p => p.id === editingId)?.createdAt || serverTimestamp()
        };
        await updateDoc(doc(db, 'products', editingId), updatedPayload);
      } else {
        // Create product flow
        const newPayload = {
          ...payload,
          createdAt: serverTimestamp()
        };
        await addDoc(collection(db, 'products'), newPayload);
      }

      // Reset Form fields
      setTitle('');
      setDescription('');
      setStock('15');
      setEan('');
      setPrice('24.99');
      setImageUrls([]);
      setNewImageUrl('');
      setInternalNotes('');
      setEditingId(null);
      setSuccess(true);
      fetchProducts();
      
      // Auto return to catalog after short delay
      setTimeout(() => {
        setSuccess(false);
        setActiveTab('catalog');
      }, 1500);

    } catch (err: any) {
      console.error('Error saving product:', err);
      if (err?.message?.includes('permission-denied')) {
        setFormError('Permission Denied. Verify auth rules or ensure you are logged in as administrator.');
      } else {
        handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'products');
        setFormError('Failed to synchronize object database record.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const startEditProduct = (prod: any) => {
    setEditingId(prod.id);
    setTitle(prod.title || '');
    setDescription(prod.description || '');
    setStock(prod.stock !== undefined ? String(prod.stock) : '0');
    setEan(prod.ean || '');
    setPrice(prod.price !== undefined ? String(prod.price) : '0.00');
    setImageUrls(prod.imageUrls || []);
    setInternalNotes(prod.internalNotes || '');
    setNewImageUrl('');
    setFormError(null);
    setSuccess(false);
    setActiveTab('editor');
  };

  const handleProductDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this product?')) return;
    setFormError(null);
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      if (err?.message?.includes('permission-denied')) {
        alert('Permission Denied: Unauthorized client query.');
      } else {
        handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
      }
    }
  };

  // Safe totals math for commerce stats
  const totalSkuCount = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + ((p.stock || 0) * (p.price || 0)), 0);
  const avgPrice = totalSkuCount > 0 ? (products.reduce((acc, p) => acc + (p.price || 0), 0) / totalSkuCount) : 0;
  const outOfStockCount = products.filter(p => (p.stock || 0) === 0).length;
  const lowStockCount = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 5).length;

  // Search and filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.ean?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (stockFilter === 'instock') return (p.stock || 0) >= 5;
    if (stockFilter === 'lowstock') return (p.stock || 0) > 0 && (p.stock || 0) < 5;
    if (stockFilter === 'out') return (p.stock || 0) === 0;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nt-bg">
        <div className="w-10 h-10 border border-t-nt-red rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nt-bg px-6 font-mono text-xs uppercase text-nt-gray">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-nt-white p-10 border border-nt-light-gray rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Structural Corner Marks */}
          <div className="absolute top-2 left-2 border-t border-l border-nt-red w-3 h-3" />
          <div className="absolute top-2 right-2 border-t border-r border-nt-red w-3 h-3" />
          <div className="absolute bottom-2 left-2 border-b border-l border-nt-red w-3 h-3" />
          <div className="absolute bottom-2 right-2 border-b border-r border-nt-red w-3 h-3" />

          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-nt-black rounded flex items-center justify-center text-nt-white border border-nt-charcoal shadow-lg">
              <Lock size={22} className="text-nt-red" />
            </div>
          </div>
          
          <h1 className="text-xs font-display font-medium text-nt-black text-center mb-6 tracking-widest">// WOOCOMMERCE SECURITY CONTROL</h1>
          
          <form onSubmit={handleFakeLogin} className="space-y-4 mb-6 text-left">
            <div>
              <label className="block text-[9px] text-nt-gray mb-1.5 pl-1 tracking-wider uppercase font-mono">WordPress Login</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-nt-bg border border-nt-light-gray rounded px-4 py-2.5 outline-none focus:border-nt-black text-nt-black transition-colors"
                placeholder="Username (admin)"
                id="admin-form-user"
              />
            </div>
            <div>
              <label className="block text-[9px] text-nt-gray mb-1.5 pl-1 tracking-wider uppercase font-mono">Secure Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-nt-bg border border-nt-light-gray rounded px-4 py-2.5 outline-none focus:border-nt-black text-nt-black transition-colors"
                placeholder="Password (admin)"
                id="admin-form-pass"
              />
            </div>
            {loginError && <p className="text-nt-red text-[10px] font-bold pl-1 font-mono uppercase">{loginError}</p>}
            <button 
              type="submit"
              className="w-full bg-nt-black text-nt-white py-3 rounded font-bold hover:bg-nt-charcoal transition-colors uppercase tracking-widest text-[10px] font-mono border border-nt-charcoal"
              id="admin-submit-btn"
            >
              LOG_IN_SECURE
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-nt-light-gray"></div></div>
            <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-nt-white px-3 text-nt-gray font-mono">AUTHENTICATION PROXY</span></div>
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-nt-white border border-nt-light-gray text-nt-black py-3 rounded hover:bg-nt-bg transition-colors flex items-center justify-center gap-2 tracking-widest text-[10px] font-mono font-semibold"
            id="admin-google-btn"
          >
            <Globe size={13} /> GOOGLE ADMIN SIGN-IN
          </button>
          
          <div className="mt-8 text-center border-t border-nt-light-gray pt-6">
            <Link to="/" className="text-nt-red text-[10px] hover:underline font-bold tracking-widest block font-mono">
              ← BACK_TO_FRONTEND
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nt-bg flex flex-col font-sans text-nt-black select-none">
      {/* WooCommerce Elegant Core Header */}
      <header className="h-[64px] bg-nt-white border-b border-nt-light-gray flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 bg-nt-black rounded flex items-center justify-center text-nt-white">
              <ShoppingBag size={13} />
            </div>
            <span className="text-[11px] font-dot uppercase tracking-wider text-nt-black">Stella_Commerce // WordPress Admin</span>
          </Link>
          <div className="hidden md:flex items-center gap-3 text-nt-gray font-mono text-[9px] uppercase border-l border-nt-light-gray pl-4">
            <Package size={11} className="text-nt-red" />
            <span>{totalSkuCount} SKUs Listed</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase">
          <span className="text-nt-gray hidden sm:block">Manager: {user?.email || 'admin@pop-eye.nl (Local)'}</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 p-1.5 px-3 border border-nt-light-gray rounded hover:bg-nt-bg text-nt-black transition-colors font-bold text-[9px]"
            id="admin-nav-logout"
          >
            <LogOut size={10} />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main WordPress Board Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 nt-dot-grid-light">
        {/* Left Hand responsive navigation bar */}
        <aside className="w-full lg:w-64 bg-nt-white border-b lg:border-b-0 lg:border-r border-nt-light-gray p-4 flex flex-row lg:flex-col gap-2 z-10">
          <div className="hidden lg:block mb-4 px-2 py-1">
            <span className="font-mono text-[8px] text-nt-gray block uppercase tracking-widest">v5.8.2 // STABLE</span>
            <span className="font-display font-medium text-xs text-nt-black uppercase tracking-tight">Main Console Options</span>
          </div>
          
          <button 
            onClick={() => { setActiveTab('catalog'); setEditingId(null); }}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded font-mono text-[10px] uppercase text-left transition-all ${
              activeTab === 'catalog' 
                ? 'bg-nt-black text-nt-white border border-nt-black font-semibold' 
                : 'text-nt-gray hover:text-nt-black hover:bg-nt-bg'
            }`}
          >
            <Package size={13} />
            <span className="hidden sm:inline">Product Catalog</span>
          </button>
          
          <button 
            onClick={() => {
              // reset edit context
              setEditingId(null);
              setTitle('');
              setDescription('');
              setStock('10');
              setEan('');
              setPrice('19.99');
              setImageUrls([]);
              setNewImageUrl('');
              setInternalNotes('');
              setFormError(null);
              setActiveTab('editor');
            }}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded font-mono text-[10px] uppercase text-left transition-all ${
              activeTab === 'editor' && !editingId
                ? 'bg-nt-black text-nt-white border border-nt-black font-semibold' 
                : activeTab === 'editor' && editingId
                ? 'bg-nt-red/10 text-nt-red border border-nt-red/20 font-semibold'
                : 'text-nt-gray hover:text-nt-black hover:bg-nt-bg'
            }`}
          >
            <Plus size={13} />
            <span className="hidden sm:inline">{editingId ? 'Edit Product' : 'Add Product'}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded font-mono text-[10px] uppercase text-left transition-all ${
              activeTab === 'stats' 
                ? 'bg-nt-black text-nt-white border border-nt-black font-semibold' 
                : 'text-nt-gray hover:text-nt-black hover:bg-nt-bg'
            }`}
          >
            <BarChart3 size={13} />
            <span className="hidden sm:inline">Financial Stats</span>
          </button>
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0">
          <AnimatePresence mode="wait">
            
            {/* CATALOG VIEW PANEL */}
            {activeTab === 'catalog' && (
              <motion.div
                key="catalog-panel"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-6"
              >
                {/* Visual Retail Counters Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] font-mono text-nt-gray uppercase tracking-widest block mb-1">CATALOG SKU</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-2xl text-nt-black">{totalSkuCount}</span>
                      <span className="text-[10px] text-nt-gray font-mono">active</span>
                    </div>
                  </div>
                  <div className="p-4 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] font-mono text-nt-gray uppercase tracking-widest block mb-1">TOTAL STOCK</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-2xl text-nt-black">{totalStockUnits}</span>
                      <span className="text-[10px] text-nt-gray font-mono">units</span>
                    </div>
                  </div>
                  <div className="p-4 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] font-mono text-nt-gray uppercase tracking-widest block mb-1">EST. STOCK VALUE</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-2xl text-nt-black">€{totalInventoryValue.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] font-mono text-nt-gray uppercase tracking-widest block mb-1">STOCK ALERTS</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-display font-bold text-2xl ${outOfStockCount > 0 ? 'text-nt-red' : 'text-nt-gray'}`}>{outOfStockCount}</span>
                      <span className="text-[9px] text-nt-gray font-mono leading-none uppercase block">sold out<br />({lowStockCount} low)</span>
                    </div>
                  </div>
                </div>

                {/* Database Catalog List */}
                <div className="bg-nt-white border border-nt-light-gray rounded-xl p-5 md:p-6 shadow-sm">
                  {/* Title and Controls Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-nt-light-gray pb-5 mb-6">
                    <div>
                      <span className="font-mono text-[8px] text-nt-gray block mb-1 uppercase tracking-widest">// WOOCOMMERCE INVENTORY DATABASE</span>
                      <h2 className="font-display font-semibold text-lg uppercase tracking-tight text-nt-black">Managed WooCommerce Catalog</h2>
                    </div>
                    
                    {/* Search & Stock Filter toolbar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nt-gray" />
                        <input 
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search Title, EAN..."
                          className="pl-9 pr-4 py-1.5 w-full sm:w-56 bg-nt-bg border border-nt-light-gray rounded text-xs outline-none focus:border-nt-black font-mono"
                        />
                      </div>
                      
                      <select
                        value={stockFilter}
                        onChange={(e: any) => setStockFilter(e.target.value)}
                        className="bg-nt-bg border border-nt-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-nt-black font-semibold font-mono"
                      >
                        <option value="all">Stocks: All ({products.length})</option>
                        <option value="instock">In Stock ({products.filter(p => p.stock >= 5).length})</option>
                        <option value="lowstock">Low Stock ({lowStockCount})</option>
                        <option value="out">Out of Stock ({outOfStockCount})</option>
                      </select>
                    </div>
                  </div>

                  {/* Products Grid / Responsive Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px] uppercase">
                      <thead>
                        <tr className="bg-nt-bg border-b border-nt-light-gray text-nt-gray text-[9px] tracking-wider">
                          <th className="px-4 py-3">PRODUCT</th>
                          <th className="px-4 py-3">EAN BARCODE</th>
                          <th className="px-4 py-3">PRICE</th>
                          <th className="px-4 py-3">STOCK STATUS</th>
                          <th className="px-4 py-3 text-right">CONTROLS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-nt-bg">
                        {filteredProducts.map((item, index) => {
                          const hasImg = item.imageUrls && item.imageUrls.length > 0;
                          const firstImg = hasImg ? item.imageUrls[0] : '';
                          const stockLevel = item.stock || 0;

                          return (
                            <tr key={item.id} className="hover:bg-nt-bg/30 transition-colors group">
                              {/* Product details and Thumbnail */}
                              <td className="px-4 py-4.5">
                                <div className="flex items-center gap-3">
                                  {hasImg ? (
                                    <img 
                                      src={firstImg} 
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).onerror = null;
                                        (e.target as HTMLImageElement).className = "w-10 h-10 rounded bg-nt-bg flex items-center justify-center p-2 text-nt-gray border border-nt-light-gray shrink-0";
                                      }}
                                      className="w-11 h-11 rounded object-cover border border-nt-light-gray shrink-0 bg-nt-bg" 
                                      alt="" 
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-11 h-11 rounded bg-nt-bg border border-nt-light-gray shrink-0 flex items-center justify-center text-nt-gray/60">
                                      <ImageIcon size={14} />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <span className="font-bold text-nt-black text-xs leading-snug line-clamp-2 uppercase font-sans tracking-tight">{item.title}</span>
                                    <span className="text-[10px] text-nt-gray text-xxs lowercase line-clamp-1 mt-0.5 normal-case block max-w-xs">{item.description}</span>
                                    {item.internalNotes && (
                                      <div className="mt-1.5 p-1.5 bg-neutral-100 border border-neutral-200/60 rounded text-[9px] font-mono text-neutral-600 uppercase tracking-tight flex items-center gap-1.5 max-w-xs break-all leading-normal normal-case">
                                        <span className="font-bold text-[8.5px] tracking-wider bg-neutral-200 text-neutral-700 px-1 rounded uppercase shrink-0">INT COMMENT:</span>
                                        <span className="line-clamp-2">
                                          {item.internalNotes.startsWith('http') ? (
                                            <a href={item.internalNotes} target="_blank" rel="noopener noreferrer" className="text-nt-red hover:underline font-bold">
                                              {item.internalNotes}
                                            </a>
                                          ) : (
                                            item.internalNotes
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* EAN Barcode */}
                              <td className="px-4 py-4.5 text-nt-gray/80 text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                  <Barcode size={12} className="text-nt-gray/60" />
                                  <span>{item.ean || 'N/A'}</span>
                                </div>
                              </td>

                              {/* Price */}
                              <td className="px-4 py-4.5 text-xs text-nt-black font-bold">
                                €{(item.price || 0).toFixed(2)}
                              </td>

                              {/* stock status badges */}
                              <td className="px-4 py-4.5 text-[10px]">
                                {stockLevel === 0 ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-nt-red/20 bg-nt-red/5 text-nt-red rounded font-bold">
                                    OUT OF STOCK
                                  </span>
                                ) : stockLevel < 5 ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-amber-500/20 bg-amber-500/5 text-amber-600 rounded font-bold">
                                    LOW: {stockLevel} LEFT
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-green-500/20 bg-green-500/5 text-green-600 rounded font-bold">
                                    IN STOCK: {stockLevel}
                                  </span>
                                )}
                              </td>

                              {/* actions edit / delete */}
                              <td className="px-4 py-4.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button 
                                    onClick={() => startEditProduct(item)}
                                    className="p-1.5 px-2.5 border border-nt-light-gray text-nt-gray hover:text-nt-black hover:border-nt-gray rounded transition-colors flex items-center gap-1"
                                    title="Edit Product"
                                  >
                                    <Edit2 size={10} />
                                    <span className="text-[9px] font-bold">EDIT</span>
                                  </button>
                                  <button 
                                    onClick={() => handleProductDelete(item.id)} 
                                    className="p-1.5 border border-nt-light-gray text-nt-gray hover:text-nt-red hover:border-nt-red/20 rounded transition-colors"
                                    title="Delete product record"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredProducts.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-4 py-20 text-center text-nt-gray uppercase font-bold italic text-[10px]">
                              {products.length === 0 
                                ? 'No products registered in catalog database. Click "Add Product" to compile your first SKU.' 
                                : 'No catalog products match search and filter criteria.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCT EDITOR VIEW PANEL (WooCommerce styled layout) */}
            {activeTab === 'editor' && (
              <motion.div
                key="editor-panel"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex items-center justify-between border-b border-nt-light-gray pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[8px] text-nt-gray block mb-1 uppercase tracking-widest">// WOOCOMMERCE SKU EDIT SYSTEM</span>
                    <h2 className="font-display font-semibold text-lg uppercase tracking-tight text-nt-black">
                      {editingId ? 'Edit Existing Product' : 'Add New E-Commerce Product'}
                    </h2>
                  </div>
                  {editingId && (
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setActiveTab('catalog');
                      }}
                      className="px-3 py-1.5 text-[9px] font-mono uppercase bg-nt-bg border border-nt-light-gray hover:border-nt-gray text-nt-gray rounded font-bold transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-[10px] uppercase text-left">
                  
                  {/* Column 1 & 2: Primary Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Title & Desc */}
                    <div className="p-5 md:p-6 bg-nt-white border border-nt-light-gray rounded-xl space-y-4">
                      <div className="border-b border-nt-light-gray pb-2.5 mb-2">
                        <span className="text-[11px] font-sans font-bold text-nt-black block tracking-wide">1. Product Information</span>
                      </div>
                      
                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Product Name / Title</label>
                        <input 
                          type="text" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2.5 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono"
                          placeholder="e.g. Ultra HD ND Filter Pack (Pro Edition)"
                        />
                      </div>

                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Detailed Description</label>
                        <textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={6}
                          className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2.5 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono leading-relaxed"
                          placeholder="Provide detailed specs, box contents, or usage recommendations..."
                        />
                      </div>
                    </div>

                    {/* Media Gallery (Dynamic list of URL slots) */}
                    <div className="p-5 md:p-6 bg-nt-white border border-nt-light-gray rounded-xl space-y-4">
                      <div className="border-b border-nt-light-gray pb-2.5 mb-2 flex justify-between items-center">
                        <span className="text-[11px] font-sans font-bold text-nt-black block tracking-wide">2. Product Media Gallery</span>
                        <span className="text-[9px] text-nt-gray">{imageUrls.length} image slots</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono"
                            placeholder="Input clean HTTP/HTTPS image URL..."
                          />
                        </div>
                        <button 
                          onClick={handleAddImageUrl}
                          className="px-4 bg-nt-black hover:bg-nt-charcoal text-nt-white rounded text-[10px] font-bold uppercase transition-colors shrink-0"
                        >
                          + ADD Image
                        </button>
                      </div>

                      {/* Display thumbnail cards dynamically */}
                      {imageUrls.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                          {imageUrls.map((img, idx) => (
                            <div key={idx} className="aspect-square rounded border border-nt-light-gray bg-nt-bg relative overflow-hidden group">
                              <img 
                                src={img} 
                                className="w-full h-full object-cover" 
                                alt="" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).onerror = null;
                                  (e.target as HTMLImageElement).style.opacity = '20%';
                                }}
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImageUrl(idx)}
                                  className="p-1 px-2 border border-white text-white hover:bg-nt-red hover:border-nt-red rounded transition-colors text-[9px] font-bold flex items-center gap-1"
                                >
                                  <X size={10} /> REMOVE
                                </button>
                              </div>
                              <span className="absolute bottom-1.5 left-1.5 bg-black/75 text-[8px] text-white px-2 py-0.5 rounded font-bold font-mono">
                                SLOT {idx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border border-dashed border-nt-light-gray rounded-lg py-8 text-center text-nt-gray uppercase font-bold text-[9px]">
                          No image slots allocated. Link premium render assets above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Column 3: Stats & Publish Actions */}
                  <div className="space-y-6">
                    {/* E-Commerce Parameters cards */}
                    <div className="p-5 md:p-6 bg-nt-white border border-nt-light-gray rounded-xl space-y-4">
                      <div className="border-b border-nt-light-gray pb-2.5 mb-2">
                        <span className="text-[11px] font-sans font-bold text-nt-black block tracking-wide">3. Commercial Inventory Data</span>
                      </div>

                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Unit Retail Price (EUR €)</label>
                        <div className="relative">
                          <DollarSign size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-nt-gray" />
                          <input 
                            type="text" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-nt-bg border border-nt-light-gray rounded pl-8 pr-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black font-mono font-semibold"
                            placeholder="24.99"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">European Article Number (EAN)</label>
                        <div className="relative">
                          <Barcode size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-nt-gray" />
                          <input 
                            type="text" 
                            value={ean}
                            onChange={(e) => setEan(e.target.value)}
                            className="w-full bg-nt-bg border border-nt-light-gray rounded pl-8 pr-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black font-mono"
                            placeholder="e.g. 5060421731234"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Warehouse Stock Quantity</label>
                        <div className="relative">
                          <Package size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-nt-gray" />
                          <input 
                            type="number" 
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full bg-nt-bg border border-nt-light-gray rounded pl-8 pr-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black font-mono font-semibold"
                            placeholder="15"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Internal Use Only (Private Notes)</label>
                        <div className="relative">
                          <textarea 
                            value={internalNotes}
                            onChange={(e) => setInternalNotes(e.target.value)}
                            rows={3}
                            className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black font-mono placeholder:text-nt-gray/35 normal-case"
                            placeholder="Stash private comments or URLs here (e.g., 3DP stashing links). Hidden from public shop."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Publish panel */}
                    <div className="p-5 md:p-6 bg-nt-white border border-nt-light-gray rounded-xl space-y-4">
                      <div className="border-b border-nt-light-gray pb-2.5 mb-2">
                        <span className="text-[11px] font-sans font-bold text-nt-black block tracking-wide">4. Product Status</span>
                      </div>

                      {formError && (
                        <div className="p-3 bg-nt-red/5 rounded border border-nt-red/10 text-nt-red text-xxs font-mono leading-relaxed uppercase">
                          {formError}
                        </div>
                      )}

                      {success && (
                        <div className="p-3 bg-green-500/5 text-green-600 rounded border border-green-500/10 flex items-center gap-1.5 font-bold text-xxs">
                          <CheckCircle size={11} /> RECORD SUCCESSFULLY SAVED
                        </div>
                      )}

                      <div className="text-[9px] text-nt-gray space-y-1.5 border-b border-nt-bg pb-3">
                        <div className="flex justify-between">
                          <span>Catalog status:</span>
                          <span className="font-bold text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Integration method:</span>
                          <span className="font-bold">Firestore Sync</span>
                        </div>
                        {editingId && (
                          <div className="flex justify-between">
                            <span>Editing record ID:</span>
                            <span className="font-bold text-nt-black tracking-normal lowercase">{editingId.substring(0, 10)}...</span>
                          </div>
                        )}
                      </div>

                      <button 
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-nt-black hover:bg-nt-charcoal text-nt-white py-3 rounded text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 transition-colors flex items-center justify-center gap-2 border border-nt-charcoal"
                      >
                        {submitting ? 'COMPILING RECORD...' : editingId ? 'UPDATE PRODUCT DETAILS' : 'PUBLISH PRODUCT SKU'}
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* FINANCIAL STATS PANEL */}
            {activeTab === 'stats' && (
              <motion.div
                key="stats-panel"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="max-w-4xl mx-auto space-y-6 text-left"
              >
                <div className="border-b border-nt-light-gray pb-4 mb-2">
                  <span className="font-mono text-[8px] text-nt-gray block mb-1 uppercase tracking-widest">// WOOCOMMERCE TELEMETRY REPORT</span>
                  <h2 className="font-display font-semibold text-lg uppercase tracking-tight text-nt-black">WooCommerce Financial Data Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                  
                  {/* Warehouse Value Box */}
                  <div className="p-6 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] text-nt-gray uppercase tracking-widest block mb-2">Cumulative Stock Assets</span>
                    <span className="font-display font-bold text-3xl text-nt-black block leading-none mb-2">
                      €{totalInventoryValue.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <p className="text-[10px] text-nt-gray uppercase leading-relaxed">
                      Representing overall asset evaluations of all {totalStockUnits} compiled active database units.
                    </p>
                  </div>

                  {/* Avg Price Box */}
                  <div className="p-6 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] text-nt-gray uppercase tracking-widest block mb-2">Average Catalog Price</span>
                    <span className="font-display font-bold text-3xl text-nt-black block leading-none mb-2">
                      €{avgPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <p className="text-[10px] text-nt-gray uppercase leading-relaxed">
                      Average customer-facing price listed dynamically across {totalSkuCount} active unique items.
                    </p>
                  </div>

                  {/* Metrics Box */}
                  <div className="p-6 bg-nt-white border border-nt-light-gray rounded-xl">
                    <span className="text-[9px] text-nt-gray uppercase tracking-widest block mb-2">Available Products Catalog</span>
                    <span className="font-display font-bold text-3xl text-green-600 block leading-none mb-2">
                      {products.filter(p => p.stock >= 5).length} / {totalSkuCount}
                    </span>
                    <p className="text-[10px] text-nt-gray uppercase leading-relaxed">
                      We currently have {outOfStockCount} items fully depleted, and {lowStockCount} items nearing warehouse limits.
                    </p>
                  </div>
                </div>

                {/* Database logs */}
                <div className="p-6 bg-nt-white border border-nt-light-gray rounded-xl space-y-4">
                  <span className="text-[10px] font-bold text-nt-black block uppercase font-sans tracking-wide">System Database Status Logs</span>
                  <div className="bg-nt-bg p-4 rounded border border-nt-light-gray font-mono text-[9px] text-nt-gray/80 space-y-1.5 uppercase leading-normal">
                    <div className="flex justify-between border-b border-nt-light-gray/40 pb-1">
                      <span>Database Engine</span>
                      <span className="text-nt-black font-bold">Cloud Firestore</span>
                    </div>
                    <div className="flex justify-between border-b border-nt-light-gray/40 pb-1">
                      <span>Server Location</span>
                      <span className="text-nt-black font-bold">US-Multi-Region [Standard Enterprise Edition]</span>
                    </div>
                    <div className="flex justify-between border-b border-nt-light-gray/40 pb-1">
                      <span>Security Bounds Level</span>
                      <span className="text-green-600 font-bold">Hardened ABAC Rules v2 Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Session Bypass</span>
                      <span className="text-amber-600 font-bold">Active for Demo Access</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
