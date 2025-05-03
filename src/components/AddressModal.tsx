import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
  initialData?: any;
}

const AddressModal = ({ isOpen, onClose, onSave, initialData }: AddressModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({ name: "", street: "", city: "", state: "", zip: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Address" : "Add Address"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <Input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <Input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} />
          <Button onClick={handleSubmit} className="w-full">{initialData ? "Update" : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
