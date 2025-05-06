"use client";

import InteractiveBackground from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <InteractiveBackground isDarkMode = {false} />

      <div className="absolute z-10 text-center max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Create the Perfect Resume with{" "}
          <span className="text-primary">Craft My CV</span>
        </h1>

        <TypeAnimation
          sequence={[
            "AI-Powered Suggestions",
            2000,
            "Beautiful Designs",
            2000,
            "ATS Friendly Formats",
            2000,
          ]}
          wrapper="span"
          speed={50}
          className="text-xl text-muted-foreground"
          repeat={Infinity}
        />

        <div className="mt-8 flex justify-center gap-4">
          <LoginLink>
            <Button className="px-6 py-3 text-base">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </LoginLink>

          <a
            href="#features"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
