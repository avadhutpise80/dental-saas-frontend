import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    fetchOrder();
    fetchMessages();
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

  const fetchMessages = async () => {
    try {

      const res = await api.get(`/orders/${id}/messages`);
      setMessages(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {

    if (!messageText) return;

    try {

      await api.post(`/orders/${id}/message`, {
        message: messageText
      });

      setMessageText("");
      fetchMessages();

    } catch (err) {
      console.error(err);
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

        {/* ORDER INFO */}

        <div className="bg-white shadow rounded-xl p-6 space-y-3">

          <p>
            <strong>Patient:</strong> {order.patient_name}
          </p>

          <p>
            <strong>Lab:</strong> {order.lab_name}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Total:</strong> ₹ {order.total_amount}
          </p>

          <hr />

          <h3 className="font-semibold mt-4">
            Teeth & Material
          </h3>

          {items.map((item, index) => (
            <div
              key={index}
              className="border p-3 rounded mt-2"
            >
              Tooth: {item.tooth_number}
              <br />
              Material: {item.material_name}
            </div>
          ))}

        </div>

        {/* CHAT */}

        <div className="bg-white shadow rounded-xl p-6 flex flex-col">

          <h3 className="font-semibold mb-3">
            Order Chat
          </h3>

          <div className="flex-1 overflow-y-auto space-y-2 mb-3">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className="bg-gray-100 p-2 rounded"
              >
                <strong>{msg.sender}</strong>
                <p className="text-sm">{msg.message}</p>
              </div>

            ))}

          </div>

          <div className="flex gap-2">

            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Type message..."
            />

            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 rounded"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </SidebarLayout>
  );
}

export default OrderDetails;