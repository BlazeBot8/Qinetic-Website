export const CONTACT_EMAIL = "helloparvkothari@gmail.com";

// EmailJS IDs are public client-side values. Env vars override these defaults
// (useful locally via .env); fallbacks keep production builds working when
// .env is not present on the host.
const DEFAULTS = {
  serviceId: "service_bmrized",
  templateId: "template_ymltuuf",
  publicKey: "qRhEd5CF9sWphR_6u",
};

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || DEFAULTS.serviceId,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || DEFAULTS.templateId,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || DEFAULTS.publicKey,
};

export function isEmailJsConfigured() {
  return Boolean(
    emailjsConfig.serviceId &&
      emailjsConfig.templateId &&
      emailjsConfig.publicKey
  );
}
