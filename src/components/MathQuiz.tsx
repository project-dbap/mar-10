import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, PartyPopper, Heart, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  { question: "What is 23 × 7?", options: ["173", "181", "161", "I give up"], correctIndex: 2 },
  { question: "What is the square of 22?", options: ["464", "494", "484", "Math is a scam"], correctIndex: 0 },
  { question: "We ordered food for a total of ₹300. After 5% GST, what is the final amount?", options: ["₹315", "₹320", "₹325", "I'll end up paying 500"], correctIndex: 0 },
  { question: "What is 152 + 281?", options: ["433", "423", "443", "1000"], correctIndex: 0 },
  { question: "We got 3 chais at 12 each and 2 sandwiches at 45 each. What's the total?", options: ["₹140", "₹126", "₹136", "Let me Google it"], correctIndex: 1 },
  { question: "What is 156 ÷ 12?", options: ["11", "12", "13", "I need a calculator for this"], correctIndex: 2 },
  { question: "The bill is ₹450 and we split it equally. How much does each person pay?", options: ["₹200", "₹225", "₹250", "I'll just pay the whole bill"], correctIndex: 1 },
  { question: "What is 42 × 3?", options: ["126", "136", "146", "Let me Google it"], correctIndex: 0 },
  { question: "Service charge is 8% on a ₹800 bill. How much service charge?", options: ["₹80", "₹64", "₹100", "I'll remove the service charge"], correctIndex: 1 },
  { question: "What is 256 - 189?", options: ["57", "67", "77", "-100"], correctIndex: 1 },
];

const correctMessages = [
  "You're not so bad after all :)",
  "Proud of you :)",
  "Good job :)",
];

const wrongMessages = [
  "Eh it's fine, I still love you :)",
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const MathQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [seed, setSeed] = useState(0);

  const shuffledQuestions = useMemo(() => shuffle(questions), [seed]);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    const correct = index === shuffledQuestions[currentQ].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    if (!correct) {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= shuffledQuestions.length) {
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
    setSeed(s => s + 1);
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
            Surprise Math Quiz :)
          </h2>
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
              You scored {score}/{shuffledQuestions.length}!
            </h3>
            <p className="text-muted-foreground font-display text-lg italic mb-2">
              {score >= 8
                ? "I'm genuinely shocked hehe (in a good way)"
                : "Not bad! We can work on the rest together."}
            </p>
            <p className="text-gold font-display text-xl italic mt-4 mb-6">
              But regardless, I'll always be there to do the math for you ❤
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
                Question {currentQ + 1} of {shuffledQuestions.length}
              </span>
              <span className="text-sm text-gold font-body">
                Score: {score}/{currentQ + (showFeedback ? 1 : 0)}
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-1.5 mb-8">
              <div
                className="bg-gold rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${((currentQ + (showFeedback ? 1 : 0)) / shuffledQuestions.length) * 100}%` }}
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
                  {shuffledQuestions[currentQ].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shuffledQuestions[currentQ].options.map((option, index) => {
                    let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 font-body ";
                    if (showFeedback) {
                      if (index === selectedAnswer && isCorrect) {
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
                      {currentQ + 1 >= shuffledQuestions.length ? "See Results" : "Next Question →"}
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
