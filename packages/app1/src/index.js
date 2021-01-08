import { bootstrapManifest } from "manifest-service-client";

bootstrapManifest("http://localhost:3001", "app1").then(() => {
  import("./bootstrap");
});
