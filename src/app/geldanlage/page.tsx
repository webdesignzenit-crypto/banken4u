import ServiceView, { serviceMeta } from "@/components/ServiceView";

export const metadata = serviceMeta("geldanlage");

export default function Page() {
  return <ServiceView slug="geldanlage" />;
}
