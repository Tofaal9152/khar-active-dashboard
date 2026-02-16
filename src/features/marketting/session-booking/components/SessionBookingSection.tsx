import { getSession } from "@/utils/session";
import BackgroundSketches from "../../home/components/BackgroundSketches";
import SessionBookingForm from "./SessionBookingForm";

const SessionBookingSection = async ({
  locationId,
}: {
  locationId: string;
}) => {
  const session = await getSession();
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F3F1EE] px-2 md:px-0">
      <BackgroundSketches />
      <SessionBookingForm locationId={locationId} session={session} />
    </div>
  );
};

export default SessionBookingSection;
