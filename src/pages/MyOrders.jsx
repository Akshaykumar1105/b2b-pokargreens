import { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingBag, FaTruck, FaCheck, FaChevronLeft, FaChevronRight, FaInfoCircle, FaCalendarAlt, FaBox } from "react-icons/fa";
import axios from "axios";
import Header from "../components/Header";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://businessapi.pokargreens.com/api/v1/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return <FaShoppingBag />;
      case "shipped": return <FaTruck />;
      case "delivered": return <FaCheck />;
      default: return <FaBoxOpen />;
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleErrorRetry = () => {
    setError(null);
    setLoading(true);
    // Retry fetching the orders
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        <div className="text-red-600 text-lg mb-2">⚠️ {error}</div>
        <button
          onClick={handleErrorRetry}
          className="text-red-600 underline hover:text-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />  <div className="min-h-screen bg-gray-50">

        <div className="container mt-16 mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-8 mt-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
              <p className="text-gray-600 mt-2">Track and manage your orders</p>
            </div>
            <button
              onClick={() => window.location.href = '/products'}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaBox className="text-lg" />
              Shop More
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200 shadow-sm">
              <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Orders Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Your order history is empty. Start shopping to see your orders here!</p>
              <button
                onClick={() => window.location.href = '/products'}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2 text-lg"
              >
                <FaBox />
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentOrders.map((order) => (
                  <div key={order.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                          <FaInfoCircle className="text-green-600" />
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-500 flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {order.products && order.products.length > 0 ? (
                        order.products.map((product, idx) => {
                          const totalWeight = Array.isArray(product.variants)
                            ? product.variants.reduce((acc, variant) => acc + (parseFloat(variant.weight) * parseInt(variant.quantity)), 0)
                            : (product.variants ? parseFloat(product.variants.weight) * parseInt(product.variants.quantity) : 0);

                          return (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                              <div className="flex-grow">
                                <p className="font-semibold text-gray-800 mb-1">{product.name}</p>
                                <p className="text-sm text-gray-600">Category: {product.category?.name || "Unknown"}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">Quantity: 1</p>
                                <p className="text-sm font-medium text-green-600">Total Weight: {totalWeight} kg</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500 italic text-center py-4">No products found for this order</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-white px-6 py-4 mt-8 rounded-lg shadow-sm">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                >
                  <FaChevronLeft className="text-xs" /> Previous
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === index + 1
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                >
                  Next <FaChevronRight className="text-xs" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>

  );
};

export default MyOrders;
