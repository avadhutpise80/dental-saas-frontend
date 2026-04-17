import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function DentistDashboard() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    spent: 0
  });

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchSubscription();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/orders/dentist");

      const orders = res.data || [];

      const total = orders.length;
      const pending = orders.filter(o => o.status === "PENDING").length;
      const completed = orders.filter(o => o.status === "DELIVERED").length;

      const spent = orders.reduce(
        (sum, o) => sum + Number(o.total_amount || 0),
        0
      );

      setStats({
        total,
        pending,
        completed,
        spent
      });

    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubscription = async () => {
    try {
      const res = await api.get("/subscriptions/me");
      setSubscription(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Dentist Dashboard
      </h2>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold">{stats.total}</h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-orange-500">Pending Orders</p>
          <h3 className="text-2xl font-bold">{stats.pending}</h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-green-600">Completed Orders</p>
          <h3 className="text-2xl font-bold">{stats.completed}</h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-indigo-600">Total Spent</p>
          <h3 className="text-2xl font-bold">₹ {stats.spent}</h3>
        </div>

      </div>


      {/* SUBSCRIPTION */}

      {subscription ? (

        <div className="bg-white shadow rounded-xl p-6 w-96">

          <h3 className="text-lg font-semibold mb-3">
            Subscription
          </h3>

          <p>
            <strong>Plan:</strong> {subscription.plan_name}
          </p>

          <p>
            <strong>Monthly Limit:</strong> {subscription.order_limit}
          </p>

          <p>
            <strong>Orders Used:</strong> {subscription.orders_used || 0}
          </p>

          <p>
            <strong>Remaining:</strong>{" "}
            {(subscription.order_limit || 0) - (subscription.orders_used || 0)}
          </p>

          <p>
            <strong>Days Remaining:</strong> {subscription.remaining_days}
          </p>


          {/* Renew Button */}

          {(subscription.remaining_days === 0 ||
            subscription.orders_used >= subscription.order_limit) && (

            <button
              onClick={() => window.location.href="/plans"}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Renew Subscription
            </button>

          )}

        </div>

      ) : (

        <div className="bg-white shadow rounded-xl p-6 w-96 text-red-500">
          No active subscription found

          <button
            onClick={() => window.location.href="/plans"}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Choose Plan
          </button>

        </div>

      )}

    </SidebarLayout>
  );
}

export default DentistDashboard;