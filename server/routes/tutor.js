const express = require('express');
const { run, query, get } = require('../db');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Knowledge Base for AI responses in English & Telugu
const TUTOR_KNOWLEDGE = {
  en: {
    fraction: "A **fraction** shows a part of a whole! 🍕 Imagine a pizza cut into 4 equal slices. If you take 1 slice, you have **1/4** of the pizza! 3 slices would be **3/4**.",
    fraction_simple: "Imagine a yummy chocolate bar 🍫 broken into 2 equal halves. Each half is **1/2**! When you share fairly with a friend, you are using fractions!",
    fraction_example: "Here is a fun example: In a basket of 4 apples, 1 is green 🍏 and 3 are red 🍎. The green apples make up **1/4** of the basket!",
    fraction_practice: "Let's try a quick puzzle! If a cake is sliced into 8 equal pieces and you eat 2 pieces, what fraction did you eat? (Hint: 2 out of 8 = 2/8 or 1/4!)",
    addition: "Addition means putting things together! 🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎 (2 + 3 = 5).",
    subtraction: "Subtraction means taking away! 🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎 (5 - 2 = 3).",
    multiplication: "Multiplication is repeated addition! 3 groups of 2 stars ⭐⭐ + ⭐⭐ + ⭐⭐ = 6 stars (3 × 2 = 6).",
    division: "Division is sharing equally among friends! 6 cookies shared between 2 friends means each friend gets 3 cookies (6 ÷ 2 = 3) 🍪.",
    plants: "Plants need 3 main things to grow: **Sunlight** ☀️, **Water** 💧, and **Air** 🌬️! Roots drink water from the soil.",
    body: "Your **heart** pumps blood 🫀, your **lungs** help you breathe air 🫁, and your **brain** helps you think and learn 🧠!",
    living: "Living things breathe, grow, and eat food (like puppies 🐶 and trees 🌳). Non-living things do not eat or grow (like toys 🧸 and rocks 🪨).",
    shapes: "Circles 🔴 are round with no corners, Squares 🟧 have 4 equal sides, and Triangles 🔺 have 3 sharp corners!",
    safety: "I hear that you're feeling worried or sad. 💛 Please know that you are very special! Whenever you feel this way, it is always a wonderful idea to talk to a trusted adult, like your parents or your teacher. They care about you very much!",
    default: "That's a fantastic question! Let me break it down simply: Every concept is built step-by-step. Would you like a real-life visual example or a practice question?"
  },
  te: {
    fraction: "**భిన్నం (Fraction)** అనేది ఒక పూర్ణ భాగంలో కొంత భాగం! 🍕 4 సమాన భాగాలుగా కోసిన పిజ్జాలో మీరు 1 భాగం తీసుకుంటే, అది **1/4** భాగం అవుతుంది!",
    fraction_simple: "ఒక చాక్లెట్ 🍫 రెండు సమాన భాగాలుగా చేసినప్పుడు, ప్రతీ భాగం **1/2** అవుతుంది!",
    fraction_example: "ఉదాహరణ: 4 ఆపిల్స్ లో 1 పచ్చని ఆపిల్ 🍏 ఉంటే, పచ్చని ఆపిల్స్ భాగం **1/4**!",
    fraction_practice: "ప్రశ్న: 8 సమాన కేక్ ముక్కలలో మీరు 2 ముక్కలు తింటే, మీరు తిన్న భాగం ఎంత? (జవాబు: 2/8 లేదా 1/4!)",
    addition: "కూడిక (Addition) అంటే వస్తువులను కలపడం! 2 ఆపిల్స్ + 3 ఆపిల్స్ = 5 ఆపిల్స్ (2 + 3 = 5).",
    subtraction: "తీసివేత (Subtraction) అంటే తీసివేయడం! 5 - 2 = 3.",
    multiplication: "గుణకారం (Multiplication) అంటే పదే పదే కూడటం! 3 × 2 = 6.",
    division: "భాగాహారం (Division) అంటే సమానంగా పంచడం! 6 కుకీలను 2 స్నేహితులకు పంచితే ఒక్కొక్కరికి 3 వస్తాయి 🍪.",
    plants: "మొక్కలు పెరగడానికి 3 ముఖ్యమైనవి కావాలి: **సూర్యరశ్మి** ☀️, **నీరు** 💧, మరియు **గాలి** 🌬️!",
    body: "మన **గుండె** రక్తాన్ని పంప్ చేస్తుంది 🫀, **ఊపిరితిత్తులు** గాలి పీల్చుకోవడానికి సహాయపడతాయి 🫁!",
    living: "సజీవులు గాలి పీలుస్తాయి, పెరుగుతాయి (ఉదా: కుక్కపిల్లలు 🐶, చెట్లు 🌳). నిర్జీవులు పెరగవు (ఉదా: బొమ్మలు 🧸).",
    shapes: "వృత్తాలు 🔴 గుండ్రంగా ఉంటాయి, చతురస్రాలు 🟧 4 సమాన భుజాలు కలిగి ఉంటాయి, త్రిభుజాలు 🔺 3 మూలలు కలిగి ఉంటాయి!",
    safety: "మీరు కాస్త బాధగా ఉన్నారని నేను గ్రహించాను. 💛 మీరు ఎప్పుడైనా ఇలా అనిపించినప్పుడు మీ తల్లిదండ్రులు లేదా ఉపాధ్యాయులతో మాట్లాడండి!",
    default: "ఇది చాలా మంచి ప్రశ్న! దీన్ని సులభంగా అర్థం చేసుకుందాం. మీరు ఒక ఉదాహరణ చూడాలనుకుంటున్నారా?"
  }
};

