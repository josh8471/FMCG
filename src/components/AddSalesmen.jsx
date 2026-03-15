import { useState, useEffect } from "react";
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaMap, FaToggleOn } from "react-icons/fa";

const BEATS = [
  { id: 1, name: "Khanapara_Monday", area: "Khanapara" },

  { id: 2, name: "SixMile_Monday", area: "SixMile" },

  { id: 3, name: "Khanapara_Tuesday", area: "Khanapara" },

  { id: 4, name: "SixMile_Tuesday", area: "SixMile" },
];

const AREAS = [
  { id: 1, name: "Khanapara", defaultBeat: "Khanapara_Monday" },
  { id: 2, name: "SixMile", defaultBeat: "SixMile_Monday" },
];

const AddSalesman = ({ onAdd, onClose, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    beatName: "",
    areaName: "",
    status: "Active",
    photo: null,
    photoPreview: null
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.username || "",
        email: initialData.useremail || "",
        phone: initialData.phone || "",
        password: initialData.password || "",
        beatName: initialData.beatName || "",
        areaName: initialData.areaName || "",
        status: initialData.status || "Active",
        photo: initialData.photo || null,
        photoPreview: initialData.photoPreview || null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBeatChange = (e) => {
    const selectedBeat = e.target.value;
    const associatedArea = BEATS.find(b => b.name === selectedBeat)?.area || "";
    setForm(prev => ({
      ...prev,
      beatName: selectedBeat,
      areaName: associatedArea // Auto-select area
    }));
  };

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    const associatedBeat = AREAS.find(a => a.name === selectedArea)?.defaultBeat || "";
    setForm(prev => ({
      ...prev,
      areaName: selectedArea,
      beatName: associatedBeat // Auto-select beat
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          photo: file,
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Name, Email and Phone are required");
      return;
    }

    const salesmanData = {
      username: form.name,
      useremail: form.email,
      phone: form.phone,
      password: form.password, 
      beatName: form.beatName,
      areaName: form.areaName,
      status: form.status,
      photo: form.photo,
      photoPreview: form.photoPreview,
      createdAt: initialData?.createdAt || new Date().toLocaleString(),
      id: initialData?.id || Date.now()
    };
    
    onAdd(salesmanData);
  };

  return (
    <div>
      <div className="modal-header">
        <div className="modal-title">
          {initialData ? "Edit Details" : "New Associate"}
        </div>
        <div className="modal-close" onClick={onClose}>
          &times;
        </div>
      </div>

      <div className="modal-body">
        {/* Left Col: Avatar */}
        <div className="avatar-section">
          <label className="avatar-wrapper">
             {form.photoPreview ? (
                <img 
                  src={form.photoPreview} 
                  alt="Preview" 
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <FaUser size={48} className="text-gray-300" />
                </div>
              )}
              
              <div className="avatar-overlay">
                <FaCamera className="camera-icon" />
              </div>
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                hidden 
              />
          </label>
          <p className="upload-text">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        </div>

        {/* Right Col: Form */}
        <div className="form-section">
            
            <div className="input-group">
                <FaUser className="input-icon" />
                <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <FaPhone className="input-icon" />
                <input
                    type="text"
                    name="phone"
                    className="form-input"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <FaMapMarkerAlt className="input-icon" />
                <select
                    name="beatName"
                    className="form-input"
                    value={form.beatName}
                    onChange={handleBeatChange}
                >
                    <option value="">Select Beat</option>
                    {BEATS.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <FaMap className="input-icon" />
                <select
                    name="areaName"
                    className="form-input"
                    value={form.areaName}
                    onChange={handleAreaChange}
                >
                    <option value="">Select Area</option>
                    {AREAS.map(a => (
                        <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="input-group">
                <FaToggleOn className="input-icon" />
                <select
                    name="status"
                    className="form-input"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Retired">Retired</option>
                </select>
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder={initialData ? "New Password (Optional)" : "Password"}
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

             <div className="btn-row">
                <button className="btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <button className="btn-primary" onClick={handleSave}>
                    {initialData ? "Save Changes" : "Create Salesman"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesman;
