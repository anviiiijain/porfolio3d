'use client'
import AboutMe from '@/components/about'
import ContactSection from '@/components/contact'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Skills from '@/components/skills'
import { FloatingDock } from '@/components/ui/floating-nav'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconHome,
  IconMail,
  IconUser
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const links = [
  {
    title: 'Home',
    icon: (
      <IconHome className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: '',
  },
  {
    title: 'About',
    icon: (
      <IconUser className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: '#about',
  },
  {
    title: 'Skills',
    icon: (
      <IconCode className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: '#skills',
  },
  {
    title: 'Contact',
    icon: (
      <IconMail className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: '#contact',
  },
  {
    title: 'GitHub',
    icon: (
      <IconBrandGithub className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: 'https://github.com/anviiiijain',
  },
  {
    title: 'LinkedIn',
    icon: (
      <IconBrandLinkedin className='h-full w-full text-gray-500 dark:text-gray-300' />
    ),
    href: 'https://www.linkedin.com/in/anviiiijain/',
  },
]

const HeroSection = () => {
  const mountRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)
  const animationFrameRef = useRef<any>(null)
  const mouseRef = useRef<any>({ x: 0, y: 0 })
  const containerRef = useRef<any>(null)
  const targetMouseRef = useRef<any>({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aayushbharti.in')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  useEffect(() => {
    if (!mountRef.current) return
    if (!containerRef.current) return
    // Scene setup
    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, containerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    sceneRef.current = { scene, camera, renderer }

    // Create moving particles
    const particlesGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const particlesCount = 7000
    const positions = new Float32Array(particlesCount * 3)
    const velocities = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200
      positions[i + 1] = (Math.random() - 0.5) * 200
      positions[i + 2] = (Math.random() - 0.5) * 200

      velocities[i] = (Math.random() - 0.5) * 0.05
      velocities[i + 1] = (Math.random() - 0.5) * 0.05
      velocities[i + 2] = (Math.random() - 0.5) * 0.05
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    particlesGeometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocities, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.3,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 50

    // Mouse interaction
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Smooth mouse following
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.075
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.075

      // Move camera based on mouse position (parallax effect)
      camera.position.x = mouseRef.current.x * 10
      camera.position.y = mouseRef.current.y * 5
      camera.lookAt(0, 0, 0)

      // Update particles with normal movement only
      const positions = particles.geometry.attributes.position.array
      const velocities = particles.geometry.attributes.velocity.array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Wrap around screen
        if (positions[i] > 150) positions[i] = -150
        if (positions[i] < -150) positions[i] = 150
        if (positions[i + 1] > 150) positions[i + 1] = -150
        if (positions[i + 1] < -150) positions[i + 1] = 150
      }

      particles.geometry.attributes.position.needsUpdate = true

      // Very subtle rotation
      particles.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className='relative h-screen w-screen bg-black overflow-y-auto overflow-x-hidden'>
      {/* Three.js Background */}
      <div ref={mountRef} className='absolute inset-0 z-0 w-0' />

      <div className='absolute top-2 lg:flex items-center justify-center h-[7rem] w-full'>
        <FloatingDock
          mobileClassName='translate-y-5' // only for demo, remove for production
          items={links}
        />
      </div>
      <div className='h-[7rem]'></div>
      <div ref={containerRef}>
        <Hero />
        <AboutMe />
        <Skills />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}

export default HeroSection
