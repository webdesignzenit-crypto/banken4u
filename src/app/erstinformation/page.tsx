import LegalView, { legalMeta } from "@/components/LegalView";

export const metadata = legalMeta("erstinformation");

export default function Page() {
  return <LegalView slug="erstinformation" />;
}
