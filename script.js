/* =============================================
   PORTFOLIO – script.js
   Sara Mohamed | Frontend Developer
   ============================================= */


// ─── 1. TYPED.JS ──────────────────────────────
// بيكتب الكلمات دي واحدة واحدة في الـ hero section
// ويمسحهم ويكمل على اللي بعدها بشكل تلقائي

new Typed('.typed-text', {
  strings: [
    'Frontend Developer.',
    'HTML & CSS Developer.',
    'JavaScript Enthusiast.',
    'Responsive Web Designer.',
    'Creative Coder.',
  ],
  typeSpeed:  70,    // سرعة الكتابة بالـ milliseconds
  backSpeed:  50,    // سرعة المسح
  backDelay:  1500,  // كام ms تستنى قبل ما تمسح
  startDelay: 500,   // كام ms تستنى قبل ما تبدأ
  loop:       true,  // يكمل يلف على نفسه للأبد
  showCursor: false, // مخفي عشان عندنا cursor خاص بتاعنا
});


// ─── 2. SCROLLREVEAL ──────────────────────────
// بيخلي العناصر تظهر بـ animation لما المستخدم يـ scroll عليها

const sr = ScrollReveal({
  origin:   'bottom',  // العنصر بييجي من تحت
  distance: '60px',    // بييجي من 60px تحت موضعه
  duration: 800,       // مدة الـ animation بالـ ms
  delay:    100,       // تأخير بسيط قبل البدء
  reset:    false,     // يتحرك مرة واحدة بس
});

// Hero: النص من الشمال والصورة من اليمين
sr.reveal('.home-content', { origin: 'left',  distance: '80px' });
sr.reveal('.home-img',     { origin: 'right', distance: '80px' });

// About
sr.reveal('.about-img',     { origin: 'left'  });
sr.reveal('.about-content', { origin: 'right', delay: 200 });

// Services: كل كارت يظهر بعد التاني بـ 150ms
sr.reveal('.service-box', { interval: 150 });

// Portfolio: نفس الفكرة
sr.reveal('.portfolio-box', { interval: 150 });

// Contact وFooter من تحت
sr.reveal('.contact-form', { origin: 'bottom', distance: '40px' });
sr.reveal('.footer',       { origin: 'bottom', distance: '20px' });


// ─── 3. ACTIVE NAV LINK عند الـ SCROLL ────────
// بيحدد الرابط الصح في الـ navbar تلقائياً لما تـ scroll

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar a');

// IntersectionObserver = بيراقب العناصر بدون ما يحمّل الـ CPU
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // شيل active من كل الروابط
        navLinks.forEach((link) => link.classList.remove('active'));
        // ضيف active على الرابط اللي بيتطابق مع الـ section الحالي
        const activeLink = document.querySelector(
          `.navbar a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }  // 40% من الـ section لازم تكون ظاهرة
);

sections.forEach((section) => observer.observe(section));


// ─── 4. STICKY HEADER ────────────────────────
// بيضيف glow للـ header لما المستخدم يـ scroll

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.boxShadow = '0 2px 20px rgba(244, 114, 182, 0.15)';
  } else {
    header.style.boxShadow = 'none';
  }
});


// ─── 5. HAMBURGER MENU للموبايل ───────────────
// بيفتح ويقفل قايمة الـ navbar على الشاشات الصغيرة

const menuIcon = document.getElementById('menuIcon');
const navbar   = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('open');
  const icon = menuIcon.querySelector('i');
  icon.classList.toggle('bx-menu');  // أيقونة الـ hamburger ☰
  icon.classList.toggle('bx-x');     // أيقونة الـ X لإغلاق القايمة
});

// اقفل القايمة لما الـ user يضغط على رابط
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    const icon = menuIcon.querySelector('i');
    icon.classList.add('bx-menu');
    icon.classList.remove('bx-x');
  });
});


// ─── 6. CONTACT FORM — AJAX SEND ─────────────
// بيبعت الفورم بدون ما الصفحة تـ reload

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // وقّف السلوك الافتراضي للفورم

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method:  'POST',
        body:    data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        submitBtn.textContent = '✓ Message Sent!';
        contactForm.reset();  // امسح كل الحقول
      } else {
        submitBtn.textContent = 'Error – try again';
      }
    } catch (err) {
      submitBtn.textContent = 'Network Error';
    }

    // رجّع الزرار لحالته الأصلية بعد 3 ثواني
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled    = false;
    }, 3000);
  });
}
