"use client";

import OfferPageContent from "@/components/offer/offer-page-content";

export default function Discount2Page() {
  return (
    <OfferPageContent
      discountPercent={60}
      nextDiscountUrl="/offer/discount3"
    />
  );
}
