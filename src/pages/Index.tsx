import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import RestaurantScrapbook from "@/components/RestaurantScrapbook";
import MathQuiz from "@/components/MathQuiz";
import LoveLetter from "@/components/LoveLetter";
import BirthdayFooter from "@/components/BirthdayFooter";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <HeroSection />
      <div className="w-24 h-px bg-gold/30 mx-auto" />
      <RestaurantScrapbook />
      <div className="w-24 h-px bg-gold/30 mx-auto" />
      <MathQuiz />
      <div className="w-24 h-px bg-gold/30 mx-auto" />
      <LoveLetter />
      <BirthdayFooter />
    </div>
  );
};

export default Index;
