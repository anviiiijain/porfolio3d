import { experienceData } from '@/data/experience'
import { skillsData } from '@/data/skills'
import { IconMapPin } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {}

const Skills = (props: Props) => {
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
  return (
    <section id='skills' className='py-10 relative z-1 grid place-items-center px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='max-w-4xl mx-auto'
          >
            <motion.div
              className='text-center mb-12'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex flex-col items-center text-center gap-2'>
                <motion.p className=' font-thin tracking-widest'>
                  WHAT DO I KNOW
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, type: 'tween', duration: 0.2 }}
                  className='bg-gradient-to-br from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent text-4xl font-semibold tracking-wide'
                >
                  Tech Stack
                </motion.h2>
              </div>
            </motion.div>
            <div
              ref={containerRef}
              className='relative flex flex-wrap justify-center gap-5'
              style={{ position: 'relative' }}
            >
              {/* Hover highlight */}
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.075 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className='absolute rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 pointer-events-none'
                    style={{
                      left: highlightStyle.left,
                      top: highlightStyle.top,
                      width: highlightStyle.width,
                      height: highlightStyle.height,
                      zIndex: 0,
                    }}
                  />
                )}
              </AnimatePresence>

              {skillsData.map(({ name, icon: Icon, color }, index) => (
                <motion.div
                key={name}
                initial={{opacity:0,x:10,y:10}}
                whileInView={{opacity:1,x:0,y:0}}
                transition={{type:'tween',delay:0.025*index}}
                >

                <motion.span
                  key={name}
                  ref={(el) => {
                    pillRefs.current[index] = el // Correctly assign the ref without returning it
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className='flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer select-none bg-gray-900 text-white shadow-sm relative z-10'
                  whileHover={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon color={color} size={20} />
                  {name}
                </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
  )
}

export default Skills