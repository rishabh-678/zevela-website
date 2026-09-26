document.addEventListener("DOMContentLoaded",()=>{
  const gallery=document.querySelector(".gallery");
  const filters=document.querySelectorAll(".filter");
  const menu=document.querySelector(".menu-btn");
  const nav=document.querySelector(".nav");
  const toTop=document.querySelector(".to-top");
  const header=document.querySelector(".header");

  filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
      filters.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const target=btn.dataset.target;
      gallery.classList.remove("covers","events","studio");
      gallery.classList.add(target);
      if(window.innerWidth<=760){
        gallery.scrollIntoView({behavior:"smooth",block:"start"});
      }
    });
  });

  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menu.setAttribute("aria-expanded",String(open));
  });

  nav.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click",()=>{
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded","false");
    });
  });

  window.addEventListener("scroll",()=>{
    toTop.classList.toggle("show",window.scrollY>450);
    header.classList.toggle("scrolled",window.scrollY>20);
  });

  header.classList.toggle("scrolled",window.scrollY>20);

  toTop.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  });
});

  const contactForm=document.getElementById("contactForm");
  const formMessage=document.getElementById("formMessage");
  if(contactForm){
    contactForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      formMessage.classList.add("show");
      contactForm.reset();
    });
  }

/* Site search */
(function(){
  const INDEX=[
    {t:"Home",u:"index.html",k:"home fashion creative agency production studio join the magic",type:"Page"},
    {t:"About",u:"about.html",k:"about zevela creative direction editorial production fashion photography campaign development styling casting brand storytelling vision",type:"Page"},
    {t:"Featured",u:"magazine.html",k:"featured magazine editorial covers stories work",type:"Page"},
    {t:"Events",u:"events.html",k:"events live in person launches shows experiences fashion presentations brand",type:"Page"},
    {t:"Studio",u:"studio.html",k:"studio shoots campaign e-commerce product portraits lookbooks video social content",type:"Page"},
    {t:"Contact",u:"contact.html",k:"contact email get in touch new delhi mumbai paris milan work together enquiry",type:"Page"},
    {t:"Editorial Shoots",u:"editorial-shoots.html",k:"studio service editorial fashion shoot concept casting styling",type:"Studio"},
    {t:"Campaign Days",u:"campaign-days.html",k:"studio service campaign launch production stills motion",type:"Studio"},
    {t:"E-commerce & Product Imagery",u:"ecommerce-product-imagery.html",k:"studio service ecommerce product flat lay ghost mannequin catalogue",type:"Studio"},
    {t:"Portraits & Lookbooks",u:"portraits-lookbooks.html",k:"studio service portrait lookbook collection",type:"Studio"},
    {t:"Video & Social Content",u:"video-social-content.html",k:"studio service video social reels content film",type:"Studio"},
    {t:"Creative Testing",u:"creative-testing.html",k:"studio service creative testing concept test prototype",type:"Studio"},
    {t:"Holla Mohalla",u:"magazine.html",k:"featured editorial",type:"Featured"},
    {t:"The Village Life",u:"magazine.html",k:"featured editorial village farmer field",type:"Featured"},
    {t:"The Fisherwomen",u:"magazine.html",k:"featured editorial fisherwomen river",type:"Featured"},
    {t:"Punctoom Fashion",u:"magazine.html",k:"featured editorial fashion",type:"Featured"},
    {t:"Door of Fashion",u:"magazine.html",k:"featured editorial fashion door",type:"Featured"},
    {t:"Old Punjab — Street of Darbar Sahib",u:"magazine.html",k:"featured editorial punjab street amritsar",type:"Featured"},
    {t:"Old Punjab",u:"magazine.html",k:"featured editorial punjab street",type:"Featured"},
    {t:"Sleepless Nights",u:"magazine.html",k:"featured editorial night",type:"Featured"},
    {t:"Freedom",u:"magazine.html",k:"featured editorial",type:"Featured"},
    {t:"The Waiting",u:"magazine.html",k:"featured editorial",type:"Featured"},
    {t:"You and Me",u:"magazine.html",k:"featured editorial",type:"Featured"},
    {t:"Live band on stage",u:"events.html",k:"event concert band music stage lights",type:"Event"},
    {t:"Drummer under red stage lights",u:"events.html",k:"event concert drummer drums music",type:"Event"},
    {t:"Bassist performing",u:"events.html",k:"event concert bassist bass guitar music",type:"Event"},
    {t:"Singer performing on stage",u:"events.html",k:"event concert singer vocalist microphone music",type:"Event"},
    {t:"Guitarist performing live",u:"events.html",k:"event concert guitarist guitar music",type:"Event"},
    {t:"Confetti moment on stage",u:"events.html",k:"event concert confetti celebration crew filming",type:"Event"},
    {t:"Singer with acoustic guitar",u:"events.html",k:"event concert acoustic guitar singer music",type:"Event"},
    {t:"Band group portrait",u:"events.html",k:"event band group portrait backstage",type:"Event"},
    {t:"Le Désir cover shoot",u:"studio.html",k:"studio cover shoot portrait le desir desir flowers love",type:"Studio"}
  ];
  const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

  document.addEventListener("DOMContentLoaded",()=>{
    const trigger=document.querySelector('.nav a[aria-label="Search"]');
    const header=document.querySelector(".header");
    if(!trigger||!header) return;

    const box=document.createElement("div");
    box.className="search-panel";
    box.hidden=true;
    box.innerHTML='<div class="search-inner"><input type="search" class="search-input" placeholder="SEARCH" aria-label="Search the site" autocomplete="off"><button type="button" class="search-close" aria-label="Close search">×</button><ul class="search-results"></ul></div>';
    header.insertAdjacentElement("afterend",box);
    const input=box.querySelector(".search-input");
    const list=box.querySelector(".search-results");

    const render=()=>{
      const q=norm(input.value.trim());
      if(!q){list.innerHTML="";return;}
      const words=q.split(/\s+/);
      const hits=INDEX.filter(e=>{const h=norm(e.t+" "+e.k+" "+e.type);return words.every(w=>h.includes(w));});
      list.innerHTML=hits.length
        ? hits.map(e=>'<li><a href="'+e.u+'"><span>'+esc(e.t)+'</span><em>'+e.type+'</em></a></li>').join("")
        : '<li class="search-empty">No results found</li>';
    };
    const open=()=>{box.hidden=false;input.focus();};
    const close=()=>{box.hidden=true;input.value="";list.innerHTML="";};

    trigger.addEventListener("click",e=>{e.preventDefault();box.hidden?open():close();});
    box.querySelector(".search-close").addEventListener("click",close);
    input.addEventListener("input",render);
    input.addEventListener("keydown",e=>{
      if(e.key==="Enter"){const a=list.querySelector("a");if(a) location.href=a.getAttribute("href");}
    });
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!box.hidden) close();});
  });
})();

/* Hide .html in the address bar (links still point at real files) */
try{
  const clean=location.pathname.replace(/(^|\/)index\.html$/,"$1").replace(/\.html$/,"");
  if(clean!==location.pathname) history.replaceState(null,"",clean+location.search+location.hash);
}catch(e){}