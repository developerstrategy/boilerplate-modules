document.addEventListener("DOMContentLoaded", function () {
  // Configuración del IntersectionObserver
  const createObserver = (callback, options) => new IntersectionObserver(callback, options);

  const handleIntersect = (entries, observer, animationFn) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animationFn(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  // Animaciones
  const animateCounter = element => {
    $({ Counter: 0 }).animate({
      Counter: parseInt($(element).text(), 10)
    }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        $(element).text(Math.ceil(this.Counter));
      }
    });
  };

  const gsapAnimate = (target, y, opacity, duration, delay, stagger = 0) => {
    gsap.timeline({ delay })
      .to(target, {
        y, opacity, duration, ease: 'power2.out', stagger
      });
  };

  const prepareElement = (selector, callback) => {
    document.querySelectorAll(selector).forEach(callback);
  };

  // Callbacks
  const inViewCallback = entries => handleIntersect(entries, inViewObserver, element => element.classList.add('is-inview'));

  const animateOnScrollCallback = entries => handleIntersect(entries, animateOnScrollObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    gsapAnimate(target.querySelector('.inner-content'), 0, 1, 1, delay);
  });

  const animateWordsCallback = entries => handleIntersect(entries, animateWordsObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const words = target.querySelectorAll('.word');
    gsapAnimate(words, 0, 1, 1, delay, 0.1);
  });

  const animateBoxCallback = entries => handleIntersect(entries, animateBoxObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    gsapAnimate(target, 0, 1, 1, delay);
  });

  const animateListCallback = entries => handleIntersect(entries, animateListObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const items = target.querySelectorAll('li');
    gsapAnimate(items, 0, 1, 1, delay, 0.1);
  });

  const animateLettersCallback = entries => handleIntersect(entries, animateLettersObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const letters = target.querySelectorAll('.letter');
    gsapAnimate(letters, 0, 1, 1, delay, 0.05);
  });

  // Observadores
  const options = { threshold: 0.3 };
  const animateOptions = { threshold: 0.1 };

  const inViewObserver = createObserver(inViewCallback, options);
  const animateOnScrollObserver = createObserver(animateOnScrollCallback, animateOptions);
  const animateWordsObserver = createObserver(animateWordsCallback, animateOptions);
  const animateBoxObserver = createObserver(animateBoxCallback, animateOptions);
  const animateListObserver = createObserver(animateListCallback, animateOptions);
  const animateLettersObserver = createObserver(animateLettersCallback, animateOptions);

  // Inicialización de elementos
  prepareElement('.inview', element => {
    inViewObserver.observe(element);
    if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom >= 0) {
      element.classList.add('is-inview');
      inViewObserver.unobserve(element);
    }
  });

  prepareElement('.animate-appear', element => {
    const wrapper = document.createElement('span');
    wrapper.classList.add('inner-content');
    while (element.firstChild) {
      wrapper.appendChild(element.firstChild);
    }
    element.appendChild(wrapper);
    wrapper.style.opacity = 0;  // Inicializa la opacidad
    wrapper.style.transform = 'translateY(20px)';  // Inicializa la posición
    animateOnScrollObserver.observe(element);
  });

  prepareElement('.animate-word', element => {
    const text = element.textContent;
    element.textContent = '';
    const words = text.split(/(\s+)/);
    words.forEach(word => {
      if (word.trim().length > 0) {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('word');
        wordSpan.textContent = word;
        wordSpan.style.opacity = 0;  // Inicializa la opacidad
        wordSpan.style.transform = 'translateY(20px)';  // Inicializa la posición
        element.appendChild(wordSpan);
      } else {
        element.appendChild(document.createTextNode(word));
      }
    });
    animateWordsObserver.observe(element);
  });

  prepareElement('.animate-box', element => {
    element.style.opacity = 0;  // Inicializa la opacidad
    element.style.transform = 'translateY(20px)';  // Inicializa la posición
    animateBoxObserver.observe(element);
  });

  prepareElement('.animate-list', element => {
    const items = element.querySelectorAll('li');
    items.forEach(item => {
      item.style.opacity = 0;  // Inicializa la opacidad
      item.style.transform = 'translateY(20px)';  // Inicializa la posición
    });
    animateListObserver.observe(element);
  });

  prepareElement('.animate-letters', element => {
    const text = element.textContent;
    element.textContent = '';
    const letters = text.split('');
    letters.forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letter');
      letterSpan.innerHTML = letter === ' ' ? '&nbsp;' : letter;
      letterSpan.style.opacity = 0;  // Inicializa la opacidad
      letterSpan.style.transform = 'translateY(20px)';  // Inicializa la posición
      element.appendChild(letterSpan);
    });
    animateLettersObserver.observe(element);
  });
});

gsap.registerPlugin(ScrollTrigger);

let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
  let bgbox = section.querySelector(".bgbox");

  // Parallax effect with lighter movement
  gsap.fromTo(bgbox, {
    backgroundPosition: () => `50% ${-window.innerHeight * 0.5 * getRatio(section)}px`
  }, {
    backgroundPosition: () => `50% ${window.innerHeight * 0.5 * (1 - getRatio(section))}px`,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true // to make it responsive
    }
  });
});