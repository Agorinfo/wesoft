import { NextResponse } from "next/server";
import { createSubmission, getForm } from "@/lib/strapi";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { formId?: number; formSlug?: string; values?: Record<string, unknown> } | null;
  if (!body?.values || (!body.formId && !body.formSlug)) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  const form = await getForm(body.formSlug || body.formId || "");
  if (!form) return NextResponse.json({ error: "Formulaire introuvable" }, { status: 404 });
  for (const field of form.fields || []) if (field.required && !body.values[field.name]) return NextResponse.json({ error: `Le champ ${field.label} est requis` }, { status: 422 });
  const result = await createSubmission({ form: form.id, formName: form.name, payload: body.values, status: "new", submittedAt: new Date().toISOString() });
  return result ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Envoi impossible" }, { status: 502 });
}
