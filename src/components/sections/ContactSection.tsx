import { Building2, ChevronRight, Linkedin, MapPin, Share2 } from "lucide-react";
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
      <div className={`${CONTENT} grid grid-cols-[minmax(280px,0.78fr)_minmax(0,1.22fr)] items-start gap-8 max-[1000px]:grid-cols-1 max-[1000px]:gap-10`}>
        <aside className="relative grid gap-5">
          <div className="relative overflow-hidden rounded-[14px] bg-[var(--blue)] px-7 py-8 text-white shadow-[0_18px_38px_rgba(0,66,136,.2)] max-[600px]:px-6">
            <span className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-white/10" aria-hidden />
            <span className="absolute -bottom-12 right-10 h-24 w-24 rounded-full bg-[#0f67b4]" aria-hidden />
            <div className="relative">
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-lg bg-white/15 text-white">
                {officeIcon ? <CmsIcon icon={officeIcon} /> : <Building2 size={25} />}
              </span>
              <p className="m-0 text-xs font-extrabold uppercase tracking-[.1em] text-[#b9dcff]">{officeTitle}</p>
              {text(block.officeName) && <h2 className="mb-3 mt-2 font-[Hanken] text-[26px] font-extrabold leading-tight tracking-[-.025em]">{text(block.officeName)}</h2>}
              {text(block.address) && <p className="m-0 whitespace-pre-line text-[15px] leading-6 text-white/82">{text(block.address)}</p>}
              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-white">
                <MapPin size={17} aria-hidden />
                <span>Nous rencontrer à Isneauville</span>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] border border-[var(--line)] bg-white p-7 shadow-[0_12px_30px_rgba(18,50,85,.06)] max-[600px]:p-6">
            <span className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-[var(--sky)] text-[var(--blue)]">
              {socialIcon ? <CmsIcon icon={socialIcon} /> : <Share2 size={22} />}
            </span>
            <h2 className="m-0 font-[Hanken] text-[24px] font-extrabold tracking-[-.025em]">{socialTitle}</h2>
            {text(block.socialText) && <p className="mb-6 mt-3 text-[15px] leading-6 text-[var(--muted)]">{text(block.socialText)}</p>}
            {socialHref && (
              <a
                className="group flex min-h-14 items-center justify-between gap-4 rounded-lg bg-[#0077b5] px-4 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#00669c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                href={socialHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-white/15">
                    {socialLinkIcon ? <CmsIcon icon={socialLinkIcon} /> : <Linkedin size={19} />}
                  </span>
                  <span className="truncate text-sm font-extrabold">{text(block.socialLabel) || "LinkedIn"}</span>
                </span>
                <ChevronRight className="shrink-0 transition group-hover:translate-x-0.5" size={20} aria-hidden />
              </a>
            )}
          </div>
        </aside>

        <div className="relative rounded-[14px] border border-[#d7e2ed] bg-white p-8 shadow-[0_22px_52px_rgba(18,50,85,.1)] max-[700px]:p-6 max-[420px]:p-5">
          <span className="mb-3 block text-xs font-extrabold uppercase tracking-[.1em] text-[var(--blue)]">Échangeons ensemble</span>
          <h2 className="m-0 font-[Hanken] text-[32px] font-extrabold leading-[1.15] tracking-[-.03em] max-[600px]:text-[28px]">{text(block.title) || form?.title || "Formulaire de contact"}</h2>
          {form?.description && <p className="mb-7 mt-3 max-w-[610px] text-[15px] leading-6 text-[var(--muted)]">{form.description}</p>}
          {form && <DynamicForm form={form} variant="embedded" />}
        </div>
      </div>
    </section>
  );
}
