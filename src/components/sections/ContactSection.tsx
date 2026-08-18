import { Linkedin, MapPin, Share2 } from "lucide-react";
import { CmsIcon } from "@/components/CmsIcon";
import { DynamicForm } from "@/components/DynamicForm";
import { getForm } from "@/lib/strapi";
import type { CmsIconValue, FormDefinition, PageBlock } from "@/types/content";
import { CONTENT, sectionClass, text } from "./shared";

const fallbackContactForm: FormDefinition = {
  id: -1,
  name: "Contact",
  slug: "contact",
  submitLabel: "Envoyer le message",
  successMessage: "Merci, votre message a bien été envoyé.",
  fields: [
    { name: "firstName", label: "Prénom", type: "text", placeholder: "Jean", required: true, width: "half" },
    { name: "lastName", label: "Nom", type: "text", placeholder: "Dupont", required: true, width: "half" },
    { name: "email", label: "Email professionnel", type: "email", placeholder: "j.dupont@societe.fr", required: true, width: "half" },
    { name: "company", label: "Société / Logiciel", type: "text", placeholder: "Nom de votre structure", width: "half" },
    {
      name: "sector",
      label: "Votre secteur d’activité",
      type: "select",
      placeholder: "Sélectionnez un secteur",
      width: "full",
      options: [
        { label: "Agriculture", value: "agriculture" },
        { label: "BTP / Location", value: "btp" },
        { label: "Négoce", value: "negoce" },
        { label: "Autre", value: "autre" },
      ],
    },
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
  const officeIcon = block.officeIcon as CmsIconValue | undefined;
  const socialIcon = block.socialIcon as CmsIconValue | undefined;
  const socialLinkIcon = block.socialLinkIcon as CmsIconValue | undefined;
  const officeTitle = text(block.officeTitle) || "Le siège";
  const socialTitle = text(block.socialTitle) || "Suivez-nous";
  const socialHref = text(block.socialHref);

  return (
    <section className={`${sectionClass(block)} overflow-hidden`}>
      <div className={`${CONTENT} grid grid-cols-[minmax(280px,.8fr)_minmax(0,1.65fr)] items-start gap-6 max-[1000px]:grid-cols-1 max-[1000px]:gap-8`}>
        <aside className="grid gap-6">
          <div className="rounded-[7px] border border-[#dbe3eb] bg-white p-6 shadow-[0_8px_20px_rgba(18,50,85,.04)]">
            <div className="flex items-center gap-2 text-[var(--blue)]">
              <span className="grid h-6 w-6 place-items-center">{officeIcon ? <CmsIcon icon={officeIcon} /> : <MapPin size={23} strokeWidth={2.2} />}</span>
              <h2 className="m-0 font-[Hanken] text-2xl font-bold leading-tight text-[var(--ink)]">{officeTitle}</h2>
            </div>
            {text(block.officeName) && <p className="mb-1 mt-4 text-sm font-bold text-[var(--blue)]">{text(block.officeName)}</p>}
            {text(block.address) && <p className="m-0 whitespace-pre-line text-base leading-6 text-[var(--muted)]">{text(block.address)}</p>}
          </div>

          <div className="rounded-[7px] border border-[#dbe3eb] bg-white p-6 shadow-[0_8px_20px_rgba(18,50,85,.04)]">
            <div className="flex items-center gap-2 text-[var(--blue)]">
              <span className="grid h-6 w-6 place-items-center">{socialIcon ? <CmsIcon icon={socialIcon} /> : <Share2 size={22} strokeWidth={2.2} />}</span>
              <h2 className="m-0 font-[Hanken] text-2xl font-bold leading-tight text-[var(--ink)]">{socialTitle}</h2>
            </div>
            {text(block.socialText) && <p className="mb-5 mt-4 text-base leading-6 text-[var(--muted)]">{text(block.socialText)}</p>}
            {socialHref && (
              <a
                className="flex min-h-14 items-center gap-3 rounded-[4px] border border-[#dbe3eb] px-3 py-2 text-[var(--ink)] transition hover:border-[var(--blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                href={socialHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] bg-[#0a83c5] text-white">
                    {socialLinkIcon ? <CmsIcon icon={socialLinkIcon} /> : <Linkedin size={20} />}
                  </span>
                  <span className="truncate text-sm font-bold">{text(block.socialLabel) || "LinkedIn"}</span>
                </span>
              </a>
            )}
          </div>
        </aside>

        <div className="rounded-[7px] border border-[#dbe3eb] bg-white p-6 shadow-[0_8px_20px_rgba(18,50,85,.04)] max-[700px]:p-5">
          <h2 className="m-0 font-[Hanken] text-[32px] font-bold leading-[1.15] tracking-[-.025em] max-[600px]:text-2xl">{text(block.title) || form?.title || "Formulaire de contact"}</h2>
          {form?.description && <p className="mb-6 mt-3 max-w-[610px] text-base leading-6 text-[var(--muted)]">{form.description}</p>}
          {form && <DynamicForm form={form} variant="embedded" />}
        </div>
      </div>
    </section>
  );
}