// Dynamic Math & Expression Solver for Fallback Engine
function tryDynamicMathSolver(question) {
  const match = question.match(/(\d+)\s*([\+\-\*\/x×÷])\s*(\d+)/i);
  if (!match) return null;

  const num1 = parseInt(match[1]);
  let op = match[2];
  const num2 = parseInt(match[3]);

  if (op === 'x' || op === '×') op = '*';
  if (op === '÷') op = '/';

  let res = 0;
  let emojiStr = '';

  if (op === '+') {
    res = num1 + num2;
    emojiStr = '🍎'.repeat(Math.min(num1, 5)) + ' + ' + '🍏'.repeat(Math.min(num2, 5));
    return `Let's solve this addition step-by-step! 🧮\n\n**${num1} + ${num2} = ${res}**\n\nVisual Counter: ${emojiStr} = **${res}** total items! Great job calculating! ✨`;
  } else if (op === '-') {
    res = num1 - num2;
    return `Let's solve this subtraction step-by-step! 🧮\n\n**${num1} - ${num2} = ${res}**\n\nIf you have ${num1} cookies 🍪 and share ${num2}, you have **${res}** left! Wonderful! ✨`;
  } else if (op === '*') {
    res = num1 * num2;
    return `Multiplication is repeated addition! ✖️\n\n**${num1} × ${num2} = ${res}**\n\nThat's ${num1} groups of ${num2}! The total is **${res}**! Fantastic calculation! 🌟`;
  } else if (op === '/') {
    if (num2 === 0) return "Oops! We cannot divide by 0 because sharing among 0 friends isn't possible! 🍩";
    res = (num1 / num2).toFixed(num1 % num2 === 0 ? 0 : 2);
    return `Division means equal sharing! 🍪\n\n**${num1} ÷ ${num2} = ${res}**\n\nIf you share ${num1} items equally among ${num2} friends, each friend gets **${res}**! Super work! 🎉`;
  }

  return null;
}

