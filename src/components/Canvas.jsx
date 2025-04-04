import React, { useEffect, useState } from 'react';

const Canvas = ({ components, onDropComponent,onUpdateComponents, previewMode   }) => {
  const [editingComponent, setEditingComponent] = useState(null);
  const [allComponents, setAllComponents] = useState([]);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setAllComponents(components);
  }, [components]);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    const newComponent = {
      id: crypto.randomUUID(),
      type,
      settings: {},
    };
    const updated = [...allComponents, newComponent];
    setAllComponents(updated);
    onDropComponent(type);
    onUpdateComponents(updated); // Sync new drop as well

  };

  const allowDrop = (e) => e.preventDefault();

  const handleSave = (newSettings) => {
    const updated = allComponents.map((comp) =>
      comp.id === editingComponent.id
        ? { ...comp, settings: { ...newSettings } }
        : comp
    );
    setAllComponents(updated);
    setEditingComponent(null);
    onUpdateComponents(updated); // Sync back to App.jsx

    setEditForm({});
  };

  return (
    <div
    onDrop={previewMode ? undefined : handleDrop}
    onDragOver={previewMode ? undefined : allowDrop}
    
      style={{
        minHeight: '80vh',
        border: '2px dashed #aaa',
        padding: '20px',
        backgroundColor: '#fafafa',
      }}
    >
      {allComponents.length === 0 ? (
        <p>Drop components here</p>
      ) : (
        allComponents.map((comp) => (
          <div
            key={comp.id}
            style={{
              padding: '10px',
              margin: '10px 0',
              backgroundColor: comp.settings.color || '#e0e0e0',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {comp.type === 'header' && (
              <div>
                <h3 style={{ margin: 0 }}>Header</h3>
                {/* {comp.settings.logo && (
                  <img
                    src={comp.settings.logo}
                    alt="logo"
                    style={{ maxHeight: '40px', marginTop: '5px' }}
                  />
                )} */}
              </div>
            )}

            {comp.type === 'banner' && (
              <img
                src={comp.settings.image}
                alt="Banner"
                style={{
                  width: comp.settings.width || '100%',
                  height: comp.settings.height || '200px',
                  objectFit: 'cover',
                }}
              />
            )}

            {comp.type === 'footer' && (
              <div>
                <h4 style={{ margin: 0 }}>Footer © 2025</h4>
              </div>
            )}

{!previewMode && (
  <button
    onClick={() => {
      setEditingComponent(comp);
      setEditForm(comp.settings || {});
    }}
    style={{
      position: 'absolute',
      right: 10,
      top: 10,
      cursor: 'pointer',
      backgroundColor: '#000',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '6px',
    }}
  >
    ✏️ Edit
  </button>
)}

          </div>
        ))
      )}

      {/* Modal for editing */}
      {editingComponent && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Edit {editingComponent.type.toUpperCase()}</h3>

            {/* HEADER */}
            {editingComponent.type === 'header' && (
              <>
                <label>Background Color:</label>
                <input
                  type="color"
                  value={editForm.color || '#ffffff'}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                />
                <br />
                <label>Logo URL:</label>
                <input
                  type="text"
                  placeholder="https://your-logo.png"
                  value={editForm.logo || ''}
                  onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                />
              </>
            )}

            {/* BANNER */}
            {editingComponent.type === 'banner' && (
              <>
                <label>Image URL:</label>
                <input
                  type="text"
                  placeholder="https://your-banner.jpg"
                  value={editForm.image || ''}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
                <label>Width:</label>
                <input
                  type="text"
                  placeholder="e.g. 100%"
                  value={editForm.width || ''}
                  onChange={(e) => setEditForm({ ...editForm, width: e.target.value })}
                />
                <label>Height:</label>
                <input
                  type="text"
                  placeholder="e.g. 300px"
                  value={editForm.height || ''}
                  onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                />
              </>
            )}

            {/* FOOTER */}
            {editingComponent.type === 'footer' && (
              <>
                <label>Footer Color:</label>
                <input
                  type="color"
                  value={editForm.color || '#000000'}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                />
              </>
            )}

            <br />
            <button onClick={() => handleSave(editForm)}>Save</button>
            <button onClick={() => setEditingComponent(null)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalBox = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
};

export default Canvas;
