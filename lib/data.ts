// ─── Book covers ──────────────────────────────────────────────────────────────
import existentialismImg from '@/public/images/life/books/existentialism.jpg';
import theStrangerImg from '@/public/images/life/books/the-stranger.jpg';
import invisibleWomenImg from '@/public/images/life/books/invisible-women.jpg';
import westernThoughtImg from '@/public/images/life/books/western-thought.jpg';
import iAndTheGardenImg from '@/public/images/life/books/i-and-the-garden.jpg';
import siddharthaImg from '@/public/images/life/books/siddhartha.jpg';

// ─── Pickleball photos ────────────────────────────────────────────────────────
import surfskatboardImg from '@/public/images/life/curiosities/surfskateboard.jpg';
import tennisImg from '@/public/images/life/curiosities/tennis.jpg';
import pickleChengdu1Img from '@/public/images/life/pickleball/chengdu-1.jpg';
import pickleChengdu2Img from '@/public/images/life/pickleball/chengdu-2.jpg';
import pickleChongqingImg from '@/public/images/life/pickleball/chongqing.jpg';
import pickleKl1Img from '@/public/images/life/pickleball/kl-1.jpg';
import pickleKl2Img from '@/public/images/life/pickleball/kl-2.jpg';
import pickleKl3Img from '@/public/images/life/pickleball/kl-3.jpg';
import pickleShanghaiImg from '@/public/images/life/pickleball/shanghai.jpg';

// ─── Work covers ─────────────────────────────────────────────────────────────
import travelAssociatesImg from '@/public/images/work/travel-associates.png';
import flightCentreImg from '@/public/images/work/flight-centre.png';
import coverMoreImg from '@/public/images/work/cover-more.png';
import auspostImg from '@/public/images/work/auspost.png';
import ahmImg from '@/public/images/work/ahm.png';
import webjetImg from '@/public/images/work/webjet.png';

// ─── Hobby photos ─────────────────────────────────────────────────────────────
import stageImg from '@/public/images/life/curiosities/stage.jpg';
import movieImg from '@/public/images/life/curiosities/movie.jpg';
import cookImg from '@/public/images/life/curiosities/cook.jpg';
import petImg from '@/public/images/life/curiosities/pet.jpg';
import type {
  Book,
  OtherHobby,
  Skill,
  SportsActivity,
  VibeProject,
  WorkExperience,
  WorkShowcase,
} from '@/types';

export const education = {
  period: '2018 — 2020',
  gpa: 'GPA 3.42 · 7/313（Top 5%）',
};

export const workExperiences: WorkExperience[] = [
  {
    id: 'cit',
    tag: 'Global Tech · Australia',
    leftTitle: '为真实用户\n构建真实产品',
    color: '#C4714B',
    period: 'Oct 2022 — Jul 2025',
    company: 'CI&T',
    role: 'Mid-Level Frontend Engineer · 中级前端工程师',
    location: 'Chengdu → Remote (AU clients)',
    body: '在全球技术咨询公司 CI&T 担任前端工程师，服务澳大利亚头部客户，涵盖旅游、保险等行业。深度参与三个核心项目的重构与迭代，在 Next.js、Turborepo、Storybook 等现代工程体系中积累了大型项目实战经验。',
    techStack: [
      'React 18',
      'Next.js',
      'TypeScript',
      'Turborepo',
      'Storybook',
      'Framer Motion',
      'AWS Lambda',
      'Elasticsearch',
      'Drupal CMS',
      'GitHub Actions',
    ],
    illustrationKey: 'architecture',
  },
  {
    id: 'qingcloud',
    tag: 'Cloud · SaaS Platform',
    leftTitle: '云市场的\n每一个像素',
    color: '#6B8F71',
    period: 'Aug 2021 — Jun 2022',
    company: 'QingCloud',
    role: 'Frontend Engineer · 前端工程师',
    location: '成都',
    body: '在青云科技负责云市场（Marketplace）前端研发，覆盖买家中心、卖家中心、订单管理、支付流程等核心业务链路，并主导企业官网的移动端响应式改版，积累了 ToB SaaS 产品的完整开发经验。',

    techStack: ['React', 'TypeScript', 'Next.js', 'Ant Design', 'Sass', 'RESTful API'],
    illustrationKey: 'dataviz',
  },
  {
    id: 'penge',
    tag: 'Early Career · Framework',
    leftTitle: '从框架出发\n理解工程本质',
    color: '#7A9DB5',
    period: 'Oct 2019 — Jul 2021',
    company: 'Penge Software',
    role: 'Intern Frontend Engineer · 前端工程师',
    location: '成都',
    body: '职业生涯的起点。在鹏业软件深度参与跨平台 UI 框架的从零设计与研发，独立完成 Angular 框架搭建并发布为内部 npm 包，负责多角色动态仪表盘和复杂权限系统的实现。',

    techStack: ['Angular 9', 'TypeScript', 'WeChat Mini-program', 'npm Package', 'RxJS', 'Less'],
    illustrationKey: 'ecommerce',
  },
];