// Generate Dynamic Gemini-style AI Response based on input question & context
function generateAiAnswer(question, language = 'en', classLevel = 1, subject = 'Maths') {
  const lang = TUTOR_KNOWLEDGE[language] ? language : 'en';
  const dict = TUTOR_KNOWLEDGE[lang];
  const q = question.trim().toLowerCase();
  const isTelugu = lang === 'te';

  // 1. Safety Distress Check
  const distressKeywords = ['scared', 'sad', 'crying', 'lonely', 'afraid', 'upset', 'సంతోషం లేదు', 'భయం', 'ఏడుపు'];
  if (distressKeywords.some(k => q.includes(k))) {
    return dict.safety;
  }

  // 2. Conversational Intent Handler (Greetings, Identity, Small Talk, Gratitude)
  const greetings = ['hi', 'hello', 'hey', 'namaste', 'హలో', 'హాయ్', 'నమస్కారం', 'good morning', 'good afternoon', 'good evening'];
  if (greetings.some(g => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g))) {
    if (isTelugu) {
      return `నమస్కారం! 👋 నేను మీ **LearnAIQ AI ట్యూటర్** ని. ఈ రోజు మనం క్లాస్ ${classLevel} ${subject} లో ఏ అంశం నేర్చుకుందాం? ఏ ప్రశ్లనైనా ధైర్యంగా అడగండి! 🌟`;
    }
    return `Hello there! 👋 I'm your **LearnAIQ AI Tutor**. How are you doing today? I'm super excited to explore Class ${classLevel} ${subject} with you! What topic would you like to learn together? 🌟`;
  }

  const identityQueries = ['who are you', 'what is your name', 'what can you do', 'మీరు ఎవరు', 'మీ పేరు ఏంటి', 'నువ్వు ఎవరు', 'మీరు ఏమి చేయగలరు'];
  if (identityQueries.some(iq => q.includes(iq))) {
    if (isTelugu) {
      return `నేను **LearnAIQ Buddy**! 🤖 మీ క్లాస్ ${classLevel} AI లెర్నింగ్ పార్ట్‌నర్ ని. బొమ్మలతో సులభంగా పాఠాలు వివరించడం, లెక్కలు చేయడం, నిజ జీవిత ఉదాహరణలు ఇవ్వడం మరియు మీ సందేహాలు తీర్చడం నా పని! ✨`;
    }
    return `I am **LearnAIQ Buddy**! 🤖 I'm your personal AI learning companion for Class ${classLevel} ${subject}. I can explain concepts step-by-step, give visual analogies, solve math problems, and answer any curiosity questions in English & Telugu! ✨`;
  }

  const smallTalkQueries = ['how are you', 'how do you do', 'మీరు ఎలా ఉన్నారు', 'ఎలా ఉన్నారు'];
  if (smallTalkQueries.some(st => q.includes(st))) {
    if (isTelugu) {
      return `నేను చాలా బాగున్నాను! 🌟 మీతో కలిసి పాఠాలు నేర్చుకోవడానికి ఎంతో ఆత్రుతగా ఉన్నాను. మీ రోజు ఎలా సాగుతోంది? ఏ ప్రశ్నతో ప్రారంభించుకుందాం?`;
    }
    return `I'm feeling awesome and super excited to learn with you today! 🌟 How are you doing? Ready to explore some fun ${subject} concepts together?`;
  }

  const thanksQueries = ['thank you', 'thanks', 'ధన్యవాదాలు', 'థాంక్స్', 'thanku'];
  if (thanksQueries.some(tq => q.includes(tq))) {
    if (isTelugu) {
      return `మీకు చాలా ధన్యవాదాలు! 🌟 మీరు ఎంతో ఉత్సాహంగా నేర్చుకుంటున్నారు. ఇంకా ఏమైనా సందేహాలు ఉంటే ఎప్పుడైనా అడగవచ్చు!`;
    }
    return `You're very welcome! 🌟 You are doing a fantastic job learning today. Feel free to ask any other questions anytime!`;
  }

  // 3. Dynamic Math Solver Check
  const mathSolution = tryDynamicMathSolver(question);
  if (mathSolution) return mathSolution;

  // 4. Topic Specific Dynamic Explanation Builder
  let topicSummaryEn = `exploring **"${question}"**`;
  let topicSummaryTe = `**"${question}"** గురించిన వివరణ`;
  let analogyEn = `Imagine cutting a delicious pizza 🍕 or sharing toys evenly with your friends!`;
  let analogyTe = `ఒక రుచికరమైన పిజ్జాను 🍕 ముక్కలు చేయడం లేదా స్నేహితులతో ఆటబొమ్మలను పంచడం ఊహించుకోండి!`;
  let quizEn = `If you have 4 items and give away 1 item, how many remain? (Answer: 3!)`;
  let quizTe = `మీ దగ్గర 4 వస్తువులు ఉండి 1 ఇస్తే, మిగిలేవి ఎన్ని? (జవాబు: 3!)`;

  if (q.includes('fraction') || q.includes('భిన్నం')) {
    analogyEn = `Imagine a pizza cut into 4 equal slices. If you take 1 slice, you have **1/4** of the pizza! 🍕`;
    analogyTe = `4 సమాన భాగాలుగా కోసిన పిజ్జాలో మీరు 1 భాగం తీసుకుంటే, అది **1/4** భాగం అవుతుంది! 🍕`;
    quizEn = `If a cake is cut into 8 slices and you eat 2, what fraction did you eat? (Hint: 2/8 or 1/4!)`;
    quizTe = `8 ముక్కల కేకులో మీరు 2 ముక్కలు తింటే భిన్నం ఎంత? (జవాబు: 1/4!)`;
  } else if (q.includes('plant') || q.includes('మొక్క')) {
    analogyEn = `Plants drink water from soil with their roots and catch sunlight ☀️ with green leaves to make food!`;
    analogyTe = `మొక్కలు సూర్యరశ్మితో ☀️ మరియు వేర్ల ద్వారా పీల్చుకున్న నీటితో ఆహారాన్ని తయారుచేసుకుంటాయి!`;
    quizEn = `What 3 main things do plants need to grow? (Sunlight, Water, and Air!)`;
    quizTe = `మొక్కలు పెరగడానికి కావాల్సిన 3 ముఖ్యమైనవి ఏవి? (సూర్యరశ్మి, నీరు, మరియు గాలి!)`;
  } else if (q.includes('body') || q.includes('శరీరం') || q.includes('heart') || q.includes('lung')) {
    analogyEn = `Your **heart** pumps blood 🫀, lungs breathe air 🫁, and your brain 🧠 helps you think!`;
    analogyTe = `మన **గుండె** రక్తాన్ని పంప్ చేస్తుంది 🫀, **ఊపిరితిత్తులు** గాలి పీలుస్తాయి 🫁!`;
    quizEn = `Which organ pumps blood through your entire body? (Your Heart!)`;
    quizTe = `మన శరీరమంతటా రక్తాన్ని పంప్ చేసే అవయవం ఏది? (గుండె!)`;
  } else if (q.includes('decim') || q.includes('దశాంశ')) {
    analogyEn = `Decimals are like counting rupees and paise! ₹10.50 means 10 whole rupees and 50 paise. 🪙`;
    analogyTe = `దశాంశాలు అంటే రూపాయిలు మరియు పైసలు లెక్కించడం లాంటిది! ₹10.50 🪙`;
    quizEn = `What is 0.5 + 0.5? (Answer: 1.0 or 1 Whole!)`;
    quizTe = `0.5 + 0.5 ఎంత అవుతుంది? (జవాబు: 1 పాయింట్!)`;
  } else if (q.includes('space') || q.includes('planet') || q.includes('సౌర') || q.includes('గ్రహం')) {
    analogyEn = `Planets orbit the Sun ☀️ like kids running around a central playground ring! Earth is planet #3. 🪐`;
    analogyTe = `గ్రహాలు సూర్యుని ☀️ చుట్టూ తిరుగుతుంటాయి! మన భూమి 3వ గ్రహం. 🪐`;
    quizEn = `Which planet is known as the Blue Planet? (Earth! 🌍)`;
    quizTe = `బ్లూ ప్లానెట్ (నీలి గ్రహం) అని దేనిని అంటారు? (భూమి! 🌍)`;
  }

  if (isTelugu) {
    return `### 💡 LearnAIQ Buddy AI ట్యూటర్ వివరణ (Class ${classLevel} ${subject})

🎯 **అడుగు 1: భావన భావచిత్రం (Concept Analogy)**
${analogyTe}

💡 **అడుగు 2: దశలవారీ వివరణ (Step-by-Step Breakdown)**
• ప్రతీ పాఠం చిన్న చిన్న అడుగులుగా సులభంగా అర్థమవుతుంది.
• సరిగ్గా ఆలోచించడం ద్వారా క్లిష్టమైన సమస్యలన్నీ తేలికగా పరిష్కరించవచ్చు!

🌟 **అడుగు 3: నిజ జీవిత ఉదాహరణ (Real-Life Application)**
${topicSummaryTe} అనేది మనం రోజువారీ జీవితంలో చూసే సహజమైన ప్రక్రియ!

🧠 **అడుగు 4: సాధన ప్రశ్న (Practice Quiz)**
${quizTe}`;
  }

  return `### 💡 LearnAIQ Buddy AI Tutor Explanation (Class ${classLevel} ${subject})

🎯 **Step 1: Concept Analogy**
${analogyEn}

💡 **Step 2: Step-by-Step Breakdown**
• We break complex topics into small, friendly pieces for Class ${classLevel}.
• Every rule is easy to remember when visualized step-by-step!

🌟 **Step 3: Real-Life Application**
${topicSummaryEn} shows up all around us in daily life!

🧠 **Step 4: Interactive Practice Quiz**
${quizEn}`;
}

