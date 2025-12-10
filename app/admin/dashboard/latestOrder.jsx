"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const orders = [
  {
    orderId: "ORD001",
    paymentId: "PAY78945",
    status: "Paid",
    items: 3,
    amount: 250,
  },
  {
    orderId: "ORD002",
    paymentId: "PAY98654",
    status: "Pending",
    items: 1,
    amount: 150,
  },
  {
    orderId: "ORD003",
    paymentId: "PAY45281",
    status: "Cancelled",
    items: 4,
    amount: 350,
  },
  
];

const StatusChip = ({ status }) => {
  const styles = {
    Paid: "text-green-600 bg-green-50",
    Pending: "text-amber-600 bg-amber-50",
    Cancelled: "text-red-600 bg-red-50",
  };

  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-md border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default function LatestOrder() {
  return (
    <div className="rounded-sm shadow-sm">

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="py-3 font-medium">Order ID</TableHead>
              <TableHead className="py-3 font-medium">Payment ID</TableHead>
              <TableHead className="py-3 font-medium">Status</TableHead>
              <TableHead className="py-3 font-medium text-center">
                Items
              </TableHead>
              <TableHead className="py-3 font-medium text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.orderId}
                className="hover:bg-muted/20 transition-colors"
              >
                <TableCell className="py-4 font-medium">
                  {order.orderId}
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {order.paymentId}
                </TableCell>
                <TableCell className="py-4">
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell className="py-4 text-center">
                  {order.items}
                </TableCell>
                <TableCell className="py-4 text-right font-semibold">
                  ₹{order.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
