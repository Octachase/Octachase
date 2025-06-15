'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useUserSlice } from '@/slices/user.slice'
import PrimaryButton from '@/components/atoms/PrimaryButton'
import { FaPlay, FaTimes } from 'react-icons/fa'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.7,
    },
  },
}

const imageVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 1,
      delay: 0.5,
    },
  },
}

const HeroSection = () => {
  const user = useSelector(useUserSlice)
  const [showVideoModal, setShowVideoModal] = useState(false)

  const openVideoModal = () => {
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
  }

  return (
    <>
      <section className="w-full h-[75vh] md:h-[60vh] lg:h-auto lg:pt-24 px-4 overflow-hidden relative">
        {/* Video background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dri5fv9hr/video/upload/v1750023081/mfnghxyqq4dp2vs3nboc.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video doesn't load */}
            <Image
              src="/assets/bg-about-header.jpg"
              fill
              alt="Background fallback"
              className="object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="flex relative items-center w-full max-w-6xl mx-auto h-full ">
          <div className="flex items-center justify-between w-full">
            {/* Content */}
            <motion.div
              className="flex flex-col gap-[20px] w-[470px] h-auto -mt-24 lg:mt-0 lg:h-[600px] "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute bottom-[170px] left-0 space-y-5">
                <motion.h1
                  className="text-2xl md:text-[70px] font-bold font-inter leading-[35px] md:leading-[70px] "
                  variants={itemVariants}
                >
                  Reliable, <br />
                  strong, better <br /> than your average
                  <br /> crypto <br />
                  investment
                </motion.h1>

                {/* Play Button and CTA Button Container */}
                <motion.div
                  className="flex items-center gap-4"
                  variants={itemVariants}
                >
                  {/* Primary Button */}
                  <PrimaryButton
                    text={!user?._id ? 'Join Dextachase' : 'My Dextachase'}
                    href={
                      !user?._id
                        ? '/signup'
                        : user.isAdmin
                        ? '/admin'
                        : '/dashboard'
                    }
                    sx="!bg-[#52afee] rounded-[10px] w-full md:w-96 hover:scale-105 transition-transform"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Play Button */}
            <button
              onClick={openVideoModal}
              className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
              aria-label="Play video"
            >
              <FaPlay className="text-white text-xl ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Animated image */}
          <div className="w-[520px] h-[361px] absolute bottom-[-240px] right-0">
            <Image
              src="/assets/slider.png"
              fill
              alt="slider"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              aria-label="Close video"
            >
              <FaTimes />
            </button>

            {/* Video Player */}
            <video className="w-full h-full" controls autoPlay playsInline>
              <source
                src="https://res.cloudinary.com/dri5fv9hr/video/upload/v1750023515/nk6fkjpp3rqe4dqtjjp1.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  )
}

export default HeroSection
