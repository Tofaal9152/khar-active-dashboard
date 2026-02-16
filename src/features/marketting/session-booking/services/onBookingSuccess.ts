import { toast } from "sonner";
import ensureSession from "./ensureSession";
import getRedirectURL from "./getRedirectURL";

export async function onBookingSuccess(
  resData: any,
  router: any,
  cardname: string,
  session?: any
) {
  try {
    let didUpdateSession = false;

    if (!session) {
      const ok = await ensureSession(resData); // server sets cookie
      if (!ok) return;
      didUpdateSession = true;
    }

    const redirectURL = getRedirectURL(resData, cardname);
    if (!redirectURL) return;

    // open gateway in new tab
    window.open(redirectURL, "_blank");

    // ✅ if session updated, refresh layout/navbar first
    if (didUpdateSession) {
      router.refresh();
      // tiny delay so refresh can re-render server components before navigating
      await new Promise((r) => setTimeout(r, 50));
    }

    // go to confirmed page
    router.replace(`/booking-confirmed/${resData?.data?.booking?.id}`);
  } catch (err: any) {
    toast.error(err?.message || "Something went wrong");
  }
}

// import { toast } from "sonner";
// import ensureSession from "./ensureSession";
// import getRedirectURL from "./getRedirectURL";

// export async function onBookingSuccess(
//   resData: any,
//   router: any,
//   cardname: string,
//   session?: any
// ) {
//   try {
//     if (!session) {
//       const ok = await ensureSession(resData);
//       if (!ok) return;
//     }

//     const redirectURL = getRedirectURL(resData, cardname);
//     if (!redirectURL) return;
//     // please open the redirectURL in the new tab
//     window.open(redirectURL, "_blank");

//     // redirect to booking success page for updating UI
//     console.log(resData);
//     router.refresh();
//     router.replace(`/booking-confirmed/${resData?.data?.booking.id}`);
//   } catch (err: any) {
//     toast.error(err?.message || "Something went wrong");
//   }
// }
