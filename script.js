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
