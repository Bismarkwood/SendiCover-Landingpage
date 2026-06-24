import { useState } from 'react';
import faqImg from '../../assets/FAQ.png';
import '../../styles/FAQSection.css';

/* ── FAQ Data ── */
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'What service do you provide?',
    answer: 'We provide life and health insurance products designed for families with loved ones living across borders. Our platform makes it easy to buy, manage, and claim on insurance policies — all from your phone.',
  },
  {
    id: 2,
    question: 'How can I contact customer support?',
    answer: 'You can reach our support team via the in-app chat, email at support@sendipay.com, or by calling our helpline. We aim to respond to all queries within 24 hours.',
  },
  {
    id: 3,
    question: 'What are your business hours?',
    answer: 'Our platform is available 24/7. Customer support operates Monday to Friday, 8am – 6pm GMT. Emergency claims assistance is available around the clock.',
  },
  {
    id: 4,
    question: 'Do you offer international coverage?',
    answer: 'Yes, our policies are designed specifically for international families. You can purchase cover for loved ones living in Ghana and Nigeria, with plans to expand to more countries soon.',
  },
  {
    id: 5,
    question: 'How do I make a claim?',
    answer: 'Claims can be submitted directly through the Sendi app. Simply navigate to your active policy, tap "Make a Claim", and follow the guided steps. Our team will process your claim promptly.',
  },
  {
    id: 6,
    question: 'Can I cancel my policy at any time?',
    answer: 'Yes, you can cancel your policy at any time with no hidden fees or penalties. Simply go to your policy settings in the app and select "Cancel Policy".',
  },
  {
    id: 7,
    question: 'Who underwrites the policies?',
    answer: 'All policies are underwritten by Prudential, a global leader in life and health insurance with over 175 years of experience protecting families worldwide.',
  },
  {
    id: 8,
    question: 'How are premiums collected?',
    answer: 'Premiums are collected automatically via your chosen payment method — debit card, bank transfer, or mobile money. You\'ll always be notified before each payment.',
  },
];

/* Split into two columns */
const LEFT_FAQS = FAQ_DATA.slice(0, 4);
const RIGHT_FAQS = FAQ_DATA.slice(4, 8);

/* ── Accordion Item ── */
function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="faq-question-text">{item.question}</span>
        <span className="faq-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" className="faq-icon-vertical" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className="faq-answer-wrap"
        role="region"
        aria-hidden={!isOpen}
      >
        <p className="faq-answer">{item.answer}</p>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        {/* ── Top area: Image + Header ── */}
        <div className="faq-top">
          <div className="faq-image-col">
            <div className="faq-image-wrap">
              <img src={faqImg} alt="Frequently asked questions" />
            </div>
          </div>

          <div className="faq-header-col">
            <span className="faq-pill">FAQ</span>
            <h2 className="faq-heading">Everything you need to know</h2>
            <p className="faq-subtext">
              Can't find what you're looking for? Reach out to our support team and we'll get back to you shortly.
            </p>
          </div>
        </div>

        {/* ── Accordion grid ── */}
        <div className="faq-grid">
          <div className="faq-column">
            {LEFT_FAQS.map(item => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
          <div className="faq-column">
            {RIGHT_FAQS.map(item => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
