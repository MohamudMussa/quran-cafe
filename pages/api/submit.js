import { instance as Supabase } from '../../lib/db/models/supbase';

async function trySendEmail(url) {
  const fnUrl = process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!fnUrl || !anonKey) return false;
  try {
    const res = await fetch(`${fnUrl}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify({ to: 'mmussa92@gmail.com', subject: 'New Recitation Submission', text: url })
    });
    return res.ok;
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