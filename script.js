// scripts.js - FULL replacement
// Handles tracking sequence + language translations + UI safety

// ---------- DOM ----------
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');
const languageSelect = document.getElementById('languageSelect');
const trackBtn = document.getElementById('track-btn');

// guard: if some element missing, log and stop (prevents runtime errors)
if (!trackingForm || !trackingSteps || !trackingNumberInput || !trackBtn) {
  console.error('scripts.js: required DOM elements missing. Make sure IDs match.');
}

// The single correct tracking code (case-insensitive)
const CORRECT_TRACKING = "Track-246800000";

// Keep references to timeouts so repeated submits are safe
let timeouts = [];

/* -----------------------
   Translations dictionary
   Keys are element IDs -> translated text
   ----------------------- */
const translations = {
  en: {
    "site-title": "PACKAGE TRACKER",
    "site-subtitle": "Track your shipments easily",
    "nav-home": "Home",
    "nav-about": "About",
    "nav-contact": "Contact",
    "tip-text": "💡 Tip: Track multiple packages easily with your account!",
    "special-text": "📦 Special: Fast delivery for premium members.",
    "track-btn": "Track",
    "products-title": "Our Featured Products",
    "prod1-title": "Fast Shipping Box",
    "prod1-text": "Durable and affordable packaging for your shipments.",
    "prod1-btn": "Buy Now",
    "prod2-title": "Courier Bag",
    "prod2-text": "Lightweight waterproof courier bags for safe delivery.",
    "prod2-btn": "Shop Now",
    "prod3-title": "Protective Envelope",
    "prod3-text": "Bubble-lined envelopes to protect fragile shipments.",
    "prod3-btn": "Buy Now",
    "prod4-title": "Sealing Tape",
    "prod4-text": "Strong adhesive tape for secure package sealing.",
    "prod4-btn": "Shop Now",
    "about-title": "About Us",
    "about-text": "PACKAGE-TRACKER is a simple courier tracking site that allows users to check the delivery status of their packages quickly and easily.",
    "contact-title": "Contact Us",
    "contact-text": "Have questions about your shipment or our services? Reach out to us:",
    "whatsapp-btn": "💬 WhatsApp",
    "email-btn": "📧 Email",
    "footer-text": "© 2025 Package Tracker – All rights reserved",
    "premium-text": "Check out our premium shipping services!",
    "step-placed-text": "Order Placed",
    "step-shipped-text": "Shipped",
    "step-transit-text": "In Transit",
    "step-delivered-text": "Delivered"
  },
  fr: {
    "site-title": "SUIVI DE COLIS",
    "site-subtitle": "Suivez vos envois facilement",
    "nav-home": "Accueil",
    "nav-about": "À propos",
    "nav-contact": "Contact",
    "tip-text": "💡 Astuce : Suivez plusieurs colis facilement avec votre compte !",
    "special-text": "📦 Offre : Livraison rapide pour les membres premium.",
    "track-btn": "Suivre",
    "products-title": "Nos Produits",
    "prod1-title": "Boîte d'expédition rapide",
    "prod1-text": "Emballage durable et abordable pour vos envois.",
    "prod1-btn": "Acheter",
    "prod2-title": "Sac de messagerie",
    "prod2-text": "Sacs étanches, légers pour la livraison.",
    "prod2-btn": "Voir",
    "prod3-title": "Enveloppe protectrice",
    "prod3-text": "Enveloppes à bulles pour protéger les articles fragiles.",
    "prod3-btn": "Acheter",
    "prod4-title": "Ruban adhésif",
    "prod4-text": "Ruban adhésif résistant pour sceller vos colis.",
    "prod4-btn": "Voir",
    "about-title": "À propos de nous",
    "about-text": "PACKAGE-TRACKER est un site simple de suivi de colis permettant de vérifier rapidement le statut de livraison.",
    "contact-title": "Contactez-nous",
    "contact-text": "Des questions sur votre envoi ou nos services ? Contactez-nous :",
    "whatsapp-btn": "💬 WhatsApp",
    "email-btn": "📧 Email",
    "footer-text": "© 2025 Package Tracker – Tous droits réservés",
    "premium-text": "Découvrez nos services d'expédition premium !",
    "step-placed-text": "Commande passée",
    "step-shipped-text": "Expédié",
    "step-transit-text": "En transit",
    "step-delivered-text": "Livré"
  },
  es: {
    "site-title": "RASTREADOR DE PAQUETES",
    "site-subtitle": "Rastrea tus envíos fácilmente",
    "nav-home": "Inicio",
    "nav-about": "Acerca de",
    "nav-contact": "Contacto",
    "tip-text": "💡 Consejo: ¡Rastrea múltiples paquetes con tu cuenta!",
    "special-text": "📦 Oferta: Entrega rápida para miembros premium.",
    "track-btn": "Rastrear",
    "products-title": "Nuestros Productos",
    "prod1-title": "Caja de envío rápida",
    "prod1-text": "Embalaje duradero y económico para tus envíos.",
    "prod1-btn": "Comprar",
    "prod2-title": "Bolsa de mensajería",
    "prod2-text": "Bolsas impermeables y ligeras para entregas seguras.",
    "prod2-btn": "Ver",
    "prod3-title": "Sobre protector",
    "prod3-text": "Sobres acolchados para artículos frágiles.",
    "prod3-btn": "Comprar",
    "prod4-title": "Cinta adhesiva",
    "prod4-text": "Cinta de sellado fuerte para asegurar paquetes.",
    "prod4-btn": "Ver",
    "about-title": "Sobre Nosotros",
    "about-text": "PACKAGE-TRACKER es un sitio simple que permite verificar rápidamente el estado de entrega.",
    "contact-title": "Contáctanos",
    "contact-text": "¿Preguntas sobre tu envío o nuestros servicios? Contáctanos:",
    "whatsapp-btn": "💬 WhatsApp",
    "email-btn": "📧 Email",
    "footer-text": "© 2025 Package Tracker – Todos los derechos reservados",
    "premium-text": "¡Consulta nuestros servicios de envío premium!",
    "step-placed-text": "Pedido realizado",
    "step-shipped-text": "Enviado",
    "step-transit-text": "En tránsito",
    "step-delivered-text": "Entregado"
  },
  de: {
    "site-title": "PAKETVERFOLGUNG",
    "site-subtitle": "Verfolge deine Sendungen einfach",
    "nav-home": "Start",
    "nav-about": "Über uns",
    "nav-contact": "Kontakt",
    "tip-text": "💡 Tipp: Verfolge mehrere Pakete einfach mit deinem Konto!",
    "special-text": "📦 Aktion: Schnelle Lieferung für Premium-Mitglieder.",
    "track-btn": "Verfolgen",
    "products-title": "Unsere Produkte",
    "prod1-title": "Schnellversand-Box",
    "prod1-text": "Robuste und preiswerte Verpackung für Ihre Sendungen.",
    "prod1-btn": "Kaufen",
    "prod2-title": "Kurier-Tasche",
    "prod2-text": "Leichte, wasserdichte Kurier-Taschen für sichere Zustellung.",
    "prod2-btn": "Ansehen",
    "prod3-title": "Schutzhülle",
    "prod3-text": "Luftpolsterumschläge zum Schutz empfindlicher Sendungen.",
    "prod3-btn": "Kaufen",
    "prod4-title": "Klebeband",
    "prod4-text": "Starkes Klebeband zum Sichern von Paketen.",
    "prod4-btn": "Ansehen",
    "about-title": "Über uns",
    "about-text": "PACKAGE-TRACKER ist eine einfache Sendungsverfolgung, mit der Benutzer den Lieferstatus schnell prüfen können.",
    "contact-title": "Kontaktieren Sie uns",
    "contact-text": "Fragen zu Ihrer Sendung oder unseren Diensten? Kontaktieren Sie uns:",
    "whatsapp-btn": "💬 WhatsApp",
    "email-btn": "📧 Email",
    "footer-text": "© 2025 Package Tracker – Alle Rechte vorbehalten",
    "premium-text": "Entdecken Sie unsere Premium-Versanddienste!",
    "step-placed-text": "Bestellung aufgegeben",
    "step-shipped-text": "Versendet",
    "step-transit-text": "Unterwegs",
    "step-delivered-text": "Zugestellt"
  },
  zh: {
    "site-title": "包裹追踪",
    "site-subtitle": "轻松追踪您的货件",
    "nav-home": "首页",
    "nav-about": "关于",
    "nav-contact": "联系",
    "tip-text": "💡 提示：使用账户可轻松追踪多个包裹！",
    "special-text": "📦 活动：高级会员享受快速配送。",
    "track-btn": "追踪",
    "products-title": "精选商品",
    "prod1-title": "快速运输箱",
    "prod1-text": "耐用且实惠的包装，适合您的货件。",
    "prod1-btn": "购买",
    "prod2-title": "快递包",
    "prod2-text": "轻便防水的快递包，确保安全配送。",
    "prod2-btn": "查看",
    "prod3-title": "保护信封",
    "prod3-text": "带气泡的信封保护易碎物品。",
    "prod3-btn": "购买",
    "prod4-title": "封箱胶带",
    "prod4-text": "牢固的胶带，确保包裹密封。",
    "prod4-btn": "查看",
    "about-title": "关于我们",
    "about-text": "PACKAGE-TRACKER 是一个简单的包裹追踪网站，让用户快速查看派送状态。",
    "contact-title": "联系我们",
    "contact-text": "对您的货件或服务有疑问？请联系我们：",
    "whatsapp-btn": "💬 WhatsApp",
    "email-btn": "📧 Email",
    "footer-text": "© 2025 Package Tracker – 版权所有",
    "premium-text": "查看我们的高级配送服务！",
    "step-placed-text": "订单已下",
    "step-shipped-text": "已发货",
    "step-transit-text": "运输中",
    "step-delivered-text": "已送达"
  }
};

