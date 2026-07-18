'use client';

// ─────────────────────────────────────────────
// KAIROS — useToggleSet
//
// Shared hook for the "toggle an id in/out of a set"
// interaction repeated across the History, Examination,
// Investigations and Treatment screens.
// ─────────────────────────────────────────────

import { useCallback, useState } from 'react';

export interface ToggleSet {
  /** Currently selected ids, in insertion order. */
  readonly items: readonly string[];
  /** Adds the id if absent, removes it if present. */
  toggle: (id: string) => void;
  /** True when the id is currently selected. */
  has: (id: string) => boolean;
}

export function useToggleSet(initial: readonly string[] = []): ToggleSet {
  const [items, setItems] = useState<string[]>(() => [...initial]);

  const toggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const has = useCallback((id: string) => items.includes(id), [items]);

  return { items, toggle, has };
}
