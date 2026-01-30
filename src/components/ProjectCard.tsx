'use client'

import { motion } from 'framer-motion'
import { Play, Eye } from 'lucide-react'
import { Project, getThumbnail } from '@/hooks/useProjects'

interface ProjectCardProps {
  project: Project
  index?: number
  onClick?: () => void
}

export function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  const thumbnail = getThumbnail(project)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer active:scale-95 transition-transform"
      onClick={onClick}
    >
      <div className="m3-elevated-card overflow-hidden aspect-[9/16]">
        <div className="relative w-full h-full">
          <img
            src={thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark via-m3-surface-dark/20 to-transparent opacity-80" />

          {/* Play button on hover */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-m3-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl">
              <Play className="w-6 h-6 text-m3-on-surface fill-current ml-0.5" />
            </div>
          </div>

          {/* Views badge */}
          {project.result && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-m3-surface-dark/70 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 flex items-center gap-1">
              <Eye className="w-3 h-3 text-m3-on-dark/70" />
              <span className="text-m3-on-dark text-[10px] sm:text-xs font-semibold">
                {project.result}
              </span>
            </div>
          )}

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <p className="text-m3-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
              {project.category}
            </p>
            <h3 className="font-fredoka text-sm sm:text-xl font-semibold text-m3-on-dark">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-m3-on-dark/60 text-xs mt-1 line-clamp-2 hidden sm:block">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
