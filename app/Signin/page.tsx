'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function AnimatedHeader() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const slides = [
    {
      background: '/image (28).svg',
      images: [
        { src: '/Frame 1618869207.svg', width: 145, height: 41 },
        { src: '/Frame 1618869205.svg', width: 155, height: 41 },
        { src: '/Frame 1618869208 (1).svg', width: 166, height: 41 },
        { src: '/Frame 1618869209.svg', width: 152, height: 41 }
      ],
      title: "Sell More. Grow Faster.",
      description: "Transform your Instagram or TikTok page into a smart storefront — with payments, delivery & growth insights all-in-one."
    },
    {
      background: '/image (29).svg',
      images: [
        { src:  '/Frame 1618869215.svg', width: 145, height: 41 },
        { src: '/Frame 1618869216.svg' , width: 155, height: 41 },
        { src: '/Frame 1618869214.svg', width: 166, height: 41 },
      ],
      title: "Boost Your Sales",
      description: "Increase conversions with our seamless checkout experience and smart product recommendations."
    },
    {
      background: '/image (30).svg',
      images: [
        { src: '/Frame 1618869023.svg', width: 145, height: 41 },
        { src: '/Frame 1618869023.svg', width: 155, height: 41 },
        
      ],
      title: "Real-time Analytics",
      description: "Get actionable insights to understand your customers and optimize your store performance."
    }
  ]

  const animateSlide = (container: HTMLDivElement | null, index: number) => {
    if (!container) return

    const elements = Array.from(container.children) as HTMLElement[]
    
    // 1. Initial gather animation (center all images)
    const gather = () => {
      elements.forEach(el => {
        el.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.transform = 'translate(0, 0)'
      })
    }

    // 2. Spread out animation with smooth easing
    const spread = () => {
      elements.forEach((el, i) => {
        // Different spread patterns for different slides
        let angle, distance
        if (index === 0) {
          angle = (i * 90) + 45
          distance = 120
        } else if (index === 1) {
          angle = (i * 90)
          distance = 100 + (i * 10)
        } else {
          angle = (i * 120) + 30
          distance = 80 + (i * 20)
        }
        
        const x = Math.cos(angle * Math.PI / 180) * distance
        const y = Math.sin(angle * Math.PI / 180) * distance
        
        el.style.transition = 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.transform = `translate(${x}px, ${y}px)`
      })
    }

    // 3. Ultra-smooth floating animation
    const startFloating = () => {
      elements.forEach((el, i) => {
        const currentTransform = el.style.transform || 'translate(0, 0)'
        const floatHeight = 15 + (i * 2)
        const floatDuration = 4000 + (i * 500)
        
        const floatAnimation = el.animate([
          { transform: `${currentTransform} translateY(0px)` },
          { transform: `${currentTransform} translateY(-${floatHeight}px)` },
          { transform: `${currentTransform} translateY(0px)` }
        ], {
          duration: floatDuration,
          iterations: Infinity,
          easing: 'cubic-bezier(0.5, 0, 0.5, 1)',
          direction: 'alternate'
        })
      })
    }

    // Animation sequence
    gather()
    const spreadTimeout = setTimeout(() => {
      spread()
      const floatTimeout = setTimeout(startFloating, 1800)
      
      return () => {
        clearTimeout(spreadTimeout)
        clearTimeout(floatTimeout)
      }
    }, 800)
  }

  useEffect(() => {
    animateSlide(containerRefs[0].current, 0)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      containerRefs.forEach(ref => {
        if (ref.current) {
          const elements = Array.from(ref.current.children) as HTMLElement[]
          elements.forEach(el => {
            el.getAnimations().forEach(anim => anim.cancel())
          })
        }
      })
    }
  }, [])

  useEffect(() => {
    animateSlide(containerRefs[currentSlide].current, currentSlide)
  }, [currentSlide])

  return (
    <div className="">
      {/* Header with animated background */}
      <header className="relative h-[350px] w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Background Image */}
            <Image
              src={slide.background}
              layout="fill"
              objectFit="cover"
              alt="Background"
              priority
            />
            
            {/* Blurred overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 100px, black 250px)',
                maskImage: 'radial-gradient(circle at 50% 50%, transparent 100px, black 250px)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                filter: 'blur(30px)',
              }} 
            />
            
            {/* Center border */}
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-xl pointer-events-none" />
            
            {/* Animated SVGs */}
            <div
              ref={containerRefs[index]}
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
            >
              {slide.images.map((img, i) => (
                <div 
                  key={i}
                  className="absolute will-change-transform"
                  style={{
                    transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Image 
                    src={img.src} 
                    width={img.width} 
                    height={img.height} 
                    alt={`Icon ${i+1}`}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Slide indicators */}
             <div className="absolute -top-10 h-[200px] bg-white/90 backdrop-blur-xl rounded-xl -z-10"
     style={{
       background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
       boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
     }}>
</div>
      </header>

      {/* Text content with blur background */}
      <div className=''>
       
      <div className="relative z-10 -mt-16 px-4">
        <div className="">



          {/* Animated text */}
          <div className="relative h-32 overflow-hidden mt-18">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full text-center transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <h1 className="text-[#000000E5] text-2xl font-bold mb-2">{slide.title}</h1>
                <p className="text-sm text-gray-600">{slide.description}</p>
              </div>
            ))}
          </div>
          </div>
          <div className="absolute  left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
  {slides.map((_, index) => (
    <div className='-mt-4'>
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`h-[4px] rounded-full transition-all duration-300 ${
        currentSlide === index 
          ? 'w-[14px] bg-[#FE2C55]' 
          : 'w-[4px] bg-[#0000001A]'
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
    </div>
  ))}
</div>
          {/* Button */}
          <div className="mt-10 flex gap-4 flex-col justify-center">
             <Image 
              src="/Button (1).svg" 
              alt="Get started" 
              width={310} 
              height={44}
              className="mx-auto"
            />
             <Image 
              src="/Button (3).svg" 
              alt="Get started" 
              width={310} 
              height={44}
              className="mx-auto"
            />
             <Image 
              src="/Button (2).svg" 
              alt="Get started" 
              width={310} 
              height={44}
              className="mx-auto"
            />
            <Image 
              src="/Button1.svg" 
              alt="Get started" 
              width={310} 
              height={44}
              className="mx-auto"
            />
           
          </div>
        </div>
      </div>
    </div>
  )
}