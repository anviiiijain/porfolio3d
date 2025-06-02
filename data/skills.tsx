import { Code } from 'lucide-react'
import { BsGraphUp } from 'react-icons/bs'
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaFigma,
  FaAws,
} from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiMongodb, SiPostgresql, SiTypescript, SiJavascript, SiJest, SiCypress, SiGo, SiSequelize, SiPostman, SiFirebase, SiVercel, SiWebpack, SiGulp, SiReactquery, SiD3Dotjs, SiThreedotjs, SiChakraui, SiElectron } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

export const skillsData = [
  { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
  { name: "NextJS", icon: SiNextdotjs, color: "#000000" },
  { name: "ElectronJS", icon: SiElectron, color: "#47848F" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "NodeJS", icon: FaNodeJs, color: "#339933" },
  { name: "ExpressJS", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Sequelize", icon: SiSequelize, color: "#52B0E7" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Jest", icon: SiJest, color: "#C21325" },
  { name: "Cypress", icon: SiCypress, color: "#17202C" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#181717" },
  { name: "GitLab", icon: FaGitlab, color: "#FC6D26" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "VS Code", icon: VscCode, color: "#007ACC" },
  { name: "Webpack", icon: SiWebpack, color: "#8DD6F9" },
  { name: "Gulp", icon: SiGulp, color: "#CF4647" },
  { name: "React Query", icon: SiReactquery, color: "#FF4154" },
  { name: "Recharts", icon: BsGraphUp, color: "#FF7300" }, // no official Recharts icon; using D3.js icon for placeholder
  { name: "D3.js", icon: SiD3Dotjs, color: "#F9A03C" },
  { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
  { name: "Cursor", icon: Code, color: "#FF9900" }, 
  { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
]