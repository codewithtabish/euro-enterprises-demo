import { getAllSaleCarsAction } from "@/app/actions/get_sales_car";
import { SalesCarList } from "@/components/general/sales/sales-car-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cars for Sale",
  description: "Premium vehicles for sale.",
};

export default async function CarSalesPage() {
  const result = await getAllSaleCarsAction();
  return (
    <main className="min-h-screen bg-background">
      <SalesCarList result={result} />
    </main>
  );
}
