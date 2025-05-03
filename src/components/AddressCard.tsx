import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressCard = ({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) => {
  return (
    <Card
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selected ? "border-green-500 bg-green-50" : "hover:border-green-300"
      }`}
      onClick={onSelect}
    >
      <CardContent className="space-y-2">
        <div className="font-semibold">{address.name}</div>
        <div>{address.street}</div>
        <div>{address.city}, {address.state} {address.zip}</div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</Button>
          <Button variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
