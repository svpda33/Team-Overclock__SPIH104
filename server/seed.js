const { initDb, run, get } = require('./db');

const INITIAL_CURRICULUM = [
  // Class 1 Maths
  { class: 1, subject: 'Maths', chapter_id: 'c1_m1', title_en: 'Numbers and Counting', title_te: 'అంకెలు మరియు లెక్కించడం', desc_en: 'Learn to count 1 to 100 with fun fruits, stars and animal counters.', desc_te: 'పండ్లు, నక్షత్రాలు మరియు జంతువుల బొమ్మలతో 1 నుండి 100 వరకు లెక్కించడం నేర్చుకోండి.', icon: '🔢' },
  { class: 1, subject: 'Maths', chapter_id: 'c1_m2', title_en: 'Addition and Subtraction', title_te: 'కూడికలు మరియు తీసివేతలు', desc_en: 'Add and subtract single digit numbers using friendly visual blocks.', desc_te: 'బొమ్మల సాయంతో ఒక అంకె కూడికలు మరియు తీసివేతలు సులభంగా చేయండి.', icon: '➕' },
  { class: 1, subject: 'Maths', chapter_id: 'c1_m3', title_en: 'Shapes and Patterns', title_te: 'ఆకారాలు మరియు నమూనాలు', desc_en: 'Discover circles, squares, triangles, and repeating color patterns.', desc_te: 'వృత్తాలు, చతురస్రాలు, త్రిభుజాలు మరియు రంగుల నమూనాలు తెలుసుకోండి.', icon: '🔷' },
  { class: 1, subject: 'Maths', chapter_id: 'c1_m4', title_en: 'Measurement', title_te: 'కొలతలు (Measurement)', desc_en: 'Compare big vs small, tall vs short, and heavy vs light objects.', desc_te: 'పెద్దది vs చిన్నది, పొడవైనది vs పొట్టిది, బరువైనది పోల్చడం.', icon: '📏' },
  
  // Class 1 Science
  { class: 1, subject: 'Science', chapter_id: 'c1_s1', title_en: 'My Body', title_te: 'నా శరీరం (My Body)', desc_en: 'Learn about your eyes, ears, hands, legs and how your body works.', desc_te: 'కళ్ళు, చెవులు, చేతులు, కాళ్ళు మరియు మన శరీరం పనిచేసే విధానం.', icon: '🖐️' },
  { class: 1, subject: 'Science', chapter_id: 'c1_s2', title_en: 'Plants Around Us', title_te: 'మన చుట్టూ ఉన్న మొక్కలు', desc_en: 'Discover leaves, flowers, trees, and how plants grow in sunlight.', desc_te: 'ఆకులు, పూలు, చెట్లు మరియు సూర్యరశ్మితో మొక్కలు ఎలా పెరుగుతాయో చూడండి.', icon: '🌱' },
  { class: 1, subject: 'Science', chapter_id: 'c1_s3', title_en: 'Animals Around Us', title_te: 'మన చుట్టూ ఉన్న జంతువులు', desc_en: 'Meet pets, farm animals, wild animals, and the sounds they make.', desc_te: 'పెంపుడు జంతువులు, అడవి జంతువులు మరియు వాటి శబ్దాలు.', icon: '🐶' },
  { class: 1, subject: 'Science', chapter_id: 'c1_s4', title_en: 'Water and Its Uses', title_te: 'నీరు మరియు దాని ఉపయోగాలు', desc_en: 'Why we drink water, how animals use water, and saving clean water.', desc_te: 'మనం నీరు ఎందుకు తాగుతాం, నీటిని ఎలా పొదుపు చేయాలో నేర్చుకోండి.', icon: '💧' },

  // Class 2 Maths
  { class: 2, subject: 'Maths', chapter_id: 'c2_m1', title_en: 'Place Value and Numbers', title_te: 'స్థాన విలువలు (Place Value)', desc_en: 'Understand Ones, Tens, and Hundreds with easy bundle blocks.', desc_te: 'ఒకట్లు, పదులు, వందల స్థాన విలువలను కట్టల బొమ్మలతో అర్థం చేసుకోండి.', icon: '💯' },
  { class: 2, subject: 'Maths', chapter_id: 'c2_m2', title_en: 'Addition and Subtraction', title_te: 'రెండు అంకెల కూడికలు', desc_en: 'Two-digit addition and subtraction with regrouping made simple.', desc_te: 'రెండు అంకెల కూడికలు మరియు దశాంశాల తీసివేతలు.', icon: '🧮' },
  { class: 2, subject: 'Maths', chapter_id: 'c2_m3', title_en: 'Multiplication and Division', title_te: 'హెచ్చవేతలు మరియు భాగాహారాలు', desc_en: 'Repeated addition, equal grouping, and fun multiplication tables.', desc_te: 'గుణకారం, సమాన భాగాలు చేయడం మరియు ఎక్కాలు.', icon: '✖️' },
  { class: 2, subject: 'Maths', chapter_id: 'c2_m4', title_en: 'Time and Money', title_te: 'సమయం మరియు డబ్బు', desc_en: 'Reading clock hands, morning/night, and counting rupees & coins.', desc_te: 'గడియారం ముల్లు చూడటం, రూపాయలు మరియు నాణేలు లెక్కించడం.', icon: '⏰' },

  // Class 2 Science
  { class: 2, subject: 'Science', chapter_id: 'c2_s1', title_en: 'Living and Non-Living Things', title_te: 'సజీవులు మరియు నిర్జీవులు', desc_en: 'Things that breathe, grow, and move vs objects that stay still.', desc_te: 'గాలి పీల్చేవి, పెరిగేవి (సజీవులు) vs కదలని వస్తువులు (నిర్జీవులు).', icon: '🦋' },
  { class: 2, subject: 'Science', chapter_id: 'c2_s2', title_en: 'Parts of a Plant', title_te: 'మొక్క యొక్క భాగాలు', desc_en: 'Explore roots, stems, leaves, flowers, and fruits in detail.', desc_te: 'వేర్లు, కాండం, ఆకులు, పువ్వులు మరియు కాయల గురించిన వివరణ.', icon: '🌻' },
  { class: 2, subject: 'Science', chapter_id: 'c2_s3', title_en: 'Animals and Their Habitats', title_te: 'జంతువులు - నివాసాలు', desc_en: 'Where animals live: land, water, nests, burrows, and trees.', desc_te: 'జంతువులు ఎక్కడ నివసిస్తాయి: గుళ్ళు, చెట్లు, నీరు మరియు తొర్రలు.', icon: '🦁' },
  { class: 2, subject: 'Science', chapter_id: 'c2_s4', title_en: 'Food and Nutrition', title_te: 'ఆహారం మరియు పోషణ', desc_en: 'Healthy fruits, vegetables, milk, and energy-giving foods.', desc_te: 'ఆరోగ్యకరమైన పండ్లు, కూరగాయలు, పాలు మరియు శక్తినిచ్చే ఆహారం.', icon: '🍎' },

  // Class 3 Maths
  { class: 3, subject: 'Maths', chapter_id: 'c3_m1', title_en: 'Multiplication and Division', title_te: 'గుణకారం మరియు భాగాహారం', desc_en: 'Multi-digit multiplication, sharing equally, and long division steps.', desc_te: 'పెద్ద సంఖ్యల గుణకారం మరియు సమాన పంపిణీ పద్ధతులు.', icon: '➗' },
  { class: 3, subject: 'Maths', chapter_id: 'c3_m2', title_en: 'Fractions', title_te: 'భిన్నాలు (Fractions)', desc_en: 'Halves, thirds, quarters, pizza slice examples, and equal parts.', desc_te: 'సగాలు, మూడవ వంతులు, పావు వంతులు, పిజ్జా ముక్కల ఉదాహరణలు.', icon: '🍕' },
  { class: 3, subject: 'Maths', chapter_id: 'c3_m3', title_en: 'Geometry and Shapes', title_te: 'జ్యామితి మరియు ఆకారాలు', desc_en: '2D & 3D shapes, edges, vertices, lines, and symmetry patterns.', desc_te: '2D & 3D ఆకారాలు, అంచులు, మూలలు మరియు సౌష్టవ నమూనాలు.', icon: '📐' },
  { class: 3, subject: 'Maths', chapter_id: 'c3_m4', title_en: 'Measurement', title_te: 'కొలతలు (మీటర్లు & కిలోలు)', desc_en: 'Measuring length in meters, weight in kg, and capacity in liters.', desc_te: 'పొడవును మీటర్లలో, బరువును కిలోలలో, ద్రవాలను లీటర్లలో కొలవడం.', icon: '⚖️' },

  // Class 3 Science
  { class: 3, subject: 'Science', chapter_id: 'c3_s1', title_en: 'Human Body and Health', title_te: 'మానవ శరీరం మరియు ఆరోగ్యం', desc_en: 'Organ systems: digestive system, lungs, heart, and clean habits.', desc_te: 'జీర్ణవ్యవస్థ, ఊపిరితిత్తులు, గుండె మరియు పరిశుభ్రత అలవాట్లు.', icon: '🫀' },
  { class: 3, subject: 'Science', chapter_id: 'c3_s2', title_en: 'Plants and Their Needs', title_te: 'మొక్కల అవసరాలు', desc_en: 'Photosynthesis, how roots absorb water, and seed germination.', desc_te: 'కిరణజన్య సంయోగక్రియ, వేర్లు నీటిని పీల్చుకోవడం, విత్తన మొలక.', icon: '🪴' },
  { class: 3, subject: 'Science', chapter_id: 'c3_s3', title_en: 'States of Matter', title_te: 'పదార్థాల స్థితులు', desc_en: 'Solids, liquids, and gases — ice, water, and steam experiments.', desc_te: 'ఘన, ద్రవ, వాయు స్థితులు — మంచు, నీరు మరియు ఆవిరి ప్రయోగాలు.', icon: '🧊' },
  { class: 3, subject: 'Science', chapter_id: 'c3_s4', title_en: 'Force and Motion', title_te: 'బలం మరియు చలనం', desc_en: 'Push, pull, friction, gravity, and how objects speed up or stop.', desc_te: 'నెట్టడం, లాగడం, ఘర్షణ, గురుత్వాకర్షణ మరియు వస్తువుల కదలిక.', icon: '🚀' },

  // Class 4 Maths
  { class: 4, subject: 'Maths', chapter_id: 'c4_m1', title_en: 'Decimals and Place Values', title_te: 'దశాంశాలు మరియు స్థాన విలువలు', desc_en: 'Tenths, hundredths, decimal addition, and money calculations.', desc_te: 'దశాంశాలు, వందవ వంతులు, కూడికలు మరియు కరెన్సీ లెక్కలు.', icon: '🪙' },
  { class: 4, subject: 'Maths', chapter_id: 'c4_m2', title_en: 'Advanced Multiplication & Division', title_te: 'పెద్ద సంఖ్యల హెచ్చవేతలు & భాగాహారాలు', desc_en: 'Long division algorithms, remainders, and multi-step word problems.', desc_te: 'సుదీర్ఘ భాగాహారాలు, శేషం మరియు సమస్యల పరిష్కారం.', icon: '➗' },
  { class: 4, subject: 'Maths', chapter_id: 'c4_m3', title_en: 'Perimeter and Area', title_te: 'చుట్టుకొలత మరియు వైశాల్యం', desc_en: 'Calculating boundary lengths and square grid areas of shapes.', desc_te: 'చుట్టుకొలత మరియు చతురస్రాల వైశాల్యం కనుగొనడం.', icon: '📐' },
  { class: 4, subject: 'Maths', chapter_id: 'c4_m4', title_en: 'Data Handling and Bar Graphs', title_te: 'డేటా మరియు బార్ గ్రాఫ్‌లు', desc_en: 'Tally marks, reading pictographs, and bar graph representations.', desc_te: 'ట్యాగ్‌లు, పిక్టోగ్రాఫ్‌లు మరియు బార్ గ్రాఫ్‌లను అర్థం చేసుకోవడం.', icon: '📊' },

  // Class 4 Science
  { class: 4, subject: 'Science', chapter_id: 'c4_s1', title_en: 'Ecosystems & Food Chains', title_te: 'ఆవరణ వ్యవస్థలు & ఆహార శృంఖలాలు', desc_en: 'Producers, consumers, decomposers, and energy flow in nature.', desc_te: 'ఉత్పత్తిదారులు, వినియోగదారులు మరియు ప్రకృతిలో శక్తి ప్రవాహం.', icon: '🌿' },
  { class: 4, subject: 'Science', chapter_id: 'c4_s2', title_en: 'Water Cycle & Weather', title_te: 'నీటి చక్రం & వాతావరణం', desc_en: 'Evaporation, condensation, precipitation, and seasonal weather.', desc_te: 'భాష్పీభవనం, సాంద్రీకరణ, వర్షం మరియు ఋతువులు.', icon: '🌧️' },
  { class: 4, subject: 'Science', chapter_id: 'c4_s3', title_en: 'Rocks, Soil & Minerals', title_te: 'రాళ్ళు, నేల & ఖనిజాలు', desc_en: 'Types of soil, rock formation, erosion, and soil conservation.', desc_te: 'నేల రకాలు, రాళ్ళు ఏర్పడటం, క్రమక్షయం మరియు నేల రక్షణ.', icon: '🪨' },
  { class: 4, subject: 'Science', chapter_id: 'c4_s4', title_en: 'Solar System & Earth', title_te: 'సౌర కుటుంబం & భూమి', desc_en: 'Planets, sun, moon phases, earth rotation, and day & night.', desc_te: 'గ్రహాలు, సూర్యుడు, చంద్రుని కళలు, భూభ్రమణం మరియు రోజు-రాత్రి.', icon: '🪐' },

  // Class 5 Maths
  { class: 5, subject: 'Maths', chapter_id: 'c5_m1', title_en: 'Factors, Multiples & Primes', title_te: 'కారణాంకాలు, గుణిజాలు & ప్రధాన సంఖ్యలు', desc_en: 'LCM, HCF, prime factorization, and divisibility rules.', desc_te: 'క.సా.గు, గ.సా.భా, ప్రధాన కారణాంకాలు మరియు భాజ్యతా సూత్రాలు.', icon: '🔢' },
  { class: 5, subject: 'Maths', chapter_id: 'c5_m2', title_en: 'Pre-Algebra & Equations', title_te: 'అల్జీబ్రా పరిచయం & సమీకరణాలు', desc_en: 'Variables, simple algebraic expressions, and solving for X.', desc_te: 'చరరాశులు, చిన్న సమీకరణాలు మరియు X విలువను కనుగొనడం.', icon: '🔣' },
  { class: 5, subject: 'Maths', chapter_id: 'c5_m3', title_en: 'Angles & Polygons', title_te: 'కోణాలు, త్రిభుజాలు & బహుభుజులు', desc_en: 'Acute, right, obtuse angles, protractor use, and triangle rules.', desc_te: 'లంబకోణం, లఘుకోణం, ప్రొట్రాక్టర్ వాడకం మరియు త్రిభుజ సూత్రాలు.', icon: '📐' },
  { class: 5, subject: 'Maths', chapter_id: 'c5_m4', title_en: 'Percentages & Profit/Loss', title_te: 'శాతాలు & లాభ నష్టాలు', desc_en: 'Calculating percentages, discounts, cost price, and selling price.', desc_te: 'శాతాలు లెక్కించడం, డిస్కౌంట్లు, కొన్న వెల మరియు అమ్మిన వెల.', icon: '🏷️' },

  // Class 5 Science
  { class: 5, subject: 'Science', chapter_id: 'c5_s1', title_en: 'Atmosphere & Air Pressure', title_te: 'వాతావరణం & గాలి పీడనం', desc_en: 'Layers of atmosphere, oxygen cycle, and air pressure experiments.', desc_te: 'వాతావరణ పొరలు, ఆక్సిజన్ చక్రం మరియు గాలి పీడనం.', icon: '🌬️' },
  { class: 5, subject: 'Science', chapter_id: 'c5_s2', title_en: 'Simple Machines & Energy', title_te: 'సరళ యంత్రాలు & శక్తి రకాలు', desc_en: 'Levers, pulleys, inclined planes, kinetic & potential energy.', desc_te: 'నెట్టు బల్లలు, చక్రాలు, కప్పీలు మరియు శక్తి రకాలు.', icon: '⚙️' },
  { class: 5, subject: 'Science', chapter_id: 'c5_s3', title_en: 'Nervous & Circulatory Systems', title_te: 'నరాల & రక్తప్రసరణ వ్యవస్థలు', desc_en: 'Brain, spinal cord, nerves, heart chambers, and blood flow.', desc_te: 'మెదడు, వెన్నుపాము, నరాలు, గుండె గదులు మరియు రక్తప్రసరణ.', icon: '🧠' },
  { class: 5, subject: 'Science', chapter_id: 'c5_s4', title_en: 'Universe & Space Science', title_te: 'విశ్వం, నక్షత్రాలు & రోదసి విజ్ఞానం', desc_en: 'Galaxies, constellations, satellites, and space exploration rockets.', desc_te: 'గెలాక్సీలు, నక్షత్రరాశులు, ఉపగ్రహాలు మరియు రాకెట్లు.', icon: '🌌' }
];

