import type * as React from "react";

type ModelViewerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    poster?: string;
    ar?: boolean | string;
    "ar-modes"?: string;
    "ar-placement"?: string;
    "ar-scale"?: string;
    "camera-controls"?: boolean | string;
    "touch-action"?: string;
    "shadow-intensity"?: string;
    "environment-image"?: string;
    exposure?: string;
    "camera-orbit"?: string;
    "field-of-view"?: string;
    "min-camera-orbit"?: string;
    "max-camera-orbit"?: string;
    "interaction-prompt"?: string;
    "disable-tap"?: boolean | string;
    loading?: string;
    reveal?: string;
    autoplay?: boolean | string;
    "auto-rotate"?: boolean | string;
    "auto-rotate-delay"?: string;
  },
  HTMLElement
>;

/**
 * <model-viewer> é um custom element do @google/model-viewer.
 * React 19 encaminha props desconhecidas como atributos; aqui só declaramos
 * o elemento para o TypeScript (namespace React.JSX, usado pelo React 19).
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

export {};
