const baseURL = 'http://localhost:9000/api/presets/';

const PresetService =  {
  getPresets() {
    return fetch(baseURL)
      .then(res => res.json());
  },

  addPreset(preset) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(preset),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  updatePreset(preset) {
    return fetch(baseURL + preset._id, {
      method: 'PUT',
      body: JSON.stringify(preset),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  deletePreset(id) {
    return fetch(baseURL + id, {
      method: 'DELETE'
    });
  }
};

export default PresetService;