export {};

declare global {
  interface Window {
    // Pour Plausible avec props en option
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;

    // Tu peux aussi ajouter d'autres propriétés ici si besoin (genre fs)
    fs?: unknown;
  }
}
