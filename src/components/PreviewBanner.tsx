import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-lg bg-wesoft-blue px-4 py-3 text-sm font-semibold text-white shadow-xl" role="status">
      <span>Aperçu du brouillon</span>
      <form action="/api/preview/exit" method="post">
        <button className="rounded border border-white/70 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-wesoft-blue" type="submit">
          Quitter l’aperçu
        </button>
      </form>
    </aside>
  );
}
