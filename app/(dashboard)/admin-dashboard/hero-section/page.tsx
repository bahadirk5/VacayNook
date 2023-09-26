import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { HeroForm } from "@/components/hero-form"
import { HeroImageCard } from "@/components/hero-image-card"
import { HeroImageUpload } from "@/components/hero-image-upload"
import { DashboardShell } from "@/components/shell"

export default async function HeroSection() {
  const heroSection = await db.heroSection.findFirst()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Hero Section"
        text="Create and manage hero section."
      ></DashboardHeader>
      <div className="mt-10 grid grid-cols-2 gap-8 px-2">
        <div>
          <HeroForm
            title={heroSection?.title}
            description={heroSection?.description}
          />
        </div>
        {heroSection?.url ? (
          <HeroImageCard
            key={heroSection.publicId}
            url={heroSection.url}
            publicId={heroSection.publicId}
          />
        ) : (
          <HeroImageUpload />
        )}
      </div>
    </DashboardShell>
  )
}