export const skills: Skill[] = [
  {
    icon: '⚡',
    name: 'React & Next.js',
    category: 'frontend',
    level: 0.95,
    desc: 'React 18 Hooks、Next.js SSR/App Router 生产级实战',
    tags: ['React 18', 'Next.js', 'Framer Motion', 'React Query'],
  },
  {
    icon: '🔷',
    name: 'TypeScript',
    category: 'frontend',
    level: 0.92,
    desc: 'Type-safe 开发，泛型、工具类型熟练运用',
    tags: ['TypeScript', 'Zod', 'Type Guards', 'Generics'],
  },
  {
    icon: '🎨',
    name: 'CSS & 组件库',
    category: 'frontend',
    level: 0.92,
    desc: 'Tailwind CSS、Material UI、Ant Design、CSS-in-JS',
    tags: ['Tailwind CSS', 'Material UI', 'Ant Design', 'Sass/Less'],
  },
  {
    icon: '📖',
    name: 'Storybook',
    category: 'frontend',
    level: 0.88,
    desc: '组件驱动开发，视觉测试，100% Figma 还原',
    tags: ['Storybook', 'Visual Testing', 'Design System', 'Figma'],
  },
  {
    icon: '🏗️',
    name: 'Monorepo 工程化',
    category: 'engineering',
    level: 0.88,
    desc: 'Turborepo / Lerna，跨项目组件共享与发布',
    tags: ['Turborepo', 'Lerna', 'npm Package', 'Vite/Webpack'],
  },
  {
    icon: '☁️',
    name: 'Full-stack & Cloud',
    category: 'engineering',
    level: 0.78,
    desc: 'AWS Lambda Serverless BFF，Nginx，Linux',
    tags: ['AWS Lambda', 'Elasticsearch', 'Nginx', 'Linux'],
  },
  {
    icon: '🧪',
    name: '测试 & CI/CD',
    category: 'engineering',
    level: 0.8,
    desc: 'Jest 单测，GitHub Actions，OpenAPI 规范',
    tags: ['Jest', 'GitHub Actions', 'OpenAPI/Swagger', 'Code Review'],
  },
  {
    icon: '🤝',
    name: '协作 & 交付',
    category: 'engineering',
    level: 0.93,
    desc: 'Agile/Scrum，全链路 Ticket 所有权，跨国团队',
    tags: ['Agile/Scrum', 'Jira', 'Confluence', 'Figma', 'Slack'],
  },
  {
    icon: '🌏',
    name: 'Cross-timezone Collaboration',
    category: 'soft',
    level: 0.92,
    desc: '长期与澳洲客户团队远程协作，熟悉异步沟通节奏与英文工作流',
    tags: ['Remote-first', 'Async Comms', 'English Workflow', 'AU Clients'],
  },
  {
    icon: '🤝',
    name: '跨团队沟通',
    category: 'soft',
    level: 0.9,
    desc: '成都 · 武汉 · 北京多地协作，推动技术方案对齐与产品需求落地',
    tags: ['多地协作', '需求对齐', '方案评审', '线上会议'],
  },
  {
    icon: '🎯',
    name: '需求理解与交付',
    category: 'soft',
    level: 0.93,
    desc: '从 PRD 到上线全链路独立负责，准确拆解需求、识别风险、按时交付',
    tags: ['PRD 理解', '任务拆解', '风险识别', '准时交付'],
  },
  {
    icon: '🧩',
    name: 'Design-Dev 协作',
    category: 'soft',
    level: 0.88,
    desc: '深度对接 Figma 设计稿，与设计师高效沟通还原细节，建立组件规范',
    tags: ['Figma', '像素还原', '组件规范', '设计对齐'],
  },
];

