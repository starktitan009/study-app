study-app/
│
├── index.html          # Main UI (login, quiz, result)
├── style.css           # Main styling (mobile-friendly)
├── app.js              # Core logic (flow of app)
│
├── assets/             # Visual stuff
│   └── stars.css       # Star background animation
│
├── services/           # External/API logic
│   └── api.js          # Fetch/generate questions
│
├── storage/            # Data handling
│   └── db.js           # Save/load users & scores
│
├── data/               # Backup data
│   └── questions.js    # Fallback questions
│
└── README.md           # (Optional) project description

# 📘 Smart Study App

A mobile-friendly web application for practicing NCERT-based MCQs in Physics, Mathematics, and Chemistry.  
Built using HTML, CSS, and JavaScript with modular structure.

---

## 🚀 Features

- 👤 User login system (name-based)
- 💾 Saves user data using localStorage
- 🔁 Shows previous users for quick access
- 📚 Subject selection (Physics, Math, Chemistry)
- 🧠 Dynamic quiz system (MCQs)
- 🎯 Randomized questions every attempt
- 📊 Score calculation + correct answers display
- 🔄 Progress saved after every quiz
- ✨ Animated star background (modern UI)
- 📱 Fully mobile-friendly design

---

## 🏗️ Project Structure
