import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/layout/SidebarLayout";

function DentistOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/dentist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  /* CANCEL ORDER */

  const cancelOrder = async (orderId) => {

    if (!window.confirm("Cancel this order?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "CANCELLED" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();

    } catch (err) {
      alert("Failed to cancel order");
    }

  };

  /* STATUS BADGE */

  const statusBadge = (status) => {

    const base = "px-3 py-1 rounded-full text-xs font-semibold ";

    const styles = {
      PENDING: "bg-yellow-100 text-yellow-700",
      ACCEPTED: "bg-blue-100 text-blue-700",
      IN_PROGRESS: "bg-purple-100 text-purple-700",
      COMPLETED: "bg-green-100 text-green-700",
      DELIVERED: "bg-green-200 text-green-800",
      CANCELLED: "bg-red-100 text-red-700",
    };

    return base + (styles[status] || "bg-gray-100 text-gray-600");

  };

  return (

    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        My Orders
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">

            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Lab</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Delivery</th>
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
                  {order.patient_name || "-"}
                </td>

                <td className="p-4">
                  {order.lab_name || "-"}
                </td>

                <td className="p-4">
                  ₹ {order.total_amount}
                </td>

                <td className="p-4">
                  <span className={statusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  {order.expected_delivery
                    ? order.expected_delivery.slice(0,10)
                    : "-"}
                </td>

                <td className="p-4 flex gap-2">

                  <Link
                    to={`/dentist/orders/${order.id}/details`}
                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>

                  {order.status === "PENDING" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  )}

                </td>

              </tr>

            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-400">
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

export default DentistOrders;