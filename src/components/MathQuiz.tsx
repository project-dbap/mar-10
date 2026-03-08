import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, PartyPopper, Heart, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  { question: "What is 6 × 7?", options: ["36", "42", "48", "A billion"], correctIndex: 1 },
  { question: "What is 81 ÷ 9?", options: ["7", "8", "9", "Math is a scam"], correctIndex: 2 },
  { question: "The bill was ₹200. After 5% GST, how much do you owe?", options: ["₹205", "₹210", "₹220", "Just let him pay"], correctIndex: 1 },
  { question: "What is 15 + 28?", options: ["43", "42", "44", "Somewhere between 1 and 100"], correctIndex: 0 },
  { question: "You ordered 3 dishes at ₹180 each. What's the total?", options: ["₹360", "₹540", "₹720", "Who counts when food is this good?"], correctIndex: 1 },
  { question: "What is 144 ÷ 12?", options: ["11", "12", "13", "I need a calculator for this"], correctIndex: 1 },
  { question: "The bill is ₹450 and you split it equally. How much does each person pay?", options: ["₹200", "₹225", "₹250", "You pay, I forgot my wallet"], correctIndex: 1 },
  { question: "What is 17 × 3?", options: ["48", "51", "54", "Let me Google it"], correctIndex: 1 },
  { question: "Tip is 10% on a ₹800 bill. How much tip?", options: ["₹60", "₹80", "₹100", "Tips are a social construct"], correctIndex: 1 },
  { question: "What is 256 - 189?", options: ["57", "67", "77", "Negative vibes"], correctIndex: 1 },
];

const correctMessages = [
  "See! You're a genius! 🌟",
  "Brilliant! I knew you had it in you! ✨",
  "Look at you go! Mathematician of the year! 💫",
  "Perfect! Who said you're bad at maths? 🎯",
  "Wow, getting them all right! I'm impressed! 💛",
];

const wrongMessages = [
  "Hmm… close? Not really. But I love you anyway. 💙",
  "That's… creative. Points for confidence! 😄",
  "Oh no. It's okay, you have other talents! 🤗",
  "Math isn't everything. You're still perfect. 💛",
  "We'll pretend that didn't happen. Moving on! 😅",
];

const MathQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    const correct = index === questions[currentQ].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    if (!correct) {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizDone(false);
    setIsCorrect(false);
  };

  const feedbackMessage = isCorrect
    ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
    : wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

  return (
    <section className="relative z-10 py-20 px-4 md:px-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <Brain className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-3">
            The Maths Round
          </h2>
          <p className="text-muted-foreground font-display text-lg italic">
            Now, a quick test — don't worry, it's easy. Probably.
          </p>
        </div>

        {!started ? (
          <motion.div className="text-center">
            <button
              onClick={() => setStarted(true)}
              className="bg-primary text-primary-foreground font-heading text-lg px-8 py-4 rounded-lg hover:bg-gold-light transition-colors duration-300"
            >
              Let's Go! 🎯
            </button>
          </motion.div>
        ) : quizDone ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="scrapbook-card rounded-xl p-8 text-center"
          >
            <PartyPopper className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-heading text-3xl text-cream mb-2">
              You scored {score}/{questions.length}!
            </h3>
            <p className="text-muted-foreground font-display text-lg italic mb-2">
              {score >= 8
                ? "I'm genuinely shocked. In a good way!"
                : score >= 5
                ? "Not bad! We can work on the rest together."
                : "Okay, we definitely need more chai-and-maths dates."}
            </p>
            <p className="text-gold font-display text-xl italic mt-4 mb-6">
              But honestly? You're perfect no matter what. 💛
            </p>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        ) : (
          <div className={shakeWrong ? "animate-shake" : ""}>
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground font-body">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span className="text-sm text-gold font-body">
                Score: {score}/{currentQ + (showFeedback ? 1 : 0)}
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-1.5 mb-8">
              <div
                className="bg-gold rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${((currentQ + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="scrapbook-card rounded-xl p-6 md:p-8"
              >
                <h3 className="font-heading text-xl md:text-2xl text-cream mb-6">
                  {questions[currentQ].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[currentQ].options.map((option, index) => {
                    let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 font-body ";
                    if (showFeedback) {
                      if (index === questions[currentQ].correctIndex) {
                        btnClass += "border-green-500 bg-green-500/10 text-green-300";
                      } else if (index === selectedAnswer && !isCorrect) {
                        btnClass += "border-destructive bg-destructive/10 text-red-300";
                      } else {
                        btnClass += "border-border/30 text-muted-foreground opacity-50";
                      }
                    } else {
                      btnClass += "border-border/30 text-cream hover:border-gold/50 hover:bg-secondary/50 cursor-pointer";
                    }
                    return (
                      <button key={index} onClick={() => handleAnswer(index)} className={btnClass} disabled={showFeedback}>
                        <span className="text-gold/60 mr-2 text-sm">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <p className={`font-display text-lg italic mb-4 ${isCorrect ? "text-green-300" : "text-gold-light"}`}>
                      {feedbackMessage}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body hover:bg-gold-light transition-colors"
                    >
                      {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default MathQuiz;
