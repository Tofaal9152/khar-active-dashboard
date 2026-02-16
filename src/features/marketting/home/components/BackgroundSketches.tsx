import Image from "next/image";
import { imagePath } from "@/constants/imagePath";

export default function BackgroundSketches() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top-left circle (near logo area) */}
      <Image
        src={imagePath.circleSketch}
        alt=""
        width={260}
        height={260}
        className="absolute opacity-[0.5] md:block hidden"
        style={{
          top: "14%",
          left: "16%",
          width: "clamp(120px, 18vw, 24px)",
          height: "auto",
        }}
      />

      {/* Top-right circle (near nav area) */}
      <Image
        src={imagePath.circleSketch}
        alt=""
        width={260}
        height={260}
        className="absolute opacity-[0.5] md:block hidden"
        style={{
          top: "4%",
          right: "19%",
          width: "clamp(120px, 18vw, 24px)",
          height: "auto",
        }}
      />
      {/* bottom-left circle small */}
      <Image
        src={imagePath.circleSketch}
        alt=""
        width={260}
        height={260}
        className="absolute opacity-[0.5]"
        style={{
          bottom: "24%",
          left: "4%",
          width: "clamp(60px, 18vw, 24px)",
          height: "auto",
        }}
      />

      {/* Left hanging gloves */}
      <Image
        src={imagePath.glovesSketch}
        alt=""
        width={240}
        height={320}
        className="absolute opacity-[0.5]"
        style={{
          top: "35%",
          left: "2.5%",
          width: "clamp(150px, 16vw, 220px)",
          height: "auto",
          transform: "rotate(-20deg)",
        }}
      />

      {/* Right-top gloves (small, near top-right) */}
      <Image
        src={imagePath.glovesSketch}
        alt=""
        width={210}
        height={280}
        className="absolute opacity-[0.25]"
        style={{
          top: "5%",
          right: "1%",
          width: "clamp(120px, 12vw, 170px)",
          height: "auto",

          transform: "rotate(10deg)",
        }}
      />

      {/* Bottom-right boxer (small outline) */}
      <Image
        src={imagePath.boxerSketch}
        alt=""
        width={220}
        height={300}
        className="absolute opacity-[0.5]"
        style={{
          bottom: "10%",
          right: "2%",
          width: "clamp(140px, 14vw, 210px)",
          height: "auto",
        }}
      />

      {/* Mid-right fast lines (using arrowSketch as placeholder) */}
      <Image
        src={imagePath.arrowSketch}
        alt=""
        width={160}
        height={90}
        className="absolute opacity-[0.1] hidden xl:flex"
        style={{
          top: "76%",
          left: "12%",
          width: "clamp(110px, 12vw, 170px)",
          height: "auto",
          transform: "rotate(-36deg)",
        }}
      />
      <Image
        src={imagePath.twoLines}
        alt=""
        width={160}
        height={90}
        className="absolute  hidden xl:flex"
        style={{
          top: "26%",
          right: "15%",
          width: "clamp(120px, 15vw, 190px)",
          height: "auto",
          transform: "",
        }}
      />
    </div>
  );
}
