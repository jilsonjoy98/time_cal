import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [entries, setEntries] = useState([
    { hours: 0, minutes: 0, days: 1, type: "add" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = field === "type" ? value : Number(value);
    setEntries(updated);
  };

  const addRow = () => {
    setEntries([...entries, { hours: 0, minutes: 0, days: 1, type: "add" }]);
  };

  const removeRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const getTotalMinutes = () => {
    return entries.reduce((total, item) => {
      const minutesPerDay = item.hours * 60 + item.minutes;
      const rowTotal = minutesPerDay * item.days;

      return item.type === "minus" ? total - rowTotal : total + rowTotal;
    }, 0);
  };

  const safeMinutes = Math.max(0, getTotalMinutes());
  const totalHours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  return (
    <>
      <Analytics />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Time Calculator
          </h1>

          <div className="grid grid-cols-5 gap-3 mb-3 font-medium">
            <p>Hours</p>
            <p>Minutes</p>
            <p>Days</p>
            <p>Type</p>
            <p></p>
          </div>

          {entries.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-3 items-center mb-3"
            >
              <input
                type="number"
                min={0}
                value={item.hours}
                onChange={(e) => handleChange(index, "hours", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                min={0}
                value={item.minutes}
                onChange={(e) => handleChange(index, "minutes", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                min={1}
                value={item.days}
                onChange={(e) => handleChange(index, "days", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />

              <select
                value={item.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                className="border rounded-lg px-2 py-2"
              >
                <option value="add">+</option>
                <option value="minus">−</option>
              </select>

              <button
                onClick={() => removeRow(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

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
    </>
  );
}

export default App;
