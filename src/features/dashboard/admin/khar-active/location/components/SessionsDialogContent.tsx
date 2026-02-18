import { Card, CardContent } from "@/components/ui/card";

interface Session {
  title: string;
  price?: number | string;
}

export function SessionsDialogContent({ sessions }: { sessions: Session[] }) {
  return (
    <div className="space-y-3">
      {sessions.length === 0 ? (
        <EmptyState text="No sessions found" />
      ) : (
        sessions.map((s: Session, i: number) => (
          <Card key={i} className="border-gray-200 bg-white">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="text-gray-900 font-medium">{s.title}</div>
              <div className="text-gray-700">৳ {Number(s.price || 0)}</div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
      {text}
    </div>
  );
}
