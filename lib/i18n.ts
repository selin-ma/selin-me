export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const localeMeta: Record<Locale, { label: string; htmlLang: string }> = {
  zh: { label: '中文', htmlLang: 'zh-CN' },
  en: { label: 'English', htmlLang: 'en' },
};

type Messages = Record<string, string>;

export const messages: Record<Locale, Messages> = {
  zh: {
    // Nav
    'nav.myStory': '我的故事',
    'nav.about': '关于我',
    'nav.experience': '经历',
    'nav.skills': '技能',
    'nav.life': '生活',
    'nav.contact': '联系',
    'nav.hireMe': '联系我',
    'nav.language': '语言',

    // Hero
    'hero.subtitle': 'Frontend Engineer · 前端开发工程师',
    'hero.title.line1': '五年的',
    'hero.title.code': '代码',
    'hero.title.craft': '匠心',
    'hero.title.curiosity': '好奇',
    'hero.lede':
      '我相信好的前端工程师既是工匠也是设计者——写出可维护的代码，同时对每一个用户交互有敏锐的感知。这是我 5 年的故事。',
    'hero.cta.readStory': '翻开我的故事',
    'hero.cta.contact': '联系我',
    'hero.scroll': '滚动',

    // Experience
    'experience.kicker': '工作经历',
    'experience.title.prefix': '我的',
    'experience.title.em': '篇章',
    'experience.hint': '← → 键盘或点击标签切换',
    'experience.chapter': '第 {n} 章',
    'experience.prev': '上一章',
    'experience.next': '下一章',
    'experience.highlights': '亮点',
    'experience.techStack': '技术栈',

    // Skills
    'skills.kicker': '能力',
    'skills.title.prefix': '我能带来',
    'skills.title.em': '什么',
    'skills.tab.all': '全部',
    'skills.tab.frontend': '前端',
    'skills.tab.engineering': '工程化',

    // Life
    'life.kicker': '生活与兴趣',
    'life.title.prefix': '屏幕',
    'life.title.em': '之外',
    'life.tab.reading': '阅读',
    'life.tab.sports': '运动',
    'life.reads.title': '已读书单',
    'life.reads.hint': '悬停查看',
    'life.reads.note':
      '阅读对我来说是最私密的充电方式 — 技术书给我工具，文学书给我视角，社科书给我世界观',

    // Contact
    'contact.kicker': '保持联系',
    'contact.title.line1': '一起写下',
    'contact.title.em': '下一章',
    'contact.lede':
      '如果你在寻找一位对代码质量有追求、对用户体验有感知的前端工程师，欢迎随时联系我，期待与你探索下一段旅程。',
    'contact.availability': '当前可接洽',

    // Footer
    'footer.line': '用心打磨 · 部署于 GitHub Pages · © {year}',
  },
  en: {
    // Nav
    'nav.myStory': 'My Story',
    'nav.about': 'About Me',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.life': 'Life',
    'nav.contact': 'Contact',
    'nav.hireMe': 'Hire Me',
    'nav.language': 'Language',

    // Hero
    'hero.subtitle': 'Frontend Engineer',
    'hero.title.line1': 'Five Years of',
    'hero.title.code': 'Code',
    'hero.title.craft': 'Craft',
    'hero.title.curiosity': 'Curiosity',
    'hero.lede':
      'I believe a great frontend engineer is both a craftsperson and a designer—writing maintainable code while staying sensitive to every user interaction. Here’s my five-year story.',
    'hero.cta.readStory': 'Read my story',
    'hero.cta.contact': 'Contact me',
    'hero.scroll': 'scroll',

    // Experience
    'experience.kicker': 'Work Experience',
    'experience.title.prefix': 'My',
    'experience.title.em': 'Chapters',
    'experience.hint': 'Use ← → or click tabs to navigate',
    'experience.chapter': 'Chapter {n}',
    'experience.prev': 'Previous chapter',
    'experience.next': 'Next chapter',
    'experience.highlights': 'Key Highlights',
    'experience.techStack': 'Tech Stack',

    // Skills
    'skills.kicker': 'Expertise',
    'skills.title.prefix': 'What I',
    'skills.title.em': 'Bring',
    'skills.tab.all': 'All',
    'skills.tab.frontend': 'Frontend',
    'skills.tab.engineering': 'Engineering',

    // Life
    'life.kicker': 'Life & Interests',
    'life.title.prefix': 'Beyond the',
    'life.title.em': 'Screen',
    'life.tab.reading': 'Bookshelf',
    'life.tab.sports': 'Sports',
    'life.reads.title': 'Recent Reads',
    'life.reads.hint': 'Hover to explore',
    'life.reads.note':
      'Reading is my most private way to recharge—technical books give me tools, literature gives me perspective, and social sciences give me a worldview.',

    // Contact
    'contact.kicker': 'Get In Touch',
    'contact.title.line1': "Let's Write the",
    'contact.title.em': 'Next Chapter',
    'contact.lede':
      "If you're looking for a frontend engineer who cares about code quality and user experience, feel free to reach out. I'd love to explore the next journey with you.",
    'contact.availability': 'Open to new opportunities',

    // Footer
    'footer.line': 'Crafted with care · Deployed on GitHub Pages · © {year}',
  },
};

export function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input);
}

export function formatMessage(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