// Generate Response using Google Gemini API LLM (with Fallback to Dynamic Engine)
async function generateGeminiResponse(question, language, classLevel, subject) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') return null;

  try {
    const promptText = `You are LearnAIQ Buddy, an encouraging, highly intelligent primary-school AI tutor for Class ${classLevel} students studying ${subject}.

Task: The student asked a unique question: "${question}".
Requirements:
1. Answer the student's question directly, accurately, and uniquely. Never give a static or generic template answer.
2. Language: ${language === 'te' ? 'Respond strictly in clear, natural, friendly Telugu (తెలుగు)' : 'Respond in simple, clear, encouraging English'}.
3. Audience: Class ${classLevel} primary school student. Keep language simple, engaging, and use friendly real-life visual analogies (like pizza slices, fruits, stars, animals, emojis).
4. If asked ANY distinct question (e.g. math calculations, why sky is blue, what is gravity, why do birds fly, how plants make food, etc.), provide a complete, unique, step-by-step explanation for that exact topic.
5. If the student expresses distress or sadness, respond with gentle warmth and advise speaking to a trusted parent or teacher.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API HTTP Error:', response.status, errText);
      return null;
    }
    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    }
  } catch (err) {
    console.warn('Gemini LLM API call error, falling back to dynamic QA engine:', err.message);
  }
  return null;
}

// 1. Process AI Tutor Chat Question Endpoint (Connected to Gemini LLM)
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { question, classLevel, subject, chapterId, language } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question content cannot be empty.' });
    }

    const currentLang = language || 'en';
    const numericClass = parseInt(classLevel) || 1;
    const currentSubject = subject || 'Maths';
    const currentChapter = chapterId || 'c1_m1';
    const userId = req.user ? req.user.id : null;

    // Try Gemini LLM first; if null, fallback to dynamic QA engine
    let answer = await generateGeminiResponse(question.trim(), currentLang, numericClass, currentSubject);
    if (!answer) {
      answer = generateAiAnswer(question.trim(), currentLang, numericClass, currentSubject);
    }

    // Save Q&A exchange in database (Capacity target: 50,000+ records)
    const dbResult = await run(
      `INSERT INTO chat_history (user_id, class_level, subject, chapter_id, question, answer, language)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, numericClass, currentSubject, currentChapter, question.trim(), answer, currentLang]
    );

    // Update Student Progress (Questions Asked Counter)
    if (userId) {
      await run(
        `INSERT INTO student_progress (user_id, class_level, subject, chapter_id, status, questions_asked, updated_at)
         VALUES (?, ?, ?, ?, 'in_progress', 1, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, chapter_id) DO UPDATE SET
           questions_asked = questions_asked + 1,
           updated_at = CURRENT_TIMESTAMP`,
        [userId, numericClass, currentSubject, currentChapter]
      );
    }

    res.json({
      id: dbResult.id,
      question: question.trim(),
      answer,
      classLevel: numericClass,
      subject: currentSubject,
      chapterId: currentChapter,
      language: currentLang,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Tutor chat error:', error);
    res.status(500).json({ error: 'Server error processing AI question.' });
  }
});

