import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import AreaBtn from "../components/AreaBtn";
import { FaSort, FaFilter, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const BeatPlanning = () => {
  const {
    showCreateArea,
    setShowCreateArea,
    showCreateBeat,
    setShowCreateBeat,
    searchTerm,
  } = useOutletContext();

  

  const [areas, setAreas] = useState([
    { id: 1, name: "Kahanpara" },
    { id: 2, name: "Chandmari" },
  ]);

  const [beats, setBeats] = useState ([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [beatName, setBeatName] = useState("");
  const [location, setLocation] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "beatName",
    direction: "asc",
  });

  const addArea = (areaName) => {
    setAreas([...areas, { id: Date.now(), name: areaName }]);
  };

  const handleAddBeat = (e) => {
    e.preventDefault();
    if (!selectedArea || !beatName) {
      alert("Please select an area and enter beat name");
      return;
    }
    setBeats([
      ...beats,
      {
        id: Date.now(),
        area: selectedArea,
        beatName,
        customer: "", 
        salesman: "",
        location,
      },
    ]);
    setBeatName("");
    setSelectedArea("");
    setLocation("");
    setShowCreateBeat(false);
  };

  const sortBeats = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }; 

  const updateBeat = (id, field, value) => {
    setBeats(
      beats.map((beat) =>
        beat.id === id ? { ...beat, [field]: value } : beat
      )
    );
  };

  const filteredBeats = useMemo(() => {
    return beats.filter((beat) => {
      const matchesArea = selectedArea ? beat.area === selectedArea : true;

      const searchLower = (searchTerm || "").toLowerCase();
      const matchesSearch =
        (beat.beatName || "").toLowerCase().includes(searchLower) ||
        (beat.area || "").toLowerCase().includes(searchLower) ||
        (beat.customer || "").toLowerCase().includes(searchLower) ||
        (beat.salesman || "").toLowerCase().includes(searchLower);

      return matchesArea && matchesSearch;
    });
  }, [beats, selectedArea, searchTerm]);

  const sortedBeats = useMemo(() => {
    return [...filteredBeats].sort((a, b) => {
      const valA = (a[sortConfig.key] || "").toLowerCase();
      const valB = (b[sortConfig.key] || "").toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredBeats, sortConfig]);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {(showCreateArea || showCreateBeat) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowCreateArea(false);
                setShowCreateBeat(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            {showCreateArea && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Create New Area
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const areaName = e.target.areaName.value.trim();
                    if (areaName) addArea(areaName);
                    setShowCreateArea(false);
                  }}
                >
                  <input
                    name="areaName"
                    placeholder="e.g. Downtown"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <AreaBtn label="Add Area" type="submit" />
                  </div>
                </form>
              </>
            )}

            {showCreateBeat && (
              <>
                <h2 className="text-xxl font-bold mb-4 text-gray-800">
                  Create New Beat
                </h2>
                <form className="space-y-4" onSubmit={handleAddBeat}>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select Area
                    </option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="Beat Route Name"
                    value={beatName}
                    onChange={(e) => setBeatName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                    required
                  />
                  <input
                    placeholder="Mark Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                  />
                  <div className="flex justify-end">
                    <AreaBtn label="Add Beat" type="submit" />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-gray-100">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-600">
            <FaFilter className="text-blue-500" />
            <span className="font-semibold text-sm">Filter by Area:</span>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="flex-1 md:w-56 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100 animate-pulse">
              Searching: {searchTerm}
            </span>
          )}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Beats: {sortedBeats.length}
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  { key: "area", label: "Area" },
                  { key: "beatName", label: "Beat Name" },
                  { key: "customer", label: "Retailer" },
                  { key: "salesman", label: "Salesman" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => sortBeats(key)}
                    className="px-6 py-4 text-xs font-bold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {label}
                      <FaSort className="text-gray-300" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedBeats.map((beat) => (
                <tr
                  key={beat.id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {beat.area}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {beat.beatName}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      placeholder="Not Assigned (Click here to assign)"
                      value={beat.customer}
                      onChange={(e) =>
                        updateBeat(beat.id, "customer", e.target.value)
                      }
                      className="w-full border-gray-200 rounded px-3 py-1 text-sm focus:border-blue-900 outline-none bg-transparent placeholder-blue-400"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      placeholder="Not Assigned"
                      value={beat.salesman}
                      onChange={(e) =>
                        updateBeat(beat.id, "salesman", e.target.value)
                      }
                      className="w-full border-gray-200 rounded px-3 py-1 text-sm focus:border-blue-900 outline-none bg-transparent placeholder-blue-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {sortedBeats.map((beat) => (
          <div
            key={beat.id}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start border-b border-gray-50 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-800">
                  {beat.beatName}
                </h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {beat.area}
                </span>
              </div>
              {beat.location && <FaMapMarkerAlt className="text-red-500" />}
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Assigned Retailer
                </label>
                <input
                  placeholder="Not Assigned"
                  value={beat.customer}
                  onChange={(e) =>
                    updateBeat(beat.id, "customer", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Assigned Salesman
                </label>
                <input
                  placeholder="Not Assigned"
                  value={beat.salesman}
                  onChange={(e) =>
                    updateBeat(beat.id, "salesman", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedBeats.length === 0 && (
        <div className="bg-white rounded-xl p-10 text-center border-2 border-dashed border-gray-200 mt-4">
          <p className="text-gray-500 font-medium italic">
            {searchTerm
              ? `No results found for "${searchTerm}"`
              : "No beats found for this area."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSelectedArea("")}
              className="mt-2 text-blue-600 text-sm font-semibold hover:underline"
            >
              Try clearing filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BeatPlanning;