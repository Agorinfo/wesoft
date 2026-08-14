export type Media = { url?: string; alternativeText?: string | null; width?: number; height?: number };

export type CmsIconValue = {
  name: string;
  library?: "lucide" | "fontawesome-brands";
  color?: string;
  size?: number;
  strokeWidth?: number;
  path?: string | string[];
  viewBox?: string;
};

export type CmsButton = {
  id?: number;
  label: string;
  style?: "primary" | "secondary" | "ghost" | "light";
  linkType?: "internal" | "external";
  href: string;
  openInNewTab?: boolean;
};

export type NavItem = { id?: number; label: string; href: string; linkType?: "internal" | "external"; icon?: CmsIconValue; children?: NavItem[] };
export type FooterColumn = { id?: number; title: string; links?: NavItem[] };

export type SiteConfig = {
  siteName?: string;
  logo?: Media;
  navigation?: NavItem[];
  headerButton?: CmsButton;
  footerIntro?: string;
  footerColumns?: FooterColumn[];
  socialLinks?: NavItem[];
  legalLinks?: NavItem[];
  footerCtaTitle?: string;
  copyright?: string;
};

export type Feature = {
  id?: number;
  title: string;
  text?: string;
  icon?: CmsIconValue;
  backgroundColor?: string;
};

export type FormField = {
  id?: number;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "number" | "date";
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  width?: "full" | "half";
  options?: { id?: number; label: string; value: string }[];
};

export type FormDefinition = { id: number; documentId?: string; name: string; slug: string; title?: string; description?: string; submitLabel?: string; successMessage?: string; fields?: FormField[] };

export type Article = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  publishedDate?: string;
  category?: string;
  resourceType?: "article" | "temoignage" | "video";
  readingTime?: number;
  featured?: boolean;
  cover?: Media;
  videoUrl?: string;
  videoTitle?: string;
  buttonLabel?: string;
  sidebarTitle?: string;
  sidebarText?: string;
  sidebarButton?: CmsButton;
  relatedArticles?: Article[];
  seo?: { metaTitle?: string; metaDescription?: string; shareImage?: Media };
};

export type Software = {
  id?: number;
  name: string;
  sector?: string;
  description?: string;
  logo?: Media;
  image?: Media;
  accentColor?: string;
  button?: CmsButton;
  capabilities?: { id?: number; text: string }[];
};

export type Testimonial = {
  id?: number;
  quote: string;
  author?: string;
  role?: string;
  avatar?: Media;
};

export type TeamMember = {
  id?: number;
  name: string;
  role?: string;
  biography?: string;
  photo?: Media;
};

export type LegalSection = { id?: number; anchorId: string; title: string; content: string };

export type PageBlock = Record<string, unknown> & { id: number; __component: string; background?: string; anchorId?: string };
export type CmsPage = { id: number; title: string; slug: string; excerpt?: string; seo?: { metaTitle?: string; metaDescription?: string; shareImage?: Media }; blocks?: PageBlock[] };
