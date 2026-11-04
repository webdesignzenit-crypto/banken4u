import LegalView, { legalMeta } from "@/components/LegalView";

export const metadata = legalMeta("datenschutz");

export default function Page() {
  return <LegalView slug="datenschutz" />;
}
