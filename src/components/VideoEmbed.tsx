function safeEmbedUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");
    if (hostname === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (hostname === "youtube.com" || hostname === "m.youtube.com" || hostname === "youtube-nocookie.com") {
      const id = url.pathname.startsWith("/embed/") ? url.pathname.split("/")[2] : url.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbed({ url, title }: { url?: string; title?: string }) {
  const embedUrl = safeEmbedUrl(url);
  if (!embedUrl) return null;
  return <div className="my-9 aspect-video overflow-hidden rounded-lg bg-black shadow-[0_15px_35px_rgba(18,50,85,.14)]">
    <iframe className="h-full w-full" src={embedUrl} title={title || "Vidéo associée à l’article"}
      loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen />
  </div>;
}
