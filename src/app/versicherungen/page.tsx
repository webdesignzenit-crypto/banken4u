import ServiceView, { serviceMeta } from "@/components/ServiceView";

export const metadata = serviceMeta("versicherungen");

export default function Page() {
  return <ServiceView slug="versicherungen" />;
}
