import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type FeatureItem = {
  icon: any;
  title: string;
  description: string;
};

export default function FeaturesSection({
  features,
}: {
  features: FeatureItem[];
}) {
  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12 bg-[#E6E6E6]/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center"
              data-testid={`card-feature-${index}`}
            >
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 mx-auto">
                  <feature.icon
                    className="w-8 h-8 text-[#444444]"
                    strokeWidth={1.5}
                  />
                </div>
                <CardTitle className="text-[#111111]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-[#444444] leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
