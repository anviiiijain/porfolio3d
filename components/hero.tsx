import { motion } from 'framer-motion'
import { ArrowRight, FileDown } from 'lucide-react'
import Link from 'next/link'

import getConfig from 'next/config';

const { basePath } = getConfig() || '';

const Hero = () => {
  const handleDownload = () => {
    // Specify the path to your resume file
    const resumeURL = `${basePath}/Anvi_Jain_Sr_Software_Engineer.pdf`;
    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement('a')
    anchor.href = resumeURL
    anchor.download = 'Anvi_Jain_Sr_Software_Engineer.pdf' // Specify the file name
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor) // Clean up the anchor element
  }

  return (
    <div>
      <div className='relative z-10 flex h-screen w-full flex-col items-center justify-between'>
        {/* Main Content */}
        <motion.div
          className='flex flex-col items-center text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='h-20 w-2' />

          {/* Main heading */}
          <motion.h1
            className='max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Crafting Beautiful &
            <br />
            Functional{' '}
            <span className='italic font-normal'>web experiences</span>
          </motion.h1>

          {/* Introduction */}
          <motion.div
            className='mt-12 flex items-center flex-col justify-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className='w-full px-4 text-base leading-6 sm:max-w-2xl md:text-xl md:leading-8 md:max-w-3xl'>
              Hi, I&apos;m Anvi Jain, a Full Stack Developer passionate about
              building performant, user-friendly, and scalable applications.
            </p>
          </motion.div>

          {/* CTA and contact */}
          <motion.div
            className='mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href='#contact'
              className='group flex items-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-white transition-all hover:bg-gray-700'
            >
              Let&apos;s Connect
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1'>
                <ArrowRight className='h-3.5 w-3.5' />
              </span>
            </Link>

            <button
              className='flex items-center gap-2 rounded-full border border-gray-700 bg-transparent px-6 py-3 text-gray-300 transition-all hover:bg-gray-800 cursor-pointer'
              onClick={handleDownload}
            >
              <FileDown className='h-4 w-4' />
              Download Resume
            </button>
          </motion.div>
        </motion.div>

        {/* Quarter-circle dome outline with glow */}
        <div className='w-full'>
          <motion.div
            className='relative mx-auto w-full h-[15vw] mb-8'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Gradient background for glow */}
            <div
              className='absolute top-0 left-0 w-full h-[15vw]'
              style={{
                background:
                  'radial-gradient(circle, rgba(128,0,128,0.4) 0%, rgba(0,0,255,0.3) 40%, rgba(255,255,255,0) 80%)',
                borderTopLeftRadius: '150%',
                borderTopRightRadius: '150%',
                filter: 'blur(20px)', // Adds more softness to the gradient
                zIndex: 1,
              }}
            ></div>

            {/* Overlay to cover the bottom portion */}
            <div
              className='absolute -bottom-5 left-0 w-full h-[14vw] bg-black'
              style={{
                borderTopLeftRadius: '50%',
                borderTopRightRadius: '50%',
                zIndex: 2,
              }}
            ></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
