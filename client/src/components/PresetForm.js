import React, { useState, useEffect } from 'react';
import PresetService from '../services/PresetsService';

const PresetForm = ({ presets, setPresets, bpm, grid, onPresetSelect, onDeleteClear }) => {
  const [presetForm, setPresetForm] = useState({
    "name": '',
    "bpm": bpm
  })

  const [selectedPreset, setSelectedPreset] = useState(null)

  useEffect(() => {
    if(selectedPreset) {
      const copiedGrid = JSON.parse(JSON.stringify(selectedPreset.grid));
      setPresetForm({
        name: selectedPreset.name,
        grid: copiedGrid,
        bpm: selectedPreset.bpm
      })
    }
  }, [selectedPreset])

  const handlePresetSubmit = (event) => {
    event.preventDefault()
    const { name, bpm } = presetForm

    PresetService.addPreset({ name, grid, bpm })
      .then((response) => {
        setPresets([...presets, {...grid, _id:response._id}])
        setPresetForm({
          "name": '',
          "bpm": bpm
        })
        setSelectedPreset(null)
      })
      .catch((error) => {
        console.error('Error saving preset:', error)
      })
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setPresetForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleDeletePreset = (presetId) => {
    PresetService.deletePreset(presetId)
      .then(() => {
        setPresets(presets.filter((preset) => preset._id !== presetId));
      })
      .catch((error) => {
        console.error('Error deleting preset:', error);
      });
      onDeleteClear(grid)

  };

  const handlePresetSelect = (event) => {
    const presetId = event.target.value;
    const selectedPreset = presets.find((preset) => preset._id === presetId);
    setSelectedPreset(selectedPreset);
    onPresetSelect(selectedPreset.grid, selectedPreset.bpm);
  };

  return (
    <form onSubmit={handlePresetSubmit}>
      <div>
        <label>
          New Preset Name:
          <input
            type="text"
            name="name"
            value={presetForm.name}
            onChange={handleFormChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Save Preset</button>
      </div>
      <div>
        <label>Select a saved preset:</label>
        <select onChange={handlePresetSelect}>
          <option value="">Select a preset</option>
          {presets.map((preset) => (
            <option key={preset._id} value={preset._id}>
              {preset.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => handleDeletePreset(selectedPreset._id)}
          disabled={!selectedPreset}
        >
          Delete Preset
        </button>
      </div>
      {selectedPreset && (
        <div>
          <p>Name: {selectedPreset.name}</p>
        </div>
      )}
    </form>
  )
}

export default PresetForm;
