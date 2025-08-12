import React, { useEffect, useMemo, useState } from 'react';

const ListenerCountText = ({ className = '', style = {} }) => {
  const [count, setCount] = useState(1);
  const clientId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('listener_client_id') || (() => {
      const id = Math.random().toString(36).slice(2);
      localStorage.setItem('listener_client_id', id);
      return id;
    })();
  }, []);

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
    const hb = setInterval(beat, 30000);

    const poll = setInterval(() => {
      fetch('/api/listeners').then(r => r.json()).then(j => { if (!stopped) setCount(j.count || 1); }).catch(() => {});
    }, 10000);

    return () => { stopped = true; clearInterval(hb); clearInterval(poll); };
  }, [clientId]);

  const label = count === 1 ? '1 Muslim Listener' : `${count} Muslim Listeners`;

  return <span className={className} style={style}>{label}</span>;
};

export default ListenerCountText;