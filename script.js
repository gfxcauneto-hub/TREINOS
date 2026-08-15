/* ==========================================================================
   TREINOS COM ELÁSTICO - JAVASCRIPT
   Lógica responsiva, VSL 9:16, UTMs, Modal Upsell e Carrossel
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initUrgencyDate();
  initFaqAccordion();
  initTestimonialCarousel();
  initModalListeners();
});

/* --------------------------------------------------------------------------
   1. DATA DINÂMICA NA BARRA DE URGÊNCIA & RODAPÉ
   -------------------------------------------------------------------------- */
function initUrgencyDate() {
  const dataHojeEl = document.getElementById('dataHoje');
  if (dataHojeEl) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    dataHojeEl.textContent = `${dia}/${mes}/${ano}`;
  }

  const anoAtualEl = document.getElementById('anoAtual');
  if (anoAtualEl) {
    anoAtualEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   2. REPRODUÇÃO E CONTROLE DA VSL 9:16 (ÁREA SUPERIOR)
   -------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------
   3. PERGUNTAS FREQUENTES (FAQ ACCORDION)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Fecha todos os outros itens para um efeito sanfona limpo
      document.querySelectorAll('.faq-item').forEach(function (item) {
        item.classList.remove('active');
      });

      // Se não estava ativo, ativa o atual
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. CARROSSEL DE DEPOIMENTOS EM VÍDEO
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const container = document.getElementById('carouselContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 300;

  prevBtn.addEventListener('click', function () {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. UPSELL MODAL (LÓGICA E INTERAÇÕES)
   -------------------------------------------------------------------------- */
function abrirUpsell() {
  const modal = document.getElementById('upsellModal');
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function fecharUpsell() {
  const modal = document.getElementById('upsellModal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function aceitarUpsell() {
  // Redireciona para o plano completo com valor promocional de $ 7.90 USD
  irParaCheckout('oferta-upsell-790');
}

function recusarUpsell() {
  // Redireciona para o plano básico de $ 5.00 USD
  irParaCheckout('oferta-basica-5');
}

function initModalListeners() {
  window.addEventListener('click', function (e) {
    const modal = document.getElementById('upsellModal');
    if (e.target === modal) {
      fecharUpsell();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharUpsell();
    }
  });
}

/* --------------------------------------------------------------------------
   6. PRESERVAÇÃO DE UTMs & REDIRECIONAMENTO DIRETO PARA O HOTMART
   -------------------------------------------------------------------------- */

const CHECKOUT_URLS = {
  'oferta-basica-5': 'https://pay.hotmart.com/Q107172621W?off=mou4k4op&checkoutMode=10',
  'oferta-basica-10': 'https://pay.hotmart.com/Q107172621W?off=mou4k4op&checkoutMode=10',
  'oferta-completa': 'https://pay.hotmart.com/Q107172621W?off=v6cg3xz5&checkoutMode=10',
  'oferta-upsell-790': 'https://pay.hotmart.com/Q107172621W?off=z0tzg1c9&checkoutMode=10',
  'oferta-upsell-1990': 'https://pay.hotmart.com/Q107172621W?off=z0tzg1c9&checkoutMode=10'
};

function irParaCheckout(ofertaKey) {
  let targetUrl = CHECKOUT_URLS[ofertaKey] || 'https://pay.hotmart.com/Q107172621W?off=v6cg3xz5&checkoutMode=10';
  
  // Captura e anexa automaticamente todos os parâmetros da URL atual (UTMs, src, fbclid, etc)
  const currentParams = window.location.search;
  if (currentParams) {
    const searchSymbol = targetUrl.includes('?') ? '&' : '?';
    targetUrl += searchSymbol + currentParams.substring(1);
  }

  window.location.href = targetUrl;
}

/* --------------------------------------------------------------------------
   7. EXIT-INTENT POPUP (RETENÇÃO DE TRÁFEGO AO TENTAR FECHAR A PÁGINA)
   -------------------------------------------------------------------------- */
let exitIntentTriggered = false;

document.addEventListener('mouseleave', function (e) {
  if (e.clientY <= 0 && !exitIntentTriggered) {
    exitIntentTriggered = true;
    abrirUpsell();
  }
});
