import { motion } from "framer-motion";
import { Receipt, UtensilsCrossed, MessageCircle, MapPin } from "lucide-react";

interface BillEntry {
  photo?: string;
  comment?: string;
}

interface BillGroup {
  id: number;
  title: string;
  emoji: string;
  icon?: "food" | "trip";
  entries: BillEntry[];
}

const groups: BillGroup[] = [
  {
    id: 1,
    title: "PFC",
    emoji: "🍗",
    icon: "food",
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
    icon: "trip",
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
    icon: "food",
    entries: [
      { comment: "You dunked your dosa in my sambar. Bold move." },
    ],
  },
  {
    id: 4,
    title: "Burma Burma",
    emoji: "🍜",
    icon: "food",
    entries: [
      { photo: "/placeholder.svg", comment: "The khow suey was better than maths." },
    ],
  },
  {
    id: 5,
    title: "Bastian",
    emoji: "🦞",
    icon: "food",
    entries: [
      { photo: "/placeholder.svg" },
    ],
  },
  {
    id: 6,
    title: "Chai Point",
    emoji: "🍵",
    icon: "food",
    entries: [
      { comment: "Two cutting chai, one samosa — always." },
    ],
  },
  {
    id: 7,
    title: "Random Street Food",
    emoji: "🌯",
    icon: "food",
    entries: [
      {},
    ],
  },
];

// Fun rotation angles for a scrapbook feel
const rotations = [-2, 1.5, -1, 2.5, -1.5, 0.5, -2.5, 1, -0.5, 2, -1.8, 1.2];

const RestaurantScrapbook = () => {
  return (
    <section className="relative z-10 py-12 px-4 md:px-8 w-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto pb-16"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-cream text-center mb-2">
          The Bill Collection 🧾
        </h2>
        <p className="text-center text-muted-foreground font-display text-lg italic mb-10">
          Receipts we'll never throw away.
        </p>

        <div className="space-y-10">
          {groups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
            >
              {/* Group header — fun style */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{group.emoji}</span>
                <h3 className="font-heading text-2xl md:text-3xl text-cream">
                  {group.title}
                </h3>
                <span className="text-xs text-primary font-body bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                  ×{group.entries.length}
                </span>
              </div>

              {/* Entries — scattered card feel */}
              <div className="flex flex-wrap gap-4 pl-2">
                {group.entries.map((entry, ei) => {
                  const rot = rotations[(gi * 3 + ei) % rotations.length];
                  const hasContent = entry.photo || entry.comment;

                  return (
                    <motion.div
                      key={ei}
                      initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
                      animate={{ opacity: 1, rotate: rot, scale: 1 }}
                      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                      transition={{ delay: gi * 0.08 + ei * 0.06, duration: 0.4 }}
                      className="w-36 md:w-44 shrink-0 bg-card border border-border/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-default"
                      style={{ transformOrigin: "center center" }}
                    >
                      {entry.photo ? (
                        <div className="w-full aspect-[4/3] bg-secondary/50 overflow-hidden">
                          <img
                            src={entry.photo}
                            alt={group.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[4/3] bg-secondary/20 flex flex-col items-center justify-center gap-1">
                          <Receipt className="w-6 h-6 text-primary/30" />
                          <span className="text-[10px] text-muted-foreground/50 font-body">no photo yet</span>
                        </div>
                      )}

                      {entry.comment ? (
                        <div className="p-2.5">
                          <p className="text-[11px] text-cream/80 font-display italic leading-snug">
                            "{entry.comment}"
                          </p>
                        </div>
                      ) : !hasContent ? (
                        <div className="p-2.5">
                          <p className="text-[11px] text-muted-foreground/40 font-body">
                            Just vibes ✌️
                          </p>
                        </div>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RestaurantScrapbook;
