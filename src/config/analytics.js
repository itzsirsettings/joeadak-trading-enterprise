import ReactGA from "react-ga4";

/**
 * Initialize Google Analytics 4
 * You will need to replace this measurement ID with your actual GA4 ID later.
 * Format: G-XXXXXXX
 */
export const TRACKING_ID = "G-PHLHD2N1P1"; // Dummy ID for development

export const initGA = () => {
  // Only initialize GA in production mode to avoid skewing data during dev
  if (import.meta.env.PROD) {
    ReactGA.initialize(TRACKING_ID);
  }
};

export const logPageView = (path) => {
  if (import.meta.env.PROD) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const logEvent = (category, action, label) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};
