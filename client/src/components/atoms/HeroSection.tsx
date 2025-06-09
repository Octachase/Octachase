'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useUserSlice } from '@/slices/user.slice'
import PrimaryButton from '@/components/atoms/PrimaryButton'

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

  return (
    <section className="w-full h-[75vh] md:h-[60vh] lg:h-auto lg:pt-24 bg-[url('/assets/bg-about-header.jpg')] bg-cover bg-center px-4 overflow-hidden">
      <div className="flex relative items-center w-full max-w-6xl mx-auto h-full">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating circles decoration */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#52afee] opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-[#3facff] opacity-15 blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Content */}
        <motion.div
          className="flex flex-col gap-[20px] w-[470px] h-auto -mt-24 lg:mt-0 lg:h-[600px] z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-2xl md:text-[40px] font-medium leading-[35px] md:leading-[50px]"
            variants={itemVariants}
          >
            OCTACHASE: WHERE DREAMS MEET REALITY
          </motion.h1>

          <motion.p
            className="text-[16px] opacity-80 md:text-[24px] font-light"
            variants={itemVariants}
          >
            Experience a community where you truly belong. Octachase is more
            than just a concept; it's a destination.
          </motion.p>

          <motion.div variants={itemVariants}>
            <PrimaryButton
              text={!user?._id ? 'Join Octachase' : 'My Octachase'}
              href={
                !user?._id ? '/signup' : user.isAdmin ? '/admin' : '/dashboard'
              }
              sx="!bg-[#52afee] rounded-[10px] w-full md:w-96 hover:scale-105 transition-transform"
            />
          </motion.div>

          {!user?._id && (
            <motion.div variants={itemVariants}>
              <PrimaryButton
                text={'Learn More'}
                href={'/about'}
                sx="!bg-transparent border-[1px] rounded-[10px] w-full md:w-96 hover:scale-105 transition-transform"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Animated image */}
        <motion.div
          className="w-[520px] h-[361px] absolute bottom-[-240px] right-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/assets/slider.png"
            fill
            alt="slider"
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
