/* ==========================================================================
   LearnAIQ Master Application Logic (Vanilla JavaScript)
   Support: English & Telugu Full Page Localization, Student Login & Pricing
   Includes: Automated Hero Background Slideshow & K-12 Expanding Classes Roadmap
   ========================================================================== */

// --- 1. CURRICULUM DATABASE (English & Telugu) ---
const CURRICULUM_DATA = {
  1: {
    Maths: [
      { id: 'c1_m1', title: { en: 'Numbers and Counting', te: 'అంకెలు మరియు లెక్కించడం' }, desc: { en: 'Learn to count 1 to 100 with fun fruits, stars and animal counters.', te: 'పండ్లు, నక్షత్రాలు మరియు జంతువుల బొమ్మలతో 1 నుండి 100 వరకు లెక్కించడం నేర్చుకోండి.' }, icon: '🔢' },
      { id: 'c1_m2', title: { en: 'Addition and Subtraction', te: 'కూడికలు మరియు తీసివేతలు' }, desc: { en: 'Add and subtract single digit numbers using friendly visual blocks.', te: 'బొమ్మల సాయంతో ఒక అంకె కూడికలు మరియు తీసివేతలు సులభంగా చేయండి.' }, icon: '➕' },
      { id: 'c1_m3', title: { en: 'Shapes and Patterns', te: 'ఆకారాలు మరియు నమూనాలు' }, desc: { en: 'Discover circles, squares, triangles, and repeating color patterns.', te: 'వృత్తాలు, చతురస్రాలు, త్రిభుజాలు మరియు రంగుల నమూనాలు తెలుసుకోండి.' }, icon: '🔷' },
      { id: 'c1_m4', title: { en: 'Measurement', te: 'కొలతలు (Measurement)' }, desc: { en: 'Compare big vs small, tall vs short, and heavy vs light objects.', te: 'పెద్దది vs చిన్నది, పొడవైనది vs పొట్టిది, బరువైనది పోల్చడం.' }, icon: '📏' }
    ],
    Science: [
      { id: 'c1_s1', title: { en: 'My Body', te: 'నా శరీరం (My Body)' }, desc: { en: 'Learn about your eyes, ears, hands, legs and how your body works.', te: 'కళ్ళు, చెవులు, చేతులు, కాళ్ళు మరియు మన శరీరం పనిచేసే విధానం.' }, icon: '🖐️' },
      { id: 'c1_s2', title: { en: 'Plants Around Us', te: 'మన చుట్టూ ఉన్న మొక్కలు' }, desc: { en: 'Discover leaves, flowers, trees, and how plants grow in sunlight.', te: 'ఆకులు, పూలు, చెట్లు మరియు సూర్యరశ్మితో మొక్కలు ఎలా పెరుగుతాయో చూడండి.' }, icon: '🌱' },
      { id: 'c1_s3', title: { en: 'Animals Around Us', te: 'మన చుట్టూ ఉన్న జంతువులు' }, desc: { en: 'Meet pets, farm animals, wild animals, and the sounds they make.', te: 'పెంపుడు జంతువులు, అడవి జంతువులు మరియు వాటి శబ్దాలు.' }, icon: '🐶' },
      { id: 'c1_s4', title: { en: 'Water and Its Uses', te: 'నీరు మరియు దాని ఉపయోగాలు' }, desc: { en: 'Why we drink water, how animals use water, and saving clean water.', te: 'మనం నీరు ఎందుకు తాగుతాం, నీటిని ఎలా పొదుపు చేయాలో నేర్చుకోండి.' }, icon: '💧' }
    ]
  },
  2: {
    Maths: [
      { id: 'c2_m1', title: { en: 'Place Value and Numbers', te: 'స్థాన విలువలు (Place Value)' }, desc: { en: 'Understand Ones, Tens, and Hundreds with easy bundle blocks.', te: 'ఒకట్లు, పదులు, వందల స్థాన విలువలను కట్టల బొమ్మలతో అర్థం చేసుకోండి.' }, icon: '💯' },
      { id: 'c2_m2', title: { en: 'Addition and Subtraction', te: 'రెండు అంకెల కూడికలు' }, desc: { en: 'Two-digit addition and subtraction with regrouping made simple.', te: 'రెండు అంకెల కూడికలు మరియు దశాంశాల తీసివేతలు.' }, icon: '🧮' },
      { id: 'c2_m3', title: { en: 'Multiplication and Division', te: 'హెచ్చవేతలు మరియు భాగాహారాలు' }, desc: { en: 'Repeated addition, equal grouping, and fun multiplication tables.', te: 'గుణకారం, సమాన భాగాలు చేయడం మరియు ఎక్కాలు.' }, icon: '✖️' },
      { id: 'c2_m4', title: { en: 'Time and Money', te: 'సమయం మరియు డబ్బు' }, desc: { en: 'Reading clock hands, morning/night, and counting rupees & coins.', te: 'గడియారం ముల్లు చూడటం, రూపాయలు మరియు నాణేలు లెక్కించడం.' }, icon: '⏰' }
    ],
    Science: [
      { id: 'c2_s1', title: { en: 'Living and Non-Living Things', te: 'సజీవులు మరియు నిర్జీవులు' }, desc: { en: 'Things that breathe, grow, and move vs objects that stay still.', te: 'గాలి పీల్చేవి, పెరిగేవి (సజీవులు) vs కదలని వస్తువులు (నిర్జీవులు).' }, icon: '🦋' },
      { id: 'c2_s2', title: { en: 'Parts of a Plant', te: 'మొక్క యొక్క భాగాలు' }, desc: { en: 'Explore roots, stems, leaves, flowers, and fruits in detail.', te: 'వేర్లు, కాండం, ఆకులు, పువ్వులు మరియు కాయల గురించిన వివరణ.' }, icon: '🌻' },
      { id: 'c2_s3', title: { en: 'Animals and Their Habitats', te: 'జంతువులు - నివాసాలు' }, desc: { en: 'Where animals live: land, water, nests, burrows, and trees.', te: 'జంతువులు ఎక్కడ నివసిస్తాయి: గుళ్ళు, చెట్లు, నీరు మరియు తొర్రలు.' }, icon: '🦁' },
      { id: 'c2_s4', title: { en: 'Food and Nutrition', te: 'ఆహారం మరియు పోషణ' }, desc: { en: 'Healthy fruits, vegetables, milk, and energy-giving foods.', te: 'ఆరోగ్యకరమైన పండ్లు, కూరగాయలు, పాలు మరియు శక్తినిచ్చే ఆహారం.' }, icon: '🍎' }
    ]
  },
  3: {
    Maths: [
      { id: 'c3_m1', title: { en: 'Multiplication and Division', te: 'గుణకారం మరియు భాగాహారం' }, desc: { en: 'Multi-digit multiplication, sharing equally, and long division steps.', te: 'పెద్ద సంఖ్యల గుణకారం మరియు సమాన పంపిణీ పద్ధతులు.' }, icon: '➗' },
      { id: 'c3_m2', title: { en: 'Fractions', te: 'భిన్నాలు (Fractions)' }, desc: { en: 'Halves, thirds, quarters, pizza slice examples, and equal parts.', te: 'సగాలు, మూడవ వంతులు, పావు వంతులు, పిజ్జా ముక్కల ఉదాహరణలు.' }, icon: '🍕' },
      { id: 'c3_m3', title: { en: 'Geometry and Shapes', te: 'జ్యామితి మరియు ఆకారాలు' }, desc: { en: '2D & 3D shapes, edges, vertices, lines, and symmetry patterns.', te: '2D & 3D ఆకారాలు, అంచులు, మూలలు మరియు సౌష్టవ నమూనాలు.' }, icon: '📐' },
      { id: 'c3_m4', title: { en: 'Measurement', te: 'కొలతలు (మీటర్లు & కిలోలు)' }, desc: { en: 'Measuring length in meters, weight in kg, and capacity in liters.', te: 'పొడవును మీటర్లలో, బరువును కిలోలలో, ద్రవాలను లీటర్లలో కొలవడం.' }, icon: '⚖️' }
    ],
    Science: [
      { id: 'c3_s1', title: { en: 'Human Body and Health', te: 'మానవ శరీరం మరియు ఆరోగ్యం' }, desc: { en: 'Organ systems: digestive system, lungs, heart, and clean habits.', te: 'జీర్ణవ్యవస్థ, ఊపిరితిత్తులు, గుండె మరియు పరిశుభ్రత అలవాట్లు.' }, icon: '🫀' },
      { id: 'c3_s2', title: { en: 'Plants and Their Needs', te: 'మొక్కల అవసరాలు' }, desc: { en: 'Photosynthesis, how roots absorb water, and seed germination.', te: 'కిరణజన్య సంయోగక్రియ, వేర్లు నీటిని పీల్చుకోవడం, విత్తన మొలక.' }, icon: '🪴' },
      { id: 'c3_s3', title: { en: 'States of Matter', te: 'పదార్థాల స్థితులు' }, desc: { en: 'Solids, liquids, and gases — ice, water, and steam experiments.', te: 'ఘన, ద్రవ, వాయు స్థితులు — మంచు, నీరు మరియు ఆవిరి ప్రయోగాలు.' }, icon: '🧊' },
      { id: 'c3_s4', title: { en: 'Force and Motion', te: 'బలం మరియు చలనం' }, desc: { en: 'Push, pull, friction, gravity, and how objects speed up or stop.', te: 'నెట్టడం, లాగడం, ఘర్షణ, గురుత్వాకర్షణ మరియు వస్తువుల కదలిక.' }, icon: '🚀' }
    ]
  },
  4: {
    Maths: [
      { id: 'c4_m1', title: { en: 'Decimals and Place Values', te: 'దశాంశాలు మరియు స్థాన విలువలు' }, desc: { en: 'Tenths, hundredths, decimal addition, and money calculations.', te: 'దశాంశాలు, వందవ వంతులు, కూడికలు మరియు కరెన్సీ లెక్కలు.' }, icon: '🪙' },
      { id: 'c4_m2', title: { en: 'Advanced Multiplication & Division', te: 'పెద్ద సంఖ్యల హెచ్చవేతలు & భాగాహారాలు' }, desc: { en: 'Long division algorithms, remainders, and multi-step word problems.', te: 'సుదీర్ఘ భాగాహారాలు, శేషం మరియు సమస్యల పరిష్కారం.' }, icon: '➗' },
      { id: 'c4_m3', title: { en: 'Perimeter and Area', te: 'చుట్టుకొలత మరియు వైశాల్యం' }, desc: { en: 'Calculating boundary lengths and square grid areas of shapes.', te: 'చుట్టుకొలత మరియు చతురస్రాల వైశాల్యం కనుగొనడం.' }, icon: '📐' },
      { id: 'c4_m4', title: { en: 'Data Handling and Bar Graphs', te: 'డేటా మరియు బార్ గ్రాఫ్‌లు' }, desc: { en: 'Tally marks, reading pictographs, and bar graph representations.', te: 'ట్యాగ్‌లు, పిక్టోగ్రాఫ్‌లు మరియు బార్ గ్రాఫ్‌లను అర్థం చేసుకోవడం.' }, icon: '📊' }
    ],
    Science: [
      { id: 'c4_s1', title: { en: 'Ecosystems & Food Chains', te: 'ఆవరణ వ్యవస్థలు & ఆహార శృంఖలాలు' }, desc: { en: 'Producers, consumers, decomposers, and energy flow in nature.', te: 'ఉత్పత్తిదారులు, వినియోగదారులు మరియు ప్రకృతిలో శక్తి ప్రవాహం.' }, icon: '🌿' },
      { id: 'c4_s2', title: { en: 'Water Cycle & Weather', te: 'నీటి చక్రం & వాతావరణం' }, desc: { en: 'Evaporation, condensation, precipitation, and seasonal weather.', te: 'భాష్పీభవనం, సాంద్రీకరణ, వర్షం మరియు ఋతువులు.' }, icon: '🌧️' },
      { id: 'c4_s3', title: { en: 'Rocks, Soil & Minerals', te: 'రాళ్ళు, నేల & ఖనిజాలు' }, desc: { en: 'Types of soil, rock formation, erosion, and soil conservation.', te: 'నేల రకాలు, రాళ్ళు ఏర్పడటం, క్రమక్షయం మరియు నేల రక్షణ.' }, icon: '🪨' },
      { id: 'c4_s4', title: { en: 'Solar System & Earth', te: 'సౌర కుటుంబం & భూమి' }, desc: { en: 'Planets, sun, moon phases, earth rotation, and day & night.', te: 'గ్రహాలు, సూర్యుడు, చంద్రుని కళలు, భూభ్రమణం మరియు రోజు-రాత్రి.' }, icon: '🪐' }
    ]
  },
  5: {
    Maths: [
      { id: 'c5_m1', title: { en: 'Factors, Multiples & Primes', te: 'కారణాంకాలు, గుణిజాలు & ప్రధాన సంఖ్యలు' }, desc: { en: 'LCM, HCF, prime factorization, and divisibility rules.', te: 'క.సా.గు, గ.సా.భా, ప్రధాన కారణాంకాలు మరియు భాజ్యతా సూత్రాలు.' }, icon: '🔢' },
      { id: 'c5_m2', title: { en: 'Pre-Algebra & Equations', te: 'అల్జీబ్రా పరిచయం & సమీకరణాలు' }, desc: { en: 'Variables, simple algebraic expressions, and solving for X.', te: 'చరరాశులు, చిన్న సమీకరణాలు మరియు X విలువను కనుగొనడం.' }, icon: '🔣' },
      { id: 'c5_m3', title: { en: 'Angles & Polygons', te: 'కోణాలు, త్రిభుజాలు & బహుభుజులు' }, desc: { en: 'Acute, right, obtuse angles, protractor use, and triangle rules.', te: 'లంబకోణం, లఘుకోణం, ప్రొట్రాక్టర్ వాడకం మరియు త్రిభుజ సూత్రాలు.' }, icon: '📐' },
      { id: 'c5_m4', title: { en: 'Percentages & Profit/Loss', te: 'శాతాలు & లాభ నష్టాలు' }, desc: { en: 'Calculating percentages, discounts, cost price, and selling price.', te: 'శాతాలు లెక్కించడం, డిస్కౌంట్లు, కొన్న వెల మరియు అమ్మిన వెల.' }, icon: '🏷️' }
    ],
    Science: [
      { id: 'c5_s1', title: { en: 'Atmosphere & Air Pressure', te: 'వాతావరణం & గాలి పీడనం' }, desc: { en: 'Layers of atmosphere, oxygen cycle, and air pressure experiments.', te: 'వాతావరణ పొరలు, ఆక్సిజన్ చక్రం మరియు గాలి పీడనం.' }, icon: '🌬️' },
      { id: 'c5_s2', title: { en: 'Simple Machines & Energy', te: 'సరళ యంత్రాలు & శక్తి రకాలు' }, desc: { en: 'Levers, pulleys, inclined planes, kinetic & potential energy.', te: 'నెట్టు బల్లలు, చక్రాలు, కప్పీలు మరియు శక్తి రకాలు.' }, icon: '⚙️' },
      { id: 'c5_s3', title: { en: 'Nervous & Circulatory Systems', te: 'నరాల & రక్తప్రసరణ వ్యవస్థలు' }, desc: { en: 'Brain, spinal cord, nerves, heart chambers, and blood flow.', te: 'మెదడు, వెన్నుపాము, నరాలు, గుండె గదులు మరియు రక్తప్రసరణ.' }, icon: '🧠' },
      { id: 'c5_s4', title: { en: 'Universe & Space Science', te: 'విశ్వం, నక్షత్రాలు & రోదసి విజ్ఞానం' }, desc: { en: 'Galaxies, constellations, satellites, and space exploration rockets.', te: 'గెలాక్సీలు, నక్షత్రరాశులు, ఉపగ్రహాలు మరియు రాకెట్లు.' }, icon: '🌌' }
    ]
  }
};

