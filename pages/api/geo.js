export default async function handler(req, res) {
  try {
    // Primary provider
    const r1 = await fetch('https://ipapi.co/json/');
    if (r1.ok) {
      const j = await r1.json();
      if (j && j.latitude && j.longitude) {
        return res.status(200).json({ latitude: j.latitude, longitude: j.longitude, source: 'ipapi' });
      }
    }
  } catch {}

  try {
    // Secondary provider
    const r2 = await fetch('https://ipwho.is/');
    if (r2.ok) {
      const j2 = await r2.json();
      if (j2 && j2.success && j2.latitude && j2.longitude) {
        return res.status(200).json({ latitude: j2.latitude, longitude: j2.longitude, source: 'ipwho' });
      }
    }
  } catch {}

  // Final fallback: Mecca
  return res.status(200).json({ latitude: 21.4225, longitude: 39.8262, source: 'fallback' });
}