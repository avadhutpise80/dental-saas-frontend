import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SidebarLayout from "../../components/layout/SidebarLayout";

function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/orders/dentist`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const selectedOrder = res.data.find(o => o.id === parseInt(id));
      setOrder(selectedOrder);
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <SidebarLayout>Loading...</SidebarLayout>;

  const steps = ["PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "DELIVERED"];

  const currentIndex = steps.indexOf(order.status);

  return (
    <SidebarLayout>
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Order Tracking - #{order.id}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">

        {/* Timeline */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full ${
                index <= currentIndex ? "bg-green-500" : "bg-gray-300"
              }`} />
              <div className={`font-semibold ${
                index <= currentIndex ? "text-green-600" : "text-gray-400"
              }`}>
                {step.replace("_", " ")}
              </div>
            </div>
          ))}

          {order.status === "CANCELLED" && (
            <div className="text-red-600 font-semibold">
              Order Cancelled on {order.cancelled_at?.slice(0,10)}
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <p><strong>Expected Delivery:</strong> {order.expected_delivery?.slice(0,10)}</p>

          {order.delivered_at && (
            <p className="text-green-600">
              <strong>Delivered On:</strong> {order.delivered_at.slice(0,10)}
            </p>
          )}

          {order.delay_reason && (
            <p className="text-red-500">
              <strong>Delay Reason:</strong> {order.delay_reason}
            </p>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default OrderTracking;