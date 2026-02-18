import { Card, CardContent } from "@/components/ui/card";

interface Slot {
  title: string;
  max_capacity?: number;
}

export function SlotsDialogContent({ slots }: { slots: Slot[] }) {
  return (
    <div className="space-y-3">
      {slots.length === 0 ? (
        <EmptyState text="No slots found" />
      ) : (
        slots.map((sl: Slot, i: number) => (
          <Card key={i} className="border-gray-200 bg-gray-50">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="text-gray-900 font-medium">{sl.title}</div>
              <div className="text-gray-700">
                Max: {Number(sl.max_capacity || 0)}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
      {text}
    </div>
  );
}
