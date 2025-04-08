import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../backend/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, name, role, language, country, source, referral_code } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  // Validation du format d'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  // Protection anti-double inscription
  const { data: existing } = await supabase
    .from('waitlist')
    .select('email')
    .eq('email', email.trim().toLowerCase());
    
  if (existing?.length) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  // 🎟️ Traitement code promo
  const priorityCodes = ['ULU2024', 'EARLYUSA']
  const is_priority = referral_code && priorityCodes.includes(referral_code.trim().toUpperCase())

  const { error } = await supabase.from('waitlist').insert([{
    email: email.trim().toLowerCase(),
    name: name?.trim() || null,
    role: role?.trim() || null,
    language,
    country,
    source,
    referral_code: referral_code?.trim() || null,
    is_priority
  }])

  if (error) {
    console.error('❌ Supabase insert error:', error)
    return res.status(500).json({ message: 'Failed to save email' })
  }

  return res.status(200).json({ message: 'Successfully added to waitlist' })
}