// --- 2. FULL UI TRANSLATION DICTIONARY (English & Telugu) ---
const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_classes: "Classes",
    nav_subjects: "Subjects",
    nav_tutor: "AI Tutor",
    nav_pricing: "Pricing",
    nav_reviews: "Reviews",
    btn_login: "Student Login",
    btn_free_trial_top: "Start Free Trial",
    hero_badge: "KG to Class 12 Learning Companion",
    hero_heading: 'Learning Made Simple with <span class="text-gradient">LearnAIQ</span>',
    hero_subtitle: "Your friendly AI tutor that grows with your child from KG to Class 12. Starts with Class 1–3 today with higher classes expanding soon!",
    btn_start_trial: "Start 7-Day Free Trial",
    btn_explore_classes: "Explore Classes",
    trust_trial: "7-Day Free Trial",
    trust_lang: "English & Telugu",
    trust_safe: "Safe & Encouraging",
    fc_ai_title: "AI Powered",
    fc_ai_desc: "Adapts in real time",
    fc_exp_title: "Simple Explanations",
    fc_exp_desc: "Visual pizza & stories",
    fc_trial_title: "7-Day Free Trial",
    fc_trial_desc: "Class 1 from $10/mo",
    tutor_status_sub: "Ready in English & Telugu",
    hero_user_msg: '"What is a fraction?"',
    hero_ai_msg: '"A <strong>fraction</strong> shows a part of a whole! 🍕 Imagine a pizza cut into 4 equal slices. If you eat 1 slice, you ate <strong>1/4</strong> of the pizza!"',
    chip_ex: "🔍 Show Example",
    chip_simple: "🧩 Explain Simply",
    chip_try: "🎯 Try Practice",
    banner_title: "Fun Visual Learning For Young Explorers 🌈",
    banner_desc: "Kids learn best when concepts come alive! LearnAIQ uses animated visuals, stories, and voice interactions to make every lesson exciting.",
    btn_banner_action: "Join Free For 7 Days",
    step_1_tag: "Step 01",
    classes_title: "Choose Your Class",
    classes_subtitle: "Active classes for primary students, with higher grades expanding continuously!",
    c1_title: "Class 1",
    c1_tagline: '"Build your basics"',
    c1_desc: "Counting numbers, simple addition, basic shapes, body parts, plants, animals, and water.",
    c2_title: "Class 2",
    c2_tagline: '"Learn and explore"',
    c2_desc: "Place value, multiplication, time & money, living things, habitats, and nutrition.",
    c3_title: "Class 3",
    c3_tagline: '"Strengthen your concepts"',
    c3_desc: "Fractions, geometry, measurement, states of matter, force & motion, and body systems.",
    btn_start_learning: "Start Learning",
    upcoming_badge: "🚀 Growing With Your Child",
    upcoming_roadmap_title: "Higher Classes Expanding Soon (Class 4 to Class 12)",
    upcoming_roadmap_desc: "LearnAIQ is designed to stay with your child throughout their school journey — meeting them at every stage from KG all the way to Class 12.",
    c4_title: "Class 4 — Decimals & Ecosystems",
    c4_desc: "Advanced long division, decimals, perimeter, area, food chains & energy cycles.",
    c5_title: "Class 5 — Pre-Algebra & Space Science",
    c5_desc: "Factors, multiples, prime numbers, solar system, atmosphere & simple machines.",
    c6_12_title: "Class 6 to Class 12 Journey",
    c6_12_desc: "Physics, Chemistry, Biology, Advanced Algebra & Calculus with personalized AI guidance.",
    btn_notify: "🔔 Pre-Register Student",
    step_2_tag: "Step 02",
    subjects_title: "What Do You Want to Learn?",
    subjects_subtitle: "Pick a subject to explore curated topics with your AI tutor.",
    maths_title: "MATHS",
    maths_desc: "Learn numbers, calculations, shapes and more with simple step-by-step explanations.",
    maths_pill: "🔢 Numbers, Shapes & Fractions",
    science_title: "SCIENCE",
    science_desc: "Explore plants, animals, matter, the human body and the world around you.",
    science_pill: "🌱 Nature, Body & Forces",
    step_3_tag: "Step 03",
    chapter_section_title: "Class 1 — Maths Chapters",
    chapter_section_subtitle: "Select any chapter to begin an interactive session with your AI Tutor.",
    tutor_tag: "Interactive Preview",
    tutor_title: "Meet Your AI Tutor",
    tutor_subtitle: "Ask questions, learn step-by-step, and understand difficult concepts with simple explanations.",
    tutor_active_status: "🟢 Active & Ready",
    quick_prompts_heading: "Quick Prompts",
    btn_ask_q: "Ask a Question",
    btn_exp_simple: "Explain Simply",
    btn_give_ex: "Give an Example",
    btn_practice: "Practice",
    read_aloud_toggle: "Read Aloud (Voice)",
    encouraging_toggle: "Encouraging Tone",
    guardian_toggle: "Safety Guardian",
    adaptive_pace_badge: "✨ Adaptive Pace: Balanced",
    tutor_welcome_msg: "Hi there! 👋 I'm your LearnAIQ Tutor. What would you like to explore today? You can ask me anything about <strong>Fractions</strong> or pick a quick question below!",
    btn_send: "Send",
    pricing_tag: "Transparent Pricing",
    pricing_title: "Start Free, Upgrade As Your Child Grows",
    pricing_subtitle: "Every plan starts with a <strong>1-Week FREE Trial</strong>. Class 1 starts at $10/month with a $5 increment for each higher class as your child grows.",
    reviews_tag: "Parent & Student Love",
    reviews_title: "Loved By Kids & Trusted By Parents",
    reviews_subtitle: "See how LearnAIQ is helping students master Maths and Science with confidence across the globe.",
    rating_label: "Average Global Rating",
    metric_users: "Worldwide Students 🌍",
    metric_satisfaction: "Parent Satisfaction",
    metric_langs: "English & Telugu",
    btn_write_review: "✍️ Write a Review",
    final_cta_title: "Ready to Start Learning with LearnAIQ?",
    final_cta_desc: "Start your 7-Day Free Trial today. Give your child a personal AI tutor in English & Telugu!",
    btn_start_trial_now: "Start Free Trial Now",
    footer_desc: "Making learning simple with AI. Personal guidance across Maths and Science for Class 1 to Class 12 students.",
    footer_nav_heading: "Navigation",
    footer_classes_heading: "Classes Roadmap",
    footer_pricing_heading: "Trial & Pricing",
    pricing_link: "7-Day Free Trial",
    reviews_link: "4.7★ Student Reviews",
    footer_heart: "Built with ❤️ for every young learner in English & Telugu.",
    tab_login: "Student Log In",
    tab_signup: "Sign Up (Free Trial)",
    modal_login_head: "Welcome Back!",
    modal_login_subhead: "Enter your 3 details to access your account.",
    modal_signup_head: "Create New Student Account",
    modal_signup_subhead: "Start your 7-Day FREE Trial on LearnAIQ instantly!",
    lbl_name: "Full Name",
    lbl_username: "Username",
    lbl_phone: "Mobile Number",
    lbl_password: "Password",
    lbl_select_class: "Select Class",
    btn_login_submit: "Log In to LearnAIQ",
    btn_start_trial_submit: "Start 7-Day Free Trial Now",
    how_learn_title: "💡 How Students Learn with LearnAIQ AI Tutor",
    how_learn_subtitle: "Experience a revolutionary, personalized learning journey built specifically for young minds.",
    hl_step1_title: "1. Visual Step-by-Step Concepts",
    hl_step1_desc: "Every complex topic is broken down using fun real-life visuals (like pizza slices for fractions, chocolate bars for sharing)!",
    hl_step2_title: "2. Bilingual Voice Assistance",
    hl_step2_desc: "Listen to lessons read aloud in English & Telugu with natural pronunciation and supportive audio explanations.",
    hl_step3_title: "3. Adaptive Practice & Safety",
    hl_step3_desc: "Interactive quizzes adjust to your child's pace with an encouraging tone and built-in safety guardian protection.",
    btn_launch_tutor_cta: "🚀 Log In or Start Free Trial to Launch AI Tutor",
    btn_back_home: "Back to Landing Page",
    modal_review_title: "Write a Review",
    modal_review_subtitle: "Share your experience with LearnAIQ!",
    lbl_rev_name: "Your Name",
    lbl_rev_rating: "Rating (Stars)",
    lbl_rev_comment: "Your Review / Feedback",
    btn_submit_review: "Submit Review",
    rev_1_text: '"My daughter in Class 2 used to fear Maths addition. LearnAIQ explained it using pizza slices and Telugu audio! She now loves practice time."',
    rev_1_name: "Srinivas Rao",
    rev_1_sub: "Parent of Class 2 Student (Hyderabad)",
    rev_2_text: '"The \'Explain Why\' feature is pure gold! It doesn’t just ask for a multiple-choice answer, it checks if my son actually understands the concept."',
    rev_2_name: "Anitha Sharma",
    rev_2_sub: "Primary School Teacher & Parent",
    rev_3_text: '"I love listening to the AI tutor read aloud in Telugu! The fractions lesson with cake slices was so much fun."',
    rev_3_name: "Karthik (Age 8)",
    rev_3_sub: "Class 3 Student (Visakhapatnam)"
  },
  te: {
    nav_home: "హోమ్",
    nav_classes: "తరగతులు",
    nav_subjects: "సబ్జెక్టులు",
    nav_tutor: "ఏఐ ట్యూటర్",
    nav_pricing: "ధరలు",
    nav_reviews: "సమీక్షలు",
    btn_login: "విద్యార్థి లాగిన్",
    btn_free_trial_top: "ఉచిత ట్రయల్ ప్రారంభించండి",
    hero_badge: "KG నుండి 12వ తరగతి వరకు లెర్నింగ్ భాగస్వామి",
    hero_heading: '<span class="text-gradient">LearnAIQ</span> తో చదువు సులభం మరియు సరదా',
    hero_subtitle: "KG నుండి 12వ తరగతి వరకు మీ చిన్నారితో ప్రయాణించే ఏఐ ట్యూటర్. 1–3 తరగతులతో ప్రారంభించండి, త్వరలోనే ఉన్నత తరగతులు లభ్యం!",
    btn_start_trial: "7 రోజుల ఉచిత ట్రయల్ ప్రారంభించండి",
    btn_explore_classes: "తరగతులను పరిశీలించండి",
    trust_trial: "7 రోజుల ఉచిత ట్రయల్",
    trust_lang: "ఇంగ్లీష్ & తెలుగు",
    trust_safe: "సురక్షితమైన & ప్రోత్సాహకరమైన",
    fc_ai_title: "ఏఐ శక్తిమంతం",
    fc_ai_desc: "రియల్ టైమ్‌లో మారే బోధన",
    fc_exp_title: "సులభమైన వివరణలు",
    fc_exp_desc: "పిజ్జా బొమ్మలు & కథలు",
    fc_trial_title: "7 రోజుల ఉచిత ట్రయల్",
    fc_trial_desc: "1వ తరగతి $10/నెల నుండి",
    tutor_status_sub: "ఇంగ్లీష్ & తెలుగులో సిద్ధంగా ఉంది",
    hero_user_msg: '"భిన్నం (Fraction) అంటే ఏమిటి?"',
    hero_ai_msg: '"భిన్నం అంటే ఒక పూర్ణ భాగంలో కొంత భాగం! 🍕 4 సమాన భాగాలుగా కోసిన పిజ్జాలో మీరు 1 ముక్క తింటే, మీరు పిజ్జాలో <strong>1/4</strong> భాగం తిన్నట్లు!"',
    chip_ex: "🔍 ఉదాహరణ చూపించు",
    chip_simple: "🧩 సులభంగా వివరించు",
    chip_try: "🎯 ప్రాక్టీస్ చేయి",
    banner_title: "చిన్నపిల్లల కోసం సరదా దృశ్య విద్య 🌈",
    banner_desc: "కథలు, చిత్రాలు మరియు ఆడియోల ద్వారా పిల్లలు సైన్స్ మరియు మ్యాథ్స్ ఎంతో వేగంగా నేర్చుకుంటారు.",
    btn_banner_action: "7 రోజులు ఉచితంగా చేరండి",
    step_1_tag: "దశ 01",
    classes_title: "మీ తరగతిని ఎంచుకోండి",
    classes_subtitle: "1 నుండి 3 తరగతులు అందుబాటులో ఉన్నాయి, ఉన్నత తరగతులు త్వరలో రాబోతున్నాయి!",
    c1_title: "1 వ తరగతి",
    c1_tagline: '"పునాది బలపరుచుకోండి"',
    c1_desc: "అంకెలు లెక్కించడం, కూడికలు, ఆకారాలు, మన శరీర భాగాలు, మొక్కలు మరియు జంతువులు.",
    c2_title: "2 వ తరగతి",
    c2_tagline: '"నేర్చుకుని అన్వేషించండి"',
    c2_desc: "స్థాన విలువలు, హెచ్చవేతలు, సమయం & డబ్బు, ప్రాణుల గృహాలు, ఆహారం.",
    c3_title: "3 వ తరగతి",
    c3_tagline: '"పాఠ్యాంశాలపై పట్టు సాధించండి"',
    c3_desc: "భిన్నాలు, జ్యామితి, పదార్థాల స్థితులు, బలం & చలనం, జీర్ణవ్యవస్థ.",
    btn_start_learning: "నేర్చుకోవడం ప్రారంభించండి",
    upcoming_badge: "🚀 మీ చిన్నారితో పాటు పెరిగే పాఠాలు",
    upcoming_roadmap_title: "ఉన్నత తరగతులు త్వరలోనే రాబోతున్నాయి (4 నుండి 12వ తరగతి)",
    upcoming_roadmap_desc: "KG నుండి 12వ తరగతి వరకు ప్రతి దశలో మీ పిల్లలకు తోడుగా ఉండేలా LearnAIQ రూపొందించబడింది.",
    c4_title: "4వ తరగతి — దశాంశాలు & పరిసరాల విజ్ఞానం",
    c4_desc: "భాగాహారాలు, దశాంశ సంఖ్యలు, వైశాల్యం, ఆహారపు గొలుసు మరియు శక్తి చక్రాలు.",
    c5_title: "5వ తరగతి — గణిత సమీకరణాలు & అంతరిక్షం",
    c5_desc: "కారణాంకాలు, ప్రధాన సంఖ్యలు, సౌర కుటుంబం, వాతావరణం మరియు సరళ యంత్రాలు.",
    c6_12_title: "6 నుండి 12వ తరగతి ప్రయాణం",
    c6_12_desc: "ఫిజిక్స్, కెమిస్ట్రీ, బయాలజీ మరియు ఉన్నత గణితం ఏఐ మార్గదర్శకత్వంలో.",
    btn_notify: "🔔 ముందస్తు నమోదు చేసుకోండి",
    step_2_tag: "దశ 02",
    subjects_title: "మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
    subjects_subtitle: "ఏఐ ట్యూటర్‌తో పాఠాలు నేర్చుకోవడానికి సబ్జెక్ట్‌ను ఎంచుకోండి.",
    maths_title: "మ్యాథ్స్ (గణితం)",
    maths_desc: "అంకెలు, లెక్కింపులు, ఆకారాలు సులభంగా నేర్చుకోండి.",
    maths_pill: "🔢 అంకెలు, ఆకారాలు & భిన్నాలు",
    science_title: "సైన్స్ (విజ్ఞాన శాస్త్రం)",
    science_desc: "మొక్కలు, జంతువులు, మానవ శరీరం మరియు మన చుట్టూ ఉన్న ప్రపంచం.",
    science_pill: "🌱 ప్రకృతి, శరీరం & బలాలు",
    step_3_tag: "దశ 03",
    chapter_section_title: "1వ తరగతి — మ్యాథ్స్ అధ్యాయాలు",
    chapter_section_subtitle: "ఏఐ ట్యూటర్‌తో మాట్లాడటానికి ఒక అధ్యాయాన్ని ఎంచుకోండి.",
    tutor_tag: "లైవ్ డెమో",
    tutor_title: "మీ ఏఐ ట్యూటర్‌ని కలవండి",
    tutor_subtitle: "సులభమైన వివరణలతో ప్రశ్నలు అడగండి, హాయిగా నేర్చుకోండి.",
    tutor_active_status: "🟢 సిద్ధంగా ఉంది",
    quick_prompts_heading: "త్వరిత ప్రశ్నలు",
    btn_ask_q: "ఒక ప్రశ్న అడగండి",
    btn_exp_simple: "సులభంగా వివరించు",
    btn_give_ex: "ఉదాహరణ ఇవ్వు",
    btn_practice: "సాధన (Practice)",
    read_aloud_toggle: "బిగ్గరగా చదువు (వాయిస్)",
    encouraging_toggle: "ప్రోత్సాహకర స్వరము",
    guardian_toggle: "రక్షణ గార్డియన్",
    adaptive_pace_badge: "✨ అడాప్టివ్ వేగం: సమతుల్యం",
    tutor_welcome_msg: "నమస్తే! 👋 నేను మీ LearnAIQ ట్యూటర్‌ని. ఈరోజు మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
    btn_send: "పంపించు",
    pricing_tag: "అందుబాటు ధరలు",
    pricing_title: "ఉచితంగా ప్రారంభించండి, చిన్నారి పెరుగుతున్న కొద్దీ అప్‌గ్రేడ్ చేయండి",
    pricing_subtitle: "ప్రతి ప్లాన్ 7 రోజుల ఉచిత ట్రయల్‌తో ప్రారంభమవుతుంది. 1వ తరగతి నెలకు $10 నుండి ప్రారంభమై, ప్రతి ఉన్నత తరగతికి $5 పెరుగుతుంది.",
    reviews_tag: "తల్లిదండ్రులు & విద్యార్థుల అభిప్రాయాలు",
    reviews_title: "పిల్లలు ఇష్టపడే, తల్లిదండ్రులు విశ్వసించే ఏఐ ట్యూటర్",
    reviews_subtitle: "LearnAIQ ద్వారా విద్యార్థులు మ్యాథ్స్, సైన్స్‌లో ఎలా రాణిస్తున్నారో చూడండి.",
    rating_label: "ప్రపంచ సగటు రేటింగ్",
    metric_users: "ప్రపంచవ్యాప్త విద్యార్థులు 🌍",
    metric_satisfaction: "తల్లిదండ్రుల సంతృప్తి",
    metric_langs: "ఇంగ్లీష్ & తెలుగు లభ్యత",
    btn_write_review: "✍️ సమీక్ష రాయండి",
    final_cta_title: "LearnAIQ తో చదువు ప్రారంభించడానికి సిద్ధమా?",
    final_cta_desc: "ఈరోజే 7 రోజుల ఉచిత ట్రయల్ ప్రారంభించండి!",
    btn_start_trial_now: "ఇప్పుడే ఉచిత ట్రయల్ ప్రారంభించండి",
    footer_desc: "ఏఐ తో చదువు సులభం. 1 నుండి 12వ తరగతి విద్యార్థులకు ప్రత్యేక ఏఐ మార్గదర్శకత్వం.",
    footer_nav_heading: "నావిగేషన్",
    footer_classes_heading: "తరగతుల ప్రణాళిక",
    footer_pricing_heading: "ట్రయల్ & ధరలు",
    pricing_link: "7 రోజుల ఉచిత ట్రయల్",
    reviews_link: "4.7★ విద్యార్థుల సమీక్షలు",
    footer_heart: "ఇంగ్లీష్ & తెలుగు విద్యార్థుల కోసం ప్రేమతో రూపొందించబడింది ❤️.",
    tab_login: "విద్యార్థి లాగిన్",
    tab_signup: "ఖాతా తెరవండి (Sign Up)",
    modal_login_head: "మళ్ళీ స్వాగతం!",
    modal_login_subhead: "మీ 3 వివరాలను నమోదు చేసి లాగిన్ అవ్వండి.",
    modal_signup_head: "కొత్త విద్యార్థి ఖాతా సృష్టించండి",
    modal_signup_subhead: "LearnAIQ లో ఉచిత 7 రోజుల ట్రయల్ ప్రారంభించండి!",
    lbl_name: "పూర్తి పేరు",
    lbl_username: "వాడుకరి పేరు (Username)",
    lbl_phone: "ఫోన్ నంబర్",
    lbl_password: "పాస్‌వర్డ్",
    lbl_select_class: "తరగతిని ఎంచుకోండి",
    btn_login_submit: "LearnAIQ కి లాగిన్ అవ్వండి",
    btn_start_trial_submit: "ఉచిత ట్రయల్ ప్రారంభించండి",
    how_learn_title: "💡 LearnAIQ AI ట్యూటర్‌తో విద్యార్థులు ఎలా నేర్చుకుంటారు",
    how_learn_subtitle: "పిల్లల కోసం ప్రత్యేకంగా రూపొందించబడిన వినూత్న వ్యక్తిగత నేర్చుకునే ప్రయాణం.",
    hl_step1_title: "1. బొమ్మలతో సులభమైన వివరణలు",
    hl_step1_desc: "ప్రతి కష్టమైన అంశాన్ని పిజ్జా ముక్కలు మరియు చాక్లెట్లతో సరదాగా అర్థమయ్యేలా వివరిస్తుంది!",
    hl_step2_title: "2. ఇంగ్లీష్ & తెలుగు వాయిస్ సపోర్ట్",
    hl_step2_desc: "పాఠాలను ఇంగ్లీష్ మరియు తెలుగులో స్పష్టమైన ఉచ్చారణతో వినవచ్చు.",
    hl_step3_title: "3. స్మార్ట్ సాధన & భద్రత",
    hl_step3_desc: "విద్యార్థి వేగానికి తగినట్లుగా క్విజ్ లు మరియు సురక్షితమైన సంభాషణ వాతావరణం.",
    btn_launch_tutor_cta: "🚀 AI ట్యూటర్ ఉపయోగించడానికి లాగిన్ లేదా సైన్ అప్ చేయండి",
    btn_back_home: "ముఖ్య పుటకి వెళ్ళండి",
    modal_review_title: "సమీక్ష రాయండి",
    modal_review_subtitle: "LearnAIQ తో మీ అనుభవాన్ని పంచుకోండి!",
    lbl_rev_name: "మీ పేరు",
    lbl_rev_rating: "రేటింగ్ (నక్షత్రాలు)",
    lbl_rev_comment: "మీ అభిప్రాయం",
    btn_submit_review: "సమీక్షను పంపండి",
    rev_1_text: '"నా కుమార్తెకు మ్యాథ్స్ అంటే భయం పోయింది. పిజ్జా ముక్కలు మరియు తెలుగు ఆడియోతో చాలా బాగా అర్థమైంది!"',
    rev_1_name: "శ్రీనివాస రావు",
    rev_1_sub: "2వ తరగతి విద్యార్థి తండ్రి (హైదరాబాద్)",
    rev_2_text: '"\'Explain Why\' ఫీచర్ అద్భుతం! కేవలం జవాబు గుడ్డిగా గుర్తించడం కాకుండా నిజంగా అర్థమైందో లేదో తెలుస్తుంది."',
    rev_2_name: "అనిత శర్మ",
    rev_2_sub: "పాఠశాల ఉపాధ్యాయురాలు",
    rev_3_text: '"తెలుగులో ఏఐ ట్యూటర్ మాట్లాడటం నాకు చాలా నచ్చింది. కేక్ ముక్కలతో భిన్నాలు నేర్చుకోవడం సరదాగా ఉంది."',
    rev_3_name: "కార్తీక్ (8 ఏళ్ళు)",
    rev_3_sub: "3వ తరగతి విద్యార్థి (విశాఖపట్నం)"
  }
};

