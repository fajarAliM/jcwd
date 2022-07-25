import { gaMeasurementId } from "../config/ga";

export const pageView = (url) => {
  window.gtag("config", gaMeasurementId, {
    page_path: url,
  });
};

export const gaEvent = ({ action, label, value, category }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
