'use client';
import { useMainStore } from '@/stores/main-state-provider';
import { motion } from 'framer-motion';
import Form from '@/components/Form';
import Project from '@/components/Project';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const services = [
  {
    title: 'Web Development',
    description: 'Responsive websites, e-commerce, CMS, and full-stack solutions using React, Next.js, Node.js, and more.',
  },
  {
    title: 'Software Development',
    description: 'Custom software, SaaS, APIs, mobile/desktop apps, and cloud integration for scalable business solutions.',
  },
  {
    title: 'Niche Expertise',
    description: 'Fintech, healthcare, e-commerce, and more. Solutions tailored to your industry.',
  },
];

const process = [
  { step: 'Discovery', desc: 'Understand your needs, goals, and requirements.' },
  { step: 'Planning', desc: 'Wireframes, prototypes, and technical specs.' },
  { step: 'Development', desc: 'Agile sprints, iterative builds, and regular updates.' },
  { step: 'Testing/QA', desc: 'Performance, security, and compatibility checks.' },
  { step: 'Launch & Support', desc: 'Deployment, maintenance, and updates.' },
];

const portfolio = [
  {
    title: 'E-Commerce Platform',
    desc: 'A scalable online store for a retail brand, boosting conversions by 25%.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: '/images/meta.png',
    url: 'https://example.com',
  },
  {
    title: 'SaaS Dashboard',
    desc: 'A real-time analytics dashboard for a SaaS startup, reducing load times by 2s.',
    tech: ['Next.js', 'Python', 'PostgreSQL'],
    image: '/images/meta.png',
    url: 'https://example.com',
  },
  {
    title: 'Mobile App',
    desc: 'A cross-platform app for healthcare, increasing engagement by 40%.',
    tech: ['React Native', 'Firebase'],
    image: '/images/meta.png',
    url: 'https://example.com',
  },
];

const testimonials = [
  {
    quote: 'Delivered a secure, scalable app on time and within budget.',
    name: 'CEO, Fintech Startup',
  },
  {
    quote: 'Great communication and technical depth. Highly recommend!',
    name: 'Founder, E-Commerce Brand',
  },
  {
    quote: 'Transformed our legacy system with modern, maintainable code.',
    name: 'CTO, Healthcare Company',
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Websites: 4-8 weeks; custom software: 3-6 months, depending on scope.',
  },
  {
    q: 'What technologies do you use?',
    a: 'React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, and more.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes, I provide maintenance and updates post-launch.',
  },
  {
    q: 'How do you ensure security?',
    a: 'I follow best practices like OWASP guidelines and regular security audits.',
  },
];

const techStack = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Shopify',
  'WordPress',
  'Figma',
];

const socials = [
  { icon: <AiFillGithub />, url: 'https://github.com/Lemirq', label: 'GitHub' },
  { icon: <AiFillLinkedin />, url: 'https://www.linkedin.com/in/vs190', label: 'LinkedIn' },
  { icon: <AiFillMail />, url: 'mailto:sharmavihaan190@gmail.com', label: 'Email' },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$3,000+',
    features: ['Up to 5 pages', 'Responsive design', 'Basic SEO', 'Contact form', '1 month support'],
    highlight: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$7,500+',
    features: ['Up to 15 pages', 'Custom integrations', 'Advanced SEO', 'Blog/CMS', '3 months support', 'Performance optimization'],
    highlight: true,
    cta: 'Start Your Project',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited pages', 'E-commerce/SaaS', 'API & cloud integration', 'Security audits', 'Ongoing support', 'Dedicated project management'],
    highlight: false,
    cta: 'Contact for Quote',
  },
];

