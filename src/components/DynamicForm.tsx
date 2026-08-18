"use client";

import { FormEvent, useState } from "react";
import type { FormDefinition } from "@/types/content";

type DynamicFormProps = {
  form: FormDefinition;
  variant?: "card" | "embedded";
};

export function DynamicForm({ form, variant = "card" }: DynamicFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: form.id > 0 ? form.id : undefined, formSlug: form.slug, values }),
    });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  const inputClass = "min-h-12 w-full rounded-[5px] border border-[#cbd7e3] bg-[#fbfdff] px-[14px] py-[11px] text-base text-[var(--ink)] outline-none transition placeholder:text-[#8994a2] hover:border-[#aebfd0] focus:border-[var(--blue)] focus:bg-white focus:ring-2 focus:ring-[#b7d8f7]";
  const formClass = variant === "embedded"
    ? "dynamic-form mt-7 grid grid-cols-2 gap-x-5 gap-y-5 max-[600px]:grid-cols-1"
    : "dynamic-form grid grid-cols-2 gap-[22px] rounded-[10px] bg-white p-[38px] shadow-[var(--shadow)] max-[600px]:grid-cols-1 max-[600px]:p-6";
  const embedded = variant === "embedded";

  return (
    <form className={formClass} onSubmit={submit}>
      {form.fields?.map((field) => (
        <div className={`flex flex-col gap-2 ${field.width !== "half" ? "col-span-full" : "max-[600px]:col-span-full"}`} key={field.name}>
          {field.type === "checkbox" ? (
            <label className={`flex cursor-pointer items-start gap-3 text-base leading-5 text-[var(--muted)] ${embedded ? "px-0 py-1" : "rounded-md bg-[var(--sky)] px-4 py-3"}`}>
              <input className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--blue)]" type="checkbox" name={field.name} required={field.required} />
              <span>{field.label}</span>
            </label>
          ) : (
            <>
              <label className="text-base font-bold text-[var(--ink)]" htmlFor={field.name}>{field.label}{field.required ? <span className="text-[var(--blue)]"> *</span> : null}</label>
              {field.type === "textarea" ? <textarea className={`${inputClass} min-h-36 resize-y`} id={field.name} name={field.name} placeholder={field.placeholder} required={field.required} rows={5} /> : field.type === "select" ? <select className={inputClass} id={field.name} name={field.name} required={field.required}><option value="">{field.placeholder || "Sélectionner"}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input className={inputClass} id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} required={field.required} />}
              {field.helpText && <small className="text-xs leading-5 text-[var(--muted)]">{field.helpText}</small>}
            </>
          )}
        </div>
      ))}
      <div className={`col-span-full mt-1 flex flex-wrap items-center gap-x-5 gap-y-3 ${embedded ? "justify-end border-t border-[#d8e0e8] pt-5" : ""}`}>
        <button className="inline-flex min-h-[50px] items-center justify-center rounded bg-[var(--blue)] px-7 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--blue-2)] disabled:cursor-wait disabled:opacity-70" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : form.submitLabel || "Envoyer"}
        </button>
        {!embedded && <p className="m-0 text-base leading-5 text-[var(--muted)]">Les champs marqués d’un * sont obligatoires.</p>}
      </div>
      <div aria-live="polite" className="col-span-full min-h-5 text-base font-semibold text-[var(--blue)]">
        {status === "success" && (form.successMessage || "Merci, votre demande a bien été envoyée.")}
        {status === "error" && "Une erreur est survenue. Veuillez réessayer."}
      </div>
    </form>
  );
}
