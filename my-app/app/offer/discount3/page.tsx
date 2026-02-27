"use client";

import OfferPageContent from "@/components/offer/offer-page-content";

export default function Discount3Page() {
  return (
    <OfferPageContent
      discountPercent={65}
      nextDiscountUrl="/offer/nonbuyers"
    />
  );
}
