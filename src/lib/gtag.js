import { gaMeasurementId } from "../config/ga";

export const pageView = (url) => {
  if (typeof window !== "undefined") {
    window.gtag("config", gaMeasurementId, {
      page_path: url,
    });
  }
};

export const gaEvent = ({ action, label, value, category }) => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