// --- 3. TUTOR MULTI-LINGUAL KNOWLEDGE BASE ---
const TUTOR_RESPONSES = {
  en: {
    fraction: "A **fraction** shows a part of a whole! 🍕 Imagine a pizza cut into 4 equal slices. If you take 1 slice, you have **1/4** of the pizza! 3 slices would be **3/4**.",
    fraction_simple: "Imagine a yummy chocolate bar 🍫 broken into 2 equal halves. Each half is **1/2**! When you share fairly with a friend, you are using fractions!",
    fraction_example: "Here is a fun example: In a basket of 4 apples, 1 is green 🍏 and 3 are red 🍎. The green apples make up **1/4** of the basket!",
    fraction_practice: "Let's try a quick puzzle! If a cake is sliced into 8 equal pieces and you eat 2 pieces, what fraction did you eat? (Hint: 2 out of 8 = 2/8 or 1/4!)",
    addition: "Addition means putting things together! 🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎 (2 + 3 = 5).",
    plants: "Plants need 3 main things to grow: **Sunlight** ☀️, **Water** 💧, and **Air** 🌬️! Roots drink water from the soil.",
    body: "Your **heart** pumps blood 🫀, your **lungs** help you breathe air 🫁, and your **brain** helps you think and learn 🧠!",
    default: "That's a fantastic question! Let me break it down simply: Every concept is built step-by-step. Would you like a real-life example or a practice question?",
    safety: "I hear that you're feeling worried or sad. 💛 Please know that you are very special! Whenever you feel this way, it is always a wonderful idea to talk to a trusted adult, like your parents or your teacher. They care about you very much!"
  },
  te: {
    fraction: "**భిన్నం (Fraction)** అనేది ఒక పూర్ణ భాగంలో కొంత భాగం! 🍕 4 సమాన భాగాలుగా కోసిన పిజ్జాలో మీరు 1 భాగం తీసుకుంటే, అది **1/4** భాగం అవుతుంది!",
    fraction_simple: "ఒక చాక్లెట్ 🍫 రెండు సమాన భాగాలుగా చేసినప్పుడు, ప్రతీ భాగం **1/2** అవుతుంది!",
    fraction_example: "ఉదాహరణ: 4 ఆపిల్స్ లో 1 పచ్చని ఆపిల్ 🍏 ఉంటే, పచ్చని ఆపిల్స్ భాగం **1/4**!",
    fraction_practice: "ప్రశ్న: 8 సమాన కేక్ ముక్కలలో మీరు 2 ముక్కలు తింటే, మీరు తిన్న భాగం ఎంత? (జవాబు: 2/8 లేదా 1/4!)",
    addition: "కూడిక (Addition) అంటే వస్తువులను కలపడం! 2 ఆపిల్స్ + 3 ఆపిల్స్ = 5 ఆపిల్స్ (2 + 3 = 5).",
    plants: "మొక్కలు పెరగడానికి 3 ముఖ్యమైనవి కావాలి: **సూర్యరశ్మి** ☀️, **నీరు** 💧, మరియు **గాలి** 🌬️!",
    body: "మన **గుండె** రక్తాన్ని పంప్ చేస్తుంది 🫀, **ఊపిరితిత్తులు** గాలి పీల్చుకోవడానికి సహాయపడతాయి 🫁!",
    default: "ఇది చాలా మంచి ప్రశ్న! దీన్ని సులభంగా అర్థం చేసుకుందాం. మీరు ఒక ఉదాహరణ చూడాలనుకుంటున్నారా?",
    safety: "మీరు కాస్త బాధగా ఉన్నారని నేను గ్రహించాను. 💛 మీరు ఎప్పుడైనా ఇలా అనిపించినప్పుడు మీ తల్లిదండ్రులు లేదా ఉపాధ్యాయులతో మాట్లాడండి!"
  }
};

