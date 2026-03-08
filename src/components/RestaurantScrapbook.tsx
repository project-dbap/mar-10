import { motion } from "framer-motion";
import { Receipt, UtensilsCrossed, MessageCircle } from "lucide-react";

interface BillEntry {
  id: number;
  place: string;
  photo?: string; // image path or undefined
  comment?: string;
}

// Replace these with your real entries — add/remove as needed
// For photos, upload images to the chat and I'll add them here
const entries: BillEntry[] = [
  { id: 1, place: "PFC", comment: "The usual order. Nothing fancy, everything perfect." },
  { id: 2, place: "PFC", photo: "/placeholder.svg" },
  { id: 3, place: "PFC", comment: "Third time this week. No regrets." },
  { id: 4, place: "Kolkata Trip", photo: "/placeholder.svg", comment: "That street-side roll place. Life-changing." },
  { id: 5, place: "Kolkata Trip", photo: "/placeholder.svg" },
  { id: 6, place: "Café Madras", comment: "You dunked your dosa in my sambar. Bold move." },
  { id: 7, place: "Burma Burma", photo: "/placeholder.svg", comment: "The khow suey was better than maths." },
  { id: 8, place: "Bastian", photo: "/placeholder.svg" },
  { id: 9, place: "Chai Point", comment: "Two cutting chai, one samosa — always." },
  { id: 10, place: "PFC", photo: "/placeholder.svg", comment: "Birthday eve dinner. You had no idea what was coming." },
  { id: 11, place: "Kolkata Trip", comment: "Mishti doi after every meal. Non-negotiable." },
  { id: 12, place: "Random Street Food" },
];

const RestaurantScrapbook = () => {
  return (
    <section className="relative z-10 py-12 px-4 md:px-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-cream text-center mb-3">
          The Bill Collection
        </h2>
        <p className="text-center text-muted-foreground font-display text-lg italic mb-10">
          Every meal, a memory. Every bill, a bookmark.
        </p>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="break-inside-avoid scrapbook-card rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo */}
              {entry.photo ? (
                <div className="w-full aspect-[4/3] bg-secondary/50 overflow-hidden">
                  <img
                    src={entry.photo}
                    alt={entry.place}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full py-6 bg-secondary/30 flex items-center justify-center">
                  <UtensilsCrossed className="w-8 h-8 text-primary/30" />
                </div>
              )}

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-primary mb-2">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="font-body font-medium">{entry.place}</span>
                </div>

                {entry.comment && (
                  <div className="flex items-start gap-2 mt-2">
                    <MessageCircle className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-sm text-cream/80 font-display italic leading-relaxed">
                      "{entry.comment}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RestaurantScrapbook;