const INITIAL_REVIEWS = [
  { author: 'Srinivas Rao (Hyderabad)', stars: 5, comment: 'My daughter in Class 2 used to fear Maths addition. LearnAIQ explained it using pizza slices and Telugu audio! She now loves practice time.' },
  { author: 'Anitha Sharma (Teacher)', stars: 5, comment: 'The "Explain Why" feature is pure gold! It doesn’t just ask for a multiple-choice answer, it checks if my son actually understands the concept.' },
  { author: 'Karthik (Class 3 Student)', stars: 5, comment: 'I love listening to the AI tutor read aloud in Telugu! The fractions lesson with cake slices was so much fun.' }
];

async function seed() {
  console.log('🌱 Initializing Database Seeding...');
  await initDb();

  // Seed Curriculum
  for (const item of INITIAL_CURRICULUM) {
    const exists = await get('SELECT id FROM curriculum WHERE chapter_id = ?', [item.chapter_id]);
    if (!exists) {
      await run(
        `INSERT INTO curriculum (class_level, subject, chapter_id, title_en, title_te, desc_en, desc_te, icon)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.class, item.subject, item.chapter_id, item.title_en, item.title_te, item.desc_en, item.desc_te, item.icon]
      );
    }
  }

  // Seed Reviews
  const reviewsCount = await get('SELECT COUNT(*) as total FROM reviews');
  if (!reviewsCount || reviewsCount.total === 0) {
    for (const r of INITIAL_REVIEWS) {
      await run(
        `INSERT INTO reviews (author_name, stars, comment) VALUES (?, ?, ?)`,
        [r.author, r.stars, r.comment]
      );
    }
  }

  console.log('✅ Seeding completed successfully!');
}

if (require.main === module) {
  seed().then(() => process.exit(0)).catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}

module.exports = seed;
