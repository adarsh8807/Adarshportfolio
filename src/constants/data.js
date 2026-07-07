// ---------------------------------------------------------------------------
// EDIT ME: this file holds all the real content on the site.
// Swap the placeholder text/links for your own — nothing else needs to change.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Adarsh Pandey',
  roles: [
    'Software Developer',
    'Full Stack Developer',
    'React Developer',
    'Java Developer',
    'Spring Boot Developer',
  ],
  tagline:
    "I build fast, reliable web applications end to end — from React interfaces to Spring Boot APIs — and I'm looking for my next internship or full-time role.",
  location: 'Mumbai, Maharashtra, India',
  email: 'alokpandey8807@example.com',
  phone: '+91 7379623345',
  github: 'https://github.com/adarsh8807',
  linkedin: 'https://linkedin.com/in/adarshpandey-software',
  // lives in /public, so this resolves correctly both in dev and in the built site
  resumeUrl: '/resume.pdf',
  availableForWork: true,
}

export const about = {
  bio: [
    "I'm a final-year Information Technology student who likes taking a product from a blank page to something people actually use. Most of my time is split between building interfaces in React and building the APIs that sit behind them in Java and Spring Boot.",
    "I care about code that's easy to read six months later, and about UI that feels fast even before it's finished loading. Outside of coursework I ship side projects to keep learning — usually one API, one dashboard, or one bad idea at a time.",
  ],
  education: [
    {
      year: '2024 — 2027',
      title: 'B.Sc. in Information Technology',
      place: 'Mumbai University',
      detail: 'Coursework: Data Structures, DBMS, Operating Systems, Software Engineering.',
    },
    {
      year: '2022 — 2023',
      title: 'Higher Secondary (PCM)',
      place: 'SMT. T.D.J. Inter college sardaha bazar Azamgarh, Uttar Pradesh',
      detail: 'Focused on mathematics and computer science fundamentals.',
    },
  ],
  objective:
    'Seeking an internship or entry-level full-stack role where I can ship real features, learn from senior engineers, and grow into a well-rounded product engineer.',
}

export const skills = {
  Frontend: [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'React', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
  ],
  Backend: [
    { name: 'Java', level: 85 },
    { name: 'Spring Boot', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 72 },
  ],
  Database: [
    { name: 'MySQL', level: 80 },
    { name: 'MongoDB', level: 75 },
  ],
  Tools: [
    { name: 'Git', level: 88 },
    { name: 'GitHub', level: 88 },
    { name: 'VS Code', level: 92 },
    { name: 'Postman', level: 80 },
    { name: 'Figma', level: 65 },
  ],
}

export const experience = [
  {
    year: '2025 — Present',
    title: 'Software Development Intern',
    org: 'Aruma Axis',
    type: 'Internship',
    desc: 'Built and shipped internal tools using React and Spring Boot; collaborated with a team of 5 engineers using Git and code review.',
  },
  {
    year: '2025 — Present',
    title: 'Freelance Web Developer',
    org: 'Self-employed',
    type: 'Freelance',
    desc: 'Delivered 4 client websites end-to-end — requirements, design handoff, build, and deployment.',
  },
  {
    year: '2023 — 2026',
    title: 'Open Source & Personal Projects',
    org: 'GitHub',
    type: 'Projects',
    desc: 'Built and maintained 6+ personal projects spanning full-stack apps, dashboards, and automation scripts.',
  },
  {
    year: '2024 — 2027',
    title: 'B.Sc., Information Technology',
    org: 'Mumbai University',
    type: 'Education',
    desc: 'Core coursework in data structures, algorithms, databases, and software engineering practices.',
  },
]

