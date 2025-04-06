import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';

const SignupForm: FC = () => {
  const { t, i18n } = useTranslation('signup');
  const [isReady, setIsReady] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
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
    
    try {
      // Ici, vous ferez un appel API réel pour enregistrer l'utilisateur
      // Pour l'instant, simulons une requête réussie après un court délai
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Succès
      setSuccess(true);
      setEmail('');
      setName('');
      setRole('');
      
      // Effet de confetti (option)
      if (typeof window !== 'undefined') {
        // Vous pourriez ajouter ici une bibliothèque de confetti
        // Par exemple: import confetti from 'canvas-confetti';
        // confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      
      // Réinitialiser après quelques secondes (option)
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
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
          <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl text-center animate-fadeIn">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('successTitle', 'You\'re on the list!')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('successMessage', 'Thank you for joining our waitlist. We\'ll notify you when you get access.')}
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 underline"
            >
              {t('successButton', 'Register another email')}
            </button>
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