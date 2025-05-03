import AddressCard from "@/components/AddressCard";
import AddressModal from "@/components/AddressModal";
import Header from "@/components/Header";
import OrderSummary from "@/components/OrderSummary";
import { useState } from "react";

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddressId === id) setSelectedAddressId(null);
  };

  const handleSave = (address) => {
    if (editingAddress) {
      setAddresses((prev) => prev.map((a) => a.id === address.id ? address : a));
    } else {
      setAddresses((prev) => [...prev, { ...address, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto px-8 custom-padding">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <button onClick={handleAdd} className="text-green-600 underline">+ Add New Address</button>
          </div>
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              selected={selectedAddressId === addr.id}
              onSelect={() => setSelectedAddressId(addr.id)}
              onEdit={() => handleEdit(addr)}
              onDelete={() => handleDelete(addr.id)}
            />
          ))}
        </div>
        <OrderSummary items={[{ quantity: addresses.length }]} />
      </div>
      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={editingAddress}
      />
    </div>
    </>
  );
};

export default CheckoutPage;
