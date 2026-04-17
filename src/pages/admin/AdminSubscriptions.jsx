import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function AdminSubscriptions() {

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get("/subscriptions/all");
      setSubscriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        All Subscriptions
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Start</th>
              <th className="p-4">End</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>

            {subscriptions.map((s) => (

              <tr key={s.id} className="border-t">

                <td className="p-4">
                  {s.user_name}
                </td>

                <td className="p-4">
                  {s.plan_name}
                </td>

                <td className="p-4">
                  {new Date(s.start_date).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(s.end_date).toLocaleDateString()}
                </td>

                <td className="p-4">

                  {s.status === "ACTIVE" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      EXPIRED
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </SidebarLayout>
  );
}

export default AdminSubscriptions;