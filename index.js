// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
	// Get all links with hash
	const links = document.querySelectorAll('a[href^="#"]')

	// Add click event to each link
	for (const link of links) {
		link.addEventListener('click', function (e) {
			e.preventDefault()

			// Get the target element
			const targetId = this.getAttribute('href')

			// Handle the case where href="#" (no specific target)
			if (targetId === '#') return

			const targetElement = document.querySelector(targetId)

			if (targetElement) {
				// Calculate header height for offset
				const headerHeight = document.querySelector('header').offsetHeight

				// Calculate the distance to scroll
				const targetPosition =
					targetElement.getBoundingClientRect().top + window.pageYOffset
				const offsetPosition = targetPosition - headerHeight

				// Smooth scroll to target
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		})
	}

	// Add scroll event for active navigation highlighting
	window.addEventListener('scroll', function () {
		highlightActiveSection()
	})

	function highlightActiveSection() {
		// Get all sections
		const sections = document.querySelectorAll('section[id]')
		const navLinks = document.querySelectorAll('.nav-links a')

		// Get current scroll position
		const scrollPosition = window.scrollY

		// Get header height for offset calculations
		const headerHeight = document.querySelector('header').offsetHeight

		// Loop through sections to find the visible one
		sections.forEach(section => {
			const sectionTop = section.offsetTop - headerHeight - 100 // extra offset for better UX
			const sectionHeight = section.offsetHeight
			const sectionId = section.getAttribute('id')

			if (
				scrollPosition >= sectionTop &&
				scrollPosition < sectionTop + sectionHeight
			) {
				// Remove active class from all links
				navLinks.forEach(link => {
					link.classList.remove('active')
				})

				// Add active class to corresponding navigation link
				const activeLink = document.querySelector(
					`.nav-links a[href="#${sectionId}"]`
				)
				if (activeLink) {
					activeLink.classList.add('active')
				}
			}
		})
	}

	// Call once on page load
	highlightActiveSection()

	// Add some subtle parallax effect to the hero section
	const heroSection = document.querySelector('.hero')

	window.addEventListener('scroll', function () {
		const scrollTop = window.scrollY
		if (heroSection) {
			heroSection.style.backgroundPosition = `center ${scrollTop * 0.4}px`
		}
	})

	// Add animation to feature cards when they come into view
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
	}

	const observerCallback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fadeIn')
				// Stop observing once animation is applied
				observer.unobserve(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(observerCallback, observerOptions)

	// Observe all feature cards, steps, and other elements that should animate
	const animatedElements = document.querySelectorAll(
		'.feature-card, .step, .security-card'
	)
	animatedElements.forEach(el => {
		el.style.opacity = '0'
		el.style.transform = 'translateY(20px)'
		el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(el)
	})

	// Apply fadeIn class to add animation
	document.addEventListener('DOMContentLoaded', function () {
		document.body.classList.add('loaded')
	})
})

// Add fadeIn animation when elements come into view
document.addEventListener('DOMContentLoaded', function () {
	const fadeElements = document.querySelectorAll(
		'.feature-card, .step, .security-card'
	)

	const fadeInObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1'
					entry.target.style.transform = 'translateY(0)'
					fadeInObserver.unobserve(entry.target)
				}
			})
		},
		{
			threshold: 0.1,
		}
	)

	fadeElements.forEach(element => {
		fadeInObserver.observe(element)
	})
})

// Добавляем класс active для активного пункта меню
document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-links a')

	navLinks.forEach(link => {
		link.addEventListener('click', function () {
			navLinks.forEach(l => l.classList.remove('active'))
			this.classList.add('active')
		})
	})

	// Активируем первый пункт меню по умолчанию
	if (navLinks.length > 0) {
		navLinks[0].classList.add('active')
	}
})
