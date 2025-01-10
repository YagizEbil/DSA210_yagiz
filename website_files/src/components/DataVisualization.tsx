import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { time: '2024-11-13 07-28-24', distance: 21 },
  { time: '2024-11-13 07-33-07', distance: 1 },
  { time: '2024-11-13 07-35-32', distance: 40 },
  { time: '2024-11-13 08-22-58', distance: 12 },
  { time: '2024-11-14 10-26-54', distance: 22 },
  { time: '2024-11-14 11-25-44', distance: 13 },
  { time: '2024-11-15 07-01-47', distance: 40 },
  { time: '2024-11-15 20-23-56', distance: 33 },
  { time: '2024-11-18 07-30-17', distance: 35 },
  { time: '2024-11-18 22-51-37', distance: 32 },
  { time: '2024-11-19 10-45-01', distance: 34 },
  { time: '2024-11-19 22-25-24', distance: 33 },
  { time: '2024-11-20 07-26-29', distance: 35 },
  { time: '2024-11-20 22-13-00', distance: 33 },
  { time: '2024-11-26 13-06-58', distance: 1 },
  { time: '2024-11-26 13-15-04', distance: 33 },
  { time: '2024-11-26 21-58-57', distance: 34 },
  { time: '2024-11-27 07-33-56', distance: 34 },
  { time: '2024-11-27 22-40-11', distance: 33 },
  { time: '2024-11-28 12-48-19', distance: 34 },
  { time: '2024-11-28 16-48-37', distance: 31 },
  { time: '2024-11-29 07-42-09', distance: 34 },
  { time: '2024-11-29 22-59-23', distance: 31 },
  { time: '2024-11-30 19-24-27', distance: 3 },
  { time: '2024-11-30 19-36-35', distance: 1 },
  { time: '2024-11-30 20-32-22', distance: 3 },
  { time: '2024-12-01 09-05-00', distance: 36 },
  { time: '2024-12-01 17-08-37', distance: 33 },
  { time: '2024-12-02 07-29-41', distance: 33 },
  { time: '2024-12-02 22-18-03', distance: 33 },
  { time: '2024-12-03 10-24-38', distance: 34 },
  { time: '2024-12-03 11-20-34', distance: 17 },
  { time: '2024-12-03 16-45-25', distance: 17 },
  { time: '2024-12-03 22-29-21', distance: 34 },
  { time: '2024-12-04 20-53-42', distance: 33 },
  { time: '2024-12-05 07-34-25', distance: 1 },
  { time: '2024-12-05 07-41-37', distance: 32 },
  { time: '2024-12-05 21-54-46', distance: 34 },
  { time: '2024-12-06 07-39-21', distance: 35 },
  { time: '2024-12-06 21-09-46', distance: 34 },
  { time: '2024-12-09 07-34-34', distance: 40 },
  { time: '2024-12-10 12-18-00', distance: 34 },
  { time: '2024-12-10 21-50-08', distance: 32 },
  { time: '2024-12-11 21-53-19', distance: 33 },
  { time: '2024-12-12 07-31-01', distance: 33 },
  { time: '2024-12-13 07-36-13', distance: 34 },
  { time: '2024-12-13 22-27-09', distance: 33 },
  { time: '2024-12-14 07-53-22', distance: 27 },
  { time: '2024-12-14 14-59-02', distance: 14 },
  { time: '2024-12-18 10-23-13', distance: 28 },
  { time: '2024-12-18 20-28-23', distance: 31 },
  { time: '2024-12-19 07-29-54', distance: 34 },
  { time: '2024-12-19 23-55-21', distance: 33 },
  { time: '2024-12-20 07-38-51', distance: 34 },
  { time: '2024-12-20 21-54-43', distance: 31 },
  { time: '2024-12-22 10-18-11', distance: 41 },
  { time: '2024-12-22 21-03-48', distance: 33 },
  { time: '2024-12-23 07-34-39', distance: 34 },
  { time: '2024-12-23 22-19-13', distance: 32 },
  { time: '2024-12-24 12-11-24', distance: 34 },
  { time: '2024-12-24 21-59-44', distance: 32 },
  { time: '2024-12-25 07-35-15', distance: 34 },
  { time: '2024-12-25 21-14-46', distance: 32 },
  { time: '2024-12-25 22-32-57', distance: 7 },
  { time: '2024-12-31 18-40-37', distance: 9 },
  { time: '2025-01-01 02-05-49', distance: 10 },
  { time: '2025-01-01 11-11-18', distance: 34 },
];

const DataVisualization = () => {
  const totalKm = 1865; // Replace this with the actual total km value
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalKm;
    if (start === end) return;

    let totalMilSecDur = 20000;
    let incrementTime = (totalMilSecDur / end) * 10;

    let timer = setInterval(() => {
      start += 10;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [totalKm]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-roboto font-bold text-3xl md:text-4xl text-center mb-12">
          With great data, comes great responsibility...
        </h2>
        <p className="text-center text-xl mb-4">Total KM driven: {count}</p>
        <div className="h-[400px] w-full bg-white rounded-lg shadow-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="distance" 
                stroke="#1E90FF" 
                name="Distance (km)"
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