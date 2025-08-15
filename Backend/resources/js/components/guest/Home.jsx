import React, { useEffect, useState } from 'react'
import '../../index.css'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import { FiMusic, FiBriefcase, FiBook, FiMail, FiPhone, FiMapPin, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import {
    useGetUserDetailsQuery,
    useGetTechnologiesQuery,
    useGetProjectsQuery,
    useStoreMessageMutation,
} from '@/services/api/portfolioApi'
import LoadingScreen from '@/components/LoadingScreen'
import getImageSrc from '@/utils/getImageSrc'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useForm } from 'react-hook-form'
import { notify, notifyError } from '@/utils/notify'

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            },
        },
    ],
}
// Fake data
const floatingSnippets = [
    '// Establishing connection...',
    '// Listening for real-time updates...',
    '// Compiling modules...',
    '// Synchronizing data streams...',
    '// Fetching live API responses...',
    '// Rendering interactive UI...',
    '// Deploying new features...',
    '// Updating build status...',
    '// Monitoring server logs...',
    '// Testing code in real-time...',
]

const experiences = [
    {
        id: 1,
        company: 'AlocaSpace Pvt. Ltd. | Mid Baneshwor, Kathmandu, Nepal',
        role: 'Full Stack Engineer',
        duration: 'Feb 2025 – Now',
        description: [
            'Engineered software developments addressing needs to build website for booking platform with Laravel and Next.js.',
            'Analyzed system bottlenecks and implemented optimizations, significantly increasing performance and seo.',
        ],
    },
    {
        id: 2,
        company: 'Bidhee Pvt. Ltd. | Purano Baneshwor, Kathmandu, Nepal',
        role: 'Lead Backend Engineer',
        duration: 'Feb 2023 – August 2024',
        description: [
            'Engineered software developments addressing needs of HRMS, OMS, CMS, and CRM.',
            'Collaborated with cross-functional teams to identify user requirements and deliver customized solutions.',
            'Analyzed system bottlenecks and implemented optimizations, significantly increasing processing speed.',
        ],
    },
    {
        id: 3,
        company: '111IT | Australia (Remote)',
        role: 'Mid-Level Laravel Developer',
        duration: 'August 2021 - June 2022',
        description: [
            'Collaborated on real estate projects to resolve issues and ensure completion.',
            'Mentored junior developer throughout project development.',
        ],
    },
    {
        id: 4,
        company: 'View9 | Sankhamul, Kathmandu, Nepal',
        role: 'Junior Laravel Developer',
        duration: 'April 2020 - December 2020',
        description: [
            'Engineered multiple projects incorporating conventions such as remittance systems, ticket bookings, and e-commerce websites',
            'Collaborated on integration of Moneygram Remit API and F1Soft Digital Wallet API.',
            'Integrated third-party services and APIs, enhancing application capabilities and user experience.',
        ],
    },
]

const education = [
    {
        id: 1,
        institution: 'Herald College | Kathmandu, Nepal',
        degree: 'BIT(Hons) in Software Engineering',
        duration: '2017 - 2020',
        achievements: [
            'Graduated with First Class Honors',
            'Final Year Research Project on Number Plate Recognition System for Vehicles of Nepal',
        ],
    },
    {
        id: 2,
        institution: 'Uniglobe HSS | Kathmandu, Nepal',
        degree: '+2 in Management',
        duration: '2015 - 2017',
        achievements: ['Graduated with First Division'],
    },
    {
        id: 3,
        institution: 'Paragon Public School | Kathmandu, Nepal',
        degree: 'SLC',
        duration: '2014',
        achievements: ['Graduated with First Division'],
    },
]

const testimonials = [
    // {
    //     id: 1,
    //     name: 'John Doe',
    //     role: 'CTO at Tech Corp',
    //     avatar: 'https://i.pravatar.cc/150?img=1',
    //     quote: 'Exceptional developer who delivered beyond our expectations.',
    // },
]

