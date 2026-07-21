import imgExecutionNotes from '../assets/article-execution-notes.jpg'
import imgCohortReflections from '../assets/article-cohort-reflections.jpg'
import imgFounderNotes from '../assets/article-founder-notes.jpg'
import imgPlanningExecution from '../assets/article-planning-execution.jpg'

export type Article = {
  slug: string
  image: string
  /** CSS object-position, tuned per photo so cropped thumbnails/banners keep the subject in frame */
  imageFocus: string
  category: string
  title: string
  excerpt: string
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'why-knowledge-alone-never-builds-discipline',
    image: imgExecutionNotes,
    imageFocus: '20% 45%',
    category: 'Execution Notes',
    title: 'Why Knowledge Alone Never Builds Discipline',
    excerpt: 'Information has never been the bottleneck. The real gap is between knowing what to do and actually doing it, day after day.',
    body: [
      'Most people already know what they should be doing. They know they should train, save, study, or build consistently. What they lack is not another course, another framework, or another book — it is a structure that makes doing the thing easier than not doing it.',
      'Knowledge is cheap and abundant. A short search gives you more information than you could apply in a year. If information were the bottleneck, everyone with an internet connection would already be disciplined. Clearly, something else is missing.',
      'That something is repetition under real conditions. Discipline is not a personality trait you either have or do not have — it is the residue of a system that made showing up the default, not a decision you had to remake every single day.',
      'This is the gap the pilot is built to close. Not more content, but a structure — daily planning, honest logging, and a small group that notices when you drift — around the execution you already know you need to do.',
    ],
  },
  {
    slug: 'the-cost-of-starting-over-every-monday',
    image: imgCohortReflections,
    imageFocus: 'center 15%',
    category: 'Cohort Reflections',
    title: 'The Cost of Starting Over Every Monday',
    excerpt: 'Restarting a habit is not free. Every reset costs momentum, confidence, and trust in your own follow-through.',
    body: [
      '"I will start fresh on Monday" feels harmless. It is not. Every restart quietly teaches you that missing days has no real cost — that the plan can always be picked back up from zero, no consequence attached.',
      'Over time, that lesson compounds in the wrong direction. It is not the missed day itself that does the damage; it is the pattern of resetting without ever examining why the drift happened in the first place.',
      'A cohort changes the cost of a missed day. When a small group of peers can see your consistency, and you can see theirs, skipping quietly stops being invisible. The structure notices before the gap becomes a habit of its own.',
      'The goal is not perfection. It is catching drift on day two, not day twenty — and never needing a dramatic "fresh start" again, because the system never let you drift far enough to need one.',
    ],
  },
  {
    slug: 'what-accountability-actually-means',
    image: imgFounderNotes,
    imageFocus: 'center 75%',
    category: 'Founder Notes',
    title: 'What Accountability Actually Means',
    excerpt: 'It is not about guilt or pressure. Real accountability is a structure that notices drift before it becomes a pattern.',
    body: [
      'Accountability gets a bad reputation because most versions of it run on guilt — a person or app making you feel bad for falling short. That kind of pressure fades fast, and it teaches avoidance rather than consistency.',
      'The version we are building is different. It is not about shame when you slip. It is about visibility — a short daily log of what you planned versus what actually happened, seen by a small group who is doing the same thing.',
      'When drift is visible early, it can be addressed early. Two missed days handled honestly in week one prevents twenty missed days by week four. That is the entire function of the structure: catch the pattern while it is still small.',
      'Real accountability is quiet. It does not lecture. It simply makes sure nothing slips unnoticed for long enough to become the new normal.',
    ],
  },
  {
    slug: 'planning-less-executing-more',
    image: imgPlanningExecution,
    imageFocus: '65% 55%',
    category: 'Execution Notes',
    title: 'Planning Less, Executing More',
    excerpt: 'Most planning is a form of procrastination in disguise. The system works best when planning stays small and execution stays daily.',
    body: [
      'It is easy to mistake planning for progress. A detailed plan feels productive, but a plan that takes twenty minutes to build every morning is twenty minutes not spent doing the one thing that actually moves anything forward.',
      'The daily rhythm we use is deliberately small: a short morning prompt to set a single action, and a short evening prompt to log whether it happened. That is the entire loop — no dashboards, no elaborate weekly reviews required to stay on track.',
      'Constraining planning to a few minutes forces clarity. If you cannot state the one action that matters today in a sentence, the plan was probably too complicated to execute anyway.',
      'Execution compounds. A single clear action, done consistently, outperforms an elaborate plan that gets revised every week and executed on none of them.',
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}
