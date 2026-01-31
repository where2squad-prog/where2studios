import { getCalApi } from "@calcom/embed-react";
import { useEffect, useCallback } from "react";

const CAL_LINK = "where2-studios-tvdbun/discovery-call";

export function useCalModal() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#D4AF37" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  const openCalModal = useCallback(async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view" },
    });
  }, []);

  return { openCalModal };
}
