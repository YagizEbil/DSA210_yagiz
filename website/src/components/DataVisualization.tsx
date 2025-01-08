import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { time: '00:00', speed: 30, rpm: 1500, temp: 180 },
  { time: '00:01', speed: 35, rpm: 1600, temp: 182 },
  { time: '00:02', speed: 40, rpm: 1700, temp: 183 },
  { time: '00:03', speed: 38, rpm: 1650, temp: 181 },
  { time: '00:04', speed: 42, rpm: 1800, temp: 184 },
];

const DataVisualization = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-roboto font-bold text-3xl md:text-4xl text-center mb-12">
          Data Insights
        </h2>
        
        <div className="h-[400px] w-full bg-white rounded-lg shadow-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="speed" 
                stroke="#1E90FF" 
                name="Speed (MPH)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="rpm" 
                stroke="#32CD32" 
                name="RPM"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#B0C4DE" 
                name="Temperature (°F)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;