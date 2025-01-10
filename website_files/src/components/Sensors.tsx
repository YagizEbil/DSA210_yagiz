import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sensorData = [
  { id: 1, name: "Altitude (GPS)", pid: "0x01", description: "Measures altitude using GPS", frequency: "Medium" },
  { id: 2, name: "Speed (GPS)", pid: "0x02", description: "Measures speed using GPS", frequency: "High" },
  { id: 3, name: "Average speed (GPS)", pid: "0x03", description: "Measures average speed using GPS", frequency: "Medium" },
  { id: 4, name: "Absolute throttle position B", pid: "0x04", description: "Measures absolute throttle position B", frequency: "High" },
  { id: 5, name: "Absolute pedal position D", pid: "0x05", description: "Measures absolute pedal position D", frequency: "High" },
  { id: 6, name: "OBD Module Voltage", pid: "0x06", description: "Measures OBD module voltage", frequency: "Medium" },
  { id: 7, name: "Calculated engine load value", pid: "0x07", description: "Calculates engine load value", frequency: "High" },
  { id: 8, name: "Engine coolant temperature", pid: "0x08", description: "Measures engine coolant temperature", frequency: "Medium" },
  { id: 9, name: "Short term fuel % trim - Bank 1", pid: "0x09", description: "Measures short term fuel % trim for Bank 1", frequency: "High" },
  { id: 10, name: "Long term fuel % trim - Bank 1", pid: "0x0A", description: "Measures long term fuel % trim for Bank 1", frequency: "High" },
  { id: 11, name: "Calculated boost", pid: "0x0B", description: "Calculates boost", frequency: "High" },
  { id: 12, name: "Intake manifold absolute pressure", pid: "0x0C", description: "Measures intake manifold absolute pressure", frequency: "High" },
  { id: 13, name: "Calculated instant fuel rate", pid: "0x0D", description: "Calculates instant fuel rate", frequency: "High" },
  { id: 14, name: "Engine RPM", pid: "0x0E", description: "Measures engine revolutions per minute", frequency: "High" },
  { id: 15, name: "Engine RPM x1000", pid: "0x0F", description: "Measures engine revolutions per minute x1000", frequency: "High" },
  { id: 16, name: "Instant engine power (based on fuel consumption)", pid: "0x10", description: "Calculates instant engine power based on fuel consumption", frequency: "High" },
  { id: 17, name: "Vehicle acceleration", pid: "0x11", description: "Measures vehicle acceleration", frequency: "High" },
  { id: 18, name: "Vehicle speed", pid: "0x12", description: "Measures vehicle speed", frequency: "High" },
  { id: 19, name: "Timing advance", pid: "0x13", description: "Measures timing advance", frequency: "High" },
  { id: 20, name: "Intake air temperature", pid: "0x14", description: "Measures intake air temperature", frequency: "Medium" },
  { id: 21, name: "Fuel economizer (based on fuel system status and throttle position)", pid: "0x15", description: "Calculates fuel economizer based on fuel system status and throttle position", frequency: "High" },
  { id: 22, name: "Throttle position", pid: "0x16", description: "Measures throttle position", frequency: "High" },
  { id: 23, name: "Oxygen sensor 1 Bank 1 Short term fuel trim", pid: "0x17", description: "Measures short term fuel trim for Oxygen sensor 1 Bank 1", frequency: "High" },
  { id: 24, name: "Oxygen sensor 1 Bank 1 Voltage", pid: "0x18", description: "Measures voltage for Oxygen sensor 1 Bank 1", frequency: "High" },
  { id: 25, name: "Oxygen sensor 2 Bank 1 Short term fuel trim", pid: "0x19", description: "Measures short term fuel trim for Oxygen sensor 2 Bank 1", frequency: "High" },
  { id: 26, name: "Oxygen sensor 2 Bank 1 Voltage", pid: "0x1A", description: "Measures voltage for Oxygen sensor 2 Bank 1", frequency: "High" },
  { id: 27, name: "Distance traveled with MIL on", pid: "0x1B", description: "Measures distance traveled with MIL on", frequency: "Medium" },
  { id: 28, name: "Commanded evaporative purge", pid: "0x1C", description: "Measures commanded evaporative purge", frequency: "Medium" },
  { id: 29, name: "# warm-ups since codes cleared", pid: "0x1D", description: "Counts number of warm-ups since codes cleared", frequency: "Medium" },
  { id: 30, name: "Distance traveled since codes cleared", pid: "0x1E", description: "Measures distance traveled since codes cleared", frequency: "Medium" },
  { id: 31, name: "Catalyst temperature Bank 1 Sensor 1", pid: "0x1F", description: "Measures catalyst temperature for Bank 1 Sensor 1", frequency: "High" },
  { id: 32, name: "Catalyst temperature Bank 1 Sensor 2", pid: "0x20", description: "Measures catalyst temperature for Bank 1 Sensor 2", frequency: "High" },
  { id: 33, name: "Control module voltage", pid: "0x21", description: "Measures control module voltage", frequency: "Medium" },
  { id: 34, name: "Absolute load value", pid: "0x22", description: "Measures absolute load value", frequency: "High" },
  { id: 35, name: "Fuel/Air commanded equivalence ratio", pid: "0x23", description: "Measures fuel/air commanded equivalence ratio", frequency: "High" },
  { id: 36, name: "Relative throttle position", pid: "0x24", description: "Measures relative throttle position", frequency: "High" },
  { id: 37, name: "Ambient air temperature", pid: "0x25", description: "Measures ambient air temperature", frequency: "Medium" },
  { id: 38, name: "Absolute pedal position E", pid: "0x26", description: "Measures absolute pedal position E", frequency: "High" },
  { id: 39, name: "Commanded throttle actuator", pid: "0x27", description: "Measures commanded throttle actuator", frequency: "High" },
  { id: 40, name: "Long term secondary oxygen sensor trim Bank 1", pid: "0x28", description: "Measures long term secondary oxygen sensor trim for Bank 1", frequency: "High" },
  { id: 41, name: "Fuel used", pid: "0x29", description: "Measures fuel used", frequency: "Medium" },
  { id: 42, name: "Fuel used (total)", pid: "0x2A", description: "Measures total fuel used", frequency: "Medium" },
  { id: 43, name: "Fuel used price", pid: "0x2B", description: "Measures fuel used price", frequency: "Medium" },
  { id: 44, name: "Fuel used price (total)", pid: "0x2C", description: "Measures total fuel used price", frequency: "Medium" },
  { id: 45, name: "Distance travelled", pid: "0x2D", description: "Measures distance travelled", frequency: "Medium" },
  { id: 46, name: "Distance travelled (total)", pid: "0x2E", description: "Measures total distance travelled", frequency: "Medium" },
  { id: 47, name: "Average speed", pid: "0x2F", description: "Measures average speed", frequency: "Medium" },
  { id: 48, name: "Calculated instant fuel consumption", pid: "0x30", description: "Calculates instant fuel consumption", frequency: "High" },
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