import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "./assets/moshood-foods-logo.svg";
import { useCart } from "./CartContext.jsx";
import { useOrders } from "./OrdersContext.jsx";


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.jh * { box-sizing: border-box; margin: 0; padding: 0; }

.jh {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #fcf9f8;
  background-image: radial-gradient(circle at 2px 2px, rgba(0,107,63,0.03) 1px, transparent 0);
            {/* search removed */}

/* ── Sidebar ────────────────────────────────── */
.jh-aside {
  position: fixed; top: 0; left: 0;
  width: 256px; height: 100vh;
  background: #fafaf9;
  border-right: 1px solid #e7e5e4;
  box-shadow: 4px 0 24px rgba(0,135,81,0.04);
  display: flex; flex-direction: column;
  padding: 24px 16px;
  z-index: 50;
}
.jh-logo { margin-bottom: 40px; padding: 0 8px; }
.jh-logo img { height: 48px; width: auto; object-fit: contain; display: block; }

.jh-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.jh-nav-link {
  display: flex; align-items: center; gap: 16px;
  padding: 12px 16px; border-radius: 8px;
  color: #57534e; font-size: 14px; font-weight: 500;
  text-decoration: none; cursor: pointer;
  border: none; background: none; width: 100%; text-align: left;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: color 0.15s, background 0.15s;
}
.jh-nav-link:hover { color: #008751; background: #f5f5f4; }
.jh-nav-link.active {
  background: #ecfdf5; color: #006b3f; font-weight: 700;
  border-right: 4px solid #006b3f; border-radius: 8px 0 0 8px;
}
.jh-nav-bottom {
  margin-top: auto; padding-top: 40px;
  border-top: 1px solid #e7e5e4;
  display: flex; flex-direction: column; gap: 2px;
}
/* logout removed */

/* ── Main ───────────────────────────────────── */
.jh-main { margin-left: 256px; flex: 1; display: flex; flex-direction: column; }

/* ── Header ─────────────────────────────────── */
.jh-header {
  position: sticky; top: 0; z-index: 40;
  height: 64px; padding: 0 24px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e7e5e4;
  box-shadow: 0 1px 4px rgba(0,107,63,0.05);
  display: flex; justify-content: space-between; align-items: center;
}
.jh-header-left { display: flex; align-items: center; gap: 40px; }
.jh-header-left h1 { font-size: 16px; font-weight: 700; color: #1c1b1b; }
.jh-top-tabs { display: flex; gap: 24px; }
.jh-top-tab {
  background: none; border: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px; font-weight: 600; color: #78716c;
  padding-bottom: 4px; border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.jh-top-tab.active { color: #006b3f; border-bottom-color: #006b3f; }
.jh-top-tab:hover:not(.active) { color: #008751; }

.jh-header-right { display: flex; align-items: center; gap: 8px; }
.jh-cart-chip {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; border-radius: 999px;
  background: #006b3f; color: #fff; font-size: 10px; font-weight: 700;
  padding: 0 6px;
}
.jh-search {
  display: flex; align-items: center; gap: 6px;
  background: #f5f5f4; border-radius: 9999px; padding: 6px 16px;
}
.jh-search input {
  background: none; border: none; outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px; color: #1c1b1b; width: 192px;
}
.jh-icon-btn {
  background: none; border: none; cursor: pointer;
  padding: 8px; border-radius: 9999px;
  color: #78716c; display: flex; align-items: center;
  position: relative; transition: background 0.15s;
}
.jh-icon-btn:hover { background: #f5f5f4; }
.jh-notif-dot {
  position: absolute; top: 4px; right: 4px;
  width: 8px; height: 8px;
  background: #8B4545; border-radius: 50%;
}
.jh-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(15, 118, 110, 0.18);
  background: #008751; color: #fff;
  font-weight: 800; font-size: 16px; margin-left: 8px;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

/* ── Content ─────────────────────────────────── */
.jh-content { padding: 24px; display: flex; flex-direction: column; gap: 40px; }

/* ── Summary Cards ───────────────────────────── */
.jh-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.jh-card {
  background: #fff; padding: 24px;
  border-radius: 12px; border: 1px solid #f5f5f4;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  position: relative; overflow: hidden;
}
.jh-card-bg {
  position: absolute; right: -16px; top: -16px;
  opacity: 0.03; transform: rotate(12deg);
  font-size: 96px !important; pointer-events: none;
}
.jh-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.jh-card-icon {
  padding: 8px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.jh-badge { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }
.jh-badge-green  { background: #ecfdf5; color: #006b3f; }
.jh-badge-amber  { background: #fffbeb; color: #92400e; }
.jh-badge-white  { background: rgba(255,255,255,0.22); color: #fff; }
.jh-card-label   { font-size: 13px; color: #78716c; font-weight: 500; }
.jh-card-value   { font-size: 30px; font-weight: 800; color: #1c1b1b; margin-top: 4px; }

.jh-card-green {
  background: #008751; border-color: #006b3f;
  box-shadow: 0 4px 16px rgba(0,107,63,0.25);
}
.jh-card-green .jh-card-label { color: rgba(255,255,255,0.8); }
.jh-card-green .jh-card-value { color: #fff; }
.jh-card-green .jh-card-bg   { opacity: 0.1; color: #fff; }

/* ── Body Grid ───────────────────────────────── */
.jh-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }

/* ── Panel (orders) ──────────────────────────── */
.jh-panel {
  background: #fff; border-radius: 12px;
  border: 1px solid #f5f5f4;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04); overflow: hidden;
}
.jh-panel-head {
  padding: 16px 24px;
  background: rgba(250,250,249,0.5);
  border-bottom: 1px solid #fafaf9;
  display: flex; justify-content: space-between; align-items: center;
}
.jh-panel-title { font-size: 20px; font-weight: 700; color: #1c1b1b; }

.jh-pills {
  display: flex; background: rgba(0,0,0,0.06);
  padding: 3px; border-radius: 8px; gap: 2px;
}
.jh-pill {
  background: none; border: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px; font-weight: 700;
  padding: 4px 12px; border-radius: 6px; color: #78716c;
  transition: all 0.15s;
}
.jh-pill.active {
  background: #fff; color: #006b3f;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.jh-sync {
  display: flex; align-items: center; gap: 4px;
  background: none; border: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px; font-weight: 700; color: #006b3f;
}

/* ── Table ───────────────────────────────────── */
.jh-table { width: 100%; border-collapse: collapse; }
.jh-table thead th {
  padding: 10px 24px; text-align: left;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #a8a29e; background: #fafaf9;
}
.jh-table tbody tr { border-top: 1px solid #fafaf9; transition: background 0.1s; }
.jh-table tbody tr:hover { background: rgba(250,250,249,0.8); }
.jh-table td { padding: 12px 24px; font-size: 13px; vertical-align: middle; }

.jh-oid  { font-weight: 700; color: #1c1b1b; }
.jh-cust { display: flex; align-items: center; gap: 8px; }
.jh-av {
  width: 32px; height: 32px; border-radius: 50%;
  font-weight: 700; font-size: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.jh-cname    { font-weight: 600; font-size: 13px; }
.jh-items    { color: #78716c; font-size: 12px; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
.jh-amt      { font-weight: 700; }
.jh-status   { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 9999px; display: inline-block; }
.jh-paid     { background: #ecfdf5; color: #006b3f; }
.jh-pending  { background: #fffbeb; color: #92400e; }
.jh-act-btn {
  background: #006b3f; color: #fff; border: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px; font-weight: 700;
  padding: 7px 14px; border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,107,63,0.3);
  white-space: nowrap; transition: filter 0.15s, transform 0.1s;
}
.jh-act-btn:hover  { filter: brightness(1.1); }
.jh-act-btn:active { transform: scale(0.95); }

.jh-view-all {
  padding: 12px; border-top: 1px solid #fafaf9;
  display: flex; justify-content: center;
}
.jh-view-all button {
  background: none; border: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px; font-weight: 700; color: #a8a29e;
  transition: color 0.15s;
}
.jh-view-all button:hover { color: #006b3f; }

/* ── Order Status Widget ─────────────────────── */
.jh-status-widget {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0;
  border-radius: 12px; padding: 16px;
  margin: 20px 0;
  display: flex; flex-direction: column; gap: 12px;
}
.jh-status-label { font-size: 12px; font-weight: 700; color: #065f46; text-transform: uppercase; letter-spacing: 0.05em; }
.jh-status-current {
  font-size: 18px; font-weight: 800; color: #006b3f;
  text-transform: capitalize;
}
.jh-status-dots {
  display: flex; gap: 8px; align-items: center; margin-top: 8px;
}
.jh-status-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #c1fae8;
  transition: all 0.3s;
}
.jh-status-dot.active { background: #006b3f; width: 12px; height: 12px; }
.jh-status-dot.completed { background: #059669; }

/* ── Sidebar widgets ─────────────────────────── */
.jh-sidebar { display: flex; flex-direction: column; gap: 24px; }
.jh-widget {
  background: #fff; border-radius: 12px;
  border: 1px solid #f5f5f4;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04); padding: 24px;
}
.jh-widget-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.jh-widget-title { font-size: 16px; font-weight: 700; color: #1c1b1b; }

/* Revenue Chart */
.jh-chart {
  height: 128px;
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 6px;
  margin-bottom: 16px; padding: 0 2px;
}
.jh-bar-col { flex: 1; position: relative; height: 100%; display: flex; align-items: flex-end; }
.jh-bar {
  width: 100%; border-radius: 3px 3px 0 0;
  background: #f5f5f4; cursor: pointer;
  transition: background 0.2s;
}
.jh-bar:hover  { background: #d1fae5; }
.jh-bar.active { background: #006b3f; }
.jh-tooltip {
  position: absolute; bottom: calc(100% + 4px);
  left: 50%; transform: translateX(-50%);
  background: #1c1b1b; color: #fff;
  font-size: 10px; padding: 3px 7px;
  border-radius: 4px; white-space: nowrap;
  pointer-events: none;
}
.jh-chart-labels {
  display: flex; justify-content: space-between;
  font-size: 10px; font-weight: 700;
  color: #a8a29e; text-transform: uppercase; letter-spacing: 0.05em;
}

/* Payments list */
.jh-pays { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
.jh-pay {
  display: flex; align-items: center; gap: 12px;
  padding: 8px; border-radius: 8px; cursor: pointer;
  transition: background 0.1s;
}
.jh-pay:hover { background: #fafaf9; }
.jh-pay-ico {
  width: 40px; height: 40px; border-radius: 50%;
  background: #ecfdf5; color: #006b3f;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.jh-pay-info { flex: 1; min-width: 0; }
.jh-pay-name { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.jh-pay-meta { font-size: 11px; color: #a8a29e; margin-top: 1px; }
.jh-pay-amt  { font-size: 13px; font-weight: 900; color: #006b3f; white-space: nowrap; }

.jh-dl {
  width: 100%; padding: 8px;
  border: 2px dashed #e7e5e4; border-radius: 8px;
  background: none; cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px; font-weight: 700; color: #a8a29e;
  transition: all 0.15s;
}
.jh-dl:hover { border-color: #006b3f; color: #006b3f; }

/* Cart widget */
.jh-cart-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.jh-cart-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px; border: 1px solid #f1f5f9; border-radius: 10px;
}
.jh-cart-thumb {
  width: 44px; height: 44px; border-radius: 8px; object-fit: cover;
  background: #f5f5f4; flex-shrink: 0;
}
.jh-cart-info { flex: 1; min-width: 0; }
.jh-cart-name {
  font-size: 12px; font-weight: 700; color: #1c1b1b;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.jh-cart-meta { font-size: 11px; color: #78716c; margin-top: 2px; }
.jh-cart-total {
  margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; font-weight: 700;
}

/* FAB */
.jh-fab {
  position: fixed; bottom: 24px; right: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background: #ffd31a; color: #1c1b1b;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: transform 0.15s; z-index: 50;
}
.jh-fab:hover  { transform: scale(1.05); }
.jh-fab:active { transform: scale(0.95); }
`;

/* ─── Static data ─────────────────────────────────────────────── */
const ORDERS = [
  { id: "#JH-8821", initials: "CO", name: "Chidi Okoro",   items: "Party Smoky Jollof (x2), Suya",       amount: "₦12,500", paid: true,  avBg: "#ffdbd1", avColor: "#95452f" },
  { id: "#JH-8822", initials: "AA", name: "Amaka Adebayo", items: "Assorted Meat Stew, White Rice",       amount: "₦8,200",  paid: false, avBg: "#ffe17b", avColor: "#715c00" },
  { id: "#JH-8823", initials: "EO", name: "Emeka Onwuka",  items: "Grilled Catfish (L), Extra Plantain",  amount: "₦15,000", paid: true,  avBg: "#dbeafe", avColor: "#1d4ed8" },
  { id: "#JH-8824", initials: "FI", name: "Fatima Ibrahim", items: "Moin Moin, Egusi & Pounded Yam",     amount: "₦9,800",  paid: true,  avBg: "#fce7f3", avColor: "#be185d" },
];

const BARS = [
  { day: "Mon", pct: 40 }, { day: "Tue", pct: 65 }, { day: "Wed", pct: 50 },
  { day: "Thu", pct: 85, label: "₦124k", active: true },
  { day: "Fri", pct: 70 }, { day: "Sat", pct: 45 }, { day: "Sun", pct: 60 },
];

const PAYMENTS = [
  { name: "Chidi O.",  time: "2 mins ago",  method: "Bank Transfer", amount: "₦12,500" },
  { name: "Emeka O.", time: "15 mins ago", method: "Card Payment",  amount: "₦15,000" },
  { name: "Fatima I.", time: "45 mins ago", method: "USSD",         amount: "₦9,800"  },
];

// NAV items will be created inside the component so active state can
// reflect navigation state or the presence of items in the cart.

/* ─── Tiny helpers ────────────────────────────────────────────── */
const MI = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

/* ═══════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════ */
export default function JollofHouseDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, getCartCount } = useCart();
  const {
    orderItems,
    getOrderCount,
    orderStatus,
    notifications,
    getUnreadNotificationCount,
    markAllNotificationsRead,
    clearNotifications,
  } = useOrders();
  const initialActiveNav = location.state?.activeNav || (orderItems.length > 0 ? "Orders" : "Cart");
  const [activeNav, setActiveNav] = useState(initialActiveNav);
  const [topTab,   setTopTab]   = useState(initialActiveNav === "Orders" ? 1 : 0);
  const [orderTab, setOrderTab] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const lastStatusRef = useRef(orderStatus);
  const orderThumbnails = typeof window !== "undefined" ? window.__moshoodOrderThumbnails || {} : {};

  /* Sync sidebar nav with top navbar tabs */
  useEffect(() => {
    if (activeNav === "Cart") setTopTab(0);
    else if (activeNav === "Orders") setTopTab(1);
  }, [activeNav]);

  const formatPrice = (value) => `₦${Number(value || 0).toLocaleString()}`;
  const formatTime = (iso) => {
    try {
      return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const registrationData = (() => {
    try {
      const saved = localStorage.getItem("moshood-registration");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();
  const profileData = (() => {
    try {
      const saved = localStorage.getItem("moshood-profile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();
  const storedLastName = registrationData?.lastName || localStorage.getItem("registeredLastName")?.trim();
  const avatarInitial = (storedLastName?.trim()?.charAt(0) || "M").toUpperCase();
  const avatarImage =
    profileData?.avatarImage ||
    profileData?.images?.find((img) => img.id === profileData?.avatarId)?.dataUrl ||
    profileData?.images?.[0]?.dataUrl ||
    null;
  const avatarPalette = [
    { background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#fff" },
    { background: "linear-gradient(135deg, #b45309, #f59e0b)", color: "#fff" },
    { background: "linear-gradient(135deg, #1d4ed8, #38bdf8)", color: "#fff" },
    { background: "linear-gradient(135deg, #7c2d12, #ef4444)", color: "#fff" },
    { background: "linear-gradient(135deg, #3f6212, #84cc16)", color: "#fff" },
  ];
  const avatarTheme = avatarPalette[avatarInitial.charCodeAt(0) % avatarPalette.length];

  // Auto-show toast when status changes to 'delivered'
  useEffect(() => {
    if (orderStatus === 'delivered' && lastStatusRef.current !== 'delivered') {
      // Show toast
      setToast({
        message: 'Your food has been delivered!',
        type: 'success',
      });

      // Play notification sound
      const playDeliverySound = () => {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Create a pleasant notification chime
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
          console.log('Audio playback not available:', e);
        }
      };
      playDeliverySound();

      // Try browser notification if available
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Moshood Foods', {
          body: 'Your food has been delivered!',
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23006b3f" width="100" height="100"/><text x="50" y="70" font-size="60" fill="white" text-anchor="middle" font-weight="bold">M</text></svg>',
        });
      }

      // Auto-dismiss toast after 5 seconds
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
      }, 5000);
    }
    lastStatusRef.current = orderStatus;
  }, [orderStatus]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // Request browser notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const cartCount = getCartCount();
  const orderCount = getOrderCount();
  const unreadCount = getUnreadNotificationCount();
  const cartSubtotal = cartItems.reduce(
    (sum, item) => {
      const qty = item.quantity || item.qty || 1;
      const unitPrice =
        typeof item.unitPrice === "number"
          ? item.unitPrice
          : Number(String(item.price || "").replace(/[^\d.]/g, "")) || 0;
      return sum + unitPrice * qty;
    },
    0
  );
  const orderSubtotal = orderItems.reduce(
    (sum, item) => {
      const qty = item.quantity || item.qty || 1;
      const unitPrice =
        typeof item.unitPrice === "number"
          ? item.unitPrice
          : Number(String(item.price || "").replace(/[^\d.]/g, "")) || 0;
      return sum + unitPrice * qty;
    },
    0
  );
  

  /* Inject CSS before first paint to avoid flash of unstyled content */
  useLayoutEffect(() => {
    const el = document.createElement("style");
    el.setAttribute("data-jh", "1");
    el.textContent = CSS;
    if (!document.querySelector("[data-jh]")) document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="jh">
      {/* Auto-Display Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#10b981',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: 9999,
            animation: 'slideUp 0.4s ease-out',
            maxWidth: '320px',
            wordWrap: 'break-word',
          }}
        >
          {toast.message}
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ── Sidebar ───────────────────────────── */}
      <aside className="jh-aside">
        <div className="jh-logo">
          <img src={logoImage} alt="Moshood Foods Logo" />
        </div>

        <nav className="jh-nav">
          {(() => {
            // activeNav is controlled by click or by location.state on first render
            const items = [
              { label: "Dashboard" },
              { label: "Orders" },
              { label: "Cart" },
            ].map((it) => ({ ...it, active: it.label === activeNav }));

            return items.map((item) => (
              <button
                key={item.label}
                className={`jh-nav-link${item.active ? " active" : ""}`}
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.label === "Dashboard") {
                    navigate("/dashboard");
                  } else if (item.label === "Cart") {
                    setTopTab(0);
                  } else if (item.label === "Orders") {
                    setTopTab(1);
                  }
                }}
              >
                {item.label}
              </button>
            ));
          })()}
        </nav>

        {/* Order Status Widget */}
        {orderItems.length > 0 && (
          <div className="jh-status-widget">
            <div className="jh-status-label">Food Order Status</div>
            <div className="jh-status-current">{orderStatus}</div>
            <div className="jh-status-dots">
              <div className={`jh-status-dot ${orderStatus === "pending" ? "active" : "completed"}`} />
              <div className={`jh-status-dot ${orderStatus === "preparing" ? "active" : orderStatus === "delivered" ? "completed" : ""}`} />
              <div className={`jh-status-dot ${orderStatus === "delivered" ? "active" : ""}`} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#065f46", fontWeight: 600 }}>
              Status updates happen automatically for every new order.
            </div>
          </div>
        )}

        <div className="jh-nav-bottom" />
      </aside>

      {/* ── Main ───────────────────────────────── */}
      <main className="jh-main">

        {/* Header */}
        <header className="jh-header">
          <div className="jh-header-left">
            <h1>Jollof Rice House</h1>
            <div className="jh-top-tabs">
              {["Cart", "Orders"].map((t, i) => (
                <button
                  key={t}
                  className={`jh-top-tab${topTab === i ? " active" : ""}`}
                  onClick={() => {
                    setTopTab(i);
                    setActiveNav(t);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="jh-header-right">
            {/* search removed */}
            <button
              className="jh-icon-btn"
              title="Cart"
              onClick={() => {
                setActiveNav("Cart");
                setTopTab(0);
              }}
            >
              {cartCount > 0 && <span className="jh-cart-chip">{cartCount}</span>}
            </button>
            <button
              className="jh-icon-btn"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                markAllNotificationsRead();
              }}
            >
              <MI name="notifications" />
              {unreadCount > 0 && <span className="jh-notif-dot" />}
            </button>
            {/* help icon removed */}
            <div className="jh-avatar" style={{ background: avatarTheme.background, color: avatarTheme.color }}>
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                avatarInitial
              )}
            </div>
            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  right: 24,
                  top: 60,
                  width: 320,
                  maxHeight: 320,
                  overflowY: "auto",
                  background: "#fff",
                  border: "1px solid #e7e5e4",
                  borderRadius: 10,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  padding: 12,
                  zIndex: 90,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#1c1b1b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: 11,
                        color: "#006b3f",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: "underline",
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <p style={{ fontSize: 12, color: "#78716c" }}>No notifications yet.</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f3f4f6",
                        opacity: item.read ? 0.8 : 1,
                      }}
                    >
                      <p style={{ fontSize: 12, color: "#1c1b1b", fontWeight: item.read ? 500 : 700 }}>
                        {item.message}
                      </p>
                      <p style={{ fontSize: 11, color: "#78716c", marginTop: 2 }}>{formatTime(item.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="jh-content">

            {/* Simplified: only show Cart widget as main content */}
            <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
              <div style={{ width: "100%", maxWidth: 720 }}>
                {topTab === 0 ? (
                  <div className="jh-widget">
                    <div className="jh-widget-head" style={{ marginBottom: 12 }}>
                      <span className="jh-widget-title">Cart</span>
                      {cartCount > 0 && <span className="jh-cart-chip">{cartCount}</span>}
                    </div>

                    {cartItems.length === 0 ? (
                      <p style={{ fontSize: 14, color: "#78716c" }}>
                        No items in cart yet. Add meals from Dashboard.
                      </p>
                    ) : (
                      <>
                        <div className="jh-cart-items">
                          {cartItems.map((item) => (
                            <div className="jh-cart-item" key={item.name}>
                              <img className="jh-cart-thumb" src={orderThumbnails[item.name] || item.img || ""} alt={item.name} />
                              <div className="jh-cart-info">
                                <p className="jh-cart-name">{item.name}</p>
                                <p className="jh-cart-meta">Qty {item.quantity || item.qty || 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="jh-cart-total">
                          <span>Subtotal</span>
                          <span style={{ color: "#006b3f" }}>{formatPrice(cartSubtotal)}</span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="jh-widget">
                    <div className="jh-widget-head" style={{ marginBottom: 12 }}>
                      <span className="jh-widget-title">Orders</span>
                      {orderCount > 0 && <span className="jh-cart-chip">{orderCount}</span>}
                    </div>

                    {orderItems.length === 0 ? (
                      <p style={{ fontSize: 14, color: "#78716c" }}>
                        No orders yet. Order meals from Dashboard.
                      </p>
                    ) : (
                      <>
                        <div className="jh-cart-items">
                          {orderItems.map((item) => (
                            <div className="jh-cart-item" key={item.name}>
                              <img className="jh-cart-thumb" src={orderThumbnails[item.name] || item.img || ""} alt={item.name} />
                              <div className="jh-cart-info">
                                <p className="jh-cart-name">{item.name}</p>
                                <p className="jh-cart-meta">Qty {item.quantity || item.qty || 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="jh-cart-total">
                          <span>Subtotal</span>
                          <span style={{ color: "#006b3f" }}>{formatPrice(orderSubtotal)}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
        </div>
      </main>

      {/* FAB removed */}
    </div>
  );
}
