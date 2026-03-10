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
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl text-cream">
            A Few Words
          </h2>
        </div>

        <div className="love-letter rounded-2xl p-8 md:p-12">
          <p className="font-heading text-2xl md:text-3xl text-gold mb-8">
            To my Spidergirl,
          </p>

          <div className="space-y-6 font-heading text-lg md:text-xl text-cream/85 leading-relaxed">
            <p>
              You of all people would know that I suck at this, but here's my attempt at a few words to you. (And don't worry, I'm not using Gemini 😤)
            </p>

            <p>
              You are one of the smartest people I know. The way you're able to analyze and come up with conclusions even with limited knowledge, it's lowkey terrifying (ngl I'm kinda attracted to it too hehe).
              No wonder you're so good at research too. <br></br>
              I wish someday that I will be able to match your goss-finding and analyzing skills, but until then, I will just admire it and provide my observations from time-to-time 😘
            </p>

            <p>
              You wonder how I can sit without doing anything, but I'm just sitting there lost in your eyes, your adorable baby eyes.
              <br></br>When I used to give you such compliments, you just replied "boring" 😭, if only you could see how I see you (is this grammatically right? 😣), and if only I could express it in better words.
            </p>

            <p>
              I wish I could atleast be half as passionate about anything as you are about food. (although you've been eating kinda less lately, but I'll fix that 😤) It's so fascinating to hear you describe something as simple as even green chutney in such detail <s>whereas here I'm struggling to find words to even describe you</s>.
              I hope to explore so many more restaurants and dishes with you (maybe even cook for each other? 😇)
            </p>

            <p>
              You are such a sweet soul, so nice with people. Yes, you might be rude to me at times, but I cope knowing that that means you're comfortable enough to be your true self around me (right? 🥺)
            </p>

            <p>
              Thank you for being so patient with me, tolerating my fuck-ups and tomfooleries. Sometimes I still wonder why you chose to date me, and how you've stuck around for so long <s>and then I remember my height</s>.
              I know we're not at the greatest point right now, but I hope to be better.
            </p>

            <p>
              Happy Birthday baby. Finally after 6 months, we can again say that we have a 1 year age gap between us (true mo**y).  Here's to many more birthdays together (and maybe a vibe-rator gift for one of them hehe)
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gold/20">
            <p className="font-heading text-2xl text-gold text-right mt-2">
              ~ Asha
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
