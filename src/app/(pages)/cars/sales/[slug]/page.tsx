import { getSaleCarBySlugAction } from "@/app/actions/get_sales_car";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SalesCarSingelePage({ params }: PageProps) {
  const { slug } = await params;

  const result = await getSaleCarBySlugAction(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const saleCar = result.data;

  return (
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis dolor
      eligendi laudantium esse consectetur, odio, minus inventore corrupti eos
      veniam deserunt culpa enim nostrum, est nisi assumenda dolores magni nam.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis dolor
      eligendi laudantium esse consectetur, odio, minus inventore corrupti eos
      veniam deserunt culpa enim nostrum, est nisi assumenda dolores magni nam.
      {JSON.stringify(saleCar)}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor atque
      obcaecati cupiditate error, sint perspiciatis, vero esse at harum,
      consectetur maxime soluta quibusdam explicabo facere? Repellat expedita
      praesentium ullam dicta!
    </div>
  );
}
