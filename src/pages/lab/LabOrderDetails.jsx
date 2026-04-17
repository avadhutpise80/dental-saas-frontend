import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function LabOrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const [deliveryDate, setDeliveryDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {

      const res = await api.get(`/orders/${id}/details`);

      setOrder(res.data.order);
      setItems(res.data.items);

    } catch (err) {
      console.error(err);
    }
  };

  const updateDelivery = async () => {
    try {

      await api.put(`/orders/${id}/delivery`, {
        new_delivery_date: deliveryDate,
        delay_reason: reason
      });

      alert("Delivery updated");

      fetchOrder();

    } catch (err) {
      alert("Failed to update delivery");
    }
  };

  if (!order) {
    return (
      <SidebarLayout>
        <p className="p-6">Loading...</p>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6">
        Order #{order.id}
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* ORDER DETAILS */}

        <div className="bg-white shadow rounded-xl p-6">

          <p><strong>Patient:</strong> {order.patient_name}</p>
          <p><strong>Dentist:</strong> {order.dentist_name}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹ {order.total_amount}</p>

          <hr className="my-4"/>

          <h3 className="font-semibold mb-2">
            Teeth & Material
          </h3>

          {items.map((item, index) => (
            <div key={index} className="border p-3 rounded mb-2">

              Tooth: {item.tooth_number}
              <br/>

              Material: {item.material_name}

            </div>
          ))}

        </div>


        {/* DELIVERY UPDATE */}

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-lg font-semibold mb-4">
            Update Delivery
          </h3>

          <label className="block text-sm mb-1">
            New Delivery Date
          </label>

          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />

          <label className="block text-sm mb-1">
            Delay Reason
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain delay reason..."
            className="w-full border rounded p-2 mb-4"
          />

          <button
            onClick={updateDelivery}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update Delivery
          </button>

        </div>

      </div>

    </SidebarLayout>
  );
}

export default LabOrderDetails;