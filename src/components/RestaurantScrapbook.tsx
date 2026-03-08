import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Receipt, UtensilsCrossed } from "lucide-react";

interface Visit {
  date: string;
  billAmount: string;
  memory: string;
  hasPhoto: boolean;
}

interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  visits: Visit[];
}

const restaurants: Restaurant[] = [
  {
    name: "The Bombay Canteen",
    cuisine: "Modern Indian",
    location: "Lower Parel, Mumbai",
    visits: [
      { date: "14th Feb 2025", billAmount: "₹2,450", memory: "Our first Valentine's dinner together. You ordered the crab, I couldn't stop smiling.", hasPhoto: true },
      { date: "20th Aug 2025", billAmount: "₹1,800", memory: "Random Tuesday dinner that turned into the best night.", hasPhoto: false },
    ],
  },
  {
    name: "Café Madras",
    cuisine: "South Indian",
    location: "Matunga, Mumbai",
    visits: [
      { date: "5th Mar 2025", billAmount: "₹380", memory: "You dunked your dosa in my sambar. Bold move. I loved it.", hasPhoto: true },
    ],
  },
  {
    name: "Burma Burma",
    cuisine: "Burmese",
    location: "Fort, Mumbai",
    visits: [
      { date: "12th Apr 2025", billAmount: "₹1,650", memory: "The khow suey was incredible. Your review: 'This is better than maths.'", hasPhoto: true },
      { date: "3rd Sep 2025", billAmount: "₹1,900", memory: "We tried everything on the menu. No regrets.", hasPhoto: false },
    ],
  },
  {
    name: "Bastian",
    cuisine: "Seafood & Continental",
    location: "Bandra, Mumbai",
    visits: [
      { date: "28th Jun 2025", billAmount: "₹4,200", memory: "The lobster was half your height but you finished it like a champion.", hasPhoto: true },
    ],
  },
  {
    name: "Chai Point",
    cuisine: "Chai & Snacks",
    location: "Various Locations",
    visits: [
      { date: "Every other day", billAmount: "₹150 (approx)", memory: "Our unofficial office. Two cutting chai, one samosa — always.", hasPhoto: false },
      { date: "1st Jan 2026", billAmount: "₹220", memory: "New year, same order. Wouldn't change a thing.", hasPhoto: true },
    ],
  },
];

const RestaurantScrapbook = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-cream text-center mb-3">
          Our Story in Bites
        </h2>
        <p className="text-center text-muted-foreground font-display text-lg italic mb-12">
          Every meal, a memory. Every bill, a bookmark.
        </p>

        <div className="space-y-4">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="scrapbook-card rounded-lg overflow-hidden"
            >
              {/* Restaurant Header */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-secondary/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl text-cream">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{restaurant.cuisine}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {restaurant.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {restaurant.visits.length} {restaurant.visits.length === 1 ? "visit" : "visits"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Visit Cards */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 pt-0 flex gap-4 overflow-x-auto pb-4 snap-x">
                      {restaurant.visits.map((visit, vIndex) => (
                        <motion.div
                          key={vIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: vIndex * 0.1 }}
                          className="min-w-[260px] md:min-w-[300px] bg-background/50 rounded-lg border border-border/30 p-4 snap-start hover:border-gold/30 transition-all hover:-translate-y-1 duration-300"
                        >
                          {/* Photo or Placeholder */}
                          <div className="w-full h-36 rounded-md mb-4 overflow-hidden bg-secondary/50 flex items-center justify-center">
                            {visit.hasPhoto ? (
                              <div className="w-full h-full bg-gradient-to-br from-navy-light to-secondary flex items-center justify-center">
                                <span className="text-muted-foreground text-sm font-body">📸 Photo placeholder</span>
                              </div>
                            ) : (
                              <div className="text-center">
                                <UtensilsCrossed className="w-8 h-8 text-gold/30 mx-auto mb-2" />
                                <span className="text-muted-foreground text-xs">No photo, just vibes</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gold mb-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{visit.date}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Receipt className="w-3.5 h-3.5" />
                            <span>{visit.billAmount}</span>
                          </div>

                          <p className="text-sm text-cream/80 font-body italic leading-relaxed">
                            "{visit.memory}"
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RestaurantScrapbook;
