import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function getInternalPath(value: string | null): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;

  const parsed = new URL(value, "https://preview.wesoft.local");
  if (parsed.origin !== "https://preview.wesoft.local") return null;
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

/** Called by Strapi's Preview action. */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const secret = requestUrl.searchParams.get("secret");
  const previewPath = getInternalPath(requestUrl.searchParams.get("url"));

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  if (!previewPath) {
    return new NextResponse("Invalid preview path", { status: 400 });
  }

  const draft = await draftMode();
  if (requestUrl.searchParams.get("status") === "published") {
    draft.disable();
  } else {
    draft.enable();
  }

  return NextResponse.redirect(new URL(previewPath, request.url));
}
