import { Link, useLocation, useNavigate } from "react-router-dom";

function SidebarLayout({ children }) {

  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-indigo-100 text-indigo-600 font-semibold"
      : "text-gray-600 hover:bg-gray-100";

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600">
              Dental SaaS
            </h2>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">

            {/* DENTIST MENU */}
            {role === "DENTIST" && (
              <>
                <Link
                  to="/dentist"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/dentist")}`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/dentist/patients"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/dentist/patients")}`}
                >
                  Patients
                </Link>

                <Link
                  to="/dentist/create"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/dentist/create")}`}
                >
                  Create Order
                </Link>

                <Link
                  to="/dentist/orders"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/dentist/orders")}`}
                >
                  Orders
                </Link>

                <Link
                  to="/dentist/invoices"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/dentist/invoices")}`}
                >
                  Invoices
                </Link>
              </>
            )}

            {/* LAB MENU */}
            {role === "LAB" && (
              <>
                <Link
                  to="/lab"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/lab")}`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/lab/orders"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/lab/orders")}`}
                >
                  Orders
                </Link>

                <Link
                  to="/lab/invoices"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/lab/invoices")}`}
                >
                  Invoices
                </Link>

                <Link
                  to="/lab/pricing"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/lab/pricing")}`}
                >
                  Material Pricing
                </Link>
              </>
            )}

            {/* ADMIN MENU */}
            {role === "ADMIN" && (
              <>
                <Link
                  to="/admin"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/admin")}`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/users"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/admin/users")}`}
                >
                  Users
                </Link>

                <Link
                  to="/admin/subscriptions"
                  className={`block px-4 py-2 rounded-lg transition ${activeClass("/admin/subscriptions")}`}
                >
                  Subscriptions
                </Link>
              </>
            )}

          </nav>

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-700">
            {role} Panel
          </h1>

          <div className="text-sm text-gray-500">
            Welcome Back 👋
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default SidebarLayout;