import { instance as Supabase } from '../../lib/db/models/supbase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { url } = req.body || {};
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'Invalid url' });
  try {
    if (Supabase?.db) {
      const { data, error } = await Supabase.db
        .from('recitation_submissions')
        .insert({ url })
        .single();
      if (error) throw error;
      return res.status(200).json({ ok: true, id: data?.id });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Failed to submit' });
  }
}