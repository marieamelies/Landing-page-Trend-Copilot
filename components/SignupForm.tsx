declare global {
    interface Window {
      plausible: (...args: any[]) => void;
    }
  }
  
  import { useTranslation } from 'next-i18next';
  import type { FC } from 'react';
  import { useState, useRef, useEffect } from 'react';
  
  const SignupForm: FC = () => {
    const { t, i18n } = useTranslation('signup');
    const [isReady, setIsReady] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [code, setCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
  
    // Options pour le champ de rôle
    const roleOptions = [
      { value: '', label: t('roleSelect', 'Select your role...') },
      { value: 'freelancer', label: t('roleFreelancer', 'Freelancer/Solopreneur') },
      { value: 'creator', label: t('roleCreator', 'Content Creator') },
      { value: 'agency', label: t('roleAgency', 'Agency/Small Business') },
      { value: 'other', label: t('roleOther', 'Other') },
    ];
  
    // Hydration fix
    useEffect(() => {
      if (i18n.language) {
        setIsReady(true);
      }
    }, [i18n.language]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validation basique
      if (!email.trim()) {
        setError(t('errorEmail', 'Please enter your email'));
        return;
      }
      
      setSubmitting(true);
      setError('');
      
      // 📍 Détection du pays
      let country = '';
      try {
        const res = await fetch('https://ipapi.co/json/');
        const geo = await res.json();
        country = geo?.country || '';
      } catch (err) {
        console.warn('IP location failed', err);
      }
      
      try {
        // Préparation du payload avec les champs demandés
        const payload = {
          email: email.trim().toLowerCase(),
          name: name?.trim() || null,
          role: role?.trim() || null,
          language: i18n.language,
          country,
          source: 'landing',
          referral_code: code?.trim() || null
        };
        
        // Envoi des données à l'API
        const res = await fetch('/api/waitlist-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (res.ok) {
          // Succès
          setSuccess(true);
          
          // Tracking Plausible pour inscription réussie
          if (typeof window !== "undefined" && window.plausible) {
            window.plausible("waitlist-submitted");
          }
          
          // Envoi d'un email de confirmation
          await fetch('/api/send-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              email: email.trim().toLowerCase(), 
              name: name?.trim() || null, 
              language: i18n.language 
            }),
          }).catch(err => {
            // Silencieusement capturé - l'utilisateur est déjà inscrit même si l'email échoue
            console.warn('Confirmation email failed', err);
          });
          
          setEmail('');
          setName('');
          setRole('');
          setCode('');
          
          // Réinitialiser après quelques secondes (option)
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        } else {
          setError(data.message || t('errorGeneric', 'Something went wrong. Please try again.'));
        }
      } catch (err) {
        setError(t('errorGeneric', 'Something went wrong. Please try again.'));
        console.error('Error submitting form:', err);
      } finally {
        setSubmitting(false);
      }
    };
  
    if (!isReady) return null;
  
    return (
      <section 
        id="signup-form" 
        className="relative w-full py-16 px-4 bg-white dark:bg-gray-900"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-full opacity-50 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t('title', 'Join the Waitlist')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('subtitle', 'Be among the first to experience Trend Copilot and unlock exclusive early access benefits.')}
            </p>
          </div>
          
          {/* Success message */}
          {success ? (
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center shadow-xl animate-fadeIn">
              {/* 🎉 Visuel animé */}
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 animate-ping opacity-50"></div>
                  <div className="relative w-full h-full flex items-center justify-center rounded-full bg-indigo-600 text-white text-4xl shadow-lg">
                    🎉
                  </div>
                </div>
              </div>
              
              {/* 🧠 Titre & message */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('successTitle', 'You\'re on the list!')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {t('successMessage', 'You\'ve successfully joined the waitlist. We\'ll keep you posted!')}
              </p>
              
              {/* 🔔 Liens de soutien crowdfunding */}
              <p className="text-sm mt-6 text-gray-500 dark:text-gray-400">
                {t('supportUsHint', 'Want to support our launch?')} 👉&nbsp;
                <a href="https://fr.ulule.com/trendcopilot" target="_blank" rel="noopener" className="text-indigo-600 dark:text-indigo-400 underline">
                  Ulule
                </a> {t('or', 'or')}&nbsp;
                <a href="https://www.kickstarter.com/projects/trendcopilot" target="_blank" rel="noopener" className="text-indigo-600 dark:text-indigo-400 underline ml-1">
                  Kickstarter
                </a>
              </p>
            </div>
          ) : (
            /* Form */
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all"
            >
              <div className="space-y-4">
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('emailLabel', 'Email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder', 'your@email.com')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('nameLabel', 'Name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder', 'Your name')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                
                {/* Role select */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('roleLabel', 'What describes you best?')}
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Promo code field */}
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('codeLabel', 'Promo Code')}
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={t('codePlaceholder', 'Enter promo code (optional)')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                
                {/* Error message */}
                {error && (
                  <div className="text-red-500 text-sm py-2">
                    {error}
                  </div>
                )}
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.plausible) {
                      window.plausible("join-waitlist-click");
                    }
                  }}
                  className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium transition-all ${
                    submitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-[#5C33F6] hover:bg-[#4826C9] transform hover:-translate-y-0.5'
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('submitting', 'Processing...')}
                    </>
                  ) : (
                    t('submit', 'Join the waitlist')
                  )}
                </button>
                
                {/* Privacy policy */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  {t('privacyNotice', 'By joining, you agree to our Terms and Privacy Policy. We\'ll only use your email to send you updates about Trend Copilot.')}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    );
  };
  
  export default SignupForm;