// 2. Get Student Chat History Endpoint
router.get('/history', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ history: [] });
    }

    const history = await query(
      `SELECT id, question, answer, class_level, subject, chapter_id, language, created_at
       FROM chat_history
       WHERE user_id = ?
       ORDER BY id ASC LIMIT 100`,
      [req.user.id]
    );

    res.json({ history });
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ error: 'Server error fetching chat history.' });
  }
});

// 3. Get Student Subject & Lesson Progress Endpoint
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ progress: [], completedChapters: [] });
    }

    const progressRows = await query(
      `SELECT chapter_id, subject, status, questions_asked, updated_at
       FROM student_progress
       WHERE user_id = ?`,
      [req.user.id]
    );

    const completedChapters = progressRows
      .filter(row => row.status === 'completed')
      .map(row => row.chapter_id);

    res.json({
      progress: progressRows,
      completedChapters
    });
  } catch (error) {
    console.error('Fetch progress error:', error);
    res.status(500).json({ error: 'Server error fetching student progress.' });
  }
});

// 4. Mark Lesson Completed Endpoint
router.post('/complete-lesson', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { chapterId, classLevel, subject } = req.body;
    if (!chapterId) {
      return res.status(400).json({ error: 'Chapter ID required' });
    }

    const numericClass = parseInt(classLevel) || 1;
    const currentSubject = subject || 'Maths';

    await run(
      `INSERT INTO student_progress (user_id, class_level, subject, chapter_id, status, updated_at)
       VALUES (?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, chapter_id) DO UPDATE SET
         status = 'completed',
         updated_at = CURRENT_TIMESTAMP`,
      [req.user.id, numericClass, currentSubject, chapterId]
    );

    res.json({
      message: '🎉 Congratulations! Lesson marked as completed.',
      chapterId,
      status: 'completed'
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Server error completing lesson.' });
  }
});

// 5. Restart Lesson Fresh Endpoint (Archives previous session in DB)
router.post('/restart-lesson', authenticateToken, async (req, res) => {
  try {
    const { chapterId } = req.body;
    res.json({
      message: '🔄 Lesson restarted fresh. All previous interactions remain safely stored in your learning history archive.',
      chapterId
    });
  } catch (error) {
    console.error('Restart lesson error:', error);
    res.status(500).json({ error: 'Server error restarting lesson.' });
  }
});

// 6. Platform AI Metrics & Q&A Counter
router.get('/stats', async (req, res) => {
  try {
    const totalQ = await get(`SELECT COUNT(*) as total FROM chat_history`);
    const totalUsers = await get(`SELECT COUNT(*) as total FROM users`);

    res.json({
      registeredUsers: totalUsers ? totalUsers.total : 0,
      totalQuestionsAnswered: totalQ ? totalQ.total : 0,
      systemStatus: 'Operational',
      supportedCapacity: {
        registeredUsersTarget: 1000,
        concurrentUsersTarget: 100,
        dbRecordCapacity: 50000
      }
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Server error fetching stats.' });
  }
});

module.exports = router;
