/**
 * Marquee Animation with GSAP
 * Creates smooth scrolling text animations
 */

const initMarquee = () => {
  const marqueeElements = document.querySelectorAll('.marquee')
  
  if (!marqueeElements.length) return

  marqueeElements.forEach(item => {
    const marqueeInner = item.querySelector('.marquee__inner')
    const marqueeContent = marqueeInner.querySelector('.marquee__content')
    
    if (!marqueeInner || !marqueeContent) return
    
    // Get duration from data attribute
    const duration = item.getAttribute('data-marquee-duration') || '20'
    
    // Clone the content for seamless loop
    const marqueeContentClone = marqueeContent.cloneNode(true)
    marqueeInner.append(marqueeContentClone)
    
    // Get all content elements (original + clone)
    const marqueeContentAll = marqueeInner.querySelectorAll('.marquee__content')
    
    // Apply GSAP animation to each content element
    marqueeContentAll.forEach(element => {
      gsap.to(element, {
        x: "-101%",
        repeat: -1,
        duration: parseInt(duration),
        ease: 'linear'
      })
    })
  })
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initMarquee)

// Re-initialize if content is dynamically loaded
if (typeof window !== 'undefined') {
  window.initMarquee = initMarquee
}
