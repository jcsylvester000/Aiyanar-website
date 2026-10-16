import type { Article } from "./schema";

const padi = "PADI course standards (minimum ages, prerequisites, depth limits)";

export const learnArticles: Article[] = [
  {
    slug: "your-first-dive-discover-scuba",
    title: "Your first dive: what happens in a Discover Scuba session",
    description: "Never dived? Here’s what happens in a PADI Discover Scuba Diving session at Aiyanar, from the briefing to your first breath in our dive pool.",
    category: "learn-to-dive",
    published: "2026-10-16",
    hero: "padiClass",
    intro:
      "If you’ve ever wondered what it feels like to breathe underwater but weren’t ready to sign up for a full course, PADI Discover Scuba Diving is made for you. It’s a short, supervised taste of diving with a PADI instructor, and at Aiyanar it starts in our 15-ft sea-view dive pool.",
    sections: [
      {
        heading: "Before you get wet",
        paras: [
          "You’ll fill in a short medical questionnaire. Most people can dive, but a few conditions need a doctor’s sign-off first, so answer honestly and ask if you’re unsure.",
          "Your instructor then explains how the equipment works and what you’ll do in the water. It’s a conversation, not a lecture: ask anything.",
        ],
      },
      {
        heading: "Gearing up",
        paras: ["Your instructor helps you put on and adjust everything. You don’t need to bring any equipment."],
        list: ["Mask and fins", "A buoyancy control device (BCD), the jacket that holds your tank", "A regulator, the mouthpiece you breathe from", "A wetsuit if you’d like one"],
      },
      {
        heading: "Your first breath",
        paras: [
          "You start standing in shallow water, put your face in and breathe through the regulator. It feels strange for a few breaths, then surprisingly natural.",
          "When you’re comfortable, you’ll practise a few simple skills: clearing a little water from your mask, finding your regulator if it comes out of your mouth, and equalising your ears as you go deeper. Then you swim, with the sea right behind the pool wall.",
        ],
      },
      {
        heading: "Into the sea (optional)",
        paras: [
          "If you and your instructor are happy, you can make a shallow open-water dive in Anilao, staying close to your instructor the whole time. PADI limits Discover Scuba open-water dives to 12 metres.",
          "Loved it? Ask your instructor whether your session can count towards the PADI Open Water Diver course.",
        ],
      },
    ],
    offer: { slug: "first-breath", afterSection: 2 },
    faq: [
      { q: "How old do I have to be?", a: "PADI’s minimum age for Discover Scuba Diving is 10." },
      { q: "Do I need to be a strong swimmer?", a: "No. You need to be comfortable in the water. Your instructor is with you the whole time." },
      { q: "Do I need to bring anything?", a: "Just swimwear, a towel and sunscreen. We provide all the dive equipment." },
    ],
    pillar: { label: "Learn to dive at Aiyanar", href: "/learn/discover-scuba/" },
    sources: [padi],
    approved: true,
  },
  {
    slug: "padi-open-water-anilao-weekend",
    title: "PADI Open Water in Anilao: a weekend timeline from Manila",
    description: "How to get PADI Open Water certified in Anilao over a long weekend from Manila: eLearning first, pool skills, four open-water dives and your card.",
    category: "learn-to-dive",
    published: "2026-10-16",
    hero: "diveBriefing",
    intro:
      "The PADI Open Water Diver card lets you dive anywhere in the world to 18 metres with a buddy. Anilao is where most Filipino divers earn theirs, and with the theory done online first, you can finish the water part over a long weekend.",
    sections: [
      {
        heading: "Before you leave Manila",
        paras: [
          "Do the theory with PADI eLearning at your own pace on your phone or laptop. It’s the part people expect to dread and usually enjoy.",
          "Fill in the medical questionnaire early. If any answer needs a doctor’s sign-off, you’ll have time to get it.",
        ],
      },
      {
        heading: "Getting here",
        paras: [
          "Aiyanar is about two and a half hours from Metro Manila by road. Friday evenings can add an hour or more, so leave early if you can, or arrive Thursday night.",
        ],
      },
      {
        heading: "Day 1: the dive pool",
        paras: [
          "You’ll learn and practise the core skills in our 15-ft dive pool: breathing, mask clearing, buoyancy and what to do if something goes wrong. The pool means you can repeat a skill until it feels easy, whatever the weather.",
        ],
      },
      {
        heading: "Days 2–3: four open-water dives",
        paras: [
          "With the skills in hand, you’ll make four open-water dives in Anilao with your instructor, usually two a day, repeating the skills on the reef and then simply enjoying the dive.",
          "Most people need three to four days in total. With eLearning finished before you arrive, a long weekend is enough.",
        ],
      },
      {
        heading: "After you’re certified",
        paras: ["Allow time before flying after diving, and log your dives. Then plan the next one: Advanced Open Water is two more days."],
      },
    ],
    offer: { slug: "first-breath", afterSection: 2 },
    faq: [
      { q: "Can I do Open Water in a weekend?", a: "Yes, if you finish PADI eLearning before you arrive. Allow three to four days if you do the theory here." },
      { q: "What swimming do I need?", a: "You’ll swim 200 metres (or 300 metres with mask, fins and snorkel) without a time limit, and float or tread water for 10 minutes." },
    ],
    pillar: { label: "PADI Open Water at Aiyanar", href: "/learn/open-water/" },
    sources: [padi, "Blue Ribbon Divers, How to get to Anilao (2026-03-10)"],
    approved: true,
  },
  {
    slug: "not-a-strong-swimmer-learn-to-dive",
    title: "“I’m not a strong swimmer”: can I still learn to dive?",
    description: "Not a confident swimmer? You can still try scuba. What PADI asks of you for Discover Scuba and Open Water, and how our dive pool makes starting easier.",
    category: "learn-to-dive",
    published: "2026-10-16",
    hero: "poolDay",
    intro:
      "It’s the question we hear most from people standing at the edge of the pool. The honest answer: you don’t need to be a strong swimmer to try diving, and the swimming needed for certification is more about comfort than speed.",
    sections: [
      {
        heading: "Trying diving: comfort, not laps",
        paras: [
          "For PADI Discover Scuba Diving you need to be comfortable in the water. There’s no swim test, and your instructor stays beside you the whole time.",
          "Most of diving isn’t swimming at all. With the right weight and buoyancy, you hover and move slowly with your fins.",
        ],
      },
      {
        heading: "Getting certified: what PADI asks",
        paras: ["For the Open Water Diver course you’ll show two basic water skills. Neither is timed."],
        list: ["Swim 200 metres, or 300 metres with mask, fins and snorkel, using any stroke", "Float or tread water for 10 minutes"],
      },
      {
        heading: "Why our dive pool helps",
        paras: [
          "Our 15-ft dive pool is calm, clear and right by the sea. You can stand up in the shallow part, take your time, and repeat a skill until it feels easy before you ever get on a boat.",
          "The water in Anilao is 26–29 °C year-round, which helps nervous beginners relax.",
        ],
      },
      {
        heading: "How to get more comfortable",
        paras: ["A little practice before your trip goes a long way."],
        list: ["Swim a few relaxed lengths a week, any stroke", "Practise floating on your back", "Snorkel with a mask and fins to get used to breathing with your face in the water", "Start with Discover Scuba, then decide"],
      },
    ],
    offer: { slug: "first-breath", afterSection: 2 },
    faq: [
      { q: "Is the swim test timed?", a: "No. The Open Water swim and float are about comfort, not speed." },
      { q: "Can I try diving if I can’t swim at all?", a: "Talk to us first. Your instructor will help you decide whether Discover Scuba is right for you." },
    ],
    pillar: { label: "Learn to dive at Aiyanar", href: "/learn/" },
    sources: [padi],
    approved: true,
  },
  {
    slug: "kids-and-scuba-ages-courses-safety",
    title: "Kids and scuba: ages, courses and safety",
    description: "When can children start scuba diving? PADI minimum ages, junior depth limits, and how families learn together at Aiyanar in Anilao.",
    category: "learn-to-dive",
    published: "2026-10-16",
    hero: "padiClass",
    intro:
      "Diving is one of the few adventures a family can share at every level, and children often take to it faster than their parents. Here’s what to know before your young diver takes the plunge.",
    sections: [
      {
        heading: "Minimum ages",
        paras: [
          "PADI’s minimum age for Discover Scuba Diving and the Junior Open Water Diver course is 10. Ask us about programmes for younger children.",
        ],
      },
      {
        heading: "Junior depth limits",
        paras: ["Junior divers dive shallower and with an adult, under PADI standards."],
        list: ["Ages 10–11: to 12 metres, with a parent, guardian or PADI professional", "Ages 12–14: to 18 metres, with a certified adult", "At 15, the junior card can be upgraded to a standard Open Water Diver card"],
      },
      {
        heading: "Is my child ready?",
        paras: [
          "Age is only part of it. A child should be comfortable in the water, able to follow instructions, and genuinely want to try. A short medical questionnaire is required, signed by a parent or guardian.",
          "Starting in a pool helps. Children can stand up, take breaks and build confidence before an open-water dive.",
        ],
      },
      {
        heading: "Making it a family weekend",
        paras: [
          "While one child learns, younger siblings can splash in the kids’ pool and non-diving parents can relax by the infinity pool. Everyone meets at the Sundeck Bar for sunset.",
        ],
      },
    ],
    offer: null,
    faq: [
      { q: "Can my child dive with me?", a: "Yes, once certified, within the junior depth limits and with a certified adult. Ages 10–11 dive with a parent, guardian or PADI professional." },
      { q: "Is scuba safe for children?", a: "With the right age, training and supervision, yes. Every course starts with a medical questionnaire and pool practice." },
    ],
    pillar: { label: "Kids & teens courses", href: "/learn/kids-and-teens/" },
    sources: [padi],
    approved: true,
  },
];
