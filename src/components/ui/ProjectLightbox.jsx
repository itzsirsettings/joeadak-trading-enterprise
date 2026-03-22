import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectLightbox = ({ project, isOpen, onClose }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-secondary hover:text-white transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
              <span className="absolute top-4 left-4 bg-secondary text-white text-sm font-medium px-4 py-2 rounded-full">
                {project.category}
              </span>
            </div>

            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                {project.title}
              </h3>
              
              <p className="text-dark/80 leading-relaxed mb-6">
                {project.fullDescription || project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold text-primary mb-1">Client Type</h4>
                  <p className="text-dark/70 text-sm">{project.clientType}</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-bold text-primary mb-1">Duration</h4>
                  <p className="text-dark/70 text-sm">{project.duration}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm font-medium text-dark/60">Technologies:</span>
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                )) || <span className="text-sm text-dark/70">Consulting, Project Management</span>}
              </div>

              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="btn-primary flex-1 text-center"
                >
                  Start Similar Project
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectLightbox
