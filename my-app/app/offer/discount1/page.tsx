"use client";

import OfferPageContent from "@/components/offer/offer-page-content";

export default function Discount1Page() {
  return (
    <OfferPageContent
      discountPercent={55}
      nextDiscountUrl="/offer/discount2"
    />
  );
}
