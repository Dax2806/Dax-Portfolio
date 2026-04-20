;(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var finePointer = window.matchMedia('(pointer: fine)').matches
  var root = document.documentElement

  var nav = document.querySelector('.nav')
  var toggle = document.querySelector('.menu-toggle')
  var topbar = document.querySelector('.topbar')

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
      document.body.classList.toggle('nav-drawer-open', open)
    })
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open')
        toggle.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('nav-drawer-open')
      })
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open')
        toggle.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('nav-drawer-open')
        toggle.focus()
      }
    })
  }

  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle('is-scrolled', window.scrollY > 32)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  if (!reduce && finePointer) {
    var moveTick = false
    window.addEventListener(
      'mousemove',
      function (e) {
        if (moveTick) return
        moveTick = true
        requestAnimationFrame(function () {
          moveTick = false
          root.style.setProperty('--mx', (e.clientX / window.innerWidth) * 100 + '%')
          root.style.setProperty('--my', (e.clientY / window.innerHeight) * 100 + '%')
          var heroStage = document.querySelector('.hero-stage')
          if (heroStage) {
            var hy = ((e.clientX / window.innerWidth - 0.5) * 2 * 5.5).toFixed(2)
            var hx = ((e.clientY / window.innerHeight - 0.5) * -2 * 4.5).toFixed(2)
            heroStage.style.setProperty('--hy', hy + 'deg')
            heroStage.style.setProperty('--hx', hx + 'deg')
          }
        })
      },
      { passive: true },
    )
  }

  if (!reduce) {
    document.querySelectorAll('.interactive-depth').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect()
        if (r.width < 1 || r.height < 1) return
        el.style.setProperty('--gx', ((e.clientX - r.left) / r.width) * 100 + '%')
        el.style.setProperty('--gy', ((e.clientY - r.top) / r.height) * 100 + '%')
      })
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--gx', '50%')
        el.style.setProperty('--gy', '50%')
      })
    })
  }

  var items = document.querySelectorAll('[data-reveal]')
  if (!items.length) return

  if (reduce) {
    items.forEach(function (el) {
      el.classList.add('revealed')
    })
    return
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
  )

  items.forEach(function (el) {
    observer.observe(el)
  })
})()
