/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */


import { cn } from '@/lib/utils'
import { IconLayoutNavbarCollapse } from '@tabler/icons-react'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

import { useEffect, useRef, useState } from 'react'

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('flex gap-2 relative z-10 md:hidden mx-auto px-2', className)}>
      <button
        onClick={() => {
          console.log('click')
          setOpen((prev) => !prev)
        }}
        className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800'
      >
        <IconLayoutNavbarCollapse className='h-5 w-5 rotate-90 text-gray-500 dark:text-gray-400' />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div layoutId='nav' className=' z-50 mb-2 flex gap-2'>
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900'
                >
                  <div className='h-4 w-4'>{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const mouseX = useMotionValue(Infinity)
  const { scrollY } = useScroll() // Tracks vertical scroll position
  const [isScrolling, setIsScrolling] = useState(false)
  console.log({ scrollY })
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const unsubscribe = scrollY.onChange(() => {
      setIsScrolling(true)
      console.log('true')
      // Reset the timeout every time the scroll changes
      if (timeout) clearTimeout(timeout)

      // Set a timeout to determine when scrolling has stopped
      timeout = setTimeout(() => {
        console.log('false')

        setIsScrolling(false)
      }, 200) // Adjust this duration as needed
    })

    return () => {
      unsubscribe() // Cleanup Framer's scroll listener
      if (timeout) clearTimeout(timeout)
    }
  }, [scrollY])
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-800/40 px-4 pb-3 md:flex ',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [hovered, setHovered] = useState(false)

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800'
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className='flex items-center justify-center'
        >
          {icon}
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className='absolute -bottom-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-gray-700 dark:border-gray-900 dark:bg-gray-800 dark:text-white'
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </a>
  )
}
