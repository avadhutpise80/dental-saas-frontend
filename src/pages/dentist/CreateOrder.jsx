import { useState, useEffect } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function CreateOrder() {

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const [materials, setMaterials] = useState([]);
  const [labsByMaterial, setLabsByMaterial] = useState([]);

  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [labId, setLabId] = useState("");
  const [materialId, setMaterialId] = useState("");

  const [note, setNote] = useState("");

  useEffect(() => {
    fetchPatients();
    fetchMaterials();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data || []);
    } catch (err) {
      console.error("Patients fetch error:", err);
      setPatients([]);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");
      setMaterials(res.data || []);
    } catch (err) {
      console.error("Materials fetch error:", err);
      setMaterials([]);
    }
  };

  const toggleTooth = (tooth) => {
    if (selectedTeeth.includes(tooth)) {
      setSelectedTeeth(selectedTeeth.filter((t) => t !== tooth));
    } else {
      setSelectedTeeth([...selectedTeeth, tooth]);
    }
  };

  const handleMaterialChange = async (material) => {

    setMaterialId(material);
    setLabId("");

    if (!material) {
      setLabsByMaterial([]);
      return;
    }

    try {

      const res = await api.get(`/materials/labs/${material}`);

      setLabsByMaterial(res.data || []);

    } catch (err) {

      console.error("Labs fetch error:", err);
      setLabsByMaterial([]);

    }
  };

  const createOrder = async () => {

    try {

      if (!selectedPatient) {
        alert("Please select patient");
        return;
      }

      if (!materialId) {
        alert("Please select material");
        return;
      }

      if (!labId) {
        alert("Please select lab");
        return;
      }

      if (selectedTeeth.length === 0) {
        alert("Please select teeth");
        return;
      }

      const items = selectedTeeth.map((tooth) => ({
        tooth_number: tooth,
        material_id: Number(materialId),
        quantity: 1,
      }));

      await api.post("/orders", {
        patient_id: Number(selectedPatient),
        lab_id: Number(labId),
        items: items,
      });

      alert("Order created successfully!");

      setSelectedPatient("");
      setSelectedTeeth([]);
      setMaterialId("");
      setLabId("");
      setNote("");
      setLabsByMaterial([]);

    } catch (err) {

      console.log(err.response?.data);
      alert(err.response?.data?.message || "Order failed");

    }

  };

  const ToothButton = ({ label, index }) => {
    return (
      <button
        type="button"
        onClick={() => toggleTooth(index)}
        className={`w-10 h-10 rounded-lg border font-semibold transition ${
          selectedTeeth.includes(index)
            ? "bg-green-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {label}
      </button>
    );
  };

  return (

    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6">
        Create New Order
      </h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* Patient */}
        <div>

          <h3 className="font-semibold mb-2">
            Patient
          </h3>

          <select
            className="border p-2 rounded w-full"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >

            <option value="">
              Select Patient
            </option>

            {patients.map((p) => (

              <option key={p.id} value={p.id}>
                {p.name} ({p.mobile})
              </option>

            ))}

          </select>

        </div>

        {/* Teeth */}
        {/* Teeth Selection */}
<div>
  <h3 className="font-semibold mb-4">Select Teeth</h3>

  {/* Upper Teeth */}
  <div className="flex justify-center gap-10 mb-4">

    {/* Upper Right */}
    <div className="flex gap-2">
      {[18,17,16,15,14,13,12,11].map((tooth) => (
        <button
          key={tooth}
          onClick={() => toggleTooth(tooth)}
          className={`w-12 h-12 rounded-lg border font-semibold ${
            selectedTeeth.includes(tooth)
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tooth}
        </button>
      ))}
    </div>

    {/* Upper Left */}
    <div className="flex gap-2">
      {[21,22,23,24,25,26,27,28].map((tooth) => (
        <button
          key={tooth}
          onClick={() => toggleTooth(tooth)}
          className={`w-12 h-12 rounded-lg border font-semibold ${
            selectedTeeth.includes(tooth)
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tooth}
        </button>
      ))}
    </div>

  </div>

  {/* Lower Teeth */}
  <div className="flex justify-center gap-10">

    {/* Lower Right */}
    <div className="flex gap-2">
      {[48,47,46,45,44,43,42,41].map((tooth) => (
        <button
          key={tooth}
          onClick={() => toggleTooth(tooth)}
          className={`w-12 h-12 rounded-lg border font-semibold ${
            selectedTeeth.includes(tooth)
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tooth}
        </button>
      ))}
    </div>

    {/* Lower Left */}
    <div className="flex gap-2">
      {[31,32,33,34,35,36,37,38].map((tooth) => (
        <button
          key={tooth}
          onClick={() => toggleTooth(tooth)}
          className={`w-12 h-12 rounded-lg border font-semibold ${
            selectedTeeth.includes(tooth)
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tooth}
        </button>
      ))}
    </div>

  </div>

</div>
        {/* Material */}
        <div>

          <h3 className="font-semibold mb-2">
            Material
          </h3>

          <select
            className="border p-2 rounded w-full"
            value={materialId}
            onChange={(e) => handleMaterialChange(e.target.value)}
          >

            <option value="">
              Select Material
            </option>

            {materials.map((m) => (

              <option key={m.id} value={m.id}>
                {m.name}
              </option>

            ))}

          </select>

        </div>

        {/* Labs with Prices */}

        {labsByMaterial.length > 0 && (

          <div>

            <h3 className="font-semibold mb-3">
              Available Labs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {labsByMaterial.map((lab) => (

                <div
                  key={lab.id}
                  onClick={() => setLabId(lab.id)}
                  className={`border rounded-lg p-4 cursor-pointer flex justify-between items-center transition
                    ${labId === lab.id ? "border-indigo-600 bg-indigo-50" : "hover:bg-gray-50"}
                  `}
                >

                  <div className="font-medium">
                    {lab.name}
                  </div>

                  <div className="text-green-600 font-semibold">
                    ₹ {lab.price}
                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Notes */}

        <textarea
          placeholder="Notes / Shade"
          className="border p-2 rounded w-full"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={createOrder}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Submit Order
        </button>

      </div>

    </SidebarLayout>

  );

}

export default CreateOrder;