export const projects = [
  {
    title: 'The John Fitness — Gym Landing Page',
    description:
      'A dark, high-contrast landing page for a Mumbai gym chain — hero stats, programs, trainers, and a pricing section built to convert visitors into members.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/gym-fitness-landing.png',
    demo: '#',
    code: '#',
  },
  {
    title: 'Lumen — Photography Portfolio',
    description:
      "A cinematic portfolio site for a fine-art photographer, with a full-bleed hero, gallery, and a dedicated 3D view section for showcasing work.",
    tech: ['React', 'Three.js', 'Tailwind CSS'],
    image: '/projects/lumen-photography-portfolio.png',
    demo: '#',
    code: '#',
  },
  {
    title: 'Yugnova — Digital Agency Site',
    description:
      'A marketing site for a software agency — services, portfolio, pricing, and blog sections, with client logos and animated stats up top.',
    tech: ['React', 'Node.js', 'Tailwind CSS'],
    image: '/projects/yugnova-agency-site.png',
    demo: '#',
    code: '#',
  },
  {
    title: 'QR Attendance System',
    description:
      'A QR-code based attendance tool for classrooms that logs check-ins in real time and exports reports.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image:
      'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop',
    demo: '#',
    code: '#',
  },
  {
    title: 'Stock Market Dashboard',
    description:
      'A real-time dashboard tracking watchlists and portfolio performance with interactive charts.',
    tech: ['React', 'Java', 'MySQL'],
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    demo: '#',
    code: '#',
  },
  {
    title: 'Personal Portfolio (this site)',
    description:
      'A 3D, animated developer portfolio built with React Three Fiber, Framer Motion, and Tailwind CSS.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    image:
      'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop',
    demo: '#',
    code: '#',
  },
]

export const services = [
  {
    title: 'Frontend Development',
    desc: 'Responsive, accessible interfaces built with React and Tailwind CSS.',
  },
  {
    title: 'Backend Development',
    desc: 'REST APIs and services with Java, Spring Boot, and Node.js.',
  },
  {
    title: 'Full Stack Development',
    desc: 'End-to-end applications from database schema to deployed UI.',
  },
  {
    title: 'API Development',
    desc: 'Documented, tested APIs designed for real client integrations.',
  },
]

export const certifications = [
  {
    title: 'Full Stack Web Development',
    org: 'Course Provider',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    url: '#',
  },
  {
    title: 'Java Programming Certification',
    org: 'Course Provider',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    url: '#',
  },
  {
    title: 'React — Advanced Concepts',
    org: 'Course Provider',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    url: '#',
  },
]

export const testimonials = [
  {
    quote:
      "Aarav picked up our codebase in days, not weeks. He shipped a client-facing dashboard ahead of schedule and it hasn't needed a single hotfix since.",
    name: 'Priya Nair',
    role: 'Engineering Lead, Company Name',
  },
  {
    quote:
      'What stood out was the communication — clear updates, honest estimates, and code reviews that actually taught the rest of the team something.',
    name: 'Rohit Verma',
    role: 'Founder, Freelance Client',
  },
  {
    quote:
      "One of the few interns who asked 'why' before writing code. That instinct alone made his features easier to maintain than most.",
    name: 'Sana Iqbal',
    role: 'Senior Developer, Company Name',
  },
]

export const faqs = [
  {
    q: 'What kind of roles are you looking for?',
    a: 'Software development internships and entry-level full-stack roles — anywhere I can work across React on the frontend and Java/Spring Boot or Node.js on the backend.',
  },
  {
    q: 'Are you available for freelance work?',
    a: "Yes, for short, well-scoped projects — landing pages, dashboards, or API work. Reach out with details and I'll tell you honestly if I'm a good fit.",
  },
  {
    q: 'What does your typical stack look like?',
    a: 'React and Tailwind CSS on the frontend, Java with Spring Boot or Node.js with Express on the backend, and MySQL or MongoDB for storage — swapping pieces in when a project calls for it.',
  },
  {
    q: "What's the best way to reach you?",
    a: 'Email is fastest — use the contact form below, or reach out directly on LinkedIn.',
  },
]

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]
