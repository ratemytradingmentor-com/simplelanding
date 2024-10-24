import * as React from "react"
import { motion, useReducedMotion, AnimatePresence, useAnimation } from "framer-motion"
import Image from "next/image"
import { Mail, ThumbsUp, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, useRef, useMemo } from "react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { css, keyframes } from "@emotion/react"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
  }
`

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const shimmerAnimation = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const colorShiftAnimation = keyframes`
  0%, 100% { background-color: #000000; }
  50% { background-color: #1a1a1a; }
`

const waveAnimation = keyframes`
  0% { d: path('M0,5 Q75,4 150,5 T300,5'); }
  50% { d: path('M0,5 Q75,6 150,5 T300,5'); }
  100% { d: path('M0,5 Q75,4 150,5 T300,5'); }
`

const flowAnimation = keyframes`
  0% { stroke-dashoffset: 300; }
  100% { stroke-dashoffset: 0; }
`

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-3.585-1.446A5.075 5.075 0 0 1 14.29.531h-4.003v15.594c0 1.625-1.325 2.95-2.951 2.95a2.954 2.954 0 0 1-2.95-2.95 2.954 2.954 0 0 1 2.95-2.95c.24 0 .47.037.694.095V8.622a7.004 7.004 0 0 0-.694-.038A7.662 7.662 0 0 0 0 16.246 7.662 7.662 0 0 0 7.663 23.91a7.662 7.662 0 0 0 7.664-7.664V8.17a9.063 9.063 0 0 0 5.17 1.608V5.776c-.39 0-.78-.037-1.176-.214z" fill="currentColor"/>
  </svg>
)

const mentorImages = [
  { 
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kane_mentor-uHOTyUTUHqetRIYKCWKDNwALX0aEzo.png", 
    alt: "Kane", 
    className: "bg-white object-cover object-[center_65%]" 
  },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ttrades-DHBbQvHZVjhdz641Mtc4PRMzTYfa32.png", alt: "TTrades" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/umar-ZU5aOhaO6GPLvAWCuifQPTBCw6TmJ3.png", alt: "Umar" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mooretrades-TRIiQYwQT23qW5vJSXxZQwcMFabstY.png", alt: "Moore Trades", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tjr-eh55QyZEUd3vDG9DvO9Sve5kqeMLOI.png", alt: "TJR" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tori-hrybXGIGZ82QsJPX9CmVjaPxCLgFkT.png", alt: "Tori" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4xliving-0K77iCkjCFlAPwJcAZjzG2Xej6na26.jpg", alt: "F4X Living" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ict-G7MSpuZJvBJUnLPJnBtlCWlOa7ze1U.jpg", alt: "ICT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wieland_patrick-OYcWxU9WxP07JjlXSbinLNBqb2KcKC.png", alt: "Patrick Wieland", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mason-jIwynCjnqL1SwQkq5BWvVHJ5fd5ILT.png", alt: "Mason", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/justin-Ht6ws8nyQWCu2atIGbCu3l7MtEQRC3.png", alt: "Justin", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dante-7fRyWGwWF2KHnNAFk0JgsEyKVmPOU3.png", alt: "Dante", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OCs7W2zb_400x400-bq2QP7lWCARbzDBxtuhnXioNZlmlJ1.jpg", alt: "TraderTom" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WAdsNqKg_400x400-73F3D5zqDyjcY0bNYkh04HV9wTgbr1.jpg", alt: "Abstract Logo" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YYWaGyNp_400x400-removebg-preview-XC7hf7L0JffVPQbbhrX8u4j91qsin8.png", alt: "Big Gains", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aoZIB0CD_400x400-removebg-preview-4Gd4ZXnDsQ68LmnX8q0qQYiaZhPEq8.png", alt: "Smiling Man", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/k7fIGGig_400x400-hlYSOEl9OyNYnsBTo4mu5gHm3QAs00.jpg", alt: "Sniper" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soc6w-Ns_400x400-removebg-preview-euOeR0SJWQC8OR8rjmfFqLROtdlyWl.png", alt: "Man with Straw Hat", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3BGNdpW7_400x400-LiwO9RnLCP5KTY1TOvvPsTwAntj5ly.jpg", alt: "Frog Character" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file-v9mfl41rVIjiInpuRyldxE6aLHL3c8.png", alt: "Man with Beard", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file%20(1)-S3y4yN5KXeyVZbxMmXalRSd8WGOZ1d.png", alt: "Smiling Man in White Shirt", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_w8lM6Sd_400x400-removebg-preview-o5eZstNGqHuwOKXpcKs6O9zt0tIOmC.png", alt: "Woman with Long Hair", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sq_uLO3c_400x400-removebg-preview-RXURhZFDlrV0d4lAHEh6TB39QwbRLY.png", alt: "Man with Blue Lighting", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bSLOihgP_400x400-MgGXNNBYIiiWogryXW7knUaxZBQjEI.jpg", alt: "Lethality Logo" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%202024-10-19%2012.31.30-wbr4b0cDtGPhhKwWIIZmQcoC0QOqGT.png", alt: "Man in Black Shirt", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/k8ZB5sjB_400x400-jbBi1bcW9tUxKQi0GlrC2boSMf6ws7.jpg", alt: "Bull Market Logo" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0qYDxmB0_400x400-VEpKVgSmYbHu7KzsoN994lozzb1ts7.png", alt: "Smiling Asian Woman", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TraderNick-XFBB0M7HtDApAui3GxXCueVT8h04Z8.png", alt: "TraderNick", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_profile%20(1)-4dauEgVAKknt2BEGY890lufJyH7Anf.png", alt: "Man in Green Hoodie", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yHCwrONO_400x400-3CG2N4tbAulRwGjokde1OTf7zkAaF3.png", alt: "Zeussy", className: "bg-white" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AMTrades_profile-cxazzDMdefc6ENK916ajtkIug7anUo.png", alt: "AM Trades", className: "bg-white object-cover object-[center_top]" },
]

const FloatingMentor = React.memo(({ src, alt, index, rotation, className }: { 
  src: string; 
  alt: string; 
  index: number; 
  rotation: number; 
  className?: string 
}) => {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const totalMentors = mentorImages.length;
  const radius = 46;
  const angle = ((index / totalMentors) * 2 * Math.PI) + rotation;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);

  useEffect(() => {
    if (!shouldReduceMotion) {
      controls.start({
        x: [0, Math.random() * 5 - 2.5, 0],
        y: [0, Math.random() * 5 - 2.5, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: 10 + Math.random() * 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }
      });
    }
  }, [shouldReduceMotion, controls]);

  return (
    <motion.div
      className="absolute  z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={controls}
      whileHover={{
        scale: shouldReduceMotion ? 1 : 1.05,
        transition: {
          duration: 0.3,
          ease: 'easeInOut'
        },
      }}
    >
      <div className={`rounded-full overflow-hidden w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 shadow-lg transition-shadow duration-300 hover:shadow-xl relative ${className || ''}`}>
        <Image
          src={src}
          alt={alt}
          width={112}
          height={112}
          className={`object-cover w-full h-full transition-transform duration-300 hover:scale-110 filter brightness-110 contrast-100`}
          loading="eager"
          priority={index < 8}
        />
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.rotation === nextProps.rotation;
});

const FloatingIcons = () => {
  const iconCount = 25;
  const shouldReduceMotion = useReducedMotion()

  const icons = useMemo(() => {
    return Array.from({ length: iconCount }).map((_, index) => ({
      id: index,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: Math.random() * 16 + 24,
    }));
  }, [iconCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-white opacity-15"
          style={{
            left: `${icon.initialX}%`,
            top: `${icon.initialY}%`,
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['-2%', '2%'],
            y: ['-2%', '2%'],
            rotate: ['-3deg', '3deg'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 10 + Math.random() * 5,
              ease: 'easeInOut',
            },
            y: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 15 + Math.random() * 5,
              ease: 'easeInOut',
            },
            rotate: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 20 + Math.random() * 5,
              ease: 'easeInOut',
            },
          }}
        >
          <ThumbsUp size={icon.size} />
        </motion.div>
      ))}
    </div>
  );
};

const EmailSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email submission logic
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full sm:w-64 md:w-80 bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30"
        required
      />
      <Button 
        type="submit" 
        className="w-full sm:w-auto bg-black text-white hover:bg-gray-900 text-lg font-bold py-3 px-6 rounded-full transition-all duration-300"
        css={css`
          animation: ${glowAnimation} 2s ease-in-out infinite;
        `}
      >
        Join Waitlist
      </Button>
    </form>
  )
}

const SuggestMentorForm = ({ onClose }: { onClose: () => void }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    mentorName: '',
    communityName: '',
    socialMediaHandle: '',
    youtubeChannel: '',
    website: '',
    bestKnownFor: '',
    recommendation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', { ...formData, selectedPlatform });
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white text-gray-800 shadow-2xl rounded-lg overflow-hidden max-h-[90vh] flex flex-col">
      <CardHeader className="space-y-1 p-4 sm:p-6">
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </Button>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center leading-tight">
          Know A Great Trading Mentor?
          <br />
          Share with us!
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 overflow-y-auto flex-grow">
        <motion.form 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="mentorName" className="text-sm font-medium text-gray-700">Mentor's Name *</Label>
            <Input
              id="mentorName"
              name="mentorName"
              placeholder="Enter mentor's trading name"
              value={formData.mentorName}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="communityName" className="text-sm font-medium text-gray-700">Community Name</Label>
            <Input
              id="communityName"
              name="communityName"
              placeholder="Enter community name"
              value={formData.communityName}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socialMediaHandle" className="text-sm font-medium text-gray-700">Primary Social Media Handle *</Label>
            <div className="flex flex-col space-y-2">
              <Input
                id="socialMediaHandle"
                name="socialMediaHandle"
                placeholder="Enter social media handle"
                value={formData.socialMediaHandle}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
              />
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`${selectedPlatform === 'X' ? 'bg-purple-100 border-purple-500' : 'bg-white'} hover:bg-gray-100 text-gray-800`}
                  onClick={() => setSelectedPlatform('X')}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-x-50-BkfEB3yyMz7aMWWJ90eRGyn1aZwKBT.png"
                    alt="X (formerly Twitter)"
                    width={24}
                    height={24}
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`${selectedPlatform === 'Instagram' ? 'bg-purple-100 border-purple-500' : 'bg-white'} hover:bg-gray-100 text-gray-800`}
                  onClick={() => setSelectedPlatform('Instagram')}
                >
                  <Instagram className="h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`${selectedPlatform === 'TikTok' ? 'bg-purple-100 border-purple-500' : 'bg-white'} hover:bg-gray-100 text-gray-800`}
                  onClick={() => setSelectedPlatform('TikTok')}
                >
                  <TikTokIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtubeChannel" className="text-sm font-medium text-gray-700">YouTube Channel URL (if applicable)</Label>
            <Input
              id="youtubeChannel"
              name="youtubeChannel"
              placeholder="https://www.youtube.com/channel/..."
              value={formData.youtubeChannel}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-gray-700">Website (if applicable)</Label>
            <Input
              id="website"
              name="website"
              placeholder="https://www.example.com"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bestKnownFor" className="text-sm font-medium text-gray-700">Best Known For</Label>
            <Textarea
              id="bestKnownFor"
              name="bestKnownFor"
              placeholder="Enter what the mentor is best known for"
              value={formData.bestKnownFor}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recommendation" className="text-sm font-medium text-gray-700">Why do you recommend this mentor?</Label>
            <Textarea
              id="recommendation"
              name="recommendation"
              placeholder="Tell us why you think this mentor would be a great addition to our platform"
              value={formData.recommendation}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300"
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              type="submit" 
              className="px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-base shadow-md hover:shadow-lg"
            >
              Suggest Mentor
            </Button>
          </div>
        </motion.form>
        <p className="text-xs text-center text-gray-600 mt-4">Fields marked with * are required</p>
      </CardContent>
    </Card>
  )
}

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6 sm:py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="flex flex-col space-y-2 sm:space-y-4 items-center sm:items-start">
          <h3 className="text-base sm:text-lg font-semibold">ratemytradingmentor.com</h3>
          <p className="text-sm sm:text-base text-center sm:text-left">&copy; 2024 All rights reserved.</p>
        </div>
        <div className="flex flex-col space-y-2 sm:space-y-4 items-center sm:items-start">
          <h3 className="text-base sm:text-lg font-semibold">Contact Us</h3>
          <a
            href="mailto:info@ratemytradingmentor.com"
            className="flex items-center hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:info@ratemytradingmentor.com';
            }}
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base break-all">info@ratemytradingmentor.com</span>
          </a>
          <div className="flex space-x-4">
            <a
              href="https://x.com/rmtradingmentor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://x.com/rmtradingmentor', '_blank', 'noopener,noreferrer');
              }}
            >
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-x-50-BkfEB3yyMz7aMWWJ90eRGyn1aZwKBT.png" 
                alt="X (formerly Twitter)" 
                width={20} 
                height={20} 
                className="invert w-4 h-4 sm:w-5 sm:h-5"
              />
            </a>
            <a
              href="https://www.instagram.com/ratemytradingmentor?igsh=d252eGphNWR0cmJ0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.instagram.com/ratemytradingmentor?igsh=d252eGphNWR0cmJ0&utm_source=qr', '_blank', 'noop ener,noreferrer');
              }}
            >
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-instagram-50-RgFgFDKxBgWQ9v0Ix4gDuxI4Eyg1ic.png"
                alt="Instagram"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 invert"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default function Component() {
  const [rotation, setRotation] = useState(0);
  const shouldReduceMotion = useReducedMotion()
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      setRotation(prevRotation => (prevRotation + (delta * 0.0001)) % (2 * Math.PI));
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFormOpen(false);
      }
    };

    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-300 via-indigo-600 to-purple-800">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${poppins.className}`}>
      <header className="absolute top-0 left-0 z-50 p-4">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RMTM%20on%20White%20V2%20copy-XfSFSevaZC79V0JnJqLS1T0uTTWo8F.svg"
          alt="RateMyTradingMentor Logo" 
          width={240}
          height={60}
          className="w-auto h-6 sm:h-8 md:h-10 lg:h-12"
        />
      </header>
      <main className="flex-grow">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-300 via-indigo-600 to-purple-800">
          <div className="absolute inset-0 z-0">
            <FloatingIcons />
          </div>
          <div className="absolute inset-0" style={{ top: '5%', bottom: '5%', left: '5%', right: '5%' }}>
            {mentorImages.map((image, index) => (
              <FloatingMentor key={image.src} src={image.src} alt={image.alt} index={index} rotation={rotation} className={image.className} />
            ))}
          </div>
          <div className="relative z-30 w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="text-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-full sm:max-w-xl md:max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-purple-900 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-500">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block mb-2 sm:mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Find Your Perfect
                </motion.span>
                <br />
                <span className="relative">
                  <span className="relative z-10">Trading Mentor</span>
                  <motion.svg
                    className="absolute -bottom-1 left-0 w-full h-3 -z-10"
                    viewBox="0 0 300 10"
                    preserveAspectRatio="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.path
                      d="M0,5 Q75,5 150,5 T300,5"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      css={css`
                        animation: ${waveAnimation} 3s ease-in-out infinite;
                      `}
                    />
                  </motion.svg>
                </span>
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-blue-300 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Discover, Connect, Rate.
              </motion.p>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-6 sm:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                All In One Place
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <EmailSignup />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Suggest Mentor Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-black text-white hover:bg-gray-900 font-semibold rounded-full px-6 py-3 text-base sm:text-lg transition-all duration-300"
            css={css`
              animation: ${glowAnimation} 2s ease-in-out infinite;
            `}
          >
            Suggest a Mentor
          </Button>
        </div>

        {/* Popup Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                ref={formRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="my-8"
              >
                <SuggestMentorForm onClose={() => setIsFormOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
