// ---------- DOM ----------
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');
const languageSelect = document.getElementById('languageSelect');
const trackBtn = document.getElementById('track-btn');

const correctTrackingNumber = "Track-246800000";

// keep timeouts so we can clear on repeated submits
let timeouts = [];

/* --------- Translations --------- */
/* Keys = element IDs; values = translated strings */
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

// apply translations to elements with IDs
function applyTranslations(lang) {
  const map = translations[lang] || translations.en;
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    // If the element is an anchor or button, we set textContent (keeps structure)
    el.textContent = map[id];
  });
}

// initialize language
languageSelect.addEventListener('change', (e) => {
  applyTranslations(e.target.value);
});

// apply default language at load
applyTranslations('en');

/* ---------- Tracking behavior ---------- */

function clearAllTimeouts() {
  timeouts.forEach(t => clearTimeout(t));
  timeouts = [];
}

trackingForm.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // clear previous runs
  clearAllTimeouts();

  const value = trackingNumberInput.value.trim();
  const regex = /^Track-\d{6,10}$/i;
  // invalid format -> shake only
  if (!regex.test(value)) {
    trackingNumberInput.classList.add('shake');
    setTimeout(() => trackingNumberInput.classList.remove('shake'), 500);
    return;
  }

  // start new simulation
  spinner.style.display = 'block';
  shipmentContainer.style.display = 'none';
  trackBtn.disabled = true;
  trackingSteps.classList.remove('hidden');

  // reset step classes
  const steps = Array.from(trackingSteps.querySelectorAll('li'));
  steps.forEach(s => s.classList.remove('show'));

  // timings: 3s -> Order Placed, +3s (6s) -> Shipped, +4s (10s) -> In Transit + show details
  const t1 = setTimeout(() => steps[0].classList.add('show'), 3000);
  const t2 = setTimeout(() => steps[1].classList.add('show'), 6000);
  const t3 = setTimeout(() => {
    steps[2].classList.add('show');
    spinner.style.display = 'none';

    // If correct tracking number (case-insensitive)
    if (value.toLowerCase() === correctTrackingNumber.toLowerCase()) {
      document.getElementById('trackingNumber').textContent = correctTrackingNumber;
      shipmentContainer.style.display = 'block';
    } else {
      // wrong tracking number -> shake input and keep shipment hidden
      trackingNumberInput.classList.add('shake');
      setTimeout(() => trackingNumberInput.classList.remove('shake'), 500);
    }

    // re-enable UI
    trackBtn.disabled = false;
  }, 10000);

  // store timeouts so they can be cleared next submission
  timeouts.push(t1, t2, t3);
});
