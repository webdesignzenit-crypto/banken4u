import ServiceView, { serviceMeta } from "@/components/ServiceView";

export const metadata = serviceMeta("ratenkredit");

export default function Page() {
  return <ServiceView slug="ratenkredit" />;
}