// --- 4. APP STATE MANAGEMENT ---
let state = {
  currentClass: 1,
  currentSubject: 'Maths',
  currentChapterId: 'c1_m1',
  language: 'en',
  voiceEnabled: true,
  userProfile: null,
  completedChapters: [],
  studentProgress: [],
  skillScore: 25,
  difficulty: 'BEGINNER',
  currentSlideIndex: 0,
  slideshowTimer: null
};

// --- 4.1 API CLIENT INTEGRATION ---
const API_BASE = (typeof window !== 'undefined' && window.location.protocol.startsWith('http'))
  ? (window.location.origin + '/api')
  : 'http://localhost:5000/api';

async function apiFetch(endpoint, method = 'GET', data = null) {
  try {
    const token = localStorage.getItem('learnaiq_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = { method, headers };
    if (data) {
      config.body = JSON.stringify(data);
    }

    console.log(`[TUTOR] Sending API request to ${API_BASE}${endpoint}:`, data);
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error ${response.status}`);
    }
    console.log(`[TUTOR] Backend response received:`, result);
    return result;
  } catch (err) {
    console.error(`[TUTOR API ERROR] Endpoint ${endpoint} failed:`, err.message);
    return null;
  }
}

// --- 5. INITIALIZATION ON DOM LOADED ---
document.addEventListener('DOMContentLoaded', async () => {
  initEventListeners();
  initNavigation();
  renderChapters();
  updateHeaderTags();
  startBackgroundSlideshow();
  
  // Restore student profile if logged in
  await checkActiveSession();
  await loadCurriculumFromApi();
});

async function checkActiveSession() {
  const token = localStorage.getItem('learnaiq_token');
  if (!token) return;

  const res = await apiFetch('/auth/me');
  if (res && res.user) {
    onUserLoginSuccess(res.user, null);
  }
}

function updateLoginButtonText(userName) {
  const loginBtns = document.querySelectorAll('[data-i18n="btn_login"]');
  loginBtns.forEach(btn => {
    btn.textContent = `👤 ${userName}`;
  });
}

async function loadCurriculumFromApi() {
  const res = await apiFetch('/curriculum');
  if (res && res.curriculum && Object.keys(res.curriculum).length > 0) {
    Object.assign(CURRICULUM_DATA, res.curriculum);
    renderChapters();
  }
}

function initEventListeners() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  const voiceToggle = document.getElementById('voiceToggle');
  if (voiceToggle) {
    voiceToggle.addEventListener('change', (e) => {
      state.voiceEnabled = e.target.checked;
    });
  }
}

// --- Dynamic Navigation & ScrollSpy ---
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navMenu = document.getElementById('navMenu');

  const sectionIds = Array.from(navLinks)
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => href.substring(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveNav(targetId) {
    if (!targetId) return;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Click handler for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        setActiveNav(targetId);
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
      }
    });
  });

  // ScrollSpy handler to update active link on scroll
  let isTicking = false;
  function updateActiveOnScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 160;

        // If reached bottom of page, activate last section
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
          const lastSection = sections[sections.length - 1];
          if (lastSection) {
            currentSectionId = lastSection.getAttribute('id');
          }
        } else {
          sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
              currentSectionId = section.getAttribute('id');
            }
          });
        }

        if (currentSectionId) {
          setActiveNav(currentSectionId);
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }

  window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
  updateActiveOnScroll();
}

// --- 6. BACKGROUND SLIDESHOW ENGINE (nLearn Style) ---
function startBackgroundSlideshow() {
  if (state.slideshowTimer) clearInterval(state.slideshowTimer);
  state.slideshowTimer = setInterval(() => {
    goToSlide((state.currentSlideIndex + 1) % 4);
  }, 4000);
}

function goToSlide(index) {
  state.currentSlideIndex = index;
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');

  slides.forEach((slide, idx) => {
    if (idx === index) slide.classList.add('active');
    else slide.classList.remove('active');
  });

  dots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

// --- 7. FULL-PAGE LANGUAGE TRANSLATION ENGINE ---
function changeLanguage(langCode) {
  state.language = langCode;
  const dict = TRANSLATIONS[langCode] || TRANSLATIONS['en'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  renderChapters();
  updateHeaderTags();
  
  addSystemChatMessage(langCode === 'te' ? '🌐 భాష తెలుగుకు మార్చబడింది' : '🌐 Language changed to English');
}

// --- 8. CLASS & SUBJECT SELECTION LOGIC ---
function selectClass(classNum) {
  state.currentClass = classNum;

  document.querySelectorAll('.class-card').forEach(card => {
    if (parseInt(card.getAttribute('data-class')) === classNum) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  renderChapters();
  updateHeaderTags();
  
  const chapterSection = document.getElementById('chapters');
  if (chapterSection) {
    chapterSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function selectSubject(subjectName) {
  state.currentSubject = subjectName;

  document.querySelectorAll('.subject-card').forEach(card => {
    if (card.getAttribute('data-subject') === subjectName) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  renderChapters();
  updateHeaderTags();
}

function updateHeaderTags() {
  const chipClass = document.getElementById('chipClassInfo');
  const chipSubject = document.getElementById('chipSubjectInfo');
  const sectionTitle = document.getElementById('chapterSectionTitle');
  const chatHeading = document.getElementById('chatSubjectHeading');

  const lang = state.language;
  const classLabel = lang === 'te' ? `${state.currentClass}వ తరగతి` : `Class ${state.currentClass}`;
  const subjName = (lang === 'te' && state.currentSubject === 'Maths') ? 'మ్యాథ్స్' : ((lang === 'te' && state.currentSubject === 'Science') ? 'సైన్స్' : state.currentSubject);

  if (chipClass) chipClass.textContent = classLabel;
  if (chipSubject) chipSubject.textContent = subjName;
  if (sectionTitle) sectionTitle.textContent = `${classLabel} — ${subjName}`;
  if (chatHeading) chatHeading.textContent = `${classLabel} — ${subjName}`;
}

// --- 9. DYNAMIC CHAPTER RENDERING ---
function renderChapters() {
  const container = document.getElementById('chapterGridContainer');
  if (!container) return;

  const chapters = CURRICULUM_DATA[state.currentClass][state.currentSubject] || [];
  const lang = state.language;

  container.innerHTML = '';
  chapters.forEach((chap, idx) => {
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.onclick = () => startChapterSession(chap);

    const isCompleted = state.completedChapters.includes(chap.id);
    const badgeText = isCompleted ? `<span class="completed-chapter-tag" style="background:#D1FAE5; color:#065F46; font-size:0.75rem; font-weight:800; padding:0.2rem 0.6rem; border-radius:999px; margin-left:0.5rem;">✓ Completed</span>` : '';

    const titleText = typeof chap.title === 'object' ? (chap.title[lang] || chap.title['en']) : chap.title;
    const descText = typeof chap.desc === 'object' ? (chap.desc[lang] || chap.desc['en']) : chap.desc;
    const btnLabel = isCompleted ? (lang === 'te' ? 'తిరిగి సాధన చేయండి' : 'Review Chapter') : (lang === 'te' ? 'నేర్చుకోవడం ప్రారంభించండి' : 'Start Learning');

    card.innerHTML = `
      <div>
        <div class="chapter-num" style="display:flex; align-items:center; justify-content:space-between;">
          <span>Chapter 0${idx + 1}</span>
          ${badgeText}
        </div>
        <h3 class="chapter-title" style="margin-top:0.4rem;">${chap.icon} ${titleText}</h3>
        <p class="chapter-desc">${descText}</p>
      </div>
      <div class="chapter-action-btn">
        <span>${btnLabel}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    `;
    container.appendChild(card);
  });
}

function startChapterSession(chapter) {
  const token = localStorage.getItem('learnaiq_token');
  if (!token && !state.userProfile) {
    state.pendingChapterSession = chapter;
    alert(state.language === 'te' 
      ? '🔑 పాఠాలు నేర్చుకోవడానికి మరియు AI ట్యూటర్ ఉపయోగించడానికి దయచేసి మొదట లాగిన్ అవ్వండి!' 
      : '🔑 Please Log In or Sign Up first to enter your AI Tutor Learning Workspace!');
    openLoginModal('login');
    return;
  }

  state.currentChapterId = chapter.id;
  const lang = state.language;
  const titleText = typeof chapter.title === 'object' ? (chapter.title[lang] || chapter.title['en']) : chapter.title;

  showAiTutorAppPage();

  const chatHeading = document.getElementById('chatSubjectHeading');
  if (chatHeading) {
    chatHeading.textContent = `Class ${state.currentClass} ${state.currentSubject} — ${titleText}`;
  }

  const welcomeMsg = lang === 'te' 
    ? `మంచి ఎంపిక! మనం ఇప్పుడు **${titleText}** నేర్చుకుంటున్నాం. ఏ ప్రశ్లనైనా అడగండి!`
    : `Great choice! We are now exploring **${titleText}**. Ask me any question or click a quick prompt below!`;

  addAiChatMessage(welcomeMsg);
  updateProgressUI();
}

// --- 10. AI TUTOR CHAT ENGINE (CONNECTED TO EXPRESS BACKEND) ---
async function sendQuickPrompt(actionType) {
  let userText = actionType;
  const lang = state.language;

  if (actionType.includes('Step 1') || actionType === 'Concept Analogy') {
    userText = lang === 'te' ? '🎯 అడుగు 1: ఈ పాఠానికి ఒక సరదా బొమ్మ మరియు ఉదాహరణతో భావనను వివరించండి!' : '🎯 Step 1: Can you give me a fun visual concept analogy for this lesson?';
  } else if (actionType.includes('Step 2') || actionType === 'Explanation') {
    userText = lang === 'te' ? '💡 అడుగు 2: ఈ అంశం యొక్క ముఖ్యమైన సూత్రాలను అడుగుల వారీగా వివరిస్తారా?' : '💡 Step 2: Can you explain the key rules of this topic step-by-step?';
  } else if (actionType.includes('Step 3') || actionType === 'Real-Life Example') {
    userText = lang === 'te' ? '🌟 అడుగు 3: నిజ జీవితంలో మనం దీన్ని ఎలా ఉపయోగిస్తామో ఒక మంచి ఉదాహరణ ఇవ్వగలరా?' : '🌟 Step 3: Can you give me a practical real-life example of how we use this?';
  } else if (actionType.includes('Step 4') || actionType === 'Practice Quiz') {
    userText = lang === 'te' ? '🧠 అడుగు 4: నా నాలెడ్జ్ చెక్ చేసుకోవడానికి ఒక చిన్న ప్రాక్టీస్ ప్రశ్న మరియు 3 ఆప్షన్లు ఇవ్వండి!' : '🧠 Step 4: Can you give me a quick 1-question practice quiz to test my understanding?';
  }

  addUserChatMessage(userText);
  const thinkingMsgEl = addAiChatMessage('🤖 *LearnAIQ Tutor is thinking...*');

  // Call Express Backend Q&A Endpoint
  const apiRes = await apiFetch('/tutor/chat', 'POST', {
    studentId: state.userProfile ? state.userProfile.id : 'demo-student-1',
    studentName: state.userProfile ? state.userProfile.username : 'Nikki',
    question: userText,
    message: userText,
    classLevel: state.currentClass,
    subject: state.currentSubject,
    topic: state.currentChapterId,
    language: state.language,
    difficulty: state.difficulty,
    knowledgeScore: state.skillScore,
    skillScore: state.skillScore
  });

  if (thinkingMsgEl) thinkingMsgEl.remove();

  if (apiRes && (apiRes.reply || apiRes.answer)) {
    const text = apiRes.reply || apiRes.answer;
    addAiChatMessage(text);
    if (apiRes.difficulty) state.difficulty = apiRes.difficulty;
    if (apiRes.knowledgeScore !== undefined) state.skillScore = apiRes.knowledgeScore;
    else if (apiRes.skillScore !== undefined) state.skillScore = apiRes.skillScore;
    updateAdaptiveBadge(apiRes.adaptivePace);
  } else {
    addAiChatMessage(lang === 'te' 
      ? 'మన్నించండి! సర్వర్ కనెక్షన్ లో సమస్య వచ్చింది. దయచేసి http://localhost:5000 సర్వర్ నడుస్తుందో లేదో సరిచూసుకోండి! 🌟' 
      : "Oops! I'm having trouble connecting right now. Please check if the LearnAIQ backend server is running on http://localhost:5000! 🌟");
  }
}

async function sendCustomMessage() {
  const input = document.getElementById('chatInputField');
  if (!input || !input.value.trim()) return;

  const userQuery = input.value.trim();
  addUserChatMessage(userQuery);
  input.value = '';

  const thinkingMsgEl = addAiChatMessage('🤖 *LearnAIQ Tutor is thinking...*');

  // Call Express Backend Q&A Endpoint
  const apiRes = await apiFetch('/tutor/chat', 'POST', {
    studentId: state.userProfile ? state.userProfile.id : 'demo-student-1',
    studentName: state.userProfile ? state.userProfile.username : 'Nikki',
    question: userQuery,
    message: userQuery,
    classLevel: state.currentClass,
    subject: state.currentSubject,
    topic: state.currentChapterId,
    language: state.language,
    difficulty: state.difficulty,
    knowledgeScore: state.skillScore,
    skillScore: state.skillScore
  });

  if (thinkingMsgEl) thinkingMsgEl.remove();

  if (apiRes && (apiRes.reply || apiRes.answer)) {
    const text = apiRes.reply || apiRes.answer;
    addAiChatMessage(text);
    if (apiRes.difficulty) state.difficulty = apiRes.difficulty;
    if (apiRes.knowledgeScore !== undefined) state.skillScore = apiRes.knowledgeScore;
    else if (apiRes.skillScore !== undefined) state.skillScore = apiRes.skillScore;
    updateAdaptiveBadge(apiRes.adaptivePace);
  } else {
    addAiChatMessage(state.language === 'te' 
      ? 'మన్నించండి! సర్వర్ కనెక్షన్ లో సమస్య వచ్చింది. దయచేసి http://localhost:5000 సర్వర్ నడుస్తుందో లేదో సరిచూసుకోండి! 🌟' 
      : "Oops! I'm having trouble connecting right now. Please check if the LearnAIQ backend server is running on http://localhost:5000! 🌟");
  }
}

function updateAdaptiveBadge(paceLabel) {
  const badgeEl = document.querySelector('.active-context-badge');
  if (badgeEl) {
    const pace = paceLabel || (state.difficulty === 'BEGINNER' ? 'Supportive' : state.difficulty === 'ADVANCED' ? 'Challenge' : 'Reinforcement');
    badgeEl.textContent = `✨ Adaptive Pace: ${pace} (${state.difficulty})`;
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendCustomMessage();
}

function addUserChatMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'msg-row user-msg';
  row.innerHTML = `<div class="msg-avatar">👦</div><div class="msg-bubble-content">${escapeHTML(text)}</div>`;
  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

function addAiChatMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'ai-msg msg-row';
  const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  row.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div>
      <div class="msg-bubble-content">${formattedText}</div>
      <button class="chat-audio-btn" onclick="speakCurrentMsg(this)">
        🔊 Listen
      </button>
    </div>
  `;
  container.appendChild(row);
  container.scrollTop = container.scrollHeight;

  if (state.voiceEnabled) {
    speakText(stripHTML(formattedText));
  }
}

function addSystemChatMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const row = document.createElement('div');
  row.style.textAlign = 'center';
  row.style.fontSize = '0.825rem';
  row.style.color = 'var(--text-muted)';
  row.style.margin = '0.5rem 0';
  row.textContent = text;
  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

function speakCurrentMsg(btn) {
  const parentBubble = btn.previousElementSibling;
  if (parentBubble) {
    speakText(stripHTML(parentBubble.innerHTML));
  }
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;

  if (state.language === 'te') utterance.lang = 'te-IN';
  else utterance.lang = 'en-US';

  window.speechSynthesis.speak(utterance);
}

function triggerVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice input works best in Google Chrome! Typing your question works great too.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = state.language === 'te' ? 'te-IN' : 'en-US';

  const inputField = document.getElementById('chatInputField');
  if (inputField) inputField.placeholder = state.language === 'te' ? '🎙️ వింటున్నాను... మాట్లాడండి!' : '🎙️ Listening... Speak now!';

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (inputField) {
      inputField.value = transcript;
      inputField.placeholder = 'Ask your AI tutor anything...';
    }
    sendCustomMessage();
  };

  recognition.onerror = () => {
    if (inputField) inputField.placeholder = 'Ask your AI tutor anything...';
  };
}

