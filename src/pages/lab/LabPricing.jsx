import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function LabPricing() {
  const [materials, setMaterials] = useState([]);
  const [prices, setPrices] = useState({});
  const [myPrices, setMyPrices] = useState([]);

  useEffect(() => {
    fetchMaterials();
    fetchMyPrices();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyPrices = async () => {
    try {
      const res = await api.get("/materials/my-prices");
      setMyPrices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePriceChange = (materialId, value) => {
    setPrices({ ...prices, [materialId]: value });
  };

  const savePrice = async (materialId) => {
    try {
      await api.post("/materials/price", {
        material_id: materialId,
        price: prices[materialId],
      });

      alert("Price saved successfully");
      fetchMyPrices();
    } catch (err) {
      console.error(err);
      alert("Failed to save price");
    }
  };

  return (
    <SidebarLayout>
      <h2 className="text-2xl font-bold mb-6">Material Pricing</h2>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        {materials.map((material) => (
          <div
            key={material.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h3 className="font-semibold">{material.name}</h3>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="Enter price"
                className="border p-2 rounded w-32"
                value={prices[material.id] || ""}
                onChange={(e) =>
                  handlePriceChange(material.id, e.target.value)
                }
              />

              <button
                onClick={() => savePrice(material.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Existing Prices */}
      <div className="mt-8 bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">My Current Prices</h3>

        {myPrices.length === 0 && (
          <p className="text-gray-400">No prices set yet</p>
        )}

        {myPrices.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span className="font-semibold text-green-600">
              ₹ {item.price}
            </span>
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}

export default LabPricing;