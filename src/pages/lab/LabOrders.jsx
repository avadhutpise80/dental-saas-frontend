import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function LabOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/lab");
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {

      await api.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      fetchOrders();

    } catch (err) {
      alert("Status update failed");
    }
  };

  const statusButton = (order) => {

    switch (order.status) {

      case "PENDING":
        return (
          <button
            onClick={() => updateStatus(order.id, "ACCEPTED")}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Accept
          </button>
        );

      case "ACCEPTED":
        return (
          <button
            onClick={() => updateStatus(order.id, "IN_PROGRESS")}
            className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
          >
            Start Work
          </button>
        );

      case "IN_PROGRESS":
        return (
          <button
            onClick={() => updateStatus(order.id, "COMPLETED")}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Mark Completed
          </button>
        );

      case "COMPLETED":
        return (
          <button
            onClick={() => updateStatus(order.id, "DELIVERED")}
            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
          >
            Mark Delivered
          </button>
        );

      default:
        return null;
    }

  };

  return (

    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Lab Orders
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">

            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-semibold">
                  #{order.id}
                </td>

                <td className="p-4">
                  ₹ {order.total_amount}
                </td>

                <td className="p-4">
                  {order.status}
                </td>

                <td className="p-4 flex gap-2">

                  {/* VIEW ORDER */}

                  <Link
                    to={`/lab/orders/${order.id}`}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>

                  {/* STATUS BUTTON */}

                  {statusButton(order)}

                </td>

              </tr>

            ))}

            {orders.length === 0 && (

              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  No orders found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </SidebarLayout>

  );

}

export default LabOrders;