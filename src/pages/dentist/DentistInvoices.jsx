import { useEffect, useState } from "react";
import api from "../../api/api";
import SidebarLayout from "../../components/layout/SidebarLayout";

function DentistInvoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/orders/dentist/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/invoice/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_Order_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Invoice download failed");
    }
  };

  return (
    <SidebarLayout>
      <h2 className="text-2xl font-bold mb-6">My Invoices</h2>

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
              <tr key={invoice.id} className="border-t">
                <td className="p-4 font-semibold">INV-{invoice.id}</td>
                <td className="p-4">#{invoice.order_id}</td>
                <td className="p-4">₹ {invoice.total_amount}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {invoice.status}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => downloadInvoice(invoice.order_id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
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

export default DentistInvoices;