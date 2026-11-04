import ServiceView, { serviceMeta } from "@/components/ServiceView";

export const metadata = serviceMeta("baufinanzierung");

export default function Page() {
  return <ServiceView slug="baufinanzierung" />;
}
