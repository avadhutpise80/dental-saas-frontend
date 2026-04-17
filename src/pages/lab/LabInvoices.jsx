import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/layout/SidebarLayout";

function LabInvoices() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/lab/invoices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvoices(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (orderId) => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/orders/${orderId}/invoice/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `invoice-${orderId}.pdf`);

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Lab Invoices
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">

            <tr>
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Download</th>
            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr key={invoice.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-semibold">
                  {invoice.invoice_number}
                </td>

                <td className="p-4">
                  #{invoice.order_id}
                </td>

                <td className="p-4">
                  ₹ {invoice.total_amount}
                </td>

                <td className="p-4">

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${invoice.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}>

                    {invoice.status}

                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => downloadInvoice(invoice.order_id)}
                    className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                  >
                    Download
                  </button>

                </td>

              </tr>

            ))}

            {invoices.length === 0 && (

              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No invoices found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </SidebarLayout>

  );

}

export default LabInvoices;