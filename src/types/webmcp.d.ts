import "react";

/**
 * Experimental, declarative WebMCP attributes. They are ignored by browsers
 * that do not implement WebMCP, so they are a safe progressive enhancement.
 */
declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean;
  }

  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface SelectHTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}
