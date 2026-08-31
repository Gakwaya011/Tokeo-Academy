import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const programs = [
  {
    number: '00',
    slug: 'inner-compass',
    title: 'Inner Compass',
    tagline: 'Lead yourself before you lead the work.',
    challenge: 'You keep running into patterns in yourself that undermine otherwise good plans.',
    artifact: 'A Personal Execution Compass',
    quote: 'I know what needs to happen, but I may be part of what is getting in the way.',
  },
  {
    number: '01',
    slug: 'problem-framing',
    title: 'Problem Framing',
    tagline: 'Solve the right problem.',
    challenge: 'You are busy solving symptoms while the real problem keeps coming back.',
    artifact: 'An evidence-backed Problem Statement',
    quote: "Something isn't working, but I'm not convinced we understand why.",
  },
  {
    number: '02',
    slug: 'critical-path',
    title: 'Critical Path',
    tagline: 'Find what must happen first.',
    challenge: "There is plenty of activity, but the project still isn't moving fast enough.",
    artifact: 'A Critical Path and Execution Plan',
    quote: 'We know where we want to go. We need a credible path to get there.',
  },
  {
    number: '03',
    slug: 'team-execution',
    title: 'Team Execution',
    tagline: 'Turn a group of people into an execution machine.',
    challenge: "The plan makes sense. The team isn't consistently delivering it.",
    artifact: 'A Team Execution Diagnostic and Action Plan',
    quote: "The outcome depends on other people, and something about how we're working together isn't clicking.",
  },
  {
    number: '04',
    slug: 'stakeholder-strategy',
    title: 'Stakeholder Strategy',
    tagline: 'Move the people who can move the outcome.',
    challenge: "Success depends on people you don't directly control.",
    artifact: 'A Stakeholder Influence Map',
    quote: 'The plan is sound, but I need other people to make it possible.',
  },
  {
    number: '05',
    slug: 'prioritization-delegation',
    title: 'Prioritization & Delegation',
    tagline: 'Put scarce time where it matters most.',
    challenge: "Everything feels important. Your calendar is full. Critical work still isn't moving.",
    artifact: 'A Prioritized Execution System',
    quote: 'I have more important work than I have time or capacity to do.',
  },
  {
    number: '06',
    slug: 'monitoring-evaluation-learning',
    title: 'Monitoring, Evaluation & Learning',
    tagline: "Know early whether it's working.",
    challenge: 'You are doing the work, but discover too late whether it is producing the intended result.',
    artifact: 'An Execution Scorecard and Learning Rhythm',
    quote: "We're moving. I need to know whether we're moving toward the outcome.",
  },
  {
    number: '07',
    slug: 'risk-adaptation',
    title: 'Risk & Adaptation',
    tagline: 'See trouble before it becomes failure.',
    challenge: "Good plans get derailed by foreseeable risks — or by surprises the team isn't prepared to absorb.",
    artifact: 'A Risk, Early-Warning & Response Map',
    quote: "The plan works if everything goes right. I need it to work when things don't.",
  },
]

const insights = [
  {
    slug: 'why-knowledge-alone-never-builds-discipline',
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

async function main() {
  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    })
  }

  for (const insight of insights) {
    await prisma.insight.upsert({
      where: { slug: insight.slug },
      update: insight,
      create: insight,
    })
  }

  console.log(`Seeded ${programs.length} programs and ${insights.length} insights.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
