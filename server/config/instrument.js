// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from"@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://9a24855afe316cf3edb701250bed8840@o4510939394080768.ingest.us.sentry.io/4510939405484032",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()],
});