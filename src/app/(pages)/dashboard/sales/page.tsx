import { Container } from "@/components/general/container";
import Link from "next/link";
import React from "react";

const SaleCarHomePageDashboard = () => {
  return (
    <div>
      <Container>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
        voluptatum tempora aliquam soluta id at voluptatibus nihil
        exercitationem repudiandae. Molestiae nisi error deserunt maiores
        suscipit adipisci veritatis repellat voluptates earum.
        <Link href={"/dashboard/sales/create"}>Create a sale car</Link>
      </Container>
    </div>
  );
};

export default SaleCarHomePageDashboard;
