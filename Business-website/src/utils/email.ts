import { siteConfig } from '../config/site';

export async function submitFormByEmail(subject, fields) {
  const payload = {
    ...fields,
    _subject: subject,
    _replyto: fields.Email || fields.email,
    _template: 'table',
    _captcha: 'false',
    _url: window.location.href,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false || result?.success === 'false') {
      throw new Error('Email service request failed');
    }
  } catch (error) {
    const body = Object.entries(fields)
      .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
      .join('\n');
    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}