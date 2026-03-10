
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface BillEntry {
  photo?: string;
  photos?: string[];
  comment?: string;
}

interface BillCategory {
  id: string;
  title: string;
  emoji: string;
  entries: BillEntry[];
}

const categories: BillCategory[] = [
  {
    id: "kolkata",
    title: "Kolkata Adventures",
    emoji: "🚂",
    entries: [
      { photo: "/bills/Fabbrica-Kol1.jpg", comment: "Still sad about the rosemary :(" },
      { photo: "/bills/BurmaBurma-Kol1.jpg", comment: "Worth every penny (except maybe the mocktail)" },
      { photo: "/bills/MarcoPolo-Kol1.jpg", comment: "The most random dessert stop" },
      { photo: "/bills/BurmaBurma-Kol2.jpg", comment: "So good we had to come back again" },
      { photo: "/bills/Corridor-Kol2.jpg", comment: "The first time we exploited the happy hours" },
      { photo: "/bills/CountryHouse-Kol2.jpg", comment: "Still not over the wafflesss" },
      { photo: "/bills/Flurys-Kol2.jpg", comment: "What a disappointment 😭" },
      { photo: "/bills/Mocambo-Kol2.jpg", comment: "Best one imo" },
      { photo: "/bills/Mezzuna-14-02.jpg", comment: "Feb 14th was fun :)" },
    ],
  },
  {
    id: "pfc",
    title: "PFC",
    emoji: "🥘",
    entries: [
      { photo: "/bills/PFC-15-04.jpg", comment: "" },
      { photo: "/bills/PFC-16-09.jpg" },
      { photo: "/bills/PFC-13-10.jpg", comment: "" },
      { photo: "/bills/PFC-26-10.jpg" },
      { photo: "/bills/PFC-08-11.jpg" },
      { photo: "/bills/PFC-11-11.jpg" },
      { photo: "/bills/PFC-16-11.jpg" },
      { photo: "/bills/PFC-18-11.jpg", comment: "" },
      { photo: "/bills/PFC-27-11.jpg" },
      { photo: "/bills/PFC-07-01-26.jpg" },
      { photo: "/bills/PFC-03-02.jpg" },
      { photo: "/bills/PFC-05-02-26.jpg" },
      { photo: "/bills/PFC-06-02-26.jpg" },
      { photo: "/bills/PFC-16-02-26.jpg" },
    ],
  },
  {
    id: "fancy",
    title: "Food Studio & Curry Room",
    emoji: "👨‍🍳",
    entries: [
      { photo: "/bills/FoodStudio-14-09.jpg", comment: "How did we order this much😭" },
      { photo: "/bills/FoodStudio-Cheesecake-12-10.jpg", comment: "Sweet treats😋" },
      { photo: "/bills/TCR-11-10.jpg", comment: "Curry room Mushroom😋" },
      { photo: "/bills/TCR-12-10.jpg" },
      { photo: "/bills/TCR-15-10.jpg", comment: "" },
      { photo: "/bills/TCR-27-10.jpg" },
      { photo: "/bills/TCR-24-11.jpg" },
    ],
  },
  {
    id: "social",
    title: "Bombay Social",
    emoji: "🍹",
    entries: [
      { photo: "/bills/BomSoc-30-08-25.jpg", comment: "Anniversary dinner :)" },
      { photo: "/bills/BomSoc-29-04.jpg", comment: "Last day of 4th year :(" },
      {
        photos: [
          "/bills/BomSoc-17-09.jpg",
        ],
      },
      { photo: "/bills/Bomsoc-06-11.jpg" },
      { photo: "/bills/BomSoc-14-11.jpg" },
      {
        photos: [
          "/bills/BomSoc-11-01-26.jpg",
          "/bills/BomSoc-27-01-26.jpg"
        ],
        comment: "First time we tried dahi/sambar vadas"
      },
    ],
  },
  {
    id: "misc",
    title: "And more..",
    emoji: "🍴",
    entries: [
      {
        photos: [
          "/bills/C64-25-08.jpg",
          "/bills/C64-03-09.jpg",
          "/bills/C64-29-10-24.jpg",
        ],
        comment: "Some C64 meals"
      },
      {
        photos: [
          "/bills/CCD-Cheesecake-27-08.jpg",
          "/bills/CCD-31-08.jpg",
          "/bills/CCD-01-09.jpg",
        ],
        comment: "CCD sweet treats, from back when their AC was on :("
      },
      {
        photos: [
          "/bills/YellowStraw-11-01-26.jpg",
          "/bills/YellowStraw-11-01-26-2.jpg",
          "/bills/YellowStraw-07-02-26.jpg",
        ],
        comment: "Healthy for a while"
      },
      { photo: "/bills/BR-26-01.jpg", comment: "More sweet treats" },
      { photo: "/bills/Keventers-14-10.jpg", comment: "Even more sweet treats" },
      { photo: "/bills/Rynsan.jpg", comment: "Best dinner?" },
      { photo: "/bills/GTAC-Guw.jpg", comment: "Glorified water😭" },
    ],
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

const getPageDoodles = (pageIndex: number) => {
  const offset = pageIndex * 2;
  return marginDoodles.filter((_, i) => (i + offset) % 3 !== 0).slice(0, 5);
};

export default function RestaurantScrapbook() {
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-12 px-2 w-full flex flex-col items-center">
      <div className="text-center mb-10 z-20">
        <h2 className="font-heading text-4xl md:text-5xl text-cream mb-2">
          The Bill Collection 🧾
        </h2>
        <p className="text-muted-foreground font-handwritten text-xl mb-4">
          A (partial) collection of memories from the past year
        </p>
      </div>

      {/* Structured Vertical Scrapbook Container */}
      <div
        className="relative w-full max-w-5xl rounded-2xl border border-border/30 shadow-2xl bg-secondary/10 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, hsl(36 20% 14%) 0%, hsl(30 15% 11%) 50%, hsl(220 20% 10%) 100%)",
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3)"
        }}
      >
        {/* Background Textures */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            mixBlendMode: "overlay",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(36 40% 30% / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, hsl(36 30% 25% / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, hsl(30 20% 20% / 0.08) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(36 30% 50%) 31px, hsl(36 30% 50%) 32px)",
            backgroundPositionY: "80px",
          }}
        />
        <div
          className="absolute left-4 md:left-12 top-0 bottom-0 w-px opacity-10 pointer-events-none"
          style={{ background: "hsl(0 60% 50%)" }}
        />

        {/* Content Flow */}
        <div className="relative p-4 md:p-12 pb-24 space-y-12 md:space-y-16">
          {categories.map((category, catIdx) => {
            const doodles = getPageDoodles(catIdx);

            return (
              <div key={category.id} className="relative pt-6">
                {/* Category Margin doodles */}
                {doodles.map((doodle, i) => (
                  <span
                    key={`doodle-${catIdx}-${i}`}
                    className={`absolute hidden md:block ${doodle.size} text-primary/15 select-none pointer-events-none font-handwritten`}
                    style={{
                      top: doodle.top,
                      left: doodle.left,
                      right: doodle.right,
                      bottom: doodle.bottom,
                      transform: `rotate(${doodle.rotate}deg)`,
                    }}
                  >
                    {doodle.content}
                  </span>
                ))}

                {/* Section Title */}
                <div className="text-center mb-10 relative z-10">
                  <span className="text-5xl mb-4 block drop-shadow-md">{category.emoji}</span>
                  <h3 className="font-handwritten text-4xl md:text-5xl text-cream drop-shadow-sm">
                    {category.title}
                  </h3>
                  {category.subtitle && (
                    <p className="font-handwritten text-xl text-primary/60 mt-3">
                      — {category.subtitle} —
                    </p>
                  )}
                  <div className="text-primary/20 text-sm mt-5 select-none font-handwritten">
                    ~ ~ ~ ✿ ~ ~ ~
                  </div>
                </div>

                {/* Bills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-6 relative z-10 grid-flow-row-dense items-start">
                  {category.entries.map((entry, ei) => {
                    const tapeColor = tapeColors[(catIdx + ei) % tapeColors.length];

                    // --- CONFIGURABLE MESSINESS ---
                    // 0 = stick straight, perfect grid
                    // 1 = natural slight scatter
                    // 2+ = very messy/chaotic scrapbook
                    const MESSINESS_LEVEL = 0.3;

                    // Generate a more pronounced, "messy" rotation and offset
                    // using a pseudo-random but consistent calculation based on index
                    const pseudoRandom = Math.sin(ei * 1234.5);
                    const tilt = pseudoRandom * (12 * MESSINESS_LEVEL); // random tilt
                    const yOffset = Math.sin(ei * 4321) * (35 * MESSINESS_LEVEL); // random vertical offset
                    const xOffset = Math.cos(ei * 987) * (20 * MESSINESS_LEVEL); // random horizontal offset

                    // Stagger the vertical flow based on messiness
                    const mtClass = MESSINESS_LEVEL > 0.8
                      ? (ei % 3 === 0 ? "mt-0" : ei % 3 === 1 ? "mt-12" : "mt-24")
                      : (ei % 2 === 0 ? "mt-2" : "mt-0");

                    // Handle single photo or grouped photos
                    const displayPhotos = entry.photos || (entry.photo ? [entry.photo] : []);
                    const isGroup = displayPhotos.length > 1;

                    // Calculate how many columns this polaroid should span
                    const spanClass =
                      displayPhotos.length === 1 ? 'col-span-1' :
                        displayPhotos.length === 2 ? 'col-span-2' :
                          displayPhotos.length === 3 ? 'col-span-2 md:col-span-3' :
                            'col-span-2 md:col-span-4 lg:col-span-4'; // cap at max columns

                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, y: yOffset + 30, x: xOffset, rotate: tilt }}
                        whileInView={{ opacity: 1, y: yOffset, x: xOffset, rotate: tilt }}
                        viewport={{ once: true, margin: "-50px" }}
                        className={`relative group cursor-pointer mb-12 ${spanClass} ${mtClass}`}
                      >
                        {/* Tape */}
                        <div
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 ${tapeColor} rounded-sm z-10 shadow-sm backdrop-blur-sm bg-opacity-80`}
                          style={{ transform: `translateX(-50%) rotate(${-tilt * 0.5}deg)` }}
                        />

                        {/* Polaroid Frame */}
                        <div className="bg-white/90 p-3 pt-4 pb-12 shadow-md hover:shadow-xl transition-shadow rounded-sm border border-black/10 relative">

                          {/* Inner Photo Layout */}
                          <div
                            className={`w-full rounded-sm bg-black relative shadow-inner grid gap-2 ${isGroup ? 'p-2' : ''} ${displayPhotos.length === 1 ? 'grid-cols-1' :
                              displayPhotos.length === 2 ? 'grid-cols-2' :
                                displayPhotos.length === 3 ? 'grid-cols-2 md:grid-cols-3' :
                                  'grid-cols-2 md:grid-cols-4 lg:grid-cols-4'
                              }`}
                          >
                            {displayPhotos.length > 0 ? (
                              displayPhotos.map((photoSrc, photoIdx) => (
                                <div
                                  key={photoIdx}
                                  className="relative group/photo"
                                  onClick={() => setZoomedPhoto(photoSrc)}
                                >
                                  <img
                                    src={`${import.meta.env.BASE_URL}${photoSrc.startsWith('/') ? photoSrc.slice(1) : photoSrc}`}
                                    alt="Bill"
                                    loading="lazy"
                                    className="w-full h-full object-cover border border-white/10"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/photo:opacity-100 cursor-zoom-in">
                                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="w-full aspect-[2/3] flex items-center justify-center">
                                <span className="text-muted-foreground/30 text-xs font-body">📄</span>
                              </div>
                            )}
                          </div>

                          {/* Comment area */}
                          {entry.comment && (
                            <div className="absolute bottom-3 left-0 right-0 px-3 text-center">
                              <p className="font-handwritten text-sm text-black/80 leading-tight">
                                {entry.comment}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                </div>
              </div>
            );
          })}
        </div>

        {/* Scrapbook Footer */}
        <div className="mt-12 mb-20 text-center px-4">
          <p className="font-handwritten text-xl md:text-2xl text-primary/70 italic mb-12">
            And many more missing bills and memories :(
          </p>

          {/* Stats Section */}
          <div className="max-w-sm mx-auto bg-white/90 border border-black/10 p-6 rounded-sm shadow-sm rotate-1 font-handwritten text-left relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-400/80 rounded-sm z-10 shadow-sm backdrop-blur-sm -rotate-2" />
            <h4 className="text-xl border-b border-black/10 pb-2 mb-3 font-bold text-black/80 text-center">
              Quick Stats
            </h4>
            <ul className="space-y-4 text-lg text-black/80">
              <li className="flex justify-between items-end border-b border-black/5 pb-1 gap-4">
                <span>Paneer Eaten:</span>
                <span className="font-bold">Too much</span>
              </li>
              <li className="flex justify-between items-end border-b border-black/5 pb-1 gap-4">
                <span>Total Cost:</span>
                <span className="font-bold">Let's not go there</span>
              </li>
              <li className="flex justify-between items-end border-b border-black/5 pb-1 gap-4">
                <span>Calories Gained:</span>
                <span className="font-bold line-through decoration-2">Classified</span>
              </li>
              <li className="flex justify-between items-end pb-1 gap-4">
                <span>Goss Discussed:</span>
                <span className="font-bold text-black">Countless</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setZoomedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedPhoto(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={`${import.meta.env.BASE_URL}${zoomedPhoto.startsWith('/') ? zoomedPhoto.slice(1) : zoomedPhoto}`}
                alt="Bill zoomed"
                className="w-full h-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