export const bookshelf: Book[] = [
  {
    id: 'siddhartha',
    color: '#BF8B3A',
    coverUrl: siddharthaImg,
    year: 2024,
    doubanUrl: 'https://book.douban.com/subject/26980487/',
  },
  {
    id: 'the-stranger',
    color: '#8FA8B8',
    coverUrl: theStrangerImg,
    year: 2024,
    doubanUrl: 'https://book.douban.com/subject/24257486/',
  },
  {
    id: 'existentialism',
    color: '#1E3A5F',
    coverUrl: existentialismImg,
    year: 2023,
    doubanUrl: 'https://book.douban.com/subject/10608319/',
  },
  {
    id: 'invisible-women',
    color: '#C0394B',
    coverUrl: invisibleWomenImg,
    year: 2024,
    doubanUrl: 'https://book.douban.com/subject/35942057/',
  },
  {
    id: 'western-thought',
    color: '#3D5C40',
    coverUrl: westernThoughtImg,
    year: 2024,
    doubanUrl: 'https://book.douban.com/subject/35313227/',
  },
  {
    id: 'garden-of-earth',
    color: '#7A5C3E',
    coverUrl: iAndTheGardenImg,
    year: 2023,
    doubanUrl: 'https://book.douban.com/subject/30207170/',
  },
];

export const sportsActivities: SportsActivity[] = [
  {
    id: 'pickleball',
    name: 'Pickleball',
    icon: '🎾',
    color: '#C4714B',
    tagline: 'Twinkle Pickle · Beesoul 签约战队球员',
    desc: '组建业余战队 Twinkle Pickle，代表 Beesoul 品牌参加比赛。从上海到重庆到吉隆坡，用一块球场和一把球拍，认识了一群真正热爱这项运动的人。',
    badges: ['Twinkle Pickle 战队', 'Beesoul 签约球员', '上海 · 重庆 · 吉隆坡'],
    photos: [
      { labelKey: 'life.photo.kl1', src: pickleKl1Img, position: '30% center' },
      { labelKey: 'life.photo.kl2', src: pickleKl2Img },
      { labelKey: 'life.photo.kl3', src: pickleKl3Img, position: 'center 30%' },
      { labelKey: 'life.photo.chongqing', src: pickleChongqingImg, position: '40% center' },
      { labelKey: 'life.photo.shanghai', src: pickleShanghaiImg },
      { labelKey: 'life.photo.chengdu1', src: pickleChengdu1Img, position: '50% 20%' },
      { labelKey: 'life.photo.chengdu2', src: pickleChengdu2Img },
    ],
  },
];

// ─── Work Showcase ───────────────────────────────────────────────────────────

