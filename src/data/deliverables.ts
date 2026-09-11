import { Film, Mic, Share2, CalendarDays } from 'lucide-react'

export type Deliverable = {
  id: string
  title: string
  line: string
  icon: React.ElementType
}

export const deliverables: Deliverable[] = [
  {
    id: 'activation-recap',
    title: 'Activation recap',
    line: 'The film of the week, ready for the sponsorship deck.',
    icon: Film,
  },
  {
    id: 'exec-clips',
    title: 'Exec clips for LinkedIn',
    line: 'Your CEO and speakers, cut while the show is still on.',
    icon: Mic,
  },
  {
    id: 'social-cutdowns',
    title: 'Same week social cutdowns',
    line: 'Vertical and square versions your sales team posts all quarter.',
    icon: Share2,
  },
  {
    id: 'full-week-coverage',
    title: 'Full week coverage',
    line: 'A crew on site from load in to the last dinner.',
    icon: CalendarDays,
  },
]
