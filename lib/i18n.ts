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
    'nav.skills': '技术栈',
    'nav.work': '工作成果',
    'nav.vibe': 'Vibe Coding',
    'nav.life': '生活',
    'nav.hireMe': '联系我',
    'nav.language': '语言',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Selin',
    'hero.role.line1': 'Frontend',
    'hero.role.line2': 'Engineer',
    'hero.role': 'Frontend Engineer',
    'hero.lede': '5 年前端工程经验，专注构建高性能、高品质的用户界面——代码与设计，对我同样重要。',
    'hero.cta.readStory': '翻开我的故事',
    'hero.cta.contact': '联系我',
    'hero.years.label': '年前端工程经验',
    'hero.scroll': '滚动',

    // About
    'about.kicker': '关于我',
    'about.label.experience': '工作经历',
    'about.label.education': '教育背景',
    'about.available': '当前可接洽',
    'about.roleTitle': '前端开发工程师',
    'about.role.cit': '中级前端工程师',
    'about.role.qingcloud': '初级前端工程师',
    'about.role.penge': '前端实习生',
    'about.school': '电子科技大学成都学院',
    'about.degree': '计算机科学与技术（统招专升本）',

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
    'skills.kicker': '技术栈',
    'skills.title.prefix': '我能带来',
    'skills.title.em': '什么',
    'skills.tab.all': '全部',
    'skills.tab.frontend': '前端',
    'skills.tab.engineering': '工程化',
    'skills.line.0': '代码逐行检查',
    'skills.line.1': 'UI 像素级还原',
    'skills.line.2': '细节从不将就',

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
    'life.section.kicker': '屏幕之外的生活',
    'life.nav.sports': '匹克球',
    'life.nav.reading': '阅读',
    'life.nav.more': '好奇心',

    // Books
    'life.book.siddhartha.title': '悉达多',
    'life.book.siddhartha.author': '赫尔曼·黑塞',
    'life.book.siddhartha.category': '文学·小说',
    'life.book.siddhartha.note': '人独自行过生命，蒙受玷污，承担罪过，痛饮苦酒，寻觅出路。',
    'life.book.the-stranger.title': '局外人',
    'life.book.the-stranger.author': '阿尔贝·加缪',
    'life.book.the-stranger.category': '文学·小说',
    'life.book.the-stranger.note': '我向世界那温柔的冷漠，敞开了自我。',
    'life.book.existentialism.title': '存在主义是一种人道主义',
    'life.book.existentialism.author': '让·保罗·萨特',
    'life.book.existentialism.category': '哲学·思想',
    'life.book.existentialism.note': '自由是独自承担的重负。我们被抛入世界，没有借口可言。',
    'life.book.invisible-women.title': '看不见的女性',
    'life.book.invisible-women.author': '卡罗琳·克里亚多·佩雷斯',
    'life.book.invisible-women.category': '社会·性别',
    'life.book.invisible-women.note': '当女性不被计入数据，她们也就不被计入这个世界。',
    'life.book.western-thought.title': '西方现代思想讲义',
    'life.book.western-thought.author': '刘擎',
    'life.book.western-thought.category': '哲学·思想',
    'life.book.western-thought.note': '平庸之恶比极端邪恶更可怕，它藏在日复一日的"正常"里。',
    'life.book.garden-of-earth.title': '我与地坛',
    'life.book.garden-of-earth.author': '史铁生',
    'life.book.garden-of-earth.category': '文学·散文',
    'life.book.garden-of-earth.note': '死是一件不必急于求成的事，死是一个必然会降临的节日。',

    // Hobbies
    'life.hobby.musical.label': '音乐剧',
    'life.hobby.musical.desc':
      '从《剧院魅影》到《莫里哀》，从伦敦西区到塞纳河畔——没人逃得出音乐剧。法语音乐剧尤其迷人，有些东西语言不通也能穿过去。',
    'life.hobby.movie.label': '电影',
    'life.hobby.movie.desc':
      '在观影团观影——字幕播完才亮灯，没有人屏摄没有人大声议论。这群人真正热爱电影，我也在这里学会了怎么"看"一部电影。',
    'life.hobby.cook.label': '烘焙',
    'life.hobby.cook.desc':
      '川菜是母语，豆花烤鱼是DNA，但我也迷上了做新疆拌面和甜品。料理和写代码一样——细节决定成败，每一步都很重要。',
    'life.hobby.pet.label': '小宠',
    'life.hobby.pet.desc':
      '薯仔是真正的体育生，每天都在做引体，想方设法越狱。时不时会想，它越狱的行为是徒劳的，但就像西西弗斯一样，它是快乐的吧。',
    'life.hobby.tennis.label': '网球',
    'life.hobby.tennis.desc':
      '打网球让我重新理解了"活在当下"这件事。发球、回击、移动——场上的专注与心流和写代码时很像，但每一拍都无法重来。',
    'life.hobby.surf-skate.label': '陆冲',
    'life.hobby.surf-skate.desc':
      '从零自学，能慢慢滑走的时候，没想到会带着一群朋友刷10km绿道，更没想到曾让我摔到仰望的泵道，后来再陡我都能驾驭。',

    // Sports photos
    'life.photo.kl1': 'MiLP DUPR 12 战队赛 · 吉隆坡',
    'life.photo.kl2': '战队日常 · 吉隆坡',
    'life.photo.kl3': 'MiLP DUPR 14 战队赛 · 吉隆坡',
    'life.photo.chongqing': '厨房杯公开赛 · 重庆',
    'life.photo.shanghai': 'MiLP年终总决赛 · 上海',
    'life.photo.chengdu1': '战队日常 · 成都',
    'life.photo.chengdu2': 'Beesoul杯混双挑战赛 · 成都',

    'life.sports.teamRole': '匹克球战队 · 主理人',
    'life.sports.sponsored': '签约球员',
    'life.sports.motto':
      '以专业之心，敬业余之爱。用一块球场和一把球拍，认识了一群真正热爱这项运动的伙伴。',
    'life.reading.body': '那些与我们身处不同时代的朋友们，她们的生命与我们终究还是相连的。',
    'life.more.body': '每一种爱好都是理解世界的另一种语法。保持好奇，保持清醒。',

    // Contact
    'contact.kicker': '保持联系',
    'contact.title.line1': '一起写下',
    'contact.title.em': '下一章',
    'contact.lede':
      '如果你在寻找一位对代码质量有追求、对用户体验有感知的前端工程师，欢迎随时联系我，期待与你探索下一段旅程。',
    'contact.availability': '当前可接洽',

    // Vibe Projects
    'vibe.kicker': 'Vibe Coding',
    'vibe.title.prefix': '用 AI',
    'vibe.title.em': '一起构建',
    'vibe.lede':
      '下班之后，我用 AI 作为结对伙伴，把脑子里的想法变成真实运行的产品。这些项目有的已上线，有的正在搭建，有的还只是一颗种子。',
    'vibe.status.live': '已上线',
    'vibe.status.building': '开发中',
    'vibe.status.concept': '构思中',
    'vibe.action.visit': '访问网站',
    'vibe.action.repo': '查看代码',
    'vibe.action.docs': '查看文档',
    'vibe.comingSoon': '敬请期待',

    // Vibe cards
    'vibe.card.selinme.category': 'Portfolio Site',
    'vibe.card.selinme.title': 'selin.me',
    'vibe.card.selinme.desc': '现在浏览的这个网站，AI 辅助开发，从设计到代码全程协作完成。',
    'vibe.card.picklevibe.category': 'H5 · Building',
    'vibe.card.picklevibe.title': 'Pickle Vibe',
    'vibe.card.picklevibe.desc': '面向中文球友的匹克球内容平台。',
    'vibe.card.stillhearth.category': '独立游戏 · 像素风 · 构思中',
    'vibe.card.stillhearth.title': 'Stillhearth',
    'vibe.card.stillhearth.desc':
      '石头会滚下来，但我们还是会做明天的早餐。——像素风 RPG，在缓慢消失的世界里，用料理对抗遗忘。',

    // Work Showcase
    'showcase.kicker': '工作成果',
    'showcase.title.prefix': '真实上线的',
    'showcase.title.em': '产品',
    'showcase.lede': '参与并主导过的、真实服务于用户的产品。',
    'showcase.visit': '访问网站',
    'showcase.placeholder': '截图待补充',

    // Footer
    'footer.line': '用心打磨 · 部署于 GitHub Pages · © {year}',
  },
  en: {
    // Nav
    'nav.myStory': 'My Story',
    'nav.about': 'About Me',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.work': 'Work',
    'nav.vibe': 'Vibe',
    'nav.life': 'Life',
    'nav.hireMe': 'Hire Me',
    'nav.language': 'Language',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Selin',
    'hero.role.line1': 'Frontend',
    'hero.role.line2': 'Engineer',
    'hero.role': 'Frontend Engineer',
    'hero.lede':
      '5 years building high-quality interfaces — where engineering rigour meets design sensibility.',
    'hero.cta.readStory': 'Read my story',
    'hero.cta.contact': 'Contact me',
    'hero.years.label': 'Years of Experience',
    'hero.scroll': 'scroll',

    // About
    'about.kicker': 'About Me',
    'about.label.experience': 'Experience',
    'about.label.education': 'Education',
    'about.available': 'Available for work',
    'about.roleTitle': 'Frontend Engineer',
    'about.role.cit': 'Mid-Level Frontend Engineer',
    'about.role.qingcloud': 'Junior Frontend Engineer',
    'about.role.penge': 'Frontend Intern',
    'about.school': 'Chengdu College of UESTC',
    'about.degree': 'Bachelor of Computer Science and Technology (Top-up)',

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
    'skills.line.0': 'Code reviewed line by line.',
    'skills.line.1': 'UI felt pixel by pixel.',
    'skills.line.2': 'Details never left to chance.',

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
    'life.section.kicker': 'Life Beyond Screens',
    'life.nav.sports': 'PICKLEBALL',
    'life.nav.reading': 'READING',
    'life.nav.more': 'CURIOSITIES',

    // Books
    'life.book.siddhartha.title': 'Siddhartha',
    'life.book.siddhartha.author': 'Hermann Hesse',
    'life.book.siddhartha.category': 'Fiction',
    'life.book.siddhartha.note':
      'Each man must go through life alone, to be soiled, to take on guilt, to drink the bitter cup, and to find his way out.',
    'life.book.the-stranger.title': 'The Stranger',
    'life.book.the-stranger.author': 'Albert Camus',
    'life.book.the-stranger.category': 'Fiction',
    'life.book.the-stranger.note': 'I opened myself to the gentle indifference of the world.',
    'life.book.existentialism.title': 'Existentialism Is a Humanism',
    'life.book.existentialism.author': 'Jean-Paul Sartre',
    'life.book.existentialism.category': 'Philosophy',
    'life.book.existentialism.note':
      'We are left alone, without excuse. That is what I mean when I say man is condemned to be free.',
    'life.book.invisible-women.title': 'Invisible Women',
    'life.book.invisible-women.author': 'Caroline Criado Perez',
    'life.book.invisible-women.category': 'Society & Gender',
    'life.book.invisible-women.note':
      'When women are excluded from data, they are excluded from the world.',
    'life.book.western-thought.title': 'Lectures on Modern Western Thought',
    'life.book.western-thought.author': 'Liu Qing',
    'life.book.western-thought.category': 'Philosophy',
    'life.book.western-thought.note':
      'The banality of evil is more terrifying than extreme wickedness — it hides inside the ordinary routine of everyday life.',
    'life.book.garden-of-earth.title': 'I and the Garden of Earth',
    'life.book.garden-of-earth.author': 'Shi Tiesheng',
    'life.book.garden-of-earth.category': 'Essay',
    'life.book.garden-of-earth.note':
      'Death is not something to rush — it is a festival that will come in its own time.',

    // Hobbies
    'life.hobby.musical.label': 'Musical Theatre',
    'life.hobby.musical.desc':
      "From 《Phantom of the Opera》to 《Molière》, from London's West End to the Seine — no one escapes musical theatre. French musicals are especially captivating; some things cross language barriers entirely.",
    'life.hobby.movie.label': 'Film',
    'life.hobby.movie.desc':
      'Watching films with a cinema club — lights stay off until the last subtitle fades, no one films the screen, no one talks. These people truly love film, and I learned here how to really "watch" a movie.',
    'life.hobby.cook.label': 'Cooking',
    'life.hobby.cook.desc':
      "Sichuan cooking is my mother tongue and braised fish is in my DNA — but I've also fallen for Xinjiang noodles and pastry-making. Cooking is like coding: details matter, and every step counts.",
    'life.hobby.pet.label': 'Tiny Pet',
    'life.hobby.pet.desc':
      'Potato is a true athlete — doing pull-ups every day, endlessly plotting escape. I sometimes think his jailbreaks are futile, but like Sisyphus, he seems genuinely happy.',
    'life.hobby.tennis.label': 'Tennis',
    'life.hobby.tennis.desc':
      'Tennis taught me what "living in the moment" actually means. Serve, return, move — the focus and flow on court mirrors coding, but each shot is unrepeatable.',
    'life.hobby.surf-skate.label': 'Surf Skate',
    'life.hobby.surf-skate.desc':
      'Self-taught from scratch. Once I could glide steadily, I found myself cruising a 10 km greenway with friends — and conquering pump tracks that had once sent me flat on my back.',

    // Sports photos
    'life.photo.kl1': 'MiLP DUPR 12 · Kuala Lumpur',
    'life.photo.kl2': 'Team Life · Kuala Lumpur',
    'life.photo.kl3': 'MiLP DUPR 14 · Kuala Lumpur',
    'life.photo.chongqing': 'Kitchen Cup Open · Chongqing',
    'life.photo.shanghai': 'MiLP National Championship · Shanghai',
    'life.photo.chengdu1': 'Team Life · Chengdu',
    'life.photo.chengdu2': 'Beesoul Mixed Doubles Challenge · Chengdu',

    'life.sports.teamRole': 'Pickleball Team · Founder',
    'life.sports.sponsored': 'Sponsored Player',
    'life.sports.motto': 'Honoring amateur love with professional devotion. Twinkle on courts.',
    'life.reading.body':
      'Friends from another era — their lives and ours are still connected, across every page.',
    'life.more.body':
      'Every hobby is another way of making sense of the world. Stay curious, stay wide awake.',

    // Contact
    'contact.kicker': 'Get In Touch',
    'contact.title.line1': "Let's Write the",
    'contact.title.em': 'Next Chapter',
    'contact.lede':
      "If you're looking for a frontend engineer who cares about code quality and user experience, feel free to reach out. I'd love to explore the next journey with you.",
    'contact.availability': 'Open to new opportunities',

    // Vibe Projects
    'vibe.kicker': 'Vibe Coding Projects',
    'vibe.title.prefix': 'Building with',
    'vibe.title.em': 'AI',
    'vibe.lede':
      'After work, I pair-program with AI to turn ideas into real, running products. Some are live, some are being built, some are still seeds.',
    'vibe.status.live': 'Live',
    'vibe.status.building': 'Building',
    'vibe.status.concept': 'Concept',
    'vibe.action.visit': 'Visit Site',
    'vibe.action.repo': 'View Code',
    'vibe.action.docs': 'View Docs',
    'vibe.comingSoon': 'Coming soon',

    // Vibe cards
    'vibe.card.selinme.category': 'Portfolio Site',
    'vibe.card.selinme.title': 'selin.me',
    'vibe.card.selinme.desc':
      "This site you're looking at. Built with AI as a pair — from design to code, start to finish.",
    'vibe.card.picklevibe.category': 'H5 · Building',
    'vibe.card.picklevibe.title': 'Pickle Vibe',
    'vibe.card.picklevibe.desc':
      'A Pickleball content platform for Chinese players. Click any screenshot to view full size.',
    'vibe.card.stillhearth.category': 'Indie Game · Pixel RPG · Concept',
    'vibe.card.stillhearth.title': 'Stillhearth',
    'vibe.card.stillhearth.desc':
      'The boulder rolls back down. But we still make breakfast for tomorrow. — A Pixel RPG about cooking against forgetting in a world that slowly disappears.',

    // Work Showcase
    'showcase.kicker': 'Selected Work',
    'showcase.title.prefix': 'Products that',
    'showcase.title.em': 'Ship',
    'showcase.lede': 'Real products I helped build — live, in the wild, serving real users.',
    'showcase.visit': 'Visit Site',
    'showcase.placeholder': 'Screenshot coming soon',

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
