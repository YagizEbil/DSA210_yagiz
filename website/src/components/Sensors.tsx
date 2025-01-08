import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sensorData = [
  {
    id: 1,
    name: "Engine RPM",
    pid: "0x0C",
    description: "Measures engine revolutions per minute",
    frequency: "High",
  },
  {
    id: 2,
    name: "Vehicle Speed",
    pid: "0x0D",
    description: "Current vehicle speed in MPH/KPH",
    frequency: "High",
  },
  {
    id: 3,
    name: "Engine Temperature",
    pid: "0x0F",
    description: "Engine coolant temperature",
    frequency: "Medium",
  },
];

const Sensors = () => {
  const [expandedSensor, setExpandedSensor] = useState<number | null>(null);

  return (
    <section id="sensors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-roboto font-bold text-3xl md:text-4xl text-center mb-12">
          Sensors and Data Fields
        </h2>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {sensorData.map((sensor) => (
            <div
              key={sensor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setExpandedSensor(expandedSensor === sensor.id ? null : sensor.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span className="text-primary font-mono">{sensor.pid}</span>
                  <span className="font-roboto font-medium">{sensor.name}</span>
                </div>
                {expandedSensor === sensor.id ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              
              {expandedSensor === sensor.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-600 mb-2">{sensor.description}</p>
                  <p className="text-sm text-gray-500">
                    Data Collection Frequency: <span className="font-medium">{sensor.frequency}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sensors;