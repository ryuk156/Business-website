import { useState } from 'react';
import { lucideIcons } from '../utils/icons';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const ChevronDownIcon = lucideIcons.ChevronDown;

  return (
    <div className="w-full max-w-3xl mx-auto" role="region" aria-label="Frequently asked questions">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group card overflow-hidden"
            open={openIndex === index}
          >
            <summary
              className="flex items-center justify-between p-6 cursor-pointer list-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                setOpenIndex(openIndex === index ? -1 : index);
              }}
            >
              <h3 className="text-lg font-medium text-neutral-900 pr-10">{faq.question}</h3>
              <ChevronDownIcon
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </summary>
            <div className="px-6 pb-6 text-neutral-600 leading-relaxed whitespace-pre-line animate-slide-down">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default FAQAccordion;