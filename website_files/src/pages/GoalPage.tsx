import { useParams, Link } from 'react-router-dom';
import { goals } from '@/components/Goals';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const GoalPage = () => {
  const { goalId } = useParams();
  const goal = goals.find(g => g.id === goalId);

  if (!goal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Goal not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Goals
          </Link>
        </nav>

        <div className="space-y-8">
          {/* Title and Description Section */}
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-4">{goal.title}</h1>
            <p className="text-gray-700 mb-6">{goal.content.details}</p>
            
            {/* Status Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              goal.status.toLowerCase() === "completed" ? "bg-green-100 text-green-800" :
              goal.status.toLowerCase() === "in progress" ? "bg-blue-100 text-blue-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {goal.status}
            </span>
          </Card>

          {/* Hypothesis Testing Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Hypotheses</h2>
            <ul className="space-y-4">
              {goal.content.hypotheses.map((hypothesis, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{hypothesis}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Data Analysis Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Data Analysis</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">{goal.content.image.alt}</h3>
                <img src={goal.content.image.src} alt={goal.content.image.alt} className="w-full h-auto rounded-lg" />
              </div>
              {goal.id === "driver-personality" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goal.content.additionalImages.map((image, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">{image.alt}</h3>
                      <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Challenges Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Challenges & Limitations</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Limited dataset size affecting statistical significance</li>
              <li>Missing sensor data during certain time periods</li>
              <li>Difficulty in correlating environmental factors with driving patterns</li>
            </ul>
          </Card>

          {/* Conclusions Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Key Takeaways</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-2">Main Findings</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Correlation between driving speed and fuel efficiency</li>
                  <li>Engine RPM and load-to-power ratio emerged as critical factors for predicting fuel rates.</li>
                  <li>Radar charts revealed significant differences between fuel providers.</li>
                  <li>T-tests showed significant differences in driving styles for specific metrics such as throttle position and acceleration.</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-2">Future Directions</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Expand dataset to include more diverse driving conditions</li>
                  <li>Investigate seasonal variations in driving patterns</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoalPage;