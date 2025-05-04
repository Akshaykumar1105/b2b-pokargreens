import { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingBag, FaTruck, FaCheck, FaChevronLeft, FaChevronRight, FaInfoCircle } from "react-icons/fa";
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
          onClick={() => window.location.reload()}
          className="text-red-600 underline hover:text-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 max-w-4xl mx-auto">
      <Header />
      <h2 className="text-2xl mt-16 font-bold text-gray-800 ">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <FaBoxOpen className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {currentOrders.map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FaInfoCircle className="text-green-600" />
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {order.products && order.products.length > 0 ? (
                    order.products.map((product, idx) => {
                      // Calculate total weight for the product
                     

                      return (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500">Category: {product.category.name}</p>
                          </div>
                          <div className="text-sm text-gray-700 font-medium">
                            Quantity: 1
                            <br />
                            Total Weight: {variant.weight} kg
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500 italic">No products found for this order</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-300`}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-300`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-300`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