const Home = () => {
    const [showWelcome, setShowWelcome] = useState(true)
    const [spotifyMinimized, setSpotifyMinimized] = useState(true)
    const [windowHeight, setWindowHeight] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)
    const [current_date, setCurrentDate] = useState(null)
    const [current_year, setCurrentYear] = useState(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const {
        data: user = {
            name: '',
            address: '',
            email: '',
            contact_number: '',
            bio: '',
            profile_picture: '',
            social_links: [],
        },
        isLoadingUserDetails,
        isErrorUserDetails,
    } = useGetUserDetailsQuery()

    const [storeMessage, { isLoading: isSubmitting }] = useStoreMessageMutation()

    const {
        data: technologies = [],
        isLoadingTechnologies,
        isSuccessTechnologies,
        isErrorTechnologies,
    } = useGetTechnologiesQuery()
    const { data: projects = [], isLoadingProjects, isSuccessProjects, isErrorProjects } = useGetProjectsQuery()

    // Fix for window object reference
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentDate(Date.now())
            setCurrentYear(new Date().getFullYear())
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
            const timer = setTimeout(() => {
                window.scrollTo(0, 0)
                setShowWelcome(false)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [])

    const submitHandler = async (data) => {
        try {
            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('contact_number', data.contact_number)
            formData.append('email', data.email)
            formData.append('message', data.message)

            await storeMessage(formData).unwrap()
            reset({
                name: '',
                contact_number: '',
                email: '',
                message: '',
            })
            notify('Message sent successfully!')
        } catch (err) {
            notifyError()
        }
    }

    // Particles initialization
    const particlesInit = async (engine) => {
        await loadFull(engine)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 overflow-hidden cursor-pointer">
            {/* Welcome Animation */}
            {showWelcome && (
                <motion.div
                    className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="text-center"
                    >
                        <TypeAnimation
                            sequence={['Welcome to my Portfolio Website!', 4000]}
                            wrapper="div"
                            className="text-2xl text-gray-400"
                        />
                    </motion.div>
                </motion.div>
            )}
            {/* Animated Particles Background */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-0">
                <Particles
                    init={particlesInit}
                    options={{
                        particles: {
                            number: { value: 50 },
                            size: { value: 3 },
                            move: { speed: 1 },
                        },
                        interactivity: {
                            events: {
                                onhover: { enable: true, mode: 'repulse' },
                            },
                        },
                    }}
                />
            </motion.div>

            {/* Floating Code Snippets */}
            <div className="absolute inset-0 z-10 pointer-events-none h-screen overflow-hidden">
                {floatingSnippets.map((snippet, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: -100,
                            x: Math.random() * windowWidth,
                        }}
                        animate={{
                            y: windowHeight + 100,
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="text-xs text-green-400 opacity-50 absolute"
                        style={{
                            left: 0,
                            maxWidth: '90vw',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {`${snippet}`}
                    </motion.div>
                ))}
            </div>
            {/* Hero Section */}
            <motion.section
                className="relative h-screen flex items-center justify-center text-center px-6 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="space-y-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-30" />
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 relative">
                                <span className="text-indigo-600">Digitalizing</span> ideas, one line of{' '}
                                <span className="text-green-600">code</span> at a time.
                            </h1>
                        </div>
                    </motion.div>

                    <TypeAnimation
                        sequence={[
                            'Full Stack Developer 💻',
                            2000,
                            'Laravel Specialist ⚙️',
                            2000,
                            'React Enthusiast ⚛️',
                            2000,
                            'Freelance Developer 🎨',
                            2000,
                            'Part Time Gamer 🎮',
                            2000,
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        className="text-2xl md:text-3xl text-indigo-400"
                    />

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        <a
                            href="#about"
                            className="bg-indigo-500 text-white mx-2 px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/30"
                        >
                            About Me →
                        </a>
                    </motion.div>

                    {projects.length ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                            <a
                                href="#projects"
                                className="bg-indigo-500 text-white mx-2 px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/30"
                            >
                                Featured Projects →
                            </a>
                        </motion.div>
                    ) : null}
                </div>
            </motion.section>
            {/* About Me Section */}
            <motion.section
                id="about"
                className="py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative">
                    {/* Image Section with enhanced animations */}
                    <motion.div
                        className="relative group w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
                        initial={{ scale: 0, rotate: 15 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 0.8,
                            type: 'spring',
                            stiffness: 120,
                            damping: 15,
                        }}
                        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    >
                        {/* Floating animation on hover */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                y: [-5, 5, -5],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            {/* Dynamic gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img
                                src={getImageSrc(user.profile_picture)}
                                alt="About Me"
                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>

                        {/* Animated border */}
                        <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500/30 transition-all duration-500 rounded-2xl" />
                    </motion.div>

                    {/* Bio and Technologies */}
                    <motion.div
                        className="flex-1 space-y-8"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="inline-block relative"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 120,
                                delay: 0.5,
                            }}
                        >
                            {/* Gradient text with animated underline */}
                            <div className="relative">
                                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {user.name}
                                </h1>
                            </div>
                            <motion.div
                                className="absolute bottom-4 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            />
                        </motion.div>

                        <motion.p
                            className="text-gray-300 text-lg leading-relaxed font-light max-w-3xl"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {user.bio}
                        </motion.p>

                        {technologies && technologies.length ? (
                            <>
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    Tools That Help Me Bring Ideas to Life
                                </h3>

                                <motion.div
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-100px' }}
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.1 } },
                                    }}
                                >
                                    {technologies?.map((tech) => (
                                        <motion.div
                                            key={tech.id}
                                            className="h-24 relative group"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 120,
                                            }}
                                        >
                                            {/* Hover effect container */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />

                                            <motion.div
                                                className="h-full rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-indigo-400/30 group-hover:bg-white/10"
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotate: Math.random() * 4 - 2, // Random slight rotation between -2 and 2 degrees
                                                }}
                                            >
                                                {/* Shine effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%]" />

                                                {tech.icon ? (
                                                    <motion.img
                                                        src={getImageSrc(tech.icon)}
                                                        alt={tech.name}
                                                        className="w-12 h-12 mb-2 object-contain transform group-hover:scale-110 transition-transform"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 flex items-center justify-center mb-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                                                        <span className="text-white font-bold">
                                                            {tech.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                                <p className="text-indigo-300 text-sm font-medium tracking-wide">
                                                    {tech.name}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </>
                        ) : (
                            <></>
                        )}
                    </motion.div>
                </div>
            </motion.section>
            {/* Animated Terminal Section */}
            <motion.section
                className="relative py-20 px-6 bg-gray-800/50 backdrop-blur-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="terminal-window bg-gray-900 rounded-lg shadow-2xl">
                        <div className="terminal-header bg-gray-800 p-4 rounded-t-lg flex items-center">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                        </div>
                        <div className="p-6 font-mono">
                            <span className="text-green-400">$</span> npm run dev
                            <br />
                            <span className="text-blue-400"> Ready on http://localhost:3000</span>
                            <br />
                            <TypeAnimation
                                sequence={[
                                    '// Building awesome projects...',
                                    2000,
                                    '// Deploying to production...',
                                    2000,
                                ]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                                className="text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>
            {/* Spotify Player Integration */}
            <motion.section
                className="fixed bottom-4 right-4 z-50"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
                    <div className="flex items-center px-4 pt-2">
                        <FiMusic className="text-indigo-400 mr-2" />
                        <span className="text-sm text-gray-300">Listen to my Playlist</span>
                        <button onClick={() => setSpotifyMinimized(!spotifyMinimized)} className="ml-auto">
                            {' '}
                            {spotifyMinimized ? <FiMaximize2 /> : <FiMinimize2 />}{' '}
                        </button>
                    </div>
                    <iframe
                        src={`https://open.spotify.com/embed/playlist/5OK0hjuX1Wt98mnHcxkNQG?utm_source=generator&theme=0${
                            current_date ? `&refresh=${current_date}` : ''
                        }`}
                        width="300"
                        height={spotifyMinimized ? '80' : '380'}
                        allowtransparency="true"
                        allow="autoplay;encrypted-media"
                        style={{ borderRadius: '8px' }}
                        className="mt-2"
                    ></iframe>
                </div>
            </motion.section>
            {/* Work Experience Section */}
            <motion.section
                className="py-20 px-6 relative bg-gray-900/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                        <FiBriefcase className="text-indigo-400" /> Work Experience
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-lg border border-gray-700 hover:border-indigo-500 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                                        <p className="text-indigo-400 text-lg">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-400">{exp.duration}</span>
                                </div>
                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300">
                                            <span className="text-indigo-400 mt-1">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            {/* Education Section */}
            <motion.section
                className="py-20 px-6 relative bg-gray-800/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                        <FiBook className="text-indigo-400" /> Education
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-lg border border-gray-700 hover:border-indigo-500 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                                        <p className="text-indigo-400 text-lg">{edu.institution}</p>
                                    </div>
                                    <span className="text-gray-400">{edu.duration}</span>
                                </div>
                                <ul className="space-y-2">
                                    {edu.achievements.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300">
                                            <span className="text-indigo-400 mt-1">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            {/* Projects Section */}
            {projects && projects.length > 0 ? (
                <>
                    <motion.section
                        id="projects"
                        className="py-20 px-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                            <Slider {...sliderSettings} className="px-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="px-3 py-3">
                                        <motion.div
                                            whileHover={{ y: -10 }}
                                            className="project-card relative bg-gray-900 rounded-2xl p-8 overflow-hidden h-full"
                                            style={{ minHeight: '400px' }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-30" />
                                            <div className="relative z-10 flex flex-col justify-between h-full">
                                                <div className="mb-6">
                                                    {project.image ? (
                                                        <motion.img
                                                            src={getImageSrc(project.image)}
                                                            alt={project.title}
                                                            className="w-full h-48 mb-4 object-cover transform group-hover:scale-110 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-48 bg-indigo-500/10 rounded-lg mb-4 flex items-center justify-center">
                                                            <span className="text-white font-bold text-4xl">
                                                                {project.title.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                                    <p className="text-gray-400">{project.description}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies?.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm border border-gray-700 hover:border-indigo-500 transition-all"
                                                        >
                                                            {tech.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </motion.section>
                </>
            ) : (
                <></>
            )}
            {/* Testimonials Section */}
            {testimonials && testimonials.length ? (
                <>
                    <section className="py-20 px-6 relative bg-gray-800/50">
                        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-lg border border-gray-700 hover:border-indigo-500 transition-all"
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            className="w-12 h-12 rounded-full mr-4"
                                            alt={testimonial.name}
                                        />
                                        <div>
                                            <h3 className="font-bold">{testimonial.name}</h3>
                                            <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">"{testimonial.quote}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <></>
            )}
            {/* Contact Me Section */}
            <motion.section
                className="py-20 px-6 bg-gray-900/50 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        type="text"
                                        className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors.name?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Contact Number</label>
                                    <input
                                        {...register('contact_number', { required: 'Contact Number is required' })}
                                        type="text"
                                        className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors.contact_number?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.contact_number.message}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.email?.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    {...register('message', { required: 'Message is required' })}
                                    className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                                {errors.message?.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
                            >
                                Send Message
                            </motion.button>
                        </form>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/20 rounded-lg">
                                    <FiMapPin className="text-indigo-400 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Location</h3>
                                    <p className="text-gray-400">{user.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/20 rounded-lg">
                                    <FiMail className="text-indigo-400 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                                    <p className="text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/20 rounded-lg">
                                    <FiPhone className="text-indigo-400 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                                    <p className="text-gray-400">+977 {user.contact_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400 text-sm">
                        © {current_year} {user.name}. All rights reserved.
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

export default Home
