import { notFound } from "next/navigation";
import ServiceView, { serviceMeta } from "@/components/ServiceView";
import { services } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services
    .filter((s) => s.slug.startsWith("baufinanzierung/"))
    .map((s) => ({ slug: s.slug.replace("baufinanzierung/", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return serviceMeta(`baufinanzierung/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!services.some((s) => s.slug === `baufinanzierung/${slug}`)) notFound();
  return <ServiceView slug={`baufinanzierung/${slug}`} />;
}
