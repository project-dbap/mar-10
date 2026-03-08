import { motion } from "framer-motion";
import { Receipt, UtensilsCrossed, MessageCircle, MapPin } from "lucide-react";

interface BillEntry {
  photo?: string;
  comment?: string;
}

interface BillGroup {
  id: number;
  title: string;
  icon?: "food" | "trip";
  entries: BillEntry[];
}

const groups: BillGroup[] = [
  {
    id: 1,
    title: "PFC",
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
    icon: "food",
    entries: [
      { comment: "You dunked your dosa in my sambar. Bold move." },
    ],
  },
  {
    id: 4,
    title: "Burma Burma",
    icon: "food",
    entries: [
      { photo: "/placeholder.svg", comment: "The khow suey was better than maths." },
    ],
  },
  {
    id: 5,
    title: "Bastian",
    icon: "food",
    entries: [
      { photo: "/placeholder.svg" },
    ],
  },
  {
    id: 6,
    title: "Chai Point",
    icon: "food",
    entries: [
      { comment: "Two cutting chai, one samosa — always." },
    ],
  },
  {
    id: 7,
    title: "Random Street Food",
    icon: "food",
    entries: [
      {},
    ],
  },
];

const RestaurantScrapbook = () => {
  return (
    <section className="relative z-10 py-12 px-4 md:px-8 w-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto pb-16"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-cream text-center mb-3">
          The Bill Collection
        </h2>
        <p className="text-center text-muted-foreground font-display text-lg italic mb-10">
          Every meal, a memory. Every bill, a bookmark.
        </p>

        <div className="space-y-8">
          {groups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  {group.icon === "trip" ? (
                    <MapPin className="w-4 h-4 text-primary" />
                  ) : (
                    <UtensilsCrossed className="w-4 h-4 text-primary" />
                  )}
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-cream">
                  {group.title}
                </h3>
                <span className="text-xs text-muted-foreground font-body bg-secondary/50 px-2 py-0.5 rounded-full">
                  {group.entries.length} {group.entries.length === 1 ? "visit" : "visits"}
                </span>
                <div className="flex-1 h-px bg-border/20" />
              </div>

              {/* Entries row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-11">
                {group.entries.map((entry, ei) => (
                  <motion.div
                    key={ei}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.1 + ei * 0.05, duration: 0.3 }}
                    className="scrapbook-card rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    {entry.photo ? (
                      <div className="w-full aspect-square bg-secondary/50 overflow-hidden">
                        <img
                          src={entry.photo}
                          alt={group.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center">
                        <Receipt className="w-8 h-8 text-primary/20" />
                      </div>
                    )}

                    {entry.comment && (
                      <div className="p-3">
                        <div className="flex items-start gap-1.5">
                          <MessageCircle className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-xs text-cream/80 font-display italic leading-relaxed">
                            "{entry.comment}"
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RestaurantScrapbook;
