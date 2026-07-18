import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import AttentionCrisis from "../components/AttentionCrisis";
import CognitiveFitness from "../components/CognitiveFitness";
import MeetBrainSprint from "../components/MeetBrainSprint";
import FivePillars from "../components/FivePillars";
import DailyWorkout from "../components/DailyWorkout";
import Dashboard from "../components/Dashboard";
import Progress from "../components/Progress";
import HabitFormation from "../components/HabitFormation";
import PersonalizedInsights from "../components/PersonalizedInsights";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="BrainSprint — Your Daily Cognitive Fitness Platform"
        description="BrainSprint is a daily cognitive fitness platform. Train Memory, Focus, Reaction Speed, Processing Speed, and Pattern Recognition in minutes a day, with real progress you can see."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <AttentionCrisis />
      <CognitiveFitness />
      <MeetBrainSprint />
      <FivePillars />
      <DailyWorkout />
      <Dashboard />
      <Progress />
      <HabitFormation />
      <PersonalizedInsights />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
