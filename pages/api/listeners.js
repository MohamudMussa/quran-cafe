let listeners = new Map(); // clientId -> last_seen ms
const TTL_MS = 2 * 60 * 1000; // 2 minutes

function prune() {
  const now = Date.now();
  for (const [id, ts] of listeners.entries()) {
    if (now - ts > TTL_MS) listeners.delete(id);
  }
}

export default async function handler(req, res) {
  try {
    prune();
    if (req.method === 'POST') {
      const { clientId } = req.body || {};
      if (clientId) listeners.set(clientId, Date.now());
      prune();
      return res.status(200).json({ count: listeners.size });
    }
    if (req.method === 'GET') {
      prune();
      return res.status(200).json({ count: listeners.size });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(200).json({ count: Math.max(1, listeners.size) });
  }
}