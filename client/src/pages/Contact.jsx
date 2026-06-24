import Header from '../components/layout/Header';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[var(--text-h)] mb-6">Contact Us</h1>
        <p className="text-lg text-[var(--text)]">
          Get in touch with us.
        </p>
      </div>
    </div>
  );
}
