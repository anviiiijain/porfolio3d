/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Calendar } from 'lucide-react'
import {
  IconBrandGithub,
  IconBrandGmail,
  IconBrandInstagram,
  IconBrandLinkedin,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useForm } from '@formspree/react'
import { FaSpinner } from 'react-icons/fa'

const ContactSection = () => {
  const [selectedTab, setSelectedTab] = useState<'Quick' | 'Message'>('Quick')
  const [state, handleSubmit] = useForm('xzzrqgga')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (state.succeeded) {
      console.log('sucess')
      setLoading(false)
    } else if (state.submitting) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [state])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    ;(window as any).Calendly?.initPopupWidget({
      url: 'https://calendly.com/anvijain25/30min?hide_event_type_details=1&hide_gdpr_banner=1',
    })
  }

  return (
    <div
      id='contact'
      className='relative z-1 bg-black text-white px-8 my-8 lg:my-32 rounded-xl shadow-lg max-w-2xl mx-auto'
    >
      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className='flex justify-center mb-6'
      >
        <button
          className={cn(
            {
              'text-white bg-gray-800/40': selectedTab === 'Quick',
              'hover:text-white text-gray-400 bg-gray-700':
                selectedTab !== 'Quick',
            },
            'px-4 py-2 text-sm font-medium rounded-l-md focus:outline-none border border-gray-700 transition-colors duration-300'
          )}
          onClick={() => setSelectedTab('Quick')}
        >
          Quick connect
        </button>
        <button
          className={cn(
            {
              'text-white bg-gray-800/40': selectedTab === 'Message',
              'hover:text-white text-gray-400 bg-gray-700':
                selectedTab !== 'Message',
            },
            'px-4 py-2 text-sm font-medium rounded-r-md focus:outline-none border border-gray-700 transition-colors duration-300'
          )}
          onClick={() => setSelectedTab('Message')}
        >
          Send a message
        </button>
      </motion.div>

      {/* Social Icons */}
      <div className='flex justify-center space-x-6 mb-6 relative z-10'>
        {[
          {
            Icon: IconBrandLinkedin,
            link: 'https://www.linkedin.com/in/anviiiijain/',
          },
          { Icon: IconBrandGithub, link: 'https://github.com/anviiiijain' },
          {
            Icon: IconBrandInstagram,
            link: 'https://www.instagram.com/anviiiijain/',
          },
          { Icon: IconBrandGmail, link: 'mailto:anvijain250102@gmail.com' },
        ].map(({ Icon, link }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: 'tween', delay: 0.05 * index }}
          >
            <a href={link} target='_blank' rel='noreferrer'>
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                key={index}
              >
                <Icon className='cursor-pointer' />
              </motion.div>
            </a>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', delay: 0.2 }}
        >
          {selectedTab === 'Quick' ? (
            <motion.div
              key='quick'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Quick Connect Section */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                {/* Email Section */}
                <a href='mailto:anvijain250102@gmail.com'>
                  <div className='bg-gray-800/40 rounded-lg'>
                    <div className='mb-2 flex gap-x-3 border-b border-neutral-700/30 bg-gradient-to-r to-transparent p-4 from-blue-900/20'>
                      <Mail className='text-blue-500' />
                      <h4 className='ml-2 font-semibold'>Email</h4>
                    </div>
                    <div className='p-4'>
                      <p className='text-gray-400 mb-1'>
                        anvijain250102@gmail.com
                      </p>
                      <p className='text-sm text-gray-500'>
                        Send me an email directly
                      </p>
                    </div>
                  </div>
                </a>

                {/* Schedule Section */}
                <a onClick={handleClick} className='cursor-pointer'>
                  <div className='bg-gray-800/40 rounded-lg'>
                    <div className='flex gap-x-3 border-b border-neutral-700/30 bg-gradient-to-r to-transparent p-4 from-purple-900/20'>
                      <Calendar className='text-purple-500' />
                      <h4 className='ml-2 font-semibold'>Schedule</h4>
                    </div>
                    <div className='p-4'>
                      <p className='text-gray-400 mb-1'>Book a time slot</p>
                      <p className='text-sm text-gray-500'>
                        Book a call on my calendar
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Availability Status */}
              <div className='mt-4 flex gap-2 items-center justify-center rounded-md border border-green-900/50 bg-green-900/10 p-2.5 text-center text-sm text-green-300'>
                <motion.div
                  className='rounded-full bg-green-500 w-4 h-4'
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                Currently available for new opportunities
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='message'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input
                    disabled={loading}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Your name'
                    className='w-full px-4 py-2 text-sm bg-gray-800/40 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    disabled={loading}
                    id='email'
                    name='email'
                    type='email'
                    placeholder='your.email@example.com'
                    className='w-full px-4 py-2 text-sm bg-gray-800/40 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <textarea
                  disabled={loading}
                  id='message'
                  name='message'
                  rows={4}
                  placeholder='What would you like to discuss?'
                  className='w-full px-4 py-2 text-sm bg-gray-800/40 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                ></textarea>
                <button
                  disabled={loading}
                  type='submit'
                  className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-300 cursor-pointer'
                >
                  {loading && <FaSpinner className='w-4 h-4 animate-spin' />}
                  Send message
                </button>
              </form>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ContactSection
