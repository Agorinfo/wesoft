import { TestimonialSlider } from "@/components/TestimonialSlider";
import type { CmsIconValue, Media, PageBlock, Testimonial } from "@/types/content";
import { list, text } from "./shared";

type Metric = { id?: number; value: string; label: string; icon?: CmsIconValue };

export function TestimonialMetricsSection({ block }: { block: PageBlock }) {
  const testimonials = list<Testimonial>(block.testimonials);
  if (!testimonials.length && text(block.quote)) testimonials.push({
    quote: text(block.quote),
    author: text(block.author),
    role: text(block.role),
    avatar: block.avatar as Media | undefined,
  });
  return <TestimonialSlider testimonials={testimonials} metrics={list<Metric>(block.metrics)} quoteIcon={block.quoteIcon as CmsIconValue | undefined} />;
}
