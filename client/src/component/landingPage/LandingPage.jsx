import React, { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Features } from "./Features";
import { Process } from "./Process";
import { WhyChoose } from "./WhyChoose";
import { VehicleShowcase } from "./VehicleShowcase";
import { Goals } from "./Goals";
import { Fotter } from "./Fotter";

export function LandingPage() {
  return (
    <>
      <Navigation />
      <Features />
      <Process />
      <WhyChoose />
      <VehicleShowcase />
      <Goals />
      <Fotter />
    </>
  );
}
