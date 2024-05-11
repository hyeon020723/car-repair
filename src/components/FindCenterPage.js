import React, { useState } from "react";

function FindCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy data for repair centers
  const repairCenters = [
    { name: "Hyundai Motor Studio", address: "123, Main Street, Busan" },
    { name: "Kia Service Center", address: "456, Second Street, Busan" },
    { name: "Auto Repair Co.", address: "789, Third Avenue, Busan" },
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCenters(
        repairCenters.filter((center) => center.address.includes(searchTerm))
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="find-center-container">
      <h1>Find a Repair Center</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {centers.map((center, index) => (
          <li key={index}>
            <strong>{center.name}</strong>
            <p>{center.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FindCenterPage;
