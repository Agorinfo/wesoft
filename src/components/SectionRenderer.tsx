import type { PageBlock } from "@/types/content";
import { ArticleListSection } from "./sections/ArticleListSection";
import { BusinessCharacteristicsSection } from "./sections/BusinessCharacteristicsSection";
import { ContactSection } from "./sections/ContactSection";
import { CtaSection } from "./sections/CtaSection";
import { FeatureGridSection } from "./sections/FeatureGridSection";
import { FormSection } from "./sections/FormSection";
import { HeroSection } from "./sections/HeroSection";
import { LegalContentSection } from "./sections/LegalContentSection";
import { MetricsSection } from "./sections/MetricsSection";
import { ProcessSection } from "./sections/ProcessSection";
import { RichTextSection } from "./sections/RichTextSection";
import { SoftwareShowcaseSection } from "./sections/SoftwareShowcaseSection";
import { TeamSection } from "./sections/TeamSection";
import { TestimonialMetricsSection } from "./sections/TestimonialMetricsSection";

async function renderSection(block: PageBlock, key: string, hasHero: boolean) {
  switch (block.__component) {
    case "sections.hero": return <HeroSection key={key} block={block} />;
    case "sections.feature-grid": return <FeatureGridSection key={key} block={block} />;
    case "sections.process": return <ProcessSection key={key} block={block} />;
    case "sections.software-showcase": return <SoftwareShowcaseSection key={key} block={block} />;
    case "sections.business-characteristics": return <BusinessCharacteristicsSection key={key} block={block} />;
    case "sections.testimonial-metrics": return <TestimonialMetricsSection key={key} block={block} />;
    case "sections.team": return <TeamSection key={key} block={block} />;
    case "sections.metrics": return <MetricsSection key={key} block={block} />;
    case "sections.cta": return <CtaSection key={key} block={block} />;
    case "sections.article-list": return <ArticleListSection key={key} block={block} />;
    case "sections.form-section": return <FormSection key={key} block={block} />;
    case "sections.contact": return <ContactSection key={key} block={block} />;
    case "sections.legal-content": return <LegalContentSection key={key} block={block} showIntro={!hasHero} />;
    case "sections.rich-text": return <RichTextSection key={key} block={block} />;
    default: return null;
  }
}

export async function SectionRenderer({ blocks = [] }: { blocks?: PageBlock[] }) {
  const hasHero = blocks.some((block) => block.__component === "sections.hero");
  return <>{await Promise.all(blocks.map((block, index) => renderSection(block, `${block.__component}-${block.id}-${index}`, hasHero)))}</>;
}
