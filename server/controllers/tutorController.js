/**
 * AI Tutor Controller
 * Handles POST /api/tutor/chat, progress, restart, complete, and stats API requests.
 */

const { run, query, get } = require('../db');
const { generateGeminiTutorReply } = require('../services/geminiService');
const { processAdaptiveLearning } = require('../services/adaptiveTutorService');

// Dynamic Math & Expression Solver
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

// Fallback Dynamic Explanation Builder
function generateFallbackReply({ question, language, classLevel, subject, topic, adaptiveResult }) {
  const q = question.trim().toLowerCase();
  const isTelugu = language === 'te';

  // Greetings
  const greetings = ['hi', 'hello', 'hey', 'namaste', 'హలో', 'హాయ్', 'నమస్కారం'];
  if (greetings.some(g => q === g || q.startsWith(g + ' '))) {
    return isTelugu
      ? `నమస్కారం! 👋 నేను మీ **LearnAIQ AI ట్యూటర్** ని. క్లాస్ ${classLevel} ${subject} (${topic}) లో ఏ అంశం నేర్చుకుందాం? 🌟`
      : `Hello there! 👋 I'm your **LearnAIQ AI Tutor**. How are you doing today? I'm super excited to explore Class ${classLevel} ${subject} (${topic}) with you! 🌟`;
  }

  // Identity
  if (q.includes('who are you') || q.includes('మీరు ఎవరు')) {
    return isTelugu
      ? `నేను **LearnAIQ Buddy**! 🤖 మీ క్లాస్ ${classLevel} AI లెర్నింగ్ పార్ట్‌నర్ ని. బొమ్మలతో సులభంగా పాఠాలు వివరించడం, లెక్కలు చేయడం నా పని! ✨`
      : `I am **LearnAIQ Buddy**! 🤖 I'm your personal AI learning companion for Class ${classLevel} ${subject}. I can explain concepts step-by-step and answer your questions! ✨`;
  }

  // Math solver check
  const mathSolution = tryDynamicMathSolver(question);
  if (mathSolution) return mathSolution;

  // Hackathon Student Scenarios
  if (adaptiveResult.nextAction === 'ask_why') {
    return isTelugu
      ? `చాలా బాగా చెప్పారు! 🎉 జవాబు సరైనదే! అయితే మీరు దీన్ని కేవలం గుర్తుపెట్టుకున్నారా లేక అర్థమైందా? **ఈ జవాబు ఎందుకు సరైనదో ఒక చిన్న మాటలో చెప్పగలరా?** 💡`
      : `Spot on! 🎉 That's the correct answer! Can you briefly explain **why** this is the answer so I know you really understand the concept? 💡`;
  }

  if (adaptiveResult.nextAction === 'increase_difficulty') {
    const qText = adaptiveResult.suggestedQuestion ? adaptiveResult.suggestedQuestion.question : '';
    return isTelugu
      ? `అద్భుతమైన వివరణ! 🌟 మీరు ఈ కాన్సెప్ట్ ని చాలా బాగా అర్థం చేసుకున్నారు! మీ స్థాయి **${adaptiveResult.difficulty}** కి పెరిగింది!\n\nసవాలు ప్రశ్న: **${qText}** 🚀`
      : `Outstanding explanation! 🌟 You truly understand this concept deeply! Your skill level has increased to **${adaptiveResult.difficulty}**!\n\nChallenge Question: **${qText}** 🚀`;
  }

  if (adaptiveResult.nextAction === 'reinforce') {
    return isTelugu
      ? `గుర్తుపెట్టుకోవడం మంచిదే, కానీ కాన్సెప్ట్ ని బొమ్మలతో అర్థం చేసుకుంటే ఎప్పటికీ మరచిపోరు! 🎨 ఒక సరదా ఉదాహరణతో మళ్ళీ చూద్దామా?`
      : `Memorizing is okay, but understanding with visual examples helps you remember forever! 🎨 Let's look at a fun visual example together!`;
  }

  if (adaptiveResult.nextAction === 'provide_hint') {
    const hintText = adaptiveResult.suggestedQuestion ? adaptiveResult.suggestedQuestion.hint : '';
    return isTelugu
      ? `పర్వాలేదు! తప్పులు చేయడమే నేర్చుకోవడానికి మొదటి అడుగు! 💛 ఒక చిన్న క్లూ: ${hintText} మళ్ళీ ప్రయత్నిద్దామా? 🧩`
      : `No problem at all! Making mistakes is how we learn! 💛 Here is a small hint: ${hintText} Want to try once more? 🧩`;
  }

  // Default Structured Explanation
  if (isTelugu) {
    return `### 💡 LearnAIQ Buddy AI ట్యూటర్ వివరణ (Class ${classLevel} ${subject} — ${topic})

🎯 **అడుగు 1: భావన భావచిత్రం**
పిజ్జా ముక్కలు 🍕 లేదా ఆపిల్స్ 🍎 పంచుకోవడం లాంటి సులభమైన ఉదాహరణతో అర్థం చేసుకుందాం!

💡 **అడుగు 2: దశలవారీ వివరణ**
• **"${question}"** ని చిన్న అడుగులుగా విభజించి నేర్చుకుందాం.

🌟 **అడుగు 3: నిజ జీవిత ఉపయోగం**
ఇది మన రోజువారీ జీవితంలో ఎంతగానో ఉపయోగపడుతుంది!

🧠 **అడుగు 4: ప్రాక్టీస్ ప్రశ్న**
మీ దగ్గర 4 ఆపిల్స్ ఉంటే 1 ఆపిల్ ఇవ్వగా మిగిలేవి ఎన్ని? (జవాబు: 3!)`;
  }

  return `### 💡 LearnAIQ Buddy AI Tutor Explanation (Class ${classLevel} ${subject} — ${topic})

🎯 **Step 1: Concept Analogy**
Imagine a pizza cut into equal slices 🍕 or apples 🍎 shared with friends!

💡 **Step 2: Step-by-Step Breakdown**
• We break **"${question}"** into simple, friendly steps suitable for Class ${classLevel}.

🌟 **Step 3: Real-Life Application**
This concept is used every day when counting, sharing, and measuring!

🧠 **Step 4: Practice Quiz**
If you have 4 apples 🍎 and give 1 to a friend, how many remain? (Answer: 3!)`;
}