const ClientLanding = () => {
  const { projects, tech } = useMainStore((state) => state);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section className='w-full max-w-6xl mx-auto py-16 md:py-32 px-5 md:px-10 text-white'>
      {/* Hero Section with Gradient and Split Layout */}
      <div className='relative mb-20 flex flex-col md:flex-row items-center gap-10 md:gap-0'>
        <div className='flex-1 fc gap-4 z-10'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-4xl md:text-6xl font-bold text-left md:text-left bg-gradient-to-br from-violet-400 via-indigo-300 to-white bg-clip-text text-transparent'>
            Let's Build Something Exceptional
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className='text-lg text-slate-300 max-w-xl'>
            I'm Vihaan Sharma, a solo web and software developer specializing in scalable, user-focused solutions. I build websites and custom
            software that drive engagement and streamline operations. Experienced in creating responsive, high-performance digital products for
            startups, SMBs, and enterprises.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className='flex-1 flex justify-center items-center'>
          <div className='rounded-full bg-gradient-to-br from-violet-600 via-indigo-700 to-black p-1 w-64 h-64 flex items-center justify-center shadow-2xl'>
            <img src='/images/Vihaan-sq.jpg' alt='Vihaan Sharma' className='rounded-full w-60 h-60 object-cover border-4 border-indigo-900' />
          </div>
        </motion.div>
        <div className='absolute -z-10 left-0 top-0 w-full h-full bg-gradient-to-br from-violet-900/30 via-indigo-900/10 to-black/0 rounded-3xl blur-2xl' />
      </div>
      {/* Services - Card Row */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Services Offered</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className='bg-gradient-to-br from-[#1a133a] to-[#05081B] rounded-2xl p-8 border border-[#070a1f] shadow-lg hover:scale-105 transition-transform'>
              <h3 className='text-xl font-semibold mb-2 text-violet-400'>{s.title}</h3>
              <p className='text-slate-300'>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Process - Timeline Style */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>My Process</h2>
        <div className='relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0'>
          {process.map((p, i) => (
            <div key={p.step} className='relative flex-1 flex flex-col items-center'>
              <div className='bg-violet-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2 shadow-lg'>
                {i + 1}
              </div>
              <h4 className='font-semibold mb-1 text-center'>{p.step}</h4>
              <p className='text-slate-400 text-sm text-center mb-4'>{p.desc}</p>
              {i < process.length - 1 && (
                <div
                  className='hidden md:block absolute right-0 top-6 w-full h-1 bg-gradient-to-r from-violet-700/40 to-indigo-700/10 z-0'
                  style={{ left: '50%', width: '100%' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Portfolio Highlights - Masonry Style */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Portfolio Highlights</h2>
        <div className='columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]'>
          <div className='flex flex-col gap-6'>
            {portfolio.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className='bg-[#05081B] rounded-2xl p-4 border border-[#070a1f] mb-6 break-inside-avoid shadow-lg hover:scale-[1.02] transition-transform'>
                <img src={proj.image} alt={proj.title} className='rounded-xl mb-3 w-full aspect-video object-cover' />
                <h3 className='text-xl font-semibold mb-1 text-violet-400'>{proj.title}</h3>
                <p className='text-slate-400 mb-2 text-sm'>{proj.desc}</p>
                <div className='fr gap-2 flex-wrap mb-2'>
                  {proj.tech.map((t) => (
                    <span key={t} className='px-2 py-1 rounded bg-violet-700 text-xs'>
                      {t}
                    </span>
                  ))}
                </div>
                <a href={proj.url} target='_blank' className='text-violet-400 text-sm underline'>
                  Live Demo
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='text-center mt-4'>
          <a href='#projects' className='text-violet-400 underline'>
            See full portfolio
          </a>
        </div>
      </div>
      {/* Pricing - Column Cards */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Pricing & Investment</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`relative rounded-2xl p-8 border-2 ${tier.highlight ? 'border-violet-500 bg-gradient-to-br from-violet-900/60 to-indigo-900/40 shadow-2xl scale-105 z-10' : 'border-[#070a1f] bg-[#0d112a] shadow-lg'} flex flex-col items-center`}>
              {tier.highlight && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow'>
                  Most Popular
                </div>
              )}
              <h3 className='text-2xl font-bold mb-2'>{tier.name}</h3>
              <div className='text-4xl font-extrabold mb-4 text-violet-400'>{tier.price}</div>
              <ul className='fc gap-2 mb-6'>
                {tier.features.map((f) => (
                  <li key={f} className='fr gap-2 text-slate-200'>
                    <FaCheckCircle className='text-green-400' /> {f}
                  </li>
                ))}
              </ul>
              <a
                href='#client-contact'
                className={`mt-auto px-6 py-3 rounded-xl font-semibold text-white transition bg-violet-600 hover:bg-violet-700 shadow ${tier.highlight ? 'ring-2 ring-violet-400' : ''}`}>
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <p className='text-slate-400 text-center mt-6'>Contact me for a detailed quote. Pricing depends on complexity, features, and timeline.</p>
        {/* Bare Minimum Included List */}
        <div className='max-w-2xl mx-auto mt-10 bg-[#13162b] rounded-2xl p-6 border border-[#262b4c] shadow fc gap-2'>
          <h3 className='text-xl font-bold mb-2 text-violet-400 text-center'>Bare Minimum Included in Every Project</h3>
          <ul className='list-disc ml-6 text-slate-300 text-base space-y-1'>
            <li>HTTPS/SSL by default</li>
            <li>Mobile responsiveness</li>
            <li>Accessibility best practices (WCAG)</li>
            <li>Performance optimization</li>
            <li>Basic SEO setup</li>
            <li>Cross-browser compatibility</li>
            <li>Source code version control (Git)</li>
            <li>Basic security best practices (OWASP)</li>
            <li>Clean, maintainable code</li>
            <li>Deployment setup & documentation</li>
          </ul>
        </div>
      </div>
      {/* Testimonials - Carousel Style */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Testimonials</h2>
        <div className='flex flex-col md:flex-row gap-8 justify-center items-stretch'>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.quote}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className='bg-gradient-to-br from-violet-900/60 to-indigo-900/40 rounded-2xl p-8 border border-[#070a1f] fc gap-3 shadow-xl flex-1 min-w-[250px]'>
              <FaQuoteLeft className='text-violet-500 text-2xl mb-2' />
              <p className='text-slate-200 italic'>"{t.quote}"</p>
              <div className='text-slate-400 text-sm mt-2'>{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Who You Work With - Tag Cloud */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Who I Work With</h2>
        <div className='flex flex-wrap justify-center gap-3 mb-2'>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>Startups</span>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>SMBs</span>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>Enterprises</span>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>Fintech</span>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>Healthcare</span>
          <span className='px-3 py-1 rounded bg-violet-700 text-xs'>E-Commerce</span>
        </div>
        <p className='text-slate-300 text-center'>
          I partner with startups, SMBs, enterprises, and organizations in fintech, healthcare, e-commerce, and more. Specializing in React-based web
          apps, MVPs for startups, and legacy system upgrades.
        </p>
      </div>
      {/* CTA - Gradient Card */}
      <div className='mb-20' id='client-contact'>
        <div className='max-w-2xl mx-auto bg-gradient-to-br from-violet-900/60 to-indigo-900/40 rounded-2xl p-10 shadow-2xl'>
          <h2 className='text-3xl font-bold mb-4 text-center'>Let's Build Your Next Solution</h2>
          <p className='text-slate-300 mb-6 text-center'>
            Schedule a free consultation or request a project assessment. I'll respond within 24 hours.
          </p>
          <Form />
        </div>
      </div>
      {/* FAQs - Accordion */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>FAQs</h2>
        <div className='space-y-4 max-w-2xl mx-auto'>
          {faqs.map((faq, i) => (
            <div key={faq.q} className='bg-[#0d112a] rounded-2xl p-4 border border-[#070a1f]'>
              <button className='w-full text-left font-semibold text-lg text-violet-400' onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
              </button>
              {openFaq === i && <p className='mt-2 text-slate-300 text-base'>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
      {/* Contact Info & Socials - Row */}
      <div className='mb-20'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Contact</h2>
        <div className='fr gap-4 flex-wrap justify-center mb-2'>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target='_blank' className='fr gap-2 text-violet-400 text-lg hover:underline'>
              {s.icon} {s.label}
            </a>
          ))}
        </div>
        <div className='text-slate-400 text-center'>
          Email:{' '}
          <a href='mailto:sharmavihaan190@gmail.com' className='underline'>
            sharmavihaan190@gmail.com
          </a>
        </div>
      </div>
      {/* Technical Expertise - Tag Cloud */}
      <div className='mb-8'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Technical Expertise</h2>
        <div className='fr gap-2 flex-wrap justify-center'>
          {techStack.map((t) => (
            <span key={t} className='px-3 py-1 rounded bg-[#13162b] text-xs'>
              {t}
            </span>
          ))}
        </div>
        <div className='text-slate-400 mt-2 text-sm text-center'>
          AWS Certified Developer. Open-source contributor. Proficient in xAI API, Grok, and modern DevOps tools.
        </div>
      </div>
    </section>
  );
};

export default ClientLanding;
