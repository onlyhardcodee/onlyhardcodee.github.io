// Плавная прокрутка для навигационных ссылок
// Ожидаем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
	// Получаем все ссылки, содержащие хеш (#)
	const links = document.querySelectorAll('a[href^="#"]')

	// Добавляем обработчик клика на каждую ссылку
	for (const link of links) {
		link.addEventListener('click', function (e) {
			e.preventDefault() // Предотвращаем стандартное поведение ссылки

			// Получаем идентификатор целевого элемента
			const targetId = this.getAttribute('href')

			// Если ссылка ведёт на "#" (без конкретной цели), ничего не делаем
			if (targetId === '#') return

			const targetElement = document.querySelector(targetId)

			if (targetElement) {
				// Вычисляем высоту заголовка (header), чтобы учитывать его в прокрутке
				const headerHeight = document.querySelector('header').offsetHeight

				// Рассчитываем положение прокрутки
				const targetPosition =
					targetElement.getBoundingClientRect().top + window.pageYOffset
				const offsetPosition = targetPosition - headerHeight

				// Плавно прокручиваем страницу к нужному месту
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		})
	}

	// Добавляем обработчик прокрутки для подсветки активного раздела
	window.addEventListener('scroll', function () {
		highlightActiveSection()
	})

	function highlightActiveSection() {
		// Получаем все секции с атрибутом id
		const sections = document.querySelectorAll('section[id]')
		const navLinks = document.querySelectorAll('.nav-links a')

		// Получаем текущую позицию прокрутки
		const scrollPosition = window.scrollY

		// Вычисляем высоту заголовка (header) для корректировки
		const headerHeight = document.querySelector('header').offsetHeight

		// Перебираем секции, чтобы определить, какая сейчас в области видимости
		sections.forEach(section => {
			const sectionTop = section.offsetTop - headerHeight - 100 // Дополнительный отступ для UX
			const sectionHeight = section.offsetHeight
			const sectionId = section.getAttribute('id')

			if (
				scrollPosition >= sectionTop &&
				scrollPosition < sectionTop + sectionHeight
			) {
				// Убираем активный класс у всех ссылок
				navLinks.forEach(link => {
					link.classList.remove('active')
				})

				// Добавляем активный класс к соответствующей ссылке в навигации
				const activeLink = document.querySelector(
					`.nav-links a[href="#${sectionId}"]`
				)
				if (activeLink) {
					activeLink.classList.add('active')
				}
			}
		})
	}

	// Вызываем один раз при загрузке страницы
	highlightActiveSection()

	// Добавляем небольшой параллакс-эффект для главного экрана (hero section)
	const heroSection = document.querySelector('.hero')

	window.addEventListener('scroll', function () {
		const scrollTop = window.scrollY
		if (heroSection) {
			heroSection.style.backgroundPosition = `center ${scrollTop * 0.4}px`
		}
	})

	// Анимация появления карточек с функциями при их появлении в области видимости
	const observerOptions = {
		root: null, // Отслеживаем относительно всего viewport'а
		rootMargin: '0px', // Без дополнительных отступов
		threshold: 0.1, // Элемент должен быть виден хотя бы на 10%
	}

	const observerCallback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fadeIn')
				// Перестаём наблюдать за элементом после анимации
				observer.unobserve(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(observerCallback, observerOptions)

	// Наблюдаем за всеми карточками, шагами и элементами безопасности
	const animatedElements = document.querySelectorAll(
		'.feature-card, .step, .security-card'
	)
	animatedElements.forEach(el => {
		el.style.opacity = '0'
		el.style.transform = 'translateY(20px)'
		el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(el)
	})

	// Добавляем класс fadeIn, чтобы запустить анимацию
	document.addEventListener('DOMContentLoaded', function () {
		document.body.classList.add('loaded')
	})
})

// Добавляем fadeIn анимацию при появлении элементов в области видимости
// (Дублирующаяся логика для надёжности)
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

// Добавляем класс active для активного пункта меню при клике
// (для визуального выделения активного раздела)
document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-links a')

	navLinks.forEach(link => {
		link.addEventListener('click', function () {
			navLinks.forEach(l => l.classList.remove('active'))
			this.classList.add('active')
		})
	})

	// По умолчанию активируем первый пункт меню
	if (navLinks.length > 0) {
		navLinks[0].classList.add('active')
	}
})
