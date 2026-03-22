import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ProjectLightbox from '../components/ui/ProjectLightbox'
import { client, urlFor } from '../lib/sanityClient'

const categories = ['All', 'Community Projects', 'Business Projects', 'Events']

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] {
          _id,
          title,
          category,
          description,
          image,
          client,
          completionDate
        }`
        const data = await client.fetch(query)
        
        // Map sanity data to match expected frontend props
        const mappedData = data.map(doc => ({
          id: doc._id,
          title: doc.title,
          category: doc.category,
          description: doc.description,
          fullDescription: doc.description || "Detailed description coming soon.",
          image: doc.image ? urlFor(doc.image).width(800).url() : 'https://images.unsplash.com/photo-1542744094-24638ea0e56c?w=800',
          clientType: doc.client || 'Internal',
          duration: doc.completionDate ? new Date(doc.completionDate).getFullYear().toString() : 'Ongoing',
          tags: [doc.category] // Map category to tags array to prevent crashes
        }))

        setAllProjects(mappedData)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === activeFilter)

  return (
    <>
      <Helmet>
        <title>Our Projects – JOEADAK TRADING ENTERPRISE</title>
        <meta name="description" content="See the impactful projects completed by JOEADAK TRADING ENTERPRISE in freelance consulting, business support, and community engagement." />
      </Helmet>
      <section className="pt-32 pb-16 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Our Projects & Portfolio
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              See the impactful projects completed by JOEADAK TRADING ENTERPRISE in freelance consulting, business support, and community engagement.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[50vh]">
        <div className="container-custom">
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeFilter === category
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-background text-dark hover:bg-primary hover:text-white'
                  }`}
                >
                  <span className="font-heading">{category}</span>
                </button>
              ))}
            </motion.div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2">
                        <i className="fas fa-eye"></i>
                        <span className="font-heading">View Details</span>
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-dark/70 text-sm mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="bg-background text-dark/60 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <ProjectLightbox
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

export default Projects
