import type * as React from "react";

/**
 * <model-viewer> is a custom element (Web Component) provided by
 * @google/model-viewer. React 19 forwards unknown props to custom elements as
 * attributes, so we only need to declare the element for TypeScript.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
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
    }
  }
}

export {};