// Helper: apply translations map for a language code
function applyTranslations(lang) {
  const map = translations[lang] || translations.en;
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    // For anchors/buttons that may contain extra HTML, replace only text content
    el.textContent = map[id];
  });

  // Some button anchors may have emojis or formatting you want to keep
  // If you want to keep specific icons (e.g., WhatsApp emoji), ensure mapping includes it.
}

// Initialize language on load
if (languageSelect) {
  languageSelect.addEventListener('change', (e) => applyTranslations(e.target.value));
  // apply default (try to read selected value)
  applyTranslations(languageSelect.value || 'en');
} else {
  applyTranslations('en');
}

/* -----------------------------
   Tracking simulation behavior
   - steps highlight sequentially
   - timings: 3s, +3s, +4s
   - shipment details shown only for CORRECT_TRACKING
   - invalid format or wrong number => shake input only
   ----------------------------- */

// Clear outstanding timeouts
function clearAllTimeouts() {
  timeouts.forEach(t => clearTimeout(t));
  timeouts = [];
}

// Small utility to safely add class
function addClassSafe(el, cls) { if (el && !el.classList.contains(cls)) el.classList.add(cls); }
function removeClassSafe(el, cls) { if (el && el.classList.contains(cls)) el.classList.remove(cls); }

trackingForm && trackingForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  clearAllTimeouts();

  const value = (trackingNumberInput.value || '').trim();

  // Validate format: Track- followed by 6-10 digits
  const regex = /^Track-\d{6,10}$/i;
  if (!regex.test(value)) {
    // invalid format -> shake only
    addClassSafe(trackingNumberInput, 'shake');
    setTimeout(() => removeClassSafe(trackingNumberInput, 'shake'), 500);
    return;
  }

  // Start new sequence
  spinner && (spinner.style.display = 'block');
  shipmentContainer && (shipmentContainer.style.display = 'none');
  trackBtn && (trackBtn.disabled = true);
  trackingSteps && removeClassSafe(trackingSteps, 'hidden');

  // Reset steps
  const steps = trackingSteps ? Array.from(trackingSteps.querySelectorAll('li')) : [];
  steps.forEach(s => removeClassSafe(s, 'show'));

  // Timings: 3s, 3s, 4s
  // t1 = after 3000ms -> Order Placed
  // t2 = after 6000ms -> Shipped
  // t3 = after 10000ms -> In Transit + show shipment details if correct
  const t1 = setTimeout(() => { if (steps[0]) addClassSafe(steps[0], 'show'); }, 3000);
  const t2 = setTimeout(() => { if (steps[1]) addClassSafe(steps[1], 'show'); }, 6000);
  const t3 = setTimeout(() => {
    if (steps[2]) addClassSafe(steps[2], 'show');
    // stop spinner
    spinner && (spinner.style.display = 'none');

    // check if correct (case-insensitive)
    if (value.toLowerCase() === CORRECT_TRACKING.toLowerCase()) {
      // fill tracking number into the table (if element exists)
      const trackingNumberCell = document.getElementById('trackingNumber');
      if (trackingNumberCell) trackingNumberCell.textContent = CORRECT_TRACKING;
      // show shipment details
      shipmentContainer && (shipmentContainer.style.display = 'block');
    } else {
      // wrong number -> shake input only
      addClassSafe(trackingNumberInput, 'shake');
      setTimeout(() => removeClassSafe(trackingNumberInput, 'shake'), 500);
    }

    // re-enable UI
    trackBtn && (trackBtn.disabled = false);
  }, 10000);

  // keep timeouts for possible cancellation on next submit
  timeouts.push(t1, t2, t3);
});