export const workShowcases: WorkShowcase[] = [
  {
    id: 'travel-associates',
    category: 'Travel Platform',
    categoryZh: '旅游平台',
    title: 'TravelAssociates',
    titleZh: 'TravelAssociates',
    desc: 'End-to-end platform rebuild for a leading Australian travel brand — migrated the entire site to Next.js + Turborepo, delivering core features, a standardised component library, and Lighthouse Performance 85/100 SEO 100/100.',
    descZh:
      '澳大利亚头部旅游品牌全站重构——整体迁移至 Next.js + Turborepo，负责核心功能交付、组件库规范化建设，Lighthouse Performance 85/100 SEO 100/100。',
    tech: ['Next.js', 'TypeScript', 'Turborepo'],
    coverImage: travelAssociatesImg,
    siteUrl: 'https://www.travelassociates.com',
  },
  {
    id: 'flight-centre',
    category: 'Design System',
    categoryZh: '设计系统',
    title: 'Flight Centre',
    titleZh: 'Flight Centre',
    desc: "High-bar feature delivery within Flight Centre's monorepo — pixel-perfect Figma implementation, Drupal headless CMS integration, and an AWS Lambda + Elasticsearch BFF powering store search.",
    descZh:
      '在 Flight Centre Lerna Monorepo 中高标准交付页面功能——像素级还原 Figma 设计，打通 Drupal Headless CMS，并集成 AWS Lambda + Elasticsearch BFF 驱动门店搜索。',
    tech: ['Next.js', 'FC Design System', 'Storybook', 'AWS Lambda', 'Jest'],
    coverImage: flightCentreImg,
    siteUrl: 'https://www.flightcentre.com.au/about-us',
  },
  {
    id: 'covermore',
    category: 'Insurance · White-label',
    categoryZh: '保险 · 白标产品',
    title: 'CoverMore',
    titleZh: 'CoverMore',
    desc: 'Large-scale white-label insurance platform built on a Drupal PHP theme inheritance model — a base theme powering multiple partner sub-themes, ranging from legacy JavaScript to modern Preact. Delivered a multi-step purchase funnel adaptable across all brand variants.',
    descZh:
      '基于 Drupal PHP 主题继承体系的大型白标保险平台——一套 base theme 驱动多个合作伙伴 sub-theme，技术栈横跨原生 JavaScript 老主题与现代 Preact 新主题，交付可跨品牌复用的多步购买流程。',
    tech: ['Drupal PHP Themes', 'Preact', 'JavaScript', 'Tailwind CSS'],
    slides: [
      { label: 'CoverMore', coverImage: coverMoreImg, siteUrl: 'https://www.covermore.com.au' },
      {
        label: 'AusPost',
        coverImage: auspostImg,
        siteUrl: 'https://auspost.poweredbycovermore.com/',
      },
      { label: 'ahm', coverImage: ahmImg, siteUrl: 'https://ahm.com.au/travel-insurance' },
      { label: 'Webjet', coverImage: webjetImg, siteUrl: 'https://insurance.webjet.com.au/' },
    ],
  },
  {
    id: 'pengye-ui-framework',
    category: 'UI Framework',
    categoryZh: 'UI 框架',
    title: 'Pengye UI Framework',
    titleZh: '鹏业跨平台 UI 框架',
    desc: 'Cross-platform UI framework built from scratch with Angular 9, published as an internal npm package. Covered PC and WeChat Mini-program with a bitwise permission system.',
    descZh:
      '从零研发跨平台 UI 框架，覆盖 PC 与微信小程序，发布为内部 npm 包，并使用位运算实现复杂多角色权限控制体系。',
    tech: ['Angular 9', 'TypeScript', 'RxJS'],
  },
  {
    id: 'selin-portfolio',
    category: 'Portfolio',
    categoryZh: '个人作品集',
    title: 'selin.me',
    titleZh: 'selin.me',
    desc: 'This portfolio itself — designed and shipped in one week with Claude as a pair-programming partner. Static export to GitHub Pages with bilingual i18n and Framer Motion.',
    descZh:
      '你正在看的这个网站。以 Claude 为结对伙伴，一周内完成设计、开发与部署，双语 i18n + Framer Motion 动效。',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
    siteUrl: 'https://selin-ma.github.io/selin-me',
  },
];

