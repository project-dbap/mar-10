import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveLetter = () => {
  return (
    <section className="relative z-10 py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl text-cream">
            A Few Words
          </h2>
        </div>

        <div className="love-letter rounded-2xl p-8 md:p-12">
          <p className="font-display text-2xl md:text-3xl text-gold mb-8 italic">
            My dearest Bhagirathi,
          </p>

          <div className="space-y-6 font-display text-lg md:text-xl text-cream/85 leading-relaxed italic">
            <p>
              I don't know how to say everything I feel about you in just a few lines,
              but I'll try — because you deserve to hear it, and I'll never get tired of telling you.
            </p>

            <p>
              You make the ordinary feel extraordinary. A simple meal becomes a memory.
              A random evening becomes the highlight of my week. A conversation with you
              feels like the only place I ever want to be.
            </p>

            <p>
              Thank you for being patient with me, for laughing at my terrible jokes,
              for making even the most mundane days feel like they matter.
              I'm so lucky you exist, and I'm even luckier that you chose me.
            </p>

            <p>
              Happy Birthday, my love. Here's to many more restaurants, many more bills,
              and many, many more terrible maths scores from you.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gold/20">
            <p className="font-display text-xl text-gold italic text-right">
              Forever yours,
            </p>
            <p className="font-display text-2xl text-gold italic text-right mt-2">
              — Your Person 💛
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
