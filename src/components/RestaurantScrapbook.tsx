import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

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
    entries: Array.from({ length: 12 }, (_, i) => ({
      photo: "/placeholder.svg",
      ...(i === 0 ? { comment: "The usual order. Nothing fancy, everything perfect." } : {}),
      ...(i === 3 ? { comment: "Third time this week. No regrets." } : {}),
      ...(i === 7 ? { comment: "Birthday eve dinner." } : {}),
    })),
  },
  {
    id: 2,
    title: "Kolkata Trip 1",
    emoji: "🚂",
    subtitle: "The first adventure",
    entries: [
      { photo: "/placeholder.svg", comment: "That street-side roll place. Life-changing." },
      { photo: "/placeholder.svg" },
      { photo: "/placeholder.svg", comment: "Mishti doi after every meal." },
    ],
  },
  {
    id: 3,
    title: "Kolkata Trip 2",
    emoji: "🚃",
    subtitle: "We came back for more",
    entries: [
      { photo: "/placeholder.svg" },
      { photo: "/placeholder.svg", comment: "Round two. Even better." },
      { photo: "/placeholder.svg" },
    ],
  },
  {
    id: 4,
    title: "Food Studio",
    emoji: "👨‍🍳",
    subtitle: "Where we pretended to be fancy",
    entries: Array.from({ length: 7 }, (_, i) => ({
      photo: "/placeholder.svg",
      ...(i === 2 ? { comment: "That dessert was unreal." } : {}),
    })),
  },
  {
    id: 5,
    title: "Curry Room",
    emoji: "🍛",
    subtitle: "Spice tolerance: tested",
    entries: Array.from({ length: 6 }, (_, i) => ({
      photo: "/placeholder.svg",
      ...(i === 0 ? { comment: "You said 'medium spicy'. Liar." } : {}),
    })),
  },
  {
    id: 6,
    title: "Bombay Social",
    emoji: "🍹",
    subtitle: "Good vibes only",
    entries: Array.from({ length: 8 }, (_, i) => ({
      photo: "/placeholder.svg",
      ...(i === 4 ? { comment: "Best evening ever." } : {}),
    })),
  },
  {
    id: 7,
    title: "Park",
    emoji: "🌳",
    subtitle: "Our go-to spot",
    entries: Array.from({ length: 6 }, (_, i) => ({
      photo: "/placeholder.svg",
      ...(i === 1 ? { comment: "Sunday ritual." } : {}),
    })),
  },
];

const tapeColors = [
  "bg-yellow-300/60",
  "bg-pink-300/50",
  "bg-blue-300/50",
  "bg-green-300/50",
  "bg-orange-300/50",
  "bg-purple-300/50",
];

// Margin doodles – SVG-style decorative elements scattered around the page
const marginDoodles = [
  { content: "♡", top: "15%", left: "2%", rotate: -12, size: "text-lg" },
  { content: "✿", top: "35%", right: "2%", rotate: 20, size: "text-xl" },
  { content: "☆", top: "60%", left: "1%", rotate: 8, size: "text-base" },
  { content: "~❋~", bottom: "20%", right: "3%", rotate: -5, size: "text-sm" },
  { content: "♡", top: "80%", left: "3%", rotate: 15, size: "text-base" },
  { content: "✧", top: "45%", left: "2%", rotate: -20, size: "text-lg" },
  { content: "🍕", bottom: "35%", right: "2%", rotate: 10, size: "text-base" },
  { content: "∞", top: "25%", right: "3%", rotate: -8, size: "text-sm" },
];

// Rotating sets of doodles per page
const getPageDoodles = (pageIndex: number) => {
  const offset = pageIndex * 2;
  return marginDoodles.filter((_, i) => (i + offset) % 3 !== 0).slice(0, 5);
};

const RestaurantScrapbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const page = pages[currentPage];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  // 3D page-curl variants
  const pageVariants = {
    enter: (d: number) => ({
      rotateY: d > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
      transformOrigin: d > 0 ? "left center" : "right center",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
    },
    exit: (d: number) => ({
      rotateY: d > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      transformOrigin: d > 0 ? "right center" : "left center",
    }),
  };

  const doodles = getPageDoodles(currentPage);

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
        <p className="text-center text-muted-foreground font-handwritten text-2xl mb-8">
          Flip through our delicious memories
        </p>

        {/* Journal book */}
        <div className="relative" style={{ perspective: "1200px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, hsl(36 20% 14%) 0%, hsl(30 15% 11%) 50%, hsl(220 20% 10%) 100%)",
                border: "2px solid hsl(36 30% 25% / 0.4)",
                boxShadow: "0 8px 40px hsl(220 50% 5% / 0.6), inset 0 1px 0 hsl(36 30% 30% / 0.2)",
                minHeight: "500px",
              }}
            >
              {/* Kraft paper texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                  mixBlendMode: "overlay",
                }}
              />
              {/* Secondary texture grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] rounded-xl"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, hsl(36 40% 30% / 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, hsl(36 30% 25% / 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, hsl(30 20% 20% / 0.08) 0%, transparent 70%)`,
                }}
              />

              {/* Paper lines */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(36 30% 50%) 31px, hsl(36 30% 50%) 32px)",
                backgroundPositionY: "80px",
              }} />
              {/* Red margin */}
              <div className="absolute left-12 md:left-16 top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ background: "hsl(0 60% 50%)" }} />

              {/* Margin doodles */}
              {doodles.map((doodle, i) => (
                <motion.span
                  key={`${currentPage}-doodle-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className={`absolute ${doodle.size} text-primary/15 select-none pointer-events-none font-handwritten`}
                  style={{
                    top: doodle.top,
                    left: doodle.left,
                    right: doodle.right,
                    bottom: doodle.bottom,
                    transform: `rotate(${doodle.rotate}deg)`,
                  }}
                >
                  {doodle.content}
                </motion.span>
              ))}

              <div className="relative p-5 md:p-8">
                {/* Page number */}
                <div className="absolute top-4 right-5 text-muted-foreground/30 font-handwritten text-sm">
                  pg {currentPage + 1} / {pages.length}
                </div>

                {/* Title */}
                <div className="text-center mb-6 pt-2">
                  <span className="text-4xl mb-1 block">{page.emoji}</span>
                  <h3 className="font-handwritten text-4xl md:text-5xl text-cream">
                    {page.title}
                  </h3>
                  {page.subtitle && (
                    <p className="font-handwritten text-lg text-primary/60 mt-1">
                      — {page.subtitle} —
                    </p>
                  )}
                  <div className="text-primary/20 text-xs mt-2 select-none font-handwritten">~ ~ ~ ✿ ~ ~ ~</div>
                </div>

                {/* Bills grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                  {page.entries.map((entry, ei) => {
                    const tapeColor = tapeColors[(currentPage + ei) % tapeColors.length];
                    const tilt = ((ei % 5) - 2) * 1.5;

                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, y: 15, rotate: 0 }}
                        animate={{ opacity: 1, y: 0, rotate: tilt }}
                        whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                        transition={{ delay: ei * 0.04, duration: 0.3 }}
                        className="relative group cursor-pointer"
                        onClick={() => entry.photo && setZoomedPhoto(entry.photo)}
                      >
                        {/* Tape */}
                        <div
                          className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 ${tapeColor} rounded-sm z-10`}
                          style={{ transform: `translateX(-50%) rotate(${-tilt * 0.3}deg)` }}
                        />

                        {/* Bill photo */}
                        <div className="w-full aspect-[2/3] rounded-sm overflow-hidden border border-border/20 shadow-md bg-secondary/30 relative">
                          {entry.photo ? (
                            <>
                              <img src={entry.photo} alt="bill" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-muted-foreground/30 text-xs font-body">📄</span>
                            </div>
                          )}
                        </div>

                        {/* Comment */}
                        {entry.comment && (
                          <p className="font-handwritten text-sm md:text-base text-cream/60 mt-1.5 leading-snug text-center px-0.5">
                            "{entry.comment}"
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom flourish */}
                <div className="text-center mt-6 text-primary/15 text-sm select-none font-handwritten">
                  ── ♡ ──
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1 text-sm font-handwritten text-lg text-muted-foreground hover:text-cream disabled:opacity-20 disabled:cursor-default transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              prev
            </button>
            <div className="flex gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentPage ? 1 : -1);
                    setCurrentPage(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage ? "bg-primary w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-1 text-sm font-handwritten text-lg text-muted-foreground hover:text-cream disabled:opacity-20 disabled:cursor-default transition-colors"
            >
              next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Zoom overlay */}
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setZoomedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-sm w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedPhoto(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={zoomedPhoto}
                alt="Bill zoomed"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RestaurantScrapbook;
