// Owner-confirmed professional profiles, shared by About and Contact.
const professionalLinks = [
  { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/suliat-wuraola-alake' },
  { platform: 'github', label: 'GitHub', url: 'https://github.com/SWAlake' },
  { platform: 'scholar', label: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=ja5erjEAAAAJ' },
  { platform: 'orcid', label: 'ORCID', url: 'https://orcid.org/0009-0004-2366-0113' }
] as const;

export const profile = {
  siteTitle: 'S.W. Alake | Researcher', name: 'Suliat Wuraola Alake',
  role: 'Early-stage PhD candidate', institution: 'Western Sydney University',
  group: 'Nanoscale Organisation and Dynamics Group', school: 'School of Science',
  email: 'wura.alake@gmail.com',
  description: 'Suliat Wuraola Alake is a Nigerian-Australian researcher exploring medical image analysis, observer variability and deep learning at Western Sydney University.',
  links: professionalLinks
};

// Homepage editorial content. The Contact page retains its existing role wording.
export const about = {
  role: 'Early-career researcher',
  pronouns: '(She/Her)',
  headline: 'Breaking boundaries between medical imaging, oncology, and deep learning.',
  description: 'Suliat Wuraola Alake is a Nigerian-Australian early-career researcher and PhD candidate working at the intersection of medical imaging, deep learning and oncology.',
  biography: [
    'Suliat Wuraola Alake is a Nigerian-Australian early-career researcher and PhD candidate at Western Sydney University. Her research sits at the intersection of medical image analysis, deep learning, oncology, and the interpretation of anatomical variation.',
    'With an interdisciplinary background spanning anatomy and physiology, research, and creative leadership, she is interested in how deep learning-driven innovations can support more robust, precise, and clinically reliable approaches to MRI-guided radiotherapy, with the long-term goal of improving patient outcomes and reducing treatment-related morbidity.'
  ],
  education: [
    { title: 'Master of Research', institution: 'Western Sydney University' },
    { title: 'Bachelor of Advanced Medical Science (Anatomy and Physiology)', institution: 'Western Sydney University' },
    { title: 'Bachelor of Creative Leadership', institution: 'Western Sydney University' }
  ],
  interests: ['Medical image analysis', 'Deep learning', 'Artificial intelligence', 'Oncology', 'MRI-guided radiotherapy', 'Inter-observer variability', 'Prompt engineering'],
  featuredResearch: {
    category: 'Featured Research · Research Brief',
    title: 'Towards Multi-Observer Deep Learning for Breast MRI Segmentation',
    summary: 'Building on foundational research in automated breast MRI segmentation, this work considers how differences in expert anatomical delineations influence model learning and evaluation.',
    link: '/papers/beyond-a-single-ground-truth/'
  },
  // Email and shared owner-confirmed profiles populate the circular icons.
  socialLinks: [
    { platform: 'email', label: 'Email Suliat Wuraola Alake', url: `mailto:${profile.email}` },
    ...professionalLinks
  ] as { platform: 'email' | 'linkedin' | 'github' | 'scholar' | 'orcid'; label: string; url: string | null }[]
};
