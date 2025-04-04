import React, { useState, useRef } from "react";
import Picker from "./components/Picker";
import Canvas from "./components/Canvas";

const App = () => {
  const [components, setComponents] = useState([]);
  const fileInputRef = useRef();
  const [previewMode, setPreviewMode] = useState(false);

  const handleDrop = (type) => {
    setComponents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type, settings: {} },
    ]);
  };
  const handleSaveJSON = () => {
    const fileData = JSON.stringify(components, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "layout.json";
    link.href = url;
    link.click();
  };

  const handleComponentUpdate = (updatedList) => {
    setComponents(updatedList);
  };

  const handleLoadJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const result = event.target.result;
        console.log("Loaded file content:", result); // ✅ Now placed correctly

        if (!result) {
          alert("File read error: result is empty");
          return;
        }

        const loadedData = JSON.parse(result);
        if (Array.isArray(loadedData)) {
          setComponents(loadedData);
        } else {
          alert("Invalid JSON format");
        }
      } catch (err) {
        console.error("Error loading JSON:", err);
        alert("Could not parse JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left Panel */}
      <div style={sidebarStyle}>
        <h3 className="py-16" style={{ color: "#fff", padding: "10px" }}>
          Components
        </h3>
        <Picker />
      </div>

      {/* Right Panel */}
      <div  style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Canvas</h2>
          <div>
            <button
              style={previewBtn}
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? "Edit Mode" : "Preview"}
            </button>
            <button style={saveBtn} onClick={handleSaveJSON}>
              Save JSON
            </button>
            <input
              type="file"
              accept=".json"
              onChange={handleLoadJSON}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <button
              style={loadBtn}
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              Load JSON
            </button>
          </div>
        </div>
        <Canvas
          components={components}
          onDropComponent={handleDrop}
          onUpdateComponents={handleComponentUpdate}
          previewMode={previewMode}
        />
      </div>
    </div>
  );
};
const loadBtn = {
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "4px",
  marginLeft: "10px",
};

const sidebarStyle = {
  width: "220px",
  backgroundColor: "#495057",
  padding: "10px",
};

const previewBtn = {
  backgroundColor: "#ffc107",
  border: "none",
  padding: "8px 15px",
  marginRight: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "4px",
};

const saveBtn = {
  backgroundColor: "#198754",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "4px",
};

export default App;