// --- 11. MODAL DIALOG HANDLERS (STUDENT LOGIN, SIGNUP & REVIEWS) ---
function switchAuthTab(tabName) {
  const loginTab = document.getElementById('tabBtnLogin');
  const signupTab = document.getElementById('tabBtnSignup');
  const loginSection = document.getElementById('authLoginSection');
  const signupSection = document.getElementById('authSignupSection');

  if (tabName === 'login') {
    if (loginTab) loginTab.classList.add('active');
    if (signupTab) signupTab.classList.remove('active');
    if (loginSection) loginSection.style.display = 'block';
    if (signupSection) signupSection.style.display = 'none';
  } else {
    if (signupTab) signupTab.classList.add('active');
    if (loginTab) loginTab.classList.remove('active');
    if (signupSection) signupSection.style.display = 'block';
    if (loginSection) loginSection.style.display = 'none';
  }
}

function openLoginModal(mode = 'login', preselectClass = null) {
  if (typeof mode === 'number') {
    preselectClass = mode;
    mode = 'signup';
  }
  switchAuthTab(mode || 'login');

  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
  if (preselectClass) {
    const classSelect = document.getElementById('regClassSelect');
    if (classSelect) classSelect.value = String(preselectClass);
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

// 3-field Login Handler (Username, Mobile Number, Password)
async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  if (!username || !phone || !password) {
    alert('Please enter all 3 details: Username, Mobile Number, and Password.');
    return;
  }

  const res = await apiFetch('/auth/login', 'POST', { username, phone, password });

  if (res && res.token) {
    localStorage.setItem('learnaiq_token', res.token);
    onUserLoginSuccess(res.user, `🎉 Welcome back, ${res.user.name || username}! Login successful.`);
  } else if (res && res.error) {
    alert(`❌ Login Failed: ${res.error}`);
  } else {
    // Offline / Local fallback
    const mockUser = { name: username, username, phone, classLevel: 1 };
    onUserLoginSuccess(mockUser, `🎉 Welcome back, ${username}!`);
  }
}

// 5-field Signup Handler (Full Name, Username, Phone, Password, Class)
async function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const username = document.getElementById('regUsername').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;
  const selectedClass = document.getElementById('regClassSelect').value;

  const res = await apiFetch('/auth/register', 'POST', {
    name,
    username,
    phone,
    password,
    classLevel: selectedClass
  });

  if (res && res.token) {
    localStorage.setItem('learnaiq_token', res.token);
    onUserLoginSuccess(res.user, `🎉 Welcome to LearnAIQ, ${name}! Your 7-Day FREE Trial for Class ${selectedClass} is active!`);
  } else if (res && res.error) {
    alert(`❌ Sign Up Failed: ${res.error}`);
  } else {
    const mockUser = { name, username, phone, classLevel: selectedClass };
    onUserLoginSuccess(mockUser, `🎉 Welcome to LearnAIQ, ${name}! Your 7-Day FREE Trial for Class ${selectedClass} is active!`);
  }
}

