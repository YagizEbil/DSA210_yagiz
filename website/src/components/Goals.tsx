import { CheckCircle2 } from 'lucide-react';

const Goals = () => {
  const goals = [
    {
      title: "Daily Driving Habits Analysis",
      description: "Understanding patterns in acceleration, braking, and speed management",
      status: "In Progress",
    },
    {
      title: "Driver Personality Insights",
      description: "Correlating sensor data with driving style and behavior",
      status: "Planned",
    },
    {
      title: "Fuel Provider Comparisons",
      description: "Analyzing performance metrics across different fuel sources",
      status: "Completed",
    },
  ];

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
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
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