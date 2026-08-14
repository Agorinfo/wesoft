"use client";

import { FormEvent, useState } from "react";
import type { FormDefinition } from "@/types/content";

export function DynamicForm({ form }: { form: FormDefinition }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/forms/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formId: form.id > 0 ? form.id : undefined, formSlug: form.slug, values }) });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  const inputClass = "w-full rounded-[5px] border border-[#cad4df] bg-[#fbfcfe] px-[14px] py-[13px] text-[var(--ink)] outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[#b7d8f7]";
  return <form className="dynamic-form grid grid-cols-2 gap-[22px] rounded-[10px] bg-white p-[38px] shadow-[var(--shadow)] max-[600px]:grid-cols-1 max-[600px]:p-6" onSubmit={submit}>
    {form.fields?.map((field) => <div className={`flex flex-col gap-2 ${field.width !== "half" ? "col-span-full" : "max-[600px]:col-span-full"}`} key={field.name}>
      {field.type === "checkbox" ? <label className="flex items-start gap-2.5 text-sm font-bold"><input className="mt-1" type="checkbox" name={field.name} required={field.required} /><span>{field.label}</span></label> : <>
        <label className="text-sm font-bold" htmlFor={field.name}>{field.label}{field.required ? " *" : ""}</label>
        {field.type === "textarea" ? <textarea className={inputClass} id={field.name} name={field.name} placeholder={field.placeholder} required={field.required} rows={5} /> : field.type === "select" ? <select className={inputClass} id={field.name} name={field.name} required={field.required}><option value="">{field.placeholder || "Sélectionner"}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input className={inputClass} id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} required={field.required} />}
        {field.helpText && <small className="text-[var(--muted)]">{field.helpText}</small>}
      </>}
    </div>)}
    <button className="inline-flex min-h-[50px] justify-self-start rounded bg-[var(--blue)] px-[31px] text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--blue-2)]" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : form.submitLabel || "Envoyer"}</button>
    <div aria-live="polite" className="col-span-full font-semibold text-[var(--blue)]">{status === "success" && (form.successMessage || "Merci, votre demande a bien été envoyée.")}{status === "error" && "Une erreur est survenue. Veuillez réessayer."}</div>
  </form>;
}