const EYE_SVG_OPEN = `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_SVG_CLOSED = `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btnEl.innerHTML = EYE_SVG_CLOSED;
    btnEl.title = 'Hide Password';
  } else {
    input.type = 'password';
    btnEl.innerHTML = EYE_SVG_OPEN;
    btnEl.title = 'Show Password';
  }
}

function showLandingPage() {
  const landingView = document.getElementById('mainLandingView');
  const appPage = document.getElementById('aiTutorAppPage');
  if (landingView) landingView.style.display = 'block';
  if (appPage) appPage.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAiTutorAppPage() {
  const landingView = document.getElementById('mainLandingView');
  const appPage = document.getElementById('aiTutorAppPage');
  if (landingView) landingView.style.display = 'none';
  if (appPage) appPage.style.display = 'block';

  if (state.userProfile) {
    updateTutorViewForUser(state.userProfile);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToAiTutor(e) {
  if (e) e.preventDefault();
  if (state.userProfile) {
    showAiTutorAppPage();
  } else {
    alert('🔑 Please Log In or Sign Up first to enter your AI Tutor Workspace!');
    openLoginModal('login');
  }
}

function updateTutorViewForUser(user) {
  const greeting = document.getElementById('tutorStudentNameGreeting');
  const classBadge = document.getElementById('tutorClassBadge');

  if (user) {
    if (greeting) {
      greeting.textContent = `👋 Welcome back, ${user.name || user.username}! Your Class ${user.classLevel || 1} AI Tutor is Active.`;
    }
    if (classBadge) {
      classBadge.textContent = `Class ${user.classLevel || 1} • Active Student Workspace`;
    }
  }
}

function onUserLoginSuccess(user, welcomeMsg) {
  state.userProfile = user;
  if (user.classLevel) {
    state.currentClass = parseInt(user.classLevel);
  }
  renderUserHeaderProfile(user);
  closeLoginModal();
  if (welcomeMsg) alert(welcomeMsg);

  if (state.currentClass && state.currentClass <= 5) {
    selectClass(state.currentClass);
  }

  loadUserChatHistory();
  loadStudentProgress();

  if (state.pendingChapterSession) {
    const pendingChap = state.pendingChapterSession;
    state.pendingChapterSession = null;
    startChapterSession(pendingChap);
  } else {
    showAiTutorAppPage();
  }
}

// --- LESSON RESTART & PROGRESS TRACKING FUNCTIONS ---
async function restartCurrentLesson() {
  const chatBox = document.getElementById('chatMessages');
  if (chatBox) {
    const welcomeBubble = `
      <div class="msg-row ai-msg">
        <div class="msg-avatar">🤖</div>
        <div>
          <div class="msg-bubble-content">
            🔄 Lesson restarted fresh! What would you like to explore first? Ask me anything or choose a quick prompt below!
          </div>
          <button class="chat-audio-btn" onclick="speakCurrentMsg(this)">🔊 Listen</button>
        </div>
      </div>
    `;
    chatBox.innerHTML = welcomeBubble;
  }

  const token = localStorage.getItem('learnaiq_token');
  if (token) {
    try {
      await fetch('/api/tutor/restart-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chapterId: state.currentChapterId,
          classLevel: state.currentClass,
          subject: state.currentSubject
        })
      });
    } catch (err) {
      console.warn('Restart lesson log error:', err);
    }
  }

  alert('🔄 Lesson restarted fresh from Step 1! All your previous interactions remain safely stored in your database learning history archive.');
}

