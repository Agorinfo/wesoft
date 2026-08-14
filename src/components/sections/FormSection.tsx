import { DynamicForm } from "@/components/DynamicForm";
import { getForm } from "@/lib/strapi";
import type { FormDefinition, PageBlock } from "@/types/content";
import { CONTENT, sectionClass, SectionHeading, text } from "./shared";

async function resolveForm(block: PageBlock) {
  const relation = block.form as FormDefinition | { id?: number; slug?: string } | undefined;
  if (relation && "fields" in relation) return relation;
  return relation ? getForm(relation.slug || relation.id || "") : null;
}

export async function FormSection({ block }: { block: PageBlock }) {
  const form = await resolveForm(block);
  return <section className={sectionClass(block)}><div className={`${CONTENT} grid grid-cols-[.8fr_1.2fr] items-start gap-20 max-[800px]:grid-cols-1 max-[800px]:gap-6`}>
    <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title) || form?.title} body={text(block.text) || form?.description} />
    {form && <DynamicForm form={form} />}
  </div></section>;
}
