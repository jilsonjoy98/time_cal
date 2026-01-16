import React, { useState } from "react";

function App() {
  const [entries, setEntries] = useState([{ hours: 0, minutes: 0, days: 1 }]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = Number(value);
    setEntries(updated);
  };

  const addRow = () => {
    setEntries([...entries, { hours: 0, minutes: 0, days: 1 }]);
  };

  const removeRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const getTotalMinutes = () => {
    return entries.reduce((total, item) => {
      const minutesPerDay = item.hours * 60 + item.minutes;
      return total + minutesPerDay * item.days;
    }, 0);
  };

  const totalMinutes = getTotalMinutes();
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Time Calculator
        </h1>

        <div className="space-y-4">
          {entries.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-3 items-center">
              <input
                type="number"
                placeholder="Hours"
                value={item.hours}
                onChange={(e) => handleChange(index, "hours", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                placeholder="Minutes"
                value={item.minutes}
                onChange={(e) => handleChange(index, "minutes", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                placeholder="Days"
                value={item.days}
                onChange={(e) => handleChange(index, "days", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <button
                onClick={() => removeRow(index)}
                className="text-red-500 font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addRow}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Time
        </button>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Time</h2>
          <p className="text-xl">
            {totalHours} hours {remainingMinutes} minutes
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
