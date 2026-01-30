'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Project } from '@/hooks/useProjects'
import { ProjectCard } from './ProjectCard'
import { VideoModal } from './VideoModal'

interface ProjectGridProps {
  projects: Project[]
  isLoading?: boolean
}

export function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="m3-elevated-card aspect-[9/16] animate-pulse bg-m3-surface-variant" />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-m3-on-surface/60">No projects found in this category.</p>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        videoUrl={selectedProject?.video_url || null}
        title={selectedProject?.title}
      />
    </>
  )
}
