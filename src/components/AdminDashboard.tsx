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
  Video, 
  Zap,
  Drone,
  LayoutDashboard,
  ArrowLeft,
  Settings,
  FileText,
  BarChart3,
  Users,
  Eye,
  Search,
  MoreVertical,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function getYouTubeId(url: string) {
  if (!url) return '';
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

function getYouTubeThumbnail(url: string, fallbackThumb?: string) {
  const ytId = getYouTubeId(url);
  if (ytId && ytId.length === 11) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  if (fallbackThumb && (fallbackThumb.startsWith('http://') || fallbackThumb.startsWith('https://'))) {
    return fallbackThumb;
  }
  return "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600";
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'stats'>('content');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Content form state
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [type, setType] = useState<'video' | 'short'>('video');
  const [thumbnail, setThumbnail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminStatus = await checkIsAdmin(u);
        setIsAdmin(adminStatus || u.email === 'meneergroot@proton.me');
        if (adminStatus || u.email === 'meneergroot@proton.me') {
          fetchItems();
        }
      } else {
        // Check local storage for fake login session
        const isFakeLogin = localStorage.getItem('stella_admin_session') === 'true';
        if (isFakeLogin) {
          setIsAdmin(true);
          fetchItems();
        } else {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
      const snapshots = await getDocs(q);
      setItems(snapshots.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('stella_admin_session', 'true');
      setIsAdmin(true);
      fetchItems();
    } else {
      setLoginError('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem('stella_admin_session');
    setIsAdmin(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    if (!title || !videoUrl || !thumbnail) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (!user) {
      setFormError('You must be logged in with Google to publish feeds to the database. The demo account does not have write permissions.');
      return;
    }
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'portfolio'), {
        title,
        videoUrl,
        type,
        thumbnail,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      setTitle('');
      setVideoUrl('');
      setThumbnail('');
      setSuccess(true);
      fetchItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Submission error:', err);
      if (err?.message?.includes('permission-denied')) {
        setFormError('Access denied. Please ensure you are logged in with an authorized account.');
      } else {
        setFormError('An error occurred while saving. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setFormError(null);
    try {
      await deleteDoc(doc(db, 'portfolio', id));
      fetchItems();
    } catch (err: any) {
      console.error('Delete error:', err);
      if (err?.message?.includes('permission-denied')) {
        setFormError('Deletion failed: Access denied.');
      } else {
        setFormError('An error occurred during deletion.');
      }
    }
  };

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
          className="max-w-md w-full bg-nt-white p-10 border border-nt-light-gray rounded-xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-nt-black rounded flex items-center justify-center text-nt-white border border-nt-charcoal shadow">
              <Lock size={20} />
            </div>
          </div>
          
          <h1 className="text-sm font-display font-bold text-nt-black text-center mb-6 tracking-wide">// ADMINISTRATOR SECURITY PORTAL</h1>
          
          <form onSubmit={handleFakeLogin} className="space-y-4 mb-6 text-left">
            <div>
              <label className="block text-[10px] text-nt-gray mb-1.5 pl-1 tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-nt-bg border border-nt-light-gray rounded px-4 py-2.5 outline-none focus:border-nt-black text-nt-black transition-colors"
                placeholder="admin"
                id="admin-form-user"
              />
            </div>
            <div>
              <label className="block text-[10px] text-nt-gray mb-1.5 pl-1 tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-nt-bg border border-nt-light-gray rounded px-4 py-2.5 outline-none focus:border-nt-black text-nt-black transition-colors"
                placeholder="••••••••"
                id="admin-form-pass"
              />
            </div>
            {loginError && <p className="text-nt-red text-[10px] font-bold pl-1">{loginError}</p>}
            <button 
              type="submit"
              className="w-full bg-nt-black text-nt-white py-3 rounded font-bold hover:bg-nt-charcoal transition-colors uppercase tracking-wider"
              id="admin-submit-btn"
            >
              LOCAL_LOGIN
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-nt-light-gray"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-nt-white px-3 text-nt-gray font-mono">Or</span></div>
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-nt-white border border-nt-light-gray text-nt-black py-3 rounded hover:bg-nt-bg transition-colors flex items-center justify-center gap-2 tracking-wider"
            id="admin-google-btn"
          >
            <Globe size={14} /> GOOGLE_LOGIN
          </button>
          
          <div className="mt-8 text-center border-t border-nt-light-gray pt-6">
            <Link to="/" className="text-nt-red text-[10px] hover:underline font-bold tracking-widest">
              ← RETURN_TO_HOME
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nt-bg flex flex-col font-sans text-nt-black">
      {/* Top Header */}
      <header className="h-[64px] bg-nt-white border-b border-nt-light-gray flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 bg-nt-black rounded flex items-center justify-center text-nt-white">
              <Drone size={14} />
            </div>
            <span className="text-xs font-dot uppercase tracking-widest text-nt-black">STELLA_MONTIS_ADMIN</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-nt-gray font-mono text-[10px] uppercase">
            <Video size={12} className="text-nt-red animate-pulse" />
            <span>Channel: {items.length} active feeds</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase">
          <span className="text-nt-gray hidden sm:block">User: {user?.email || 'OFFLINE_ADMIN'}</span>
          <button 
            onClick={handleLogout}
            className="p-1.5 border border-nt-light-gray rounded hover:bg-nt-bg text-nt-black transition-colors font-bold"
            title="Log Out"
            id="admin-nav-logout"
          >
            <LogOut size={12} />
          </button>
        </div>
      </header>

      {/* Main Dashboard Panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 nt-dot-grid-light">
        {/* Left Side Add Panel */}
        <div className="w-full lg:w-96 bg-nt-white border-r border-nt-light-gray p-6">
          <div className="sticky top-20 space-y-6">
            <div>
              <span className="font-mono text-[9px] text-nt-gray block mb-1">// CONTROL_CENTER</span>
              <h1 className="font-display font-bold text-lg uppercase tracking-tight text-nt-black">FEED_INJECTOR</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-[10px] uppercase">
              {formError && (
                <div className="p-3 bg-nt-red/5 rounded border border-nt-red/10 text-nt-red text-xxs font-mono">
                  {formError}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-500/5 text-green-600 rounded border border-green-500/10 flex items-center gap-1.5 font-bold">
                  <CheckCircle size={12} /> FEED_SUCCESSFULLY_INJECTED
                </div>
              )}
              
              <div>
                <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Flight Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono"
                  placeholder="e.g. DJI Lito X1 - Haven flight"
                  id="feed-title-input"
                />
              </div>

              <div>
                <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">YouTube URL/ID</label>
                <input 
                  type="text" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono"
                  placeholder="ID of Link..."
                  id="feed-url-input"
                />
              </div>

              <div>
                <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Thumbnail URL</label>
                <input 
                  type="text" 
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black placeholder:text-nt-gray/30 normal-case font-mono"
                  placeholder="https://images.unsplash.com/etc..."
                  id="feed-thumb-input"
                />
              </div>

              <div>
                <label className="block text-nt-gray mb-1.5 pl-1 tracking-wider">Type Feed</label>
                <select 
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full bg-nt-bg border border-nt-light-gray rounded px-3 py-2 text-xs outline-none focus:border-nt-black text-nt-black font-semibold font-mono"
                >
                  <option value="video">Cine Video (Landscape)</option>
                  <option value="short">FPV Short (Portrait)</option>
                </select>
              </div>

              <button 
                disabled={submitting}
                className="w-full bg-nt-black text-nt-white py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-nt-charcoal disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? 'SAVING...' : 'PUBLISH FEED'}
                <ChevronRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Database Feed List */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="bg-nt-white border border-nt-light-gray rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nt-light-gray pb-4 mb-6">
              <div>
                <span className="font-mono text-[9px] text-nt-gray block mb-1">// TELEMETRY_ACTIVE_FEEDS</span>
                <h2 className="font-display font-bold text-base uppercase tracking-tight text-nt-black">DATABASE_RECORDS</h2>
              </div>
              <div className="bg-nt-bg font-mono text-[10px] text-nt-charcoal border border-nt-light-gray px-3 py-1 rounded">
                FEEDS: {items.length} ACTIVE_CHANNELS
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] uppercase">
                <thead>
                  <tr className="bg-nt-bg border-b border-nt-light-gray text-nt-gray text-[9px] tracking-wider">
                    <th className="px-4 py-3">INDEX</th>
                    <th className="px-4 py-3">FEED TITLE</th>
                    <th className="px-4 py-3">FORMAT</th>
                    <th className="px-4 py-3">TIMESTAMP</th>
                    <th className="px-4 py-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nt-bg">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-nt-bg/30 transition-colors"
                      >
                        <td className="px-4 py-4 text-nt-gray/80 font-bold">
                          [{String(index + 1).padStart(2, '0')}]
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={getYouTubeThumbnail(item.videoUrl, item.thumbnail)} 
                              onError={(e) => {
                                (e.target as HTMLImageElement).onerror = null;
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600";
                              }}
                              className="w-10 h-7 rounded object-cover border border-nt-light-gray shrink-0" 
                              alt="" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-nt-black leading-tight line-clamp-1 text-xs">{item.title}</span>
                              <span className="text-[9px] text-nt-gray/80 line-clamp-1 lowercase font-medium">{item.videoUrl}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-[10px]">
                          <span className={`px-2 py-0.5 border rounded ${item.type === 'video' ? 'bg-nt-bg border-nt-light-gray text-nt-black' : 'border-nt-red text-nt-red'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-nt-gray text-[9px]">
                          {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'REALTIME_INJECT'}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="p-1 px-2 border border-nt-light-gray text-nt-gray hover:text-nt-red hover:border-nt-red/20 rounded transition-colors"
                            id={`feed-delete-btn-${item.id}`}
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center text-nt-gray uppercase font-bold italic text-[10px]">
                        NO ACTIVE FEEDS // Waiting for signal injection...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
