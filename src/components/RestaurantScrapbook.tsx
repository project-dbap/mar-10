import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BillEntry {
  photo?: string;
  comment?: string;
}

interface BillPage {
  id: number;
  title: string;
  emoji: string;
  subtitle?: string;
  entries: BillEntry[];
}

const pages: BillPage[] = [
  {
    id: 1,
    title: "PFC",
    emoji: "🍗",
    subtitle: "Our unofficial canteen",
    entries: [
      { comment: "The usual order. Nothing fancy, everything perfect." },
      { photo: "/placeholder.svg" },
      { comment: "Third time this week. No regrets." },
      { photo: "/placeholder.svg", comment: "Birthday eve dinner. You had no idea what was coming." },
    ],
  },
  {
    id: 2,
    title: "Kolkata Trip",
    emoji: "🚂",
    subtitle: "That unforgettable train ride",
    entries: [
      { photo: "/placeholder.svg", comment: "That street-side roll place. Life-changing." },
      { photo: "/placeholder.svg" },
      { comment: "Mishti doi after every meal. Non-negotiable." },
    ],
  },
  {
    id: 3,
    title: "Café Madras",
    emoji: "☕",
    subtitle: "Dosa diplomacy",
    entries: [
      { comment: "You dunked your dosa in my sambar. Bold move." },
    ],
  },
  {
    id: 4,
    title: "Burma Burma",
    emoji: "🍜",
    subtitle: "The fancy one",
    entries: [
      { photo: "/placeholder.svg", comment: "The khow suey was better than maths." },
    ],
  },
  {
    id: 5,
    title: "Bastian",
    emoji: "🦞",
    entries: [
      { photo: "/placeholder.svg" },
    ],
  },
  {
    id: 6,
    title: "Chai Point",
    emoji: "🍵",
    subtitle: "Daily ritual",
    entries: [
      { comment: "Two cutting chai, one samosa — always." },
    ],
  },
  {
    id: 7,
    title: "Random Street Food",
    emoji: "🌯",
    subtitle: "No name, all flavour",
    entries: [
      {},
    ],
  },
];

const tapeColors = [
  "bg-yellow-300/60",
  "bg-pink-300/50",
  "bg-blue-300/50",
  "bg-green-300/50",
  "bg-orange-300/50",
];

const doodles = ["✿", "♡", "☆", "~", "✧", "◦", "❋", "∞"];

const RestaurantScrapbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const page = pages[currentPage];

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <section className="relative z-10 py-12 px-4 md:px-8 w-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto pb-24"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-cream text-center mb-2">
          The Bill Collection 🧾
        </h2>
        <p className="text-center text-muted-foreground font-display text-lg italic mb-8">
          Flip through our delicious memories
        </p>

        {/* Journal book container */}
        <div className="relative">
          {/* Page */}
          <motion.div
            key={page.id}
            initial={{ opacity: 0, rotateY: -8 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 8 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(36 20% 14%) 0%, hsl(30 15% 11%) 50%, hsl(220 20% 10%) 100%)",
              border: "2px solid hsl(36 30% 25% / 0.4)",
              boxShadow: "0 8px 40px hsl(220 50% 5% / 0.6), inset 0 1px 0 hsl(36 30% 30% / 0.2)",
              minHeight: "500px",
            }}
          >
            {/* Paper texture lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(36 30% 50%) 31px, hsl(36 30% 50%) 32px)",
              backgroundPositionY: "80px",
            }} />

            {/* Left margin line */}
            <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ background: "hsl(0 60% 50%)" }} />

            {/* Content area */}
            <div className="relative p-6 md:p-10">
              {/* Page number */}
              <div className="absolute top-4 right-6 text-muted-foreground/30 font-body text-xs">
                pg {currentPage + 1} / {pages.length}
              </div>

              {/* Corner doodle */}
              <span className="absolute top-4 left-6 text-primary/20 text-2xl select-none">
                {doodles[currentPage % doodles.length]}
              </span>

              {/* Title area — like a handwritten header */}
              <div className="text-center mb-8 pt-4">
                <span className="text-5xl mb-2 block">{page.emoji}</span>
                <h3 className="font-display text-3xl md:text-4xl text-cream italic">
                  {page.title}
                </h3>
                {page.subtitle && (
                  <p className="font-display text-sm text-primary/60 italic mt-1">
                    — {page.subtitle} —
                  </p>
                )}
                {/* Underline doodle */}
                <div className="flex items-center justify-center gap-1 mt-2 text-primary/20 text-xs select-none">
                  {"~ ~ ~ ✿ ~ ~ ~"}
                </div>
              </div>

              {/* Entries laid out as journal items */}
              <div className="space-y-6">
                {page.entries.map((entry, ei) => {
                  const hasPhoto = !!entry.photo;
                  const hasComment = !!entry.comment;
                  const hasContent = hasPhoto || hasComment;
                  const tapeColor = tapeColors[(currentPage + ei) % tapeColors.length];
                  const tilt = (ei % 2 === 0 ? 1 : -1) * (1 + (ei % 3));

                  if (hasPhoto && hasComment) {
                    // Photo + comment: side by side
                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ei * 0.1 }}
                        className={`flex flex-col md:flex-row gap-4 items-start ${ei % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                      >
                        {/* Bill photo — tall and thin */}
                        <div className="relative shrink-0" style={{ transform: `rotate(${tilt}deg)` }}>
                          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 ${tapeColor} rounded-sm z-10`} style={{ transform: `rotate(${-tilt * 0.5}deg)` }} />
                          <div className="w-28 md:w-32 aspect-[2/3] rounded-sm overflow-hidden border border-border/20 shadow-md bg-secondary/30">
                            <img src={entry.photo} alt="bill" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        {/* Comment as margin note */}
                        <div className="flex-1 pt-2">
                          <p className="font-display text-base md:text-lg text-cream/80 italic leading-relaxed">
                            "{entry.comment}"
                          </p>
                          <span className="text-primary/20 text-xs mt-1 block select-none">
                            {doodles[(ei + 3) % doodles.length]} {doodles[(ei + 5) % doodles.length]}
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  if (hasPhoto) {
                    // Photo only — centered with tape
                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ei * 0.1 }}
                        className="flex justify-center"
                      >
                        <div className="relative" style={{ transform: `rotate(${tilt}deg)` }}>
                          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 ${tapeColor} rounded-sm z-10`} style={{ transform: `rotate(${tilt * 0.3}deg)` }} />
                          <div className="w-32 md:w-36 aspect-[2/3] rounded-sm overflow-hidden border border-border/20 shadow-lg bg-secondary/30">
                            <img src={entry.photo} alt="bill" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  if (hasComment) {
                    // Comment only — like a scribbled note
                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, x: ei % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ei * 0.1 }}
                        className="relative pl-6 md:pl-8"
                      >
                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-primary/30" />
                        <p className="font-display text-base md:text-lg text-cream/80 italic leading-relaxed">
                          "{entry.comment}"
                        </p>
                      </motion.div>
                    );
                  }

                  // Empty entry — doodle placeholder
                  return (
                    <motion.div
                      key={ei}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ei * 0.1 }}
                      className="text-center py-4"
                    >
                      <span className="text-muted-foreground/30 font-display italic text-sm">
                        ( a memory lives here, no receipt needed ) ✌️
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom doodle */}
              <div className="text-center mt-8 text-primary/15 text-sm select-none font-display">
                ── ♡ ──
              </div>
            </div>
          </motion.div>

          {/* Page flip controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1 text-sm font-display text-muted-foreground hover:text-cream disabled:opacity-20 disabled:cursor-default transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              prev page
            </button>
            <div className="flex gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage ? "bg-primary w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-1 text-sm font-display text-muted-foreground hover:text-cream disabled:opacity-20 disabled:cursor-default transition-colors"
            >
              next page
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RestaurantScrapbook;
