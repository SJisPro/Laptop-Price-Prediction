import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    Company: "Dell",
    TypeName: "Ultrabook",
    Inches: "15.6",
    Ram: "8",
    Memory: "512",
    Weight: "2.5",
    Cpu_brand: "Intel",
    Gpu_brand: "Intel",
    OpSys: "Windows 10",
  });

  const [options, setOptions] = useState({});
  const [price, setPrice] = useState(null);

  useEffect(() => {
    axios
      .get("http://backend-service.team-app2.svc.cluster.local:8000/options")
      .then((res) => setOptions(res.data))
      .catch((err) => console.error("Failed to fetch options:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://backend-service.team-app2.svc.cluster.local:8000/predict",
        form
      );
      setPrice(res.data.predicted_price);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const numericFields = {
    Inches: { min: 10, max: 20 },
    Ram: { min: 2, max: 64 },
    Memory: { min: 128, max: 4000 },
    Weight: { min: 0.5, max: 5 },
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h1 className="form-title">Laptop Price Predictor</h1>
        {Object.keys(form).map((field) => (
          <div key={field} className="form-group">
            <label className="form-label">{field.replace("_", " ")}:</label>

            {["Ram", "Memory"].includes(field) && options[field] ? (
              <div className="toggle-group">
                {options[field].map((option) => (
                  <button
                    type="button"
                    key={option}
                    name={field}
                    className={`toggle-button ${
                      String(form[field]) === String(option) ? "active" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: field, value: option },
                      })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : options[field] ? (
              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select {field}</option>
                {options[field].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field}
                type="number"
                value={form[field]}
                min={numericFields[field]?.min}
                max={numericFields[field]?.max}
                onChange={handleChange}
                className="form-input"
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Predict
        </button>
        {price !== null && (
          <p className="result">
            {" "}
            Predicted Price: ₹
            {Number(price).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
