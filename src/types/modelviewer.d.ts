import { ModelViewerElement } from "@google/model-viewer";

declare global {
  namespace JSX {
    //define aframeElement as an extended react HTMLElement
    interface ModelViewerElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
      //toute propriété de l'objet aframeElement qui est une string (attribut) peut exister et obtenir un type "unknown"
      [x: string]: unknown;
    }
    interface IntrinsicElements {
      "model-viewer": ModelViewerElement
    }
  }
}

export {};
