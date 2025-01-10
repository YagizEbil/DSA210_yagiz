import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Dataset from "@/components/Dataset";
import Sensors from "@/components/Sensors";
import DataVisualization from "@/components/DataVisualization";
import Goals from "@/components/Goals";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Dataset />
      <DataVisualization />
      <Sensors />
      <Goals />
      <Contact />
    </div>
  );
};

export default Index;