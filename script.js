// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// FAQ toggle
function toggleFaq(btn){
  const item = btn.parentElement;
  document.querySelectorAll('.faq-item').forEach(i => {
    if(i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Click-to-call tracking — fires a Google Ads conversion ("Website click-to-call",
// AW-851807857/xjp7CKfE2f8cEPGclpYD) and an analytics event whenever a tel: link is tapped.
// Do not remove: this is how we measure how many site visitors press the Call button.
(function(){
  if (typeof gtag !== 'function') return;
  gtag('config', 'AW-851807857');
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a) return;
    var where = a.closest('nav') ? 'nav' : a.closest('footer') ? 'footer' : a.closest('.topbar') ? 'topbar' : 'body';
    gtag('event', 'click_to_call', { event_category: 'engagement', event_label: where, page_path: location.pathname });
    gtag('event', 'conversion', { send_to: 'AW-851807857/xjp7CKfE2f8cEPGclpYD', value: 1.0, currency: 'USD' });
  }, true);
})();

