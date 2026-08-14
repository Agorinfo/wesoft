import { MapPin, Share2 } from "lucide-react";
import { CmsIcon } from "@/components/CmsIcon";
import { DynamicForm } from "@/components/DynamicForm";
import { getForm } from "@/lib/strapi";
import type { CmsIconValue, FormDefinition, PageBlock } from "@/types/content";
import { CONTENT, sectionClass, text } from "./shared";

const fallbackContactForm: FormDefinition = {
  id: -1, name: "Contact", slug: "contact", submitLabel: "Envoyer le message", successMessage: "Merci, votre message a bien été envoyé.",
  fields: [
    { name: "firstName", label: "Prénom", type: "text", placeholder: "Jean", required: true, width: "half" },
    { name: "lastName", label: "Nom", type: "text", placeholder: "Dupont", required: true, width: "half" },
    { name: "email", label: "Email professionnel", type: "email", placeholder: "j.dupont@societe.fr", required: true, width: "half" },
    { name: "company", label: "Société / Logiciel", type: "text", placeholder: "Nom de votre structure", width: "half" },
    { name: "sector", label: "Votre secteur d’activité", type: "select", placeholder: "Sélectionnez un secteur", width: "full", options: [{ label: "Agriculture", value: "agriculture" }, { label: "BTP / Location", value: "btp" }, { label: "Négoce", value: "negoce" }, { label: "Autre", value: "autre" }] },
    { name: "message", label: "Message", type: "textarea", placeholder: "Parlez-nous de votre projet ou de votre solution…", required: true, width: "full" },
    { name: "consent", label: "J’accepte que WeSoft traite mes données pour répondre à ma demande.", type: "checkbox", required: true, width: "full" },
  ],
};

async function resolveForm(block: PageBlock) {
  const relation = block.form as FormDefinition | { id?: number; slug?: string } | undefined;
  if (relation && "fields" in relation) return relation;
  return relation ? getForm(relation.slug || relation.id || "") : null;
}

export async function ContactSection({ block }: { block: PageBlock }) {
  const form = (await resolveForm(block)) || (block.fallbackForm ? fallbackContactForm : null);
  const card = "rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_10px_20px_rgba(18,50,85,.07)]";
  const officeIcon = block.officeIcon as CmsIconValue | undefined;
  const socialIcon = block.socialIcon as CmsIconValue | undefined;
  const socialLinkIcon = block.socialLinkIcon as CmsIconValue | undefined;

  return <section className={`pt-0 ${sectionClass(block)}`}><div className={`${CONTENT} grid grid-cols-[1fr_2fr] items-start gap-6 max-[1000px]:grid-cols-1`}>
    <aside className="grid gap-6 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-1">
      <div className={card}><h2 className="mb-4 flex items-center gap-2 font-[Hanken] text-2xl font-bold">{officeIcon ? <CmsIcon icon={officeIcon} /> : <MapPin className="w-[18px] text-[var(--blue)]" />} {text(block.officeTitle) || "Le siège"}</h2><strong className="block text-sm text-[var(--blue)]">{text(block.officeName)}</strong><p className="whitespace-pre-line text-sm leading-[1.55] text-[var(--muted)]">{text(block.address)}</p></div>
      <div className={card}><h2 className="mb-4 flex items-center gap-2 font-[Hanken] text-2xl font-bold">{socialIcon ? <CmsIcon icon={socialIcon} /> : <Share2 className="w-[18px] text-[var(--blue)]" />} {text(block.socialTitle) || "Suivez-nous"}</h2><p className="text-sm leading-[1.55] text-[var(--muted)]">{text(block.socialText)}</p>{text(block.socialHref) && <a className="flex h-10 w-10 items-center gap-3 overflow-hidden border border-[var(--line)] bg-[#0077b5] p-3 font-extrabold text-white" href={text(block.socialHref)} target="_blank" rel="noreferrer">{socialLinkIcon ? <CmsIcon icon={socialLinkIcon} /> : "in"} <span className="ml-3 whitespace-nowrap text-[var(--ink)]">{text(block.socialLabel)}</span></a>}</div>
    </aside>
    <div className={`${card} [&_.dynamic-form]:p-0 [&_.dynamic-form]:shadow-none [&_textarea]:min-h-[150px]`}><h2 className="mb-4 font-[Hanken] text-2xl font-bold">{text(block.title) || form?.title}</h2>{form && <DynamicForm form={form} />}</div>
  </div></section>;
}
