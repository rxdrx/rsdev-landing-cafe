import './style.css'

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav') as HTMLElement
const hamburger = document.getElementById('nav-hamburger') as HTMLButtonElement
const mobileMenu = document.getElementById('nav-mobile') as HTMLElement
const mobileLinks = mobileMenu.querySelectorAll('a')

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 40)
}, { passive: true })

// ── Hamburger menu ─────────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true'
  hamburger.setAttribute('aria-expanded', String(!isOpen))
  mobileMenu.classList.toggle('nav__mobile--open', !isOpen)
  document.body.style.overflow = isOpen ? '' : 'hidden'
})

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false')
    mobileMenu.classList.remove('nav__mobile--open')
    document.body.style.overflow = ''
  })
})

// ── Tabs / Menu ────────────────────────────────────────────
const tabs = document.querySelectorAll<HTMLButtonElement>('.tab')
const panels = document.querySelectorAll<HTMLElement>('.menu__panel')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab

    tabs.forEach(t => {
      t.classList.remove('tab--active')
      t.setAttribute('aria-selected', 'false')
    })
    tab.classList.add('tab--active')
    tab.setAttribute('aria-selected', 'true')

    panels.forEach(panel => {
      const isTarget = panel.id === `panel-${targetTab}`
      panel.classList.toggle('menu__panel--hidden', !isTarget)
    })
  })
})

// ── Hero image zoom on load ────────────────────────────────
const heroImg = document.querySelector<HTMLImageElement>('.hero__img')
if (heroImg) {
  if (heroImg.complete) {
    heroImg.classList.add('hero__img--zoomed')
  } else {
    heroImg.addEventListener('load', () => {
      heroImg.classList.add('hero__img--zoomed')
    })
  }
}

// ── Scroll reveal ──────────────────────────────────────────
const revealEls = document.querySelectorAll<HTMLElement>(
  '.card, .review-card, .about__grid, .about__stat, .footer__grid'
)

revealEls.forEach(el => el.classList.add('reveal'))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement
        // stagger effect for cards
        const siblings = Array.from(el.parentElement?.children ?? [])
        const index = siblings.indexOf(el)
        el.style.transitionDelay = `${index * 80}ms`
        el.classList.add('revealed')
        observer.unobserve(el)
      }
    })
  },
  { threshold: 0.12 }
)

revealEls.forEach(el => observer.observe(el))

// ── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll<HTMLElement>('section[id]')
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__link')

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        navLinks.forEach(link => {
          const href = link.getAttribute('href')
          link.style.color = href === `#${id}` ? 'var(--clr-cream)' : ''
        })
      }
    })
  },
  { threshold: 0.4 }
)

sections.forEach(section => sectionObserver.observe(section))
