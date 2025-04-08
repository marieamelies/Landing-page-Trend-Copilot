import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

console.log('[DEBUG] RESEND KEY:', process.env.RESEND_API_KEY?.slice(0, 6) + '...')


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  const { email, name, language } = req.body

  if (!email) return res.status(400).json({ message: 'Email is required' })

  const isFrench = language === 'fr'

  const subject = isFrench
    ? "Vous êtes bien inscrit(e) – votre copilote est prêt 🧠✨"
    : "You're in. Your AI copilot is warming up 🧠💥"

  const html = isFrench
    ? `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Bonjour ${name || 'à vous'},</p>
        <p><strong>Bienvenue dans la liste d'attente de Trend Copilot 🎉</strong></p>
        <p>Cet assistant IA n’est pas un gadget : c’est votre bras droit stratégique pour publier plus, mieux — sans vous épuiser.</p>
        <ul>
          <li>✅ Zéro prompt. Zéro prise de tête. 100% efficacité.</li>
          <li>📅 Calendrier intelligent. Contenu personnalisé. Impact maximal.</li>
          <li>🚀 Créé pour les freelances, créateurs et TPE qui veulent accélérer.</li>
        </ul>
        <p><strong>👉 L'accès early, c’est : bonus exclusifs + onboarding prioritaire.</strong></p>
        <p>(Mais réservé aux 500 premiers 👀)</p>

        <p>❤️ Vous voulez soutenir le projet ?</p>
        <ul>
          <li>Participez à notre lancement ici : <a href="https://ulule.com/ton-lien">Campagne Ulule</a></li>
          <li>Et suivez-nous : 
            <a href="https://www.instagram.com/trendcopilot">Instagram</a> |
            <a href="https://www.linkedin.com/company/trendcopilot">LinkedIn</a>
          </li>
        </ul>

        <p>Merci 🙌<br/>— L’équipe Trend Copilot</p>
      </div>
    `
    : `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Hey ${name || 'there'},</p>
        <p><strong>Boom — you're officially on the waitlist for Trend Copilot 🚀</strong></p>
        <p>This isn't just another AI tool. It's your <em>strategic wingman</em> for building your online presence like a pro — without the burnout.</p>
        <ul>
          <li>✅ No prompts. No overwhelm. Just results.</li>
          <li>📅 Plan smarter, post faster, grow stronger.</li>
          <li>📈 Built for creators, freelancers & small teams who move fast.</li>
        </ul>
        <p><strong>👉 Early access = exclusive perks, premium features & priority onboarding.</strong></p>
        <p>(And yes — only the first 500 get the full stack.)</p>

        <p>🚨 Want to boost our launch & get noticed?</p>
        <ul>
          <li>❤️ Back our launch campaign: <a href="https://ulule.com/your-link">Ulule</a></li>
          <li>👀 Follow us:<br/>
            <a href="https://www.instagram.com/trendcopilot">Instagram</a> | 
            <a href="https://www.linkedin.com/company/trendcopilot">LinkedIn</a>
          </li>
        </ul>

        <p>Thanks for joining — we'll be in touch soon.</p>
        <p>Stay sharp,<br/>— Team Trend Copilot 🧠</p>
      </div>
    `

  try {
    const data = await resend.emails.send({
      from: 'Trend Copilot <hello@trendcopilot.ai>',
      to: email,
      subject,
      html
    })

    return res.status(200).json({ message: 'Confirmation email sent', data })
  } catch (err: any) {
    console.error('❌ Email send failed:', err)
    return res.status(500).json({ message: 'Failed to send confirmation email' })
  }
}
