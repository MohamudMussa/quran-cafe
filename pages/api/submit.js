import { instance as Supabase } from '../../lib/db/models/supbase';

async function trySendEmail(url) {
  try {
    // If you have a Supabase function set up to send email, call it here
    // Example: await fetch(process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL + '/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}` }, body: JSON.stringify({ to: 'mmussa92@gmail.com', subject: 'New Recitation Submission', text: url }) });
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { url } = req.body || {};
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'Invalid url' });
  try {
    let inserted = null;
    if (Supabase?.db) {
      const { data, error } = await Supabase.db
        .from('recitation_submissions')
        .insert({ url })
        .single();
      if (error) throw error;
      inserted = data;
    }
    // Attempt to send email notification (best-effort)
    await trySendEmail(url);
    return res.status(200).json({ ok: true, id: inserted?.id || null });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Failed to submit' });
  }
}