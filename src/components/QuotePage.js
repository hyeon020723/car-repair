import React, { useState } from "react";

function QuotePage() {
  const [manufacturer, setManufacturer] = useState("");
  const [part, setPart] = useState("");
  const [cost, setCost] = useState(null);

  const handleQuote = () => {
    // Placeholder for quote calculation logic
    setCost(210000); // Dummy cost
  };

  return (
    <div className="quote-container">
      <h2>Get a Quote</h2>
      <select
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}>
        <option value="hyundai">Hyundai</option>
        <option value="kia">Kia</option>
      </select>
      <input
        type="text"
        placeholder="Part"
        value={part}
        onChange={(e) => setPart(e.target.value)}
      />
      <button onClick={handleQuote}>Calculate</button>
      {cost && <p>Estimated Cost: {cost} KRW</p>}
    </div>
  );
}

export default QuotePage;
