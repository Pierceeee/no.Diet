"use client";

import OfferLayout from "../offer/layout";
import OfferPageContent from "@/components/offer/offer-page-content";

export default function Offer2Page() {
  return (
    <OfferLayout>
      <OfferPageContent useOrderPagePricing />
    </OfferLayout>
  );
}
