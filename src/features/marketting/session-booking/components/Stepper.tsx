import { Check } from "lucide-react";
import { BOOKING_STEPS } from "../constants/steps";

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative z-10 md:px-12 lg:px-20 py-6 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3  scale-90 md:scale-100">
          {BOOKING_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const completed = stepNumber < currentStep;
            const active = stepNumber === currentStep;

            return (
              <div key={step.label} className="flex items-center">
                {/* Circle + Label */}
                <div className="flex items-center gap-2">
                  {/* Circle */}
                  <div
                    className={[
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                      completed || active
                        ? "bg-[#E10600] text-white"
                        : "bg-[#E6E6E6] text-[#444444]",
                    ].join(" ")}
                  >
                    {completed ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      stepNumber
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={[
                      "text-xs md:text-sm",
                      active
                        ? "font-semibold text-[#111111]"
                        : "text-[#444444]",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector */}
                {index < BOOKING_STEPS.length - 1 && (
                  <div
                    className={[
                      "w-4 md:w-14 h-0.5 mx-2",
                      stepNumber < currentStep
                        ? "bg-[#ba170b]"
                        : "bg-[#E6E6E6]",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