async function markLessonCompleted() {
  if (!state.userProfile) {
    alert('🔑 Please Log In or Sign Up first to save your lesson progress!');
    openLoginModal('login');
    return;
  }

  const token = localStorage.getItem('learnaiq_token');
  if (!token) return;

  try {
    const res = await fetch('/api/tutor/complete-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        chapterId: state.currentChapterId,
        classLevel: state.currentClass,
        subject: state.currentSubject
      })
    });

    if (res.ok) {
      if (!state.completedChapters.includes(state.currentChapterId)) {
        state.completedChapters.push(state.currentChapterId);
      }
      updateProgressUI();
      renderChapters();
      alert('🎉 Fantastic work! You have marked this lesson as Completed. Keep up the great learning!');
    }
  } catch (err) {
    console.error('Error marking lesson completed:', err);
  }
}

async function loadStudentProgress() {
  const token = localStorage.getItem('learnaiq_token');
  if (!token) return;

  try {
    const res = await fetch('/api/tutor/progress', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.completedChapters = data.completedChapters || [];
      state.studentProgress = data.progress || [];
      updateProgressUI();
      renderChapters();
    }
  } catch (err) {
    console.error('Error loading student progress:', err);
  }
}

function updateProgressUI() {
  const currentSubjectChapters = (CURRICULUM_DATA[state.currentClass] && CURRICULUM_DATA[state.currentClass][state.currentSubject]) || [];
  const totalInSubject = currentSubjectChapters.length || 4;

  const completedInSubject = currentSubjectChapters.filter(ch => state.completedChapters.includes(ch.id)).length;
  const percent = Math.round((completedInSubject / totalInSubject) * 100);

  const fillEl = document.getElementById('progressFill');
  const percentTextEl = document.getElementById('progressPercentText');
  const countTextEl = document.getElementById('progressCountText');
  const completeBtn = document.getElementById('btnCompleteLesson');

  if (fillEl) fillEl.style.width = `${percent}%`;
  if (percentTextEl) percentTextEl.textContent = `${percent}% Completed`;
  if (countTextEl) countTextEl.textContent = `${completedInSubject}/${totalInSubject} Chapters`;

  if (completeBtn) {
    if (state.completedChapters.includes(state.currentChapterId)) {
      completeBtn.innerHTML = `✅ Lesson Completed!`;
      completeBtn.style.background = '#059669';
    } else {
      completeBtn.innerHTML = `✅ Mark Lesson Completed`;
      completeBtn.style.background = '';
    }
  }
}

