"use client";

import { useRouter } from "next/navigation";
import { addToPrimium } from "@/actions/Add-To-Premium";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51Q7ict2KuUbUTlzLMHteOu2sk2z1Py0OWdpHpQnKB5dj2K5iWqxcZnBUQlTLW6TmX3j33kMv71QELQZzAXJjQrvx00J2LkY5Qg"
);

const plans = [
  {
    name: "Basic",
    price: 9.99,
    features: ["10 job postings", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: 19.99,
    features: [
      "Unlimited job postings",
      "Advanced analytics",
      "Priority support",
      "Featured listings",
    ],
  },
  {
    name: "Enterprise",
    price: 49.99,
    features: [
      "Custom solutions",
      "Dedicated account manager",
      "API access",
      "Branded job portal",
    ],
  },
];

export default function Pricing({ role, whichPlan }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useSelector((state) => state.user);
  const pathName = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function checkStatus() {
      if (pathName.get("status") === "success") {
        const getPlan = sessionStorage.getItem("currentPlan");
        sessionStorage.removeItem("currentPlan");
        const { status } = await addToPrimium(getPlan, user, role);
        if (status === "success") {
          router.push(`dashboard/${role}`);
        }
      }
    }
    checkStatus();
  }, [pathName, user, role, router]); // Added 'user', 'role', and 'router' dependencies

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    sessionStorage.setItem("currentPlan", plan.name);

    // Redirect the user to the appropriate Stripe Checkout link
    if (plan.name === "Basic") {
      window.location.href = process.env.NEXT_PUBLIC_STRIPE_BASIC_LINK;
    } else if (plan.name === "Pro") {
      window.location.href = process.env.NEXT_PUBLIC_STRIPE_PRO_LINK;
    } else if (plan.name === "Enterprise") {
      window.location.href = process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_LINK;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Try Premium</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#ffffff]">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  ${plan.price.toFixed(2)} / month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {whichPlan === plan.name ? (
                  <Button className="w-full bg-amber-500 text-white" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Upgrade
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {selectedPlan && (
        <Elements stripe={stripePromise}>
          {/* Here you would add your Stripe payment form component */}
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>
                  You&apos;ve selected the {selectedPlan.name} plan at $
                  {selectedPlan.price.toFixed(2)}/month
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add your Stripe Elements or Checkout form here */}
                <p className="text-gray-400">Stripe payment form goes here</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Pay Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Elements>
      )}
    </div>
  );
}
