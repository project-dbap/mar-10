import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import RestaurantScrapbook from "@/components/RestaurantScrapbook";
import MathQuiz from "@/components/MathQuiz";
import LoveLetter from "@/components/LoveLetter";
import BirthdayFooter from "@/components/BirthdayFooter";
import SlideNavigation from "@/components/SlideNavigation";

const slides = [
  {
    label: "Welcome",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <HeroSection />
      </div>
    ),
  },
  {
    label: "Our Story in Bites",
    content: (
      <div className="min-h-screen flex items-center justify-center py-8">
        <RestaurantScrapbook />
      </div>
    ),
  },
  {
    label: "The Maths Round",
    content: (
      <div className="min-h-screen flex items-center justify-center py-8">
        <MathQuiz />
      </div>
    ),
  },
  {
    label: "A Few Words",
    content: (
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <LoveLetter />
        <BirthdayFooter />
      </div>
    ),
  },
];

const Index = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      <StarField />
      <SlideNavigation slides={slides} />
    </div>
  );
};

export default Index;
