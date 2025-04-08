import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../backend/lib/supabase';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact' }); // ⬅️ Enlève head: true !

  if (error) {
    console.error('Supabase count error:', error);
    return res.status(500).json({ message: 'Failed to fetch count' });
  }

  return res.status(200).json({ count });
}
