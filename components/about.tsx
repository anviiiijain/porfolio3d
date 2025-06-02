import { experienceData } from '@/data/experience'
import { skillsData } from '@/data/skills'
import { IconMapPin } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function AboutMe() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number
    top: number
    width: number
    height: number
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  // refs for each pill
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (
      hoveredIndex !== null &&
      pillRefs.current[hoveredIndex] &&
      containerRef.current
    ) {
      const pill = pillRefs.current[hoveredIndex]
      const container = containerRef.current
      if (pill && container) {
        const pillRect = pill.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        setHighlightStyle({
          left: pillRect.left - containerRect.left,
          top: pillRect.top - containerRect.top,
          width: pillRect.width,
          height: pillRect.height,
        })
      }
    } else {
      setHighlightStyle({ left: 0, top: 0, width: 0, height: 0 })
    }
  }, [hoveredIndex])
  return (
    <section id='about' className='relative bg-black z-10 grid place-items-center min-h-screen'>

    <div  className=' text-white px-6 py-12 md:px-12 lg:px-24'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className='flex flex-col items-center text-center gap-2'>
            <motion.p className=' font-thin tracking-widest'>
              GET TO KNOW ME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, type: 'tween', duration: 0.2 }}
              className='bg-gradient-to-br from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent text-5xl font-semibold tracking-wide'
            >
              About Me
            </motion.h2>
          </div>
        </motion.div>

        <div className='flex max-lg:flex-col  w-full mx-auto'>
          {/* Left Section */}
          <motion.div className='lg:text-left lg:w-1/3 lg:max-w-3xl text-center flex flex-col items-center gap-3 pt-6 lg:px-6 '>
            <motion.img
              initial={{ opacity: 0, x: -50, y: 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7 }}
              src='/about-me.jpg'
              alt='Profile'
              className='rounded-full mx-auto lg:mx-0 w-48 h-48 object-cover'
            />
            <motion.p
              initial={{ opacity: 0, x: -50, y: 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, staggerChildren: 0.1 }}
              className='text-neutral-100 border-b border-neutral-600 py-4'
            >
              I&apos;m a passionate Developer who loves building dynamic,
              user-friendly applications. I thrive on solving problems, creating
              seamless experiences, and continuously expanding my skills. Always
              eager to learn and grow, I&apos;m currently looking for new
              opportunities to contribute and innovate.
            </motion.p>
            <div className='flex items-center justify-center lg:justify-start mt-6'>
              <span className='text-gray-400 flex gap-2 items-center'>
                <IconMapPin className='w-4' /> India
              </span>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div className='lg:w-2/3 p-2 lg:p-6 space-y-4 lg:border-l lg:border-neutral-600'>
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7 }}
              className='mb-6 max-w-xl'
            >
              <h2 className='text-xl font-semibold'>Experience</h2>
              {experienceData.map((exp, index) => (
                <div className='mt-4' key={index}>
                  <p className='font-bold'>{exp.company}</p>
                  <div className='flex gap-2 items-center w-full justify-between'>
                    <p>{exp.role}</p>
                    <p className='text-gray-400'>
                      {exp.duration} | {exp.location}
                    </p>
                  </div>
                  <ul className='list-disc list-inside mt-2'>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    </section>
  )
}
