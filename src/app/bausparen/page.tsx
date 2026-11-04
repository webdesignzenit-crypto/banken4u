import ServiceView, { serviceMeta } from "@/components/ServiceView";

export const metadata = serviceMeta("bausparen");

export default function Page() {
  return <ServiceView slug="bausparen" />;
}
