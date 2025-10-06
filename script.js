// DOM Content Loaded (Using jQuery's shorthand: $(function() { ... });)
$(function() {
  // Initialize all functionality
  initializeLoading()
  initializeNavigation()
  initializeScrollAnimations()
  initializeContactBooking() // ganti: booking via WA
  initializeSmoothScroll()
})

// Loading Screen (Migrated to jQuery)
function initializeLoading() {
  const $loadingScreen = $("#loading-screen") // Use jQuery selector

  $(window).on("load", () => { // Use jQuery event handler
    setTimeout(() => {
      $loadingScreen.addClass("fade-out") // Use jQuery class method
      setTimeout(() => {
        $loadingScreen.hide() // Use jQuery show/hide method
      }, 500)
    }, 1000)
  })
}

// Navigation (Partially Migrated to jQuery for event handling and classes)
function initializeNavigation() {
  const $navbar = $("#navbar")
  const $hamburger = $("#hamburger")
  const $navMenu = $("#nav-menu")
  const $navLinks = $(".nav-link") // Use jQuery selector

  // Navbar scroll effect
  $(window).on("scroll", () => { // Use jQuery event handler
    if (window.scrollY > 50) {
      $navbar.addClass("scrolled") // Use jQuery class method
    } else {
      $navbar.removeClass("scrolled") // Use jQuery class method
    }
  })

  // Mobile menu toggle
  $hamburger.on("click", () => { // Use jQuery event handler
    $hamburger.toggleClass("active")
    $navMenu.toggleClass("active")
  })

  // Close mobile menu when clicking on a link
  $navLinks.on("click", () => { // Use jQuery event handler
    $hamburger.removeClass("active")
    $navMenu.removeClass("active")
  })

  // Active navigation link (Keeping the native JS logic structure as it is more complex)
  $(window).on("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      // Use jQuery to get section height
      const sectionHeight = $(section).outerHeight()
      // Reduced offset for the 64px fixed navbar
      if (scrollY >= sectionTop - 100) { 
        current = section.getAttribute("id")
      }
    })

    $navLinks.each(function() { // Use jQuery iteration
      const $this = $(this)
      $this.removeClass("active") 
      if ($this.attr("href") === `#${current}`) {
        $this.addClass("active")
      }
    })
  })
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    observer.observe(element)
  })
}

// Booking Kost via WhatsApp (Migrated event handler and data retrieval)
function initializeContactBooking() {
  const $bookingForm = $("#booking-form")

  if (!$bookingForm.length) return // Check if element exists in jQuery way

  $bookingForm.on("submit", function (e) { // Use jQuery event handler
    e.preventDefault()

    // Get form data using jQuery
    const name = $bookingForm.find("#name").val()
    const phone = $bookingForm.find("#phone").val()
    const room = $bookingForm.find("#room").val()
    const message = $bookingForm.find("#message").val()

    // Basic validation
    if (!name || !phone || !room) {
      showNotification("Harap isi semua data penting.", "error")
      return
    }

    // Nomor WA pemilik kost
    const ownerNumber = "6285215041480" // ganti dengan nomor kamu

    // Format pesan
    const text = `Halo, saya ${name}.%0ANomor HP: ${phone}%0ASaya tertarik dengan kamar: ${room}.%0APesan tambahan: ${message || "-"}`
    const waLink = `https://wa.me/${ownerNumber}?text=${text}`

    // Buka WhatsApp
    window.open(waLink, "_blank")

    this.reset() // Can still use native reset
  })
}

// Smooth Scroll (Migrated to jQuery)
function initializeSmoothScroll() {
  $('a[href^="#"]').on("click", function (e) { // Use jQuery event handler
    e.preventDefault()

    const targetId = $(this).attr("href") // Get href attribute with jQuery
    const $targetSection = $(targetId) // Use jQuery selector for target

    if ($targetSection.length) { // Check if element exists
      const offsetTop = $targetSection.offset().top - 64 // Get offsetTop with jQuery and adjust for navbar

      // Use jQuery's animate function for smooth scrolling
      $("html, body").animate({
        scrollTop: offsetTop
      }, 800) // 800ms duration for smooth scroll
    }
  })
}

// Utility Functions
function showNotification(message, type) {
  // ... (Notification function remains the same, relying on custom CSS)
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Directly setting styles that are hard to manage with Tailwind in JS
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Parallax Effect for Hero Section (Using jQuery)
$(window).on("scroll", () => {
  const scrolled = $(window).scrollTop()
  const $hero = $(".hero-parallax") 
  const rate = scrolled * -0.5

  if ($hero.length) {
    $hero.css("transform", `translateY(${rate}px)`)
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const throttledScrollHandler = throttle(() => {
  // Scroll-dependent functions can be called here
}, 16)

window.addEventListener("scroll", throttledScrollHandler)

// Keyboard navigation support
$(document).on("keydown", (e) => {
  if (e.key === "Escape") {
    const $hamburger = $("#hamburger")
    const $navMenu = $("#nav-menu")

    if ($navMenu.hasClass("active")) {
      $hamburger.removeClass("active")
      $navMenu.removeClass("active")
    }
  }
})

// Focus management for accessibility (Keeping native JS, as setting styles is often simpler here)
document.addEventListener("DOMContentLoaded", () => {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  )

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #007BFF"
      this.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", function () {
      this.style.outline = ""
      this.style.outlineOffset = ""
    })
  })
})