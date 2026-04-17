import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {

      const res = await api.get("/orders/admin/summary");

      setStats({
        users: res.data.total_users,
        orders: res.data.total_orders,
        revenue: res.data.total_revenue
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {/* USERS */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">
            Total Users
          </p>

          <h3 className="text-2xl font-bold">
            {stats.users}
          </h3>
        </div>


        {/* ORDERS */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">
            Total Orders
          </p>

          <h3 className="text-2xl font-bold">
            {stats.orders}
          </h3>
        </div>


        {/* REVENUE */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">
            Total Revenue
          </p>

          <h3 className="text-2xl font-bold">
            ₹ {stats.revenue}
          </h3>
        </div>

      </div>

    </SidebarLayout>
  );
}

export default AdminDashboard;