import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const goals = [
  {
    id: "model-development",
    title: "Model Development for Predicting Instant Fuel Rate",
    description: "Understanding the effects of features to predict fuel rate using Random Forest model",
    status: "Completed",
    content: {
      details: "This project aims to develop a predictive model for instant fuel rate based on various driving features, such as speed, acceleration, and engine load.",
      hypotheses: [
        "High throttle usage and engine load directly increased the predicted fuel rate.",
        "Steady driving with lower acceleration resulted in more efficient fuel usage.",
      ],
      image: {
        src: "/data/images/feature_importance.png", // Ensure this path is correct and the image exists
        alt: "Model Development Chart"
      }
    }
  },
  {
    id: "driver-personality",
    title: "Driver Personality Insights",
    description: "Correlating sensor data with driving style and behavior",
    status: "Completed",
    content: {
      details: "This study aims to identify distinct driving personalities by analyzing patterns in sensor data, helping to understand how different drivers respond to various road conditions.",
      hypotheses: [
        "Distinct driving personalities can be identified through sensor data",
        "Driving style correlates with fuel efficiency",
        "Weather impacts different driving personalities differently"
      ],
      image: {
        src: "/data/images/Throttle position_comparison.png", // Ensure this path is correct and the image exists
        alt: "Throttle Position Comparison"
      },
      additionalImages: [
        { src: "/data/images/Calculated engine load value_comparison.png", alt: "Engine Load Value Comparison" },
        { src: "/data/images/Engine RPM_comparison.png", alt: "Engine RPM Comparison" },
        { src: "/data/images/Vehicle acceleration_comparison.png", alt: "Acceleration Comparison" }
      ]
    }
  },
  {
    id: "fuel-provider",
    title: "Fuel Provider Comparisons",
    description: "Analyzing performance metrics across different fuel sources",
    status: "Completed",
    content: {
      details: "A comprehensive comparison of vehicle performance metrics when using different fuel providers, analyzing efficiency, engine performance, and emissions data.",
      hypotheses: [
        "Fuel quality varies significantly between providers",
        "Premium fuel provides measurable performance benefits",
        "Seasonal variations affect fuel efficiency differently by provider"
      ],
      image: {
        src: "/data/images/fuel_provider_comparison.png", // Ensure this path is correct and the image exists
        alt: "Fuel Provider Comparison Chart"
      }
    }
  }
];

const Goals = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="goals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-roboto font-bold text-3xl md:text-4xl text-center mb-12">
          Project Goals
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => navigate(`/goals/${goal.id}`)}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-primary" size={24} />
                <h3 className="font-roboto font-medium text-lg">{goal.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{goal.description}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals;