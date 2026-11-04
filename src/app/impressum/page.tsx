import LegalView, { legalMeta } from "@/components/LegalView";

export const metadata = legalMeta("impressum");

export default function Page() {
  return <LegalView slug="impressum" />;
}