export const vibeProjects: VibeProject[] = [
  {
    id: 'selin-me',
    name: 'selin.me',
    emoji: '🌿',
    status: 'live',
    color: '#6B8F71',
    story:
      '这个作品集本身就是一次 vibe coding 实验。从零开始，用 Claude 作为结对编程伙伴，在一周内完成了设计、开发、部署的全流程。每一行动画、每一个排版细节，都是人机协作的产物。',
    desc: 'Selin的个人网站，用 AI 辅助开发。',
    aiTools: ['Claude', 'v0'],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    liveUrl: 'https://selin-ma.github.io/selin-me',
    repoUrl: 'https://github.com/selin-ma/selin-me',
  },
  {
    id: 'pickle-vibe',
    name: 'Pickle Vibe',
    emoji: '🥒',
    status: 'building',
    color: '#C4714B',
    story:
      '匹克球在中国还是一项新兴运动，但它正在以惊人的速度生长。Pickle Vibe 是专为中文社区打造的匹克球内容平台——比赛资讯、技术教学、装备测评、球友社区，一站聚合。用 vibe coding 方式，把对这项运动的热爱变成一个真实产品。',
    desc: '面向中文球友的匹克球内容平台，聚合赛事、教学与社区。',
    aiTools: ['Claude', 'Cursor', 'v0'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    id: 'pickle-tracker',
    name: 'Pickle Tracker',
    emoji: '📊',
    status: 'building',
    color: '#7A9DB5',
    story:
      '一个帮助匹克球玩家分析比赛回合的工具。记录每一分的得失原因，可视化自己的技术短板，找到真正需要练习的地方。从"感觉打得不好"到"数据告诉我哪里不好"。',
    desc: '匹克球回合数据记录与分析工具，用数据找到技术提升点。',
    aiTools: ['Claude', 'Cursor'],
    techStack: ['React', 'TypeScript', 'Chart.js', 'PWA'],
  },
  {
    id: 'cycle-log',
    name: '月经记录',
    emoji: '🌸',
    status: 'building',
    color: '#9B4D7E',
    story:
      '一个简洁、私密的月经周期记录微信小程序。市面上的同类产品要么广告太多，要么权限太贪，要么界面太复杂。我想做一个只做一件事、做好一件事的工具——记录、预测、理解自己的身体节律。',
    desc: '简洁私密的微信小程序，记录周期、预测下次、理解身体。',
    aiTools: ['Claude', 'Cursor'],
    techStack: ['微信小程序', 'TypeScript', 'Vant Weapp'],
  },
  {
    id: 'still-hearth',
    name: 'Still Hearth',
    emoji: '🏡',
    status: 'concept',
    color: '#8B6F47',
    story:
      '一款像素风格的独立游戏，关于一个人在废弃小屋里慢慢修缮生活的故事。没有战斗，没有排行榜，只有修复、种植、等待和时间流逝的安静感。灵感来自对"慢游戏"的渴望——有时候你只是需要一个可以喘口气的地方。',
    desc: '像素风独立游戏，在废弃小屋里修复生活，慢慢的，安静的。',
    aiTools: ['Claude', 'Midjourney', 'Cursor'],
    techStack: ['Godot 4', 'GDScript', 'Aseprite'],
  },
];

export const otherHobbies: OtherHobby[] = [
  {
    id: 'musical',
    icon: '🎭',
    color: '#9B4D7E',
    photos: [{ src: stageImg }],
  },
  {
    id: 'movie',
    icon: '🎬',
    color: '#5B7FA6',
    photos: [{ src: movieImg, position: '60%' }],
  },
  {
    id: 'cook',
    icon: '🍳',
    color: '#C4714B',
    photos: [{ src: cookImg, position: '10%' }],
  },
  {
    id: 'pet',
    icon: '🐹',
    color: '#C4956A',
    photos: [{ src: petImg }],
  },
  {
    id: 'tennis',
    icon: '🎾',
    color: '#7A9D5B',
    photos: [{ src: tennisImg, position: 'right' }],
  },
  {
    id: 'surf-skate',
    icon: '🛹',
    color: '#4A6741',
    photos: [{ src: surfskatboardImg, position: '30%' }],
  },
];
