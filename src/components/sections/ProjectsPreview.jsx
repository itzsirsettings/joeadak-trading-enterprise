import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, Briefcase } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { Card, CardContent } from '@/components/ui/Card'

const projects = [
  {
    id: 1,
    title: 'Community Development Initiative',
    category: 'Community Projects',
    description: 'Coordinated a comprehensive community development program reaching over 500 residents across multiple districts.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    stats: '500+ Residents',
    icon: Users,
  },
  {
    id: 2,
    title: 'Corporate Event Management',
    category: 'Events',
    description: 'Successfully planned and executed a 200-person corporate conference with seamless coordination.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    stats: '200+ Attendees',
    icon: Calendar,
  },
  {
    id: 3,
    title: 'Business Process Optimization',
    category: 'Business Projects',
    description: 'Streamlined operations for a mid-sized enterprise, achieving significant efficiency improvements.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    stats: '40% Efficiency Boost',
    icon: Briefcase,
  },
]

const ProjectCard = ({ project, index }) => {
  const Icon = project.icon

  return (
    <StaggerItem animation="scaleUp">
      <Link to="/projects">
        <Card 
          variant="lifted" 
          className="group min-h-[16rem] cursor-pointer hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gold"
        >
          <CardContent className="flex flex-col h-full justify-between p-0">
            <div className="relative h-32 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepBlue/90 via-deepBlue/20 to-transparent"></div>
              
              <motion.span
                className="absolute top-3 left-3 bg-gold text-deepBlue text-[10px] font-semibold px-3 py-1 shadow-lg flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-2 h-2" />
                {project.category}
              </motion.span>

              <motion.div
                className="absolute bottom-3 right-3 bg-iceBlue/95 backdrop-blur-sm text-deepBlue text-xs font-bold px-3 py-1 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {project.stats}
              </motion.div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-bold text-deepBlue mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-gold text-xs font-semibold group-hover:gap-3 transition-all">
                <span>View Details</span>
                <motion.i
                  className="fas fa-arrow-right text-[10px]"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </StaggerItem>
  )
}

const ProjectsPreview = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-12 lg:py-16 bg-white" ref={ref}>
      <div className="container-custom">
        <ScrollReveal animation="fadeDown">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 text-xs font-semibold mb-4">
              <i className="fas fa-folder-open"></i>
              Our Portfolio
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-deepBlue mb-4">
              Featured <span className="text-gold">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Our work speaks for itself – see how we help organizations and communities achieve their goals.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1}>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </ul>
        </StaggerContainer>

        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="text-center mt-10">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 bg-gold text-deepBlue font-semibold px-6 py-3 transition-all duration-300 hover:bg-yellow-500 hover:shadow-gold"
            >
              <span>View All Projects</span>
              <motion.i
                className="fas fa-arrow-right text-sm"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ProjectsPreview
