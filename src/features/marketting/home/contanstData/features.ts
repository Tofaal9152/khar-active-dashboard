import { Clock, Shield, Ticket } from "lucide-react";
import { FeatureItem } from "../components/FeaturesSection";
export const features: FeatureItem[] = [
  {
    icon: Clock,
    title: "Real time availability",
    description:
      "See live slot availability and book instantly without waiting.",
  },
  {
    icon: Shield,
    title: "Secure payment",
    description:
      "Your payment information is protected with bank-level security.",
  },
  {
    icon: Ticket,
    title: "Instant ticket",
    description:
      "Get your booking confirmation ticket immediately after payment.",
  },
];
