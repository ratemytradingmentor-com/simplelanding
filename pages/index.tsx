'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ThumbsUp, ThumbsDown, Instagram, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mentorImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ttrades-DHBbQvHZVjhdz641Mtc4PRMzTYfa32.png", alt: "TTrades" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/umar-ZU5aOhaO6GPLvAWCuifQPTBCw6TmJ3.png", alt: "Umar" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mooretrades-TRIiQYwQT23qW5vJSXxZQwcMFabstY.png", alt: "Moore Trades" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tjr-eh55QyZEUd3vDG9DvO9Sve5kqeMLOI.png", alt: "TJR" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tori-hrybXGIGZ82QsJPX9CmVjaPxCLgFkT.png", alt: "Tori" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4xliving-0K77iCkjCFlAPwJcAZjzG2Xej6na26.jpg", alt: "F4X Living" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ict-G7MSpuZJvBJUnLPJnBtlCWlOa7ze1U.jpg", alt: "ICT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mason-jIwynCjnqL1SwQkq5BWvVHJ5fd5ILT.png", alt: "Mason" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/justin-Ht6ws8nyQWCu2atIGbCu3l7MtEQRC3.png", alt: "Justin" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dante-7fRyWGwWF2KHnNAFk0JgsEyKVmPOU3.png", alt: "Dante" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ul9Yh4Fk_400x400-jzzkvlGuzzCM5uZGuyJRnB3tw9rVqN.jpg", alt: "AM Trades" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OCs7W2zb_400x400-bq2QP7lWCARbzDBxtuhnXioNZlmlJ1.jpg", alt: "TraderTom" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WAdsNqKg_400x400-73F3D5zqDyjcY0bNYkh04HV9wTgbr1.jpg", alt: "Abstract Logo" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Y3ImtPnI_400x400-removebg-preview%20(1)-z4HXo8fDcjfzPvfTMDONngIpFDKL78.png", alt: "Nasdaq Dog" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YYWaGyNp_400x400-removebg-preview-XC7hf7L0JffVPQbbhrX8u4j91qsin8.png", alt: "Big Gains" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aoZIB0CD_400x400-removebg-preview-4Gd4ZXnDsQ68LmnX8q0qQYiaZhPEq8.png", alt: "Smiling Man" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/k7fIGGig_400x400-hlYSOEl9OyNYnsBTo4mu5gHm3QAs00.jpg", alt: "Sniper" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soc6w-Ns_400x400-removebg-preview-euOeR0SJWQC8OR8rjmfFqLROtdlyWl.png", alt: "Man with Straw Hat" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3BGNdpW7_400x400-LiwO9RnLCP5KTY1TOvvPsTwAntj5ly.jpg", alt: "Frog Character" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-v9mfl41rVIjiInpuRyldxE6aLHL3c8.png", alt: "Man with Beard" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file%20(1)-S3y4yN5KXeyVZbxMmXalRSd8WGOZ1d.png", alt: "Smiling Man in White Shirt" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_w8lM6Sd_400x400-removebg-preview-o5eZstNGqHuwOKXpcKs6O9zt0tIOmC.png", alt: "Woman with Long Hair" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sq_uLO3c_400x400-removebg-preview-RXURhZFDlrV0d4lAHEh6TB39QwbRLY.png", alt: "Man with Blue Lighting" },
]

const FloatingMentor = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const gridSize = 5
  const cellSize = 100 / gridSize
  const row = Math.floor(index / gridSize)
  const col = index % gridSize

  const baseX = col * cellSize + (Math.random() * cellSize * 0.6 + cellSize * 0.2)
  const baseY = row * cellSize + (Math.random() * cellSize * 0.6 + cellSize * 0.2)

  // Check if the image is in the center area
  const isCenterArea = baseX > 30 && baseX < 70 && baseY > 30 && baseY < 70

  // Adjust position if in center area
  const adjustedX = isCenterArea ? (baseX < 50 ? baseX - 15 : baseX + 15) : baseX
  const adjustedY = isCenterArea ? (baseY < 50 ? baseY - 15 : baseY + 15) : baseY

  // Determine if the image is likely a cut-out (you may need to adjust this list)
  const cutoutImages = [
    "umar", "mooretrades", "tjr", "tori", "mason", "justin", "dante",
    "Big Gains", "Smiling Man", "Man with Straw Hat", "Man with Beard",
    "Smiling Man in White Shirt", "Woman with Long Hair", "Man with Blue Lighting"
  ]
  const isCutout = cutoutImages.some(name => alt.toLowerCase().includes(name.toLowerCase()))

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${adjustedX}%`,
        top: `${adjustedY}%`,
      }}
      animate={{
        x: [0, Math.random() * 30 - 15, 0],
        y: [0, Math.random() * 30 - 15, 0],
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: "easeInOut",
      }}
    >
      <div className={`rounded-full overflow-hidden ${isCutout ? 'bg-gray-200' : ''}`}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={`${isCutout ? 'object-contain' : 'object-cover'} w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24`}
        />
      </div>
    </motion.div>
  )
}

const ThumbOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0.1 + Math.random() * 0.1,
          }}
          animate={{
            opacity: [0.1 + Math.random() * 0.1, 0.2 + Math.random() * 0.1, 0.1 + Math.random() * 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {index % 2 === 0 ? (
            <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-sky-300" />
          ) : (
            <ThumbsDown className="w-6 h-6 sm:w-8 sm:h-8 text-sky-300" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:py-6 sm:px-6 bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RMTM%20on%20White%20V2-sBMn70MKMqrkiz9940qRxtcbvvDU1O.svg" 
          alt="RateMyTradingMentor Logo" 
          width={240} 
          height={60} 
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
      </div>
    </div>
  </header>
)

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">ratemytradingmentor.com</h3>
          <p>&copy; 2024 All rights reserved.</p>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">FAQ</a>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <a href="mailto:info@ratemytradingmentor.com" className="flex items-center hover:text-gray-300 transition-colors">
            <Mail className="w-5 h-5 mr-2" />
            <span className="break-all">info@ratemytradingmentor.com</span>
          </a>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ee5e5f58afcfb20500d8f8f1489ea191-LQsUo7XQl0noh4gdqZHrHWxXEy5deB.jpg" 
                alt="X (formerly Twitter)" 
                width={24} 
                height={24} 
                className="invert"
              />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

const EmailSignup = () => (
  <div className="mt-8">
    <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-72 bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-full py-3 px-6"
      />
      <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-indigo-600  to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Join Waitlist
      </Button>
    </form>
  </div>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 sm:pt-20">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-700 to-purple-800">
          <ThumbOverlay />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center px-4 sm:px-8 py-8 sm:py-12 max-w-2xl mx-auto bg-black bg-opacity-75 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Find Your Perfect Trading Mentor
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover, Connect, Rate.
              </motion.p>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 30px  rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.2)',
                }}
              >
                All In One Place
              </motion.p>
              <EmailSignup />
            </div>
          </div>
          <div className="absolute inset-0">
            {mentorImages.map((image, index) => (
              <FloatingMentor key={image.src} src={image.src} alt={image.alt} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}