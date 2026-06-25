// OPTIONAL: ADD YOUR OPENAI API KEY HERE
const API_KEY = "";

// MAIN FUNCTION
export async function getQuestions(subject) {
  try {
    if (API_KEY) {
      return await fetchAIQuestions(subject);
    } else {
      console.warn("No API key, using fallback questions");
      return getFallbackQuestions(subject);
    }
  } catch (err) {
    console.error("Error fetching questions:", err);
    return getFallbackQuestions(subject);
  }
}

// AI QUESTION GENERATOR
async function fetchAIQuestions(subject) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate 10 MCQs from NCERT ${subject}.
Return ONLY JSON:
[
{
"question":"...",
"options":["A","B","C","D"],
"answer":0
}
]`
        }
      ]
    })
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

// FALLBACK QUESTIONS (IMPORTANT)
import { fallbackQuestions } from '../data/questions.js';

function getFallbackQuestions(subject) {
  let pool = fallbackQuestions[subject] || [];

  // Shuffle + pick 10
  pool = pool.sort(() => 0.5 - Math.random());

  return pool.slice(0, 10);
}