function renderUserHeaderProfile(user) {
  const loginBtn = document.getElementById('navLoginBtn');
  const signupBtn = document.getElementById('navSignupBtn');
  const appBadgeContainer = document.getElementById('userProfileBadgeApp');

  if (!user) {
    if (loginBtn) {
      loginBtn.style.display = 'inline-block';
      loginBtn.textContent = 'Student Login';
    }
    if (signupBtn) {
      signupBtn.style.display = 'inline-block';
    }
    const existingBadge = document.getElementById('userProfileBadge');
    if (existingBadge) existingBadge.remove();
    if (appBadgeContainer) appBadgeContainer.innerHTML = '';
    return;
  }

  if (loginBtn) loginBtn.style.display = 'none';
  if (signupBtn) signupBtn.style.display = 'none';

  let badge = document.getElementById('userProfileBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'userProfileBadge';
    badge.className = 'user-profile-badge';
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      navActions.insertBefore(badge, navActions.querySelector('.mobile-toggle'));
    }
  }

  const badgeHtml = `
    <button class="user-badge-btn" onclick="toggleUserDropdown(event)">
      <span>👤</span> ${user.name || user.username} (Class ${user.classLevel || 1}) ▾
    </button>
    <div class="user-dropdown-menu" id="userDropdownMenu">
      <div class="user-dropdown-header">
        <div class="user-dropdown-name">${user.name || user.username}</div>
        <div class="user-dropdown-sub">@${user.username} • ${user.phone || ''}</div>
      </div>
      <button class="user-dropdown-item" onclick="logoutUser()">
        🚪 Logout
      </button>
    </div>
  `;

  badge.innerHTML = badgeHtml;

  if (appBadgeContainer) {
    appBadgeContainer.innerHTML = `
      <div class="user-profile-badge">
        <button class="user-badge-btn" onclick="toggleUserDropdownApp(event)">
          <span>👤</span> ${user.name || user.username} (Class ${user.classLevel || 1}) ▾
        </button>
        <div class="user-dropdown-menu" id="userDropdownMenuApp">
          <div class="user-dropdown-header">
            <div class="user-dropdown-name">${user.name || user.username}</div>
            <div class="user-dropdown-sub">@${user.username} • ${user.phone || ''}</div>
          </div>
          <button class="user-dropdown-item" onclick="logoutUser()">
            🚪 Logout
          </button>
        </div>
      </div>
    `;
  }
}

function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('userDropdownMenu');
  if (dropdown) dropdown.classList.toggle('active');
}

function toggleUserDropdownApp(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('userDropdownMenuApp');
  if (dropdown) dropdown.classList.toggle('active');
}

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('userDropdownMenu');
  const dropdownApp = document.getElementById('userDropdownMenuApp');
  if (dropdown && dropdown.classList.contains('active')) {
    if (!e.target.closest('#userProfileBadge')) {
      dropdown.classList.remove('active');
    }
  }
  if (dropdownApp && dropdownApp.classList.contains('active')) {
    if (!e.target.closest('#userProfileBadgeApp')) {
      dropdownApp.classList.remove('active');
    }
  }
});

function logoutUser() {
  localStorage.removeItem('learnaiq_token');
  state.userProfile = null;
  renderUserHeaderProfile(null);
  showLandingPage();
  alert('👋 You have logged out successfully.');
}

async function loadUserChatHistory() {
  const token = localStorage.getItem('learnaiq_token');
  if (!token) return;
  const res = await apiFetch('/tutor/history');
  if (res && res.history && res.history.length > 0) {
    const chatBox = document.getElementById('tutorChatBox');
    if (!chatBox) return;
    chatBox.innerHTML = '';
    res.history.forEach(item => {
      appendChatMessage('user', item.question);
      appendChatMessage('ai', item.answer);
    });
  }
}

function openReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.add('active');
}

function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.remove('active');
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('revAuthorName').value;
  const stars = document.getElementById('revStars').value;
  const comment = document.getElementById('revComment').value;

  await apiFetch('/reviews', 'POST', {
    authorName: name,
    stars,
    comment
  });

  closeReviewModal();
  alert(`🌟 Thank you ${name}! Your ${stars}-star review has been posted successfully!`);
}

function scrollToTutor(promptKey) {
  const tutorSection = document.getElementById('ai-tutor');
  if (tutorSection) tutorSection.scrollIntoView({ behavior: 'smooth' });

  if (promptKey === 'fraction') sendQuickPrompt('What is a fraction?');
  else if (promptKey === 'fraction-simple') sendQuickPrompt('Explain Simply');
  else if (promptKey === 'fraction-quiz') sendQuickPrompt('Practice');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function stripHTML(html) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
