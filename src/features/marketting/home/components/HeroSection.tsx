import { imagePath } from "@/constants/imagePath";
import Image from "next/image";
import SelectLocation from "./SelectLocation";

export default function HeroSection() {
  return (
    <main className="relative z-10 px-6 md:px-12 lg:px-20  pb-8 min-h-screen">
      <div className="md:max-w-7xl mx-auto">
        <div className="text-center mb-2">
          <div className="inline-block relative">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight"
              data-testid="text-hero-title"
            >
              Book your session
            </h1>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111]">
              in seconds
            </span>
          </div>

          <div className="flex justify-center mt-2">
            <Image
              src={imagePath.pointingArrow}
              alt=""
              width={110}
              height={56}
              className="opacity-50 rotate-90 scale-70 md:scale-110"
            />
          </div>
        </div>

        <div className="relative md:mt-16 ">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative  ">
              <Image
                src={imagePath.boxingImage}
                alt="Boxing fighters"
                width={2400}
                height={1600}
                
                className="w-full h-auto opacity-95 scale-150  sm:scale-110"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 80% 70% at center, black 40%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 70% at center, black 40%, transparent 75%)",
                }}
                data-testid="img-hero-fighters"
              />
            </div>
          </div>
        </div>
        <div className="md:mt-0 mt-10">
          <SelectLocation />
        </div>
      </div>
    </main>
  );
}
