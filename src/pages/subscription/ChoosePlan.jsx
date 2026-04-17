import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function ChoosePlan() {

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/subscriptions/plans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const renew = async (planId) => {
    try {

      await api.post("/subscriptions/renew", {
        plan_id: planId
      });

      alert("Subscription renewed successfully");

      window.location.href = "/dentist";

    } catch (err) {
      alert("Renew failed");
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6">
        Choose Subscription Plan
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {plans.map(plan => (

          <div
            key={plan.id}
            className="bg-white shadow rounded-xl p-6"
          >

            <h3 className="text-xl font-semibold mb-2">
              {plan.name}
            </h3>

            <p>Price: ₹ {plan.price}</p>

            <p>Orders: {plan.order_limit}</p>

            <p>Duration: {plan.duration_days} days</p>

            <button
              onClick={() => renew(plan.id)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Select Plan
            </button>

          </div>

        ))}

      </div>

    </SidebarLayout>
  );
}

export default ChoosePlan;