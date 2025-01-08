import { Download } from 'lucide-react';

const Dataset = () => {
  const sampleData = [
    { seconds: 0, pid: "0x0C", value: 1500, units: "RPM", latitude: 40.7128, longitude: -74.0060 },
    { seconds: 1, pid: "0x0D", value: 35, units: "MPH", latitude: 40.7128, longitude: -74.0061 },
    { seconds: 2, pid: "0x0F", value: 180, units: "°F", latitude: 40.7129, longitude: -74.0062 },
  ];

  return (
    <section id="dataset" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-roboto font-bold text-3xl md:text-4xl text-center mb-12">
          Dataset Overview
        </h2>
        
        <div className="mb-8 text-center">
          <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            <Download size={20} />
            Download Dataset
          </button>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seconds</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.seconds}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.pid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.units}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.latitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dataset;