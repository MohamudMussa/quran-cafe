import React, { useEffect, useMemo, useState } from 'react';

function LiveCounter({ standalone = false, standalonePos = 'center', hideOnMobile = false }) {
  const [count, setCount] = useState(1);
  const clientId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('listener_client_id') || (() => {
      const id = Math.random().toString(36).slice(2);
      localStorage.setItem('listener_client_id', id);
      return id;
    })();
  }, []);

  // Heartbeat every 30s
  useEffect(() => {
    let stopped = false;
    async function beat() {
      try {
        await fetch('/api/listeners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId }),
        }).then(r => r.json()).then(j => { if (!stopped) setCount(j.count || 1); });
      } catch {}
    }
    beat();
    const id = setInterval(beat, 30000);
    return () => { stopped = true; clearInterval(id); };
  }, [clientId]);

  // Poll GET between beats for snappier UI
  useEffect(() => {
    let stopped = false;
    const id = setInterval(() => {
      fetch('/api/listeners').then(r => r.json()).then(j => { if (!stopped) setCount(j.count || 1); }).catch(() => {});
    }, 10000);
    return () => { stopped = true; clearInterval(id); };
  }, []);

  const content = (
    <div className="flex items-center space-x-2 px-3 py-2 panel-card rounded-md" style={{ backdropFilter: 'blur(6px)' }}>
      <span className="animate-pulse inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ffa700' }} />
      <span className="font-semibold">{count} Muslims are listening now</span>
    </div>
  );

  if (!standalone) return content;

  const base = 'fixed z-40 pointer-events-none';
  const posClass = standalonePos === 'bottom-left'
    ? 'bottom-5 left-5'
    : standalonePos === 'bottom-right'
      ? 'bottom-5 right-5'
      : 'inset-0 flex items-center justify-center';
  const responsive = hideOnMobile ? 'hidden md:block' : '';

  return (
    <div className={`${base} ${posClass} ${responsive}`}>
      <div className="pointer-events-auto">
        {content}
      </div>
    </div>
  );
}

export default LiveCounter;