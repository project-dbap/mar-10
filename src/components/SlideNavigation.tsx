import { useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  label: string;
  content: ReactNode;
}

interface SlideNavigationProps {
  slides: Slide[];
}

const SlideNavigation = ({ slides }: SlideNavigationProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length || index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current, slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Touch/swipe support
  useEffect(() => {
    let startY = 0;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      const dx = startX - e.changedTouches[0].clientX;

      // Only navigate on horizontal swipes that are stronger than vertical movement
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx > 0 ? next() : prev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Slide content */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 overflow-y-auto"
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${slide.label}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${i === current
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
            />
            <span className="absolute -top-8 whitespace-nowrap text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded">
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      {/* Arrow buttons (desktop) */}
      {current > 0 && (
        <button
          onClick={prev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-card/80 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors hidden md:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={next}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-card/80 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors hidden md:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SlideNavigation;
