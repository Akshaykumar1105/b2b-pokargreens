import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSummaryProps {
  items: { quantity: number }[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span>Total Quantity</span>
          <span>{totalQuantity}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;