// Controller Handler: POST /api/tutor/chat
async function handleTutorChat(req, res) {
  try {
    const {
      question,
      message,
      classLevel,
      subject,
      topic,
      language,
      difficulty,
      knowledgeScore,
      skillScore
    } = req.body;

    const userMessage = (question || message || '').trim();
    if (!userMessage) {
      return res.status(400).json({ success: false, error: 'Message content cannot be empty.' });
    }

    const currentLang = language || 'en';
    const numericClass = parseInt(classLevel) || 1;
    const currentSubject = subject || 'Maths';
    const currentTopic = topic || 'Addition';
    const initialScore = parseInt(knowledgeScore || skillScore) || 25;
    const initialDifficulty = difficulty || 'BEGINNER';
    const userId = req.user ? req.user.id : null;

    console.log(`[TUTOR] Request received | Student: ${req.body.studentName || 'Nikki'} | Class: ${numericClass} | Subject: ${currentSubject} | Topic: ${currentTopic} | Message: "${userMessage}"`);

    // 1. Run Rule-Based Adaptive Learning Engine
    const adaptiveResult = processAdaptiveLearning({
      question: userMessage,
      language: currentLang,
      classLevel: numericClass,
      subject: currentSubject,
      topic: currentTopic,
      currentDifficulty: initialDifficulty,
      currentScore: initialScore
    });

    console.log(`[TUTOR] Adaptive calculation | Action: ${adaptiveResult.nextAction} | Level: ${adaptiveResult.difficulty} | Score: ${adaptiveResult.knowledgeScore}`);

    // 2. Fetch recent chat history for context
    let history = [];
    if (userId) {
      const historyRows = await query(
        `SELECT question as text, answer as reply FROM chat_history WHERE user_id = ? ORDER BY id DESC LIMIT 6`,
        [userId]
      );
      history = historyRows.reverse();
    }

    // 3. Attempt Gemini LLM Generation (@google/genai SDK)
    console.log(`[TUTOR] Calling Gemini LLM Service...`);
    let isGeminiResponse = true;
    let reply = await generateGeminiTutorReply({
      question: userMessage,
      language: currentLang,
      classLevel: numericClass,
      subject: currentSubject,
      topic: currentTopic,
      difficulty: adaptiveResult.difficulty,
      skillScore: adaptiveResult.knowledgeScore,
      history
    });

    // 4. Check Gemini response status
    if (!reply) {
      isGeminiResponse = false;
      console.error(`⚠️ [TUTOR ERROR] Gemini API call failed or GEMINI_API_KEY is unconfigured. Falling back to dynamic adaptive engine.`);
      reply = generateFallbackReply({
        question: userMessage,
        language: currentLang,
        classLevel: numericClass,
        subject: currentSubject,
        topic: currentTopic,
        adaptiveResult
      });
    } else {
      console.log(`✨ [TUTOR SUCCESS] Real Gemini API response generated successfully!`);
    }

    // Determine Pace Label
    let adaptivePaceLabel = 'Balanced';
    if (adaptiveResult.nextAction === 'provide_hint' || adaptiveResult.understanding === 'struggling') {
      adaptivePaceLabel = 'Supportive';
    } else if (adaptiveResult.nextAction === 'increase_difficulty' || adaptiveResult.understanding === 'verified') {
      adaptivePaceLabel = 'Challenge';
    } else if (adaptiveResult.nextAction === 'reinforce' || adaptiveResult.nextAction === 'ask_why' || adaptiveResult.understanding === 'memorized') {
      adaptivePaceLabel = 'Reinforcement';
    }

    // 5. Store in SQLite Database
    const dbResult = await run(
      `INSERT INTO chat_history (user_id, class_level, subject, chapter_id, question, answer, language)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, numericClass, currentSubject, currentTopic, userMessage, reply, currentLang]
    );

    // Update Progress in Database
    if (userId) {
      await run(
        `INSERT INTO student_progress (user_id, class_level, subject, chapter_id, status, questions_asked, updated_at)
         VALUES (?, ?, ?, ?, 'in_progress', 1, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, chapter_id) DO UPDATE SET
           questions_asked = questions_asked + 1,
           updated_at = CURRENT_TIMESTAMP`,
        [userId, numericClass, currentSubject, currentTopic]
      );
    }

    // Return Structured JSON Response
    return res.json({
      success: true,
      isGemini: isGeminiResponse,
      id: dbResult.id,
      reply,
      difficulty: adaptiveResult.difficulty,
      knowledgeScore: adaptiveResult.knowledgeScore,
      skillScore: adaptiveResult.knowledgeScore,
      understanding: adaptiveResult.understanding,
      nextAction: adaptiveResult.nextAction,
      adaptivePace: adaptivePaceLabel,
      topic: currentTopic,
      needsPractice: adaptiveResult.knowledgeScore < 60,
      language: currentLang,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Tutor chat controller error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error processing AI tutor message.',
      reply: "Oops! I'm having trouble connecting right now. Let's try again! 🌟"
    });
  }
}

// Controller Handler: GET /api/tutor/progress
async function handleGetProgress(req, res) {
  try {
    if (!req.user) {
      return res.json({ progress: [], completedChapters: [] });
    }

    const progressRows = await query(
      `SELECT chapter_id, subject, status, questions_asked, updated_at FROM student_progress WHERE user_id = ?`,
      [req.user.id]
    );

    const completedChapters = progressRows
      .filter(row => row.status === 'completed')
      .map(row => row.chapter_id);

    res.json({ progress: progressRows, completedChapters });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error fetching student progress.' });
  }
}

// Controller Handler: POST /api/tutor/complete-lesson
async function handleCompleteLesson(req, res) {
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
      success: true,
      message: '🎉 Congratulations! Lesson marked as completed.',
      chapterId,
      status: 'completed'
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Server error completing lesson.' });
  }
}

// Controller Handler: POST /api/tutor/restart-lesson
async function handleRestartLesson(req, res) {
  try {
    const { chapterId } = req.body;
    res.json({
      success: true,
      message: '🔄 Lesson restarted fresh. History preserved.',
      chapterId
    });
  } catch (error) {
    console.error('Restart lesson error:', error);
    res.status(500).json({ error: 'Server error restarting lesson.' });
  }
}

// Controller Handler: GET /api/tutor/stats
async function handleGetStats(req, res) {
  try {
    const totalQ = await get(`SELECT COUNT(*) as total FROM chat_history`);
    const totalUsers = await get(`SELECT COUNT(*) as total FROM users`);

    res.json({
      registeredUsers: totalUsers ? totalUsers.total : 0,
      totalQuestionsAnswered: totalQ ? totalQ.total : 0,
      systemStatus: 'Operational'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching stats.' });
  }
}

module.exports = {
  handleTutorChat,
  handleGetProgress,
  handleCompleteLesson,
  handleRestartLesson,
  handleGetStats
};
