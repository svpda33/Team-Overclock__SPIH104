/**
 * Official Gemini LLM API Service using @google/genai SDK
 * Securely communicates with Google Gemini API on backend node.js.
 * Keeps GEMINI_API_KEY isolated on the server.
 */

let GoogleGenAI;
try {
  const genaiPkg = require('@google/genai');
  GoogleGenAI = genaiPkg.GoogleGenAI;
} catch (e) {
  console.warn('@google/genai package loading fallback:', e.message);
}

async function generateGeminiTutorReply({
  question,
  language = 'en',
  classLevel = 1,
  subject = 'Maths',
  topic = 'General',
  difficulty = 'BEGINNER',
  skillScore = 20,
  history = []
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
    console.warn('⚠️ [GEMINI SERVICE] GEMINI_API_KEY is missing or unconfigured in .env file!');
    return null;
  }

  try {
    const isTelugu = language === 'te';

    const systemInstruction = `You are LearnAIQ Buddy, a friendly adaptive school tutor for a Class ${classLevel} student studying ${subject} (Topic: ${topic}).

Student Context:
- Class Level: Class ${classLevel}
- Subject: ${subject}
- Active Topic: ${topic}
- Current Difficulty: ${difficulty} (Skill Score: ${skillScore}/100)
- Target Language: ${isTelugu ? 'Telugu (తెలుగు)' : 'English'}

Teaching Principles:
1. Encourage mistakes as fun learning opportunities. Never shame the student.
2. Explain concepts step-by-step using age-appropriate examples (apples, stars, pizza slices, cookies).
3. Check conceptual understanding vs memorization: If the student answers correctly, ask a gentle "Why?" or "How did you find this answer?".
4. For incorrect answers, give gentle encouraging feedback, a small hint, and a simpler prerequisite question.
5. Child Safety: If student mentions distress, danger, or sadness, respond calmly and advise speaking to a trusted adult, parent, or teacher.
6. Language: ${isTelugu ? 'Respond strictly in clear, friendly, natural Telugu (తెలుగు).' : 'Respond in clear, friendly, encouraging English.'}`;

    if (GoogleGenAI) {
      const ai = new GoogleGenAI({ apiKey });
      const modelsToTry = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash-exp'];

      for (const model of modelsToTry) {
        try {
          console.log(`[GEMINI SDK] Attempting model: ${model}`);
          const response = await ai.models.generateContent({
            model,
            contents: `${systemInstruction}\n\nStudent Message: "${question}"`
          });

          if (response && response.text) {
            console.log(`[GEMINI SDK SUCCESS] Model ${model} returned response (${response.text.length} chars).`);
            return response.text;
          }
        } catch (sdkErr) {
          console.warn(`[GEMINI SDK WARN] Model ${model} returned error: ${sdkErr.message}`);
        }
      }
    }
  } catch (err) {
    console.error('[GEMINI SERVICE ERROR]:', err.message);
  }

  return null;
}

module.exports = {
  generateGeminiTutorReply
};
