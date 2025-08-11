import { useEffect } from "react";

function KeyboardShortcuts({ onKeyEvent }) {
  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.key === 'Escape') {
          onKeyEvent && onKeyEvent('esc', e);
          return;
        }
        const key = e.key?.toLowerCase();
        if (e.ctrlKey && (key === 'f')) {
          e.preventDefault();
          onKeyEvent && onKeyEvent('ctrl+f', e);
          return;
        }
        // Detect ctrl+space via code for reliability
        if (e.ctrlKey && (e.code === 'Space' || key === ' ')) {
          e.preventDefault();
          onKeyEvent && onKeyEvent('ctrl+space', e);
          return;
        }
      } catch (_) {}
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onKeyEvent]);

  return null;
}

export default KeyboardShortcuts;