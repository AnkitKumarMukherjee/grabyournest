(() => {
  const cfg = window.GYN_CONFIG || {};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const escapeHtml = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const header = `
    <header class="site-header"><div class="container nav">
      <a class="brand" href="index.html"><span class="brand-mark">GYN</span><span>Grab Your Nest</span></a>
      <nav class="nav-links" id="navLinks" aria-label="Main navigation">
        <a href="index.html">Home</a><a href="templates.html">Templates</a><a href="index.html#apps">Apps &amp; Tools</a><a href="ebooks.html">Ebook Store</a><a href="index.html#contact">Contact</a>
      </nav><a class="btn small" href="index.html#contact">Enquire Now</a><button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="navLinks">Menu</button>
    </div></header>`;
  const footer = `<footer class="site-footer"><div class="container footer-row"><div><a class="brand" href="index.html"><span class="brand-mark">GYN</span><span>Grab Your Nest</span></a><p class="muted">Practical digital products and services.</p><small>© <span id="year"></span> Grab Your Nest. Please verify all business and policy details before launch.</small></div><div class="footer-links"><a href="templates.html">Templates</a><a href="ebooks.html">Ebook Store</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="refund-policy.html">Refund Policy</a></div></div></footer>`;
  const mount = () => {
    const h = $("#siteHeader"), f = $("#siteFooter");
    if(h) h.innerHTML = header;
    if(f) f.innerHTML = footer;
    $("#year") && ($("#year").textContent = new Date().getFullYear());
    $("#menuToggle")?.addEventListener("click", () => {
      const nav = $("#navLinks"), open = nav.classList.toggle("open");
      $("#menuToggle").setAttribute("aria-expanded", String(open));
    });
    $$("#navLinks a").forEach(a => a.addEventListener("click", () => { $("#navLinks").classList.remove("open"); $("#menuToggle")?.setAttribute("aria-expanded","false"); }));
  };
  const templateCard = t => `<article class="card"><div class="template-visual"><img src="${({clinic:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85",spa:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",gym:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85",property:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"})[t.id]}" alt="${escapeHtml(t.name)} example imagery" loading="lazy"></div><div class="card-body"><span class="tag">${escapeHtml(t.category)}</span><h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.description)}</p><div class="price">${escapeHtml(t.price)} <span class="muted" style="font-weight:400">indicative</span></div><div class="actions"><a class="btn small" target="_blank" rel="noopener noreferrer" href="${escapeHtml(t.url)}">View Template ↗</a></div></div></article>`;
  const ebookCard = e => `<article class="card ebook-card"><div class="ebook-cover"><img src="${escapeHtml(e.cover)}" alt="Cover of ${escapeHtml(e.title)}" loading="lazy"></div><div class="card-body"><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.description)}</p><div class="ebook-card-bottom"><div class="price">${escapeHtml(e.price)}</div><a class="btn small ebook-explore" href="${escapeHtml(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="Explore ${escapeHtml(e.title)}">Explore <span aria-hidden="true">↗</span></a></div></div></article>`;
  const serviceCard = s => `<article class="card"><div class="card-body"><div class="service-icon" aria-hidden="true">${escapeHtml(s.icon)}</div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p><a class="text-link" href="#contact" data-enquiry="${escapeHtml(s.title)}">Explore service ↗</a></div></article>`;
  const render = () => {
    $$("[data-templates]").forEach(el => el.innerHTML = (cfg.templates||[]).map(templateCard).join(""));
    $$("[data-ebooks]").forEach(el => el.innerHTML = (cfg.ebooks||[]).map(ebookCard).join(""));
    $$("[data-services]").forEach(el => el.innerHTML = (cfg.services||[]).map(serviceCard).join(""));
    $$("[data-enquiry]").forEach(a => a.addEventListener("click", () => {
      const select = $("#service");
      if(select) { const value = a.dataset.enquiry; let opt = [...select.options].find(o => o.value.toLowerCase()===value.toLowerCase()); if(!opt){ opt = [...select.options].find(o=>o.text.toLowerCase().includes(value.toLowerCase()) || value.toLowerCase().includes(o.text.toLowerCase())); } if(opt) select.value=opt.value; else select.value="Other"; }
    }));
    const form = $("#enquiryForm");
    if(form) form.addEventListener("submit", async e => {
      e.preventDefault();
      const status = $("#formStatus"), submit = form.querySelector('[type="submit"]');
      status.className="form-status"; status.textContent="";
      if(!form.reportValidity()) return;
      if(!cfg.formEndpoint) {
        status.className="form-status error";
        status.textContent="The enquiry service has not been connected yet. Your details have not been sent. Please use the configured contact email once it is active, or ask the site owner to finish form setup.";
        return;
      }
      submit.disabled=true; submit.textContent="Sending…";
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const res = await fetch(cfg.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)});
        if(!res.ok) throw new Error("Submission failed");
        status.className="form-status success"; status.textContent="Thank you. Your enquiry was accepted by the form service.";
        form.reset();
      } catch(err) {
        status.className="form-status error"; status.textContent="We couldn't send your enquiry. Your entries have been kept. Please try again later.";
      } finally { submit.disabled=false; submit.textContent="Send Enquiry"; }
    });
    const wa = $("#whatsappLink");
    if(wa) {
      if(cfg.whatsappNumber) { wa.href=`https://wa.me/${cfg.whatsappNumber}`; wa.classList.remove("hidden"); }
      else wa.classList.add("hidden");
    }
    if(cfg.analyticsId && !location.search.includes("noanalytics=1")) {
      const script=document.createElement("script"); script.async=true; script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.analyticsId)}`; document.head.appendChild(script);
      window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments)} window.gtag=gtag; gtag("js",new Date()); gtag("config",cfg.analyticsId,{send_page_view:true});
    }
  };
  document.addEventListener("DOMContentLoaded",()=>{mount();render();});
})();
