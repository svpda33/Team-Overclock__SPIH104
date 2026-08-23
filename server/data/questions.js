/**
 * Class 1 Mathematics Question Bank
 * Categorized by Topics (Counting, Addition, Subtraction, Shapes)
 * and Skill Levels (BEGINNER, LEARNING, GOOD, ADVANCED).
 */

const CLASS_1_MATHS_QUESTIONS = {
  Counting: {
    BEGINNER: [
      { id: 'cnt_b1', en: 'How many apples are here: 🍎 🍎 🍎?', te: 'ఇక్కడ ఎన్ని ఆపిల్స్ ఉన్నాయి: 🍎 🍎 🍎?', answer: '3', hint_en: 'Count them one by one: 1, 2, 3!', hint_te: 'ఒకటొకటిగా లెక్కించండి: 1, 2, 3!' },
      { id: 'cnt_b2', en: 'What number comes right after 4?', te: '4 తర్వాత వచ్చే సంఖ్య ఏది?', answer: '5', hint_en: 'Think: 1, 2, 3, 4, ...?', hint_te: '1, 2, 3, 4, ... తరువాత ఏమొస్తుంది?' }
    ],
    LEARNING: [
      { id: 'cnt_l1', en: 'Which number is bigger: 6 or 9?', te: '6 లేదా 9 లో ఏది పెద్ద సంఖ్య?', answer: '9', hint_en: '9 has more counts than 6!', hint_te: '6 కంటే 9 పెద్దది!' },
      { id: 'cnt_l2', en: 'Count backwards from 5: 5, 4, 3, 2, ...?', te: '5 నుండి వెనక్కి లెక్కించండి: 5, 4, 3, 2, ...?', answer: '1', hint_en: 'What comes before 2?', hint_te: '2 కంటే ముందు ఏమి వస్తుంది?' }
    ],
    GOOD: [
      { id: 'cnt_g1', en: 'If you have 10 stars and lose 2, how many remain?', te: 'మీ దగ్గర 10 నక్షత్రాలు ఉండి 2 పోతే, ఎన్ని మిగులుతాయి?', answer: '8', hint_en: 'Count back 2 steps from 10: 9, 8!', hint_te: '10 నుండి 2 అడుగులు వెనక్కి లెక్కించండి: 9, 8!' }
    ],
    ADVANCED: [
      { id: 'cnt_a1', en: 'What is 2 tens and 3 ones?', te: '2 పదులు మరియు 3 ఒకట్లు ఎంత?', answer: '23', hint_en: '20 + 3 = 23!', hint_te: '20 + 3 = 23!' }
    ]
  },
  Addition: {
    BEGINNER: [
      { id: 'add_b1', en: 'What is 1 + 1?', te: '1 + 1 ఎంత?', answer: '2', hint_en: 'If you have 1 star ⭐ and get 1 more ⭐, count them!', hint_te: '1 నక్షత్రం ⭐ కి ఇంకోటి కలిపితే ఎంత?' },
      { id: 'add_b2', en: 'What is 2 + 3?', te: '2 + 3 ఎంత?', answer: '5', hint_en: '2 apples + 3 apples = ?', hint_te: '2 ఆపిల్స్ + 3 ఆపిల్స్ = ?' }
    ],
    LEARNING: [
      { id: 'add_l1', en: 'What is 5 + 4?', te: '5 + 4 ఎంత?', answer: '9', hint_en: 'Start at 5 and count forward 4 fingers: 6, 7, 8, 9!', hint_te: '5 కి 4 కలిపి ముందరికి లెక్కించండి: 6, 7, 8, 9!' }
    ],
    GOOD: [
      { id: 'add_g1', en: 'What is 7 + 6?', te: '7 + 6 ఎంత?', answer: '13', hint_en: '7 + 3 = 10, then add 3 more!', hint_te: '7 + 3 = 10, దానికి ఇంకో 3 కలపండి!' }
    ],
    ADVANCED: [
      { id: 'add_a1', en: 'If Ravi has 8 candies and Sita gives him 7 more, how many does he have in total?', te: 'రవి దగ్గర 8 మిఠాయిలు ఉండి సీత 7 ఇస్తే, మొత్తం ఎన్ని ఉన్నాయి?', answer: '15', hint_en: '8 + 7 = 15!', hint_te: '8 + 7 = 15!' }
    ]
  },
  Subtraction: {
    BEGINNER: [
      { id: 'sub_b1', en: 'What is 3 - 1?', te: '3 - 1 ఎంత?', answer: '2', hint_en: 'Take away 1 cookie from 3 cookies!', hint_te: '3 బిస్కెట్లలో 1 తీసివేస్తే ఎంత?' }
    ],
    LEARNING: [
      { id: 'sub_l1', en: 'What is 6 - 2?', te: '6 - 2 ఎంత?', answer: '4', hint_en: 'Count backwards 2 steps from 6: 5, 4!', hint_te: '6 నుండి 2 అడుగులు వెనక్కి లెక్కించండి: 5, 4!' }
    ],
    GOOD: [
      { id: 'sub_g1', en: 'What is 10 - 4?', te: '10 - 4 ఎంత?', answer: '6', hint_en: 'If 6 + 4 = 10, then 10 - 4 = ?', hint_te: '6 + 4 = 10 అయితే, 10 - 4 = ?' }
    ],
    ADVANCED: [
      { id: 'sub_a1', en: 'You have 12 balloons and 5 pop. How many balloons are left?', te: 'మీ దగ్గర 12 బెలూన్లు ఉండి 5 పేలిపోతే, ఎన్ని మిగులుతాయి?', answer: '7', hint_en: '12 - 5 = 7!', hint_te: '12 - 5 = 7!' }
    ]
  },
  Shapes: {
    BEGINNER: [
      { id: 'shp_b1', en: 'Which shape looks like a full moon or a round coin?', te: 'పౌర్ణమి చంద్రుడు లేదా నాణెం లాగా ఉండే ఆకారం ఏది?', answer: 'Circle', hint_en: 'It is round with no straight lines!', hint_te: 'ఇది గుండ్రంగా ఉంటుంది!' }
    ],
    LEARNING: [
      { id: 'shp_l1', en: 'How many sides does a triangle have?', te: 'త్రిభుజానికి ఎన్ని భుజాలు (వైపులా) ఉంటాయి?', answer: '3', hint_en: 'Count the 3 straight lines forming a triangle!', hint_te: 'త్రిభుజం ఏర్పరిచే 3 గీతాలను లెక్కించండి!' }
    ],
    GOOD: [
      { id: 'shp_g1', en: 'A square has 4 sides. Are all 4 sides equal in length?', te: 'చతురస్రానికి 4 భుజాలు ఉంటాయి. ఆ 4 భుజాలు సమానంగా ఉంటాయా?', answer: 'Yes', hint_en: 'Yes! Every side of a square is exactly equal.', hint_te: 'అవును! చతురస్రంలో ప్రతి భుజం సమానంగా ఉంటుంది.' }
    ],
    ADVANCED: [
      { id: 'shp_a1', en: 'What 3D shape does an ice cream cone look like?', te: 'ఐస్ క్రీమ్ కోన్ ఏ 3D ఆకారంలో ఉంటుంది?', answer: 'Cone', hint_en: 'It is pointed at the bottom and round at the top!', hint_te: 'కింద మొనతేలి పైన గుండ్రంగా ఉంటుంది!' }
    ]
  }
};

function getAdaptiveQuestion(topic = 'Addition', difficulty = 'BEGINNER', language = 'en') {
  const tData = CLASS_1_MATHS_QUESTIONS[topic] || CLASS_1_MATHS_QUESTIONS['Addition'];
  const qList = tData[difficulty] || tData['BEGINNER'];
  const selected = qList[Math.floor(Math.random() * qList.length)];
  return {
    id: selected.id,
    question: language === 'te' ? selected.te : selected.en,
    answer: selected.answer,
    hint: language === 'te' ? selected.hint_te : selected.hint_en
  };
}

module.exports = {
  CLASS_1_MATHS_QUESTIONS,
  getAdaptiveQuestion
};
