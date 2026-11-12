/* ============================================================
   TRIVIA QUESTIONS
   ------------------------------------------------------------
   Each quiz has a list of questions. Each question has:
     question : the text people read
     emoji    : a big emoji shown as the picture (optional)
     image    : a photo file in the images/quiz folder (optional —
                if it's missing, a "photo coming soon" box shows)
     answers  : 2 to 4 choices
     correct  : copy the right answer EXACTLY as written above
     fact     : a fun fact shown after you answer
   To add a question: copy one { ... }, block, paste it, edit it.
   ============================================================ */

const QUIZZES = {

  /* ---------- QUIZ 1 ---------- */
  facts: {
    title: "How much do you know about broccoli?",
    blurb: "10 questions of pure broccoli knowledge.",
    emoji: "🧠",
    questions: [
      {
        question: "Which plant family does broccoli belong to?",
        emoji: "🥬",
        answers: ["The potato family", "The cabbage family", "The rose family", "The grass family"],
        correct: "The cabbage family",
        fact: "Broccoli is in the cabbage (mustard) family, along with kale, cabbage and Brussels sprouts.",
      },
      {
        question: "The bumpy green top of broccoli is actually made of...",
        emoji: "🥦",
        answers: ["Seeds", "Leaves", "Tiny flower buds", "Roots"],
        correct: "Tiny flower buds",
        fact: "Each little green bump is a flower bud that hasn't opened yet.",
      },
      {
        question: "If you let broccoli keep growing, what color do its flowers turn?",
        emoji: "🌼",
        answers: ["Yellow", "Purple", "Blue", "Red"],
        correct: "Yellow",
        fact: "Left alone, broccoli bursts into small yellow flowers. By then it tastes bitter, so farmers pick it before it blooms.",
      },
      {
        question: "The word \"broccoli\" comes from which language?",
        emoji: "🗣️",
        answers: ["French", "Spanish", "German", "Italian"],
        correct: "Italian",
        fact: "\"Broccoli\" comes from Italian and roughly means \"little sprouts\" or flowering tops.",
      },
      {
        question: "Broccoli is famous for having lots of which vitamin?",
        emoji: "💪",
        answers: ["Vitamin C", "Vitamin B12", "Vitamin D", "None — it has no vitamins"],
        correct: "Vitamin C",
        fact: "A cup of chopped raw broccoli has about as much vitamin C as an orange!",
      },
      {
        question: "Which U.S. state grows most of America's broccoli?",
        emoji: "🇺🇸",
        answers: ["Florida", "Alaska", "California", "Maine"],
        correct: "California",
        fact: "California grows about 90% of the broccoli in the United States.",
      },
      {
        question: "Which of these veggies is the SAME species as broccoli?",
        emoji: "🧬",
        answers: ["Lettuce", "Kale", "Spinach", "Celery"],
        correct: "Kale",
        fact: "Broccoli, kale, cabbage, cauliflower and Brussels sprouts were all bred from the same wild cabbage plant.",
      },
      {
        question: "About how much of raw broccoli is water?",
        emoji: "💧",
        answers: ["About 10%", "About 30%", "About 60%", "About 90%"],
        correct: "About 90%",
        fact: "Raw broccoli is roughly 89% water.",
      },
      {
        question: "Which U.S. president famously announced he did NOT like broccoli?",
        emoji: "🏛️",
        answers: ["George H. W. Bush", "Abraham Lincoln", "George Washington", "Barack Obama"],
        correct: "George H. W. Bush",
        fact: "In 1990, President George H. W. Bush said he'd been made to eat it as a kid and wasn't going to eat it anymore. Broccoli farmers sent tons of it to the White House in response!",
      },
      {
        question: "Broccoli grows best in what kind of weather?",
        emoji: "🌡️",
        answers: ["Super hot summers", "Cool weather", "Snowy winters", "Desert heat"],
        correct: "Cool weather",
        fact: "Broccoli is a cool-season crop. Too much heat makes it flower early.",
      },
    ],
  },

  /* ---------- QUIZ 2 ---------- */
  types: {
    title: "Is this a type of broccoli?",
    blurb: "Broccoli or impostor? You decide.",
    emoji: "🕵️",
    questions: [
      {
        question: "Is BROCCOLINI a type of broccoli?",
        image: "images/quiz/USDA_Broccolini.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Yes, it's broccoli! 🥦",
        fact: "Broccolini is a cross between broccoli and Chinese broccoli. Long skinny stems, tiny tops.",
      },
      {
        question: "Is CAULIFLOWER a type of broccoli?",
        image: "images/quiz/Cauliflower_(4701349936).jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Cauliflower is broccoli's cousin, but it's its own vegetable.",
      },
      {
        question: "Is BROCCOLI RABE a type of broccoli?",
        image: "images/quiz/Rapini.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Trick question! Despite the name, broccoli rabe is more closely related to turnips.",
      },
      {
        question: "Is CALABRESE a type of broccoli?",
        image: "images/quiz/calabrese.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Yes, it's broccoli! 🥦",
        fact: "Calabrese is the classic big green broccoli you find at the grocery store. It's named after Calabria, Italy.",
      },
      {
        question: "Is ASPARAGUS a type of broccoli?",
        image: "images/quiz/Spargel_-_Asparagus.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Asparagus isn't even in the same plant family as broccoli.",
      },
      {
        question: "Is PURPLE SPROUTING BROCCOLI a type of broccoli?",
        image: "images/quiz/purple broccoli.jpeg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Yes, it's broccoli! 🥦",
        fact: "Purple sprouting broccoli is real broccoli. It turns green when you cook it!",
      },
      {
        question: "Is KALE a type of broccoli?",
        image: "images/quiz/Kale1.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Kale is the same species as broccoli, but it's grown for its leaves, not its flower buds.",
      },
      {
        question: "Is DI CICCO a type of broccoli?",
        image: "images/quiz/decicco.webp",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Yes, it's broccoli! 🥦",
        fact: "Di Cicco is an old Italian heirloom broccoli that grows lots of small side shoots.",
      },
      {
        question: "Are BRUSSELS SPROUTS a type of broccoli?",
        image: "images/quiz/Brussels_sprouts_(4103982312)_(2).jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Brussels sprouts are more like tiny cabbages growing up a tall stalk.",
      },
      {
        question: "Is CELERY a type of broccoli?",
        image: "images/quiz/celery.jpg",
        answers: ["Yes, it's broccoli! 🥦", "Nope, impostor! ❌"],
        correct: "Nope, impostor! ❌",
        fact: "Celery is related to carrots and parsley, not broccoli.",
      },
    ],
  },
};
