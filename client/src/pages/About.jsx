import Header from '../components/layout/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[var(--text-h)] mb-6">About CodeCluster</h1>
        <p className="text-lg text-[var(--text)]">
          CodeCluster is a platform for practicing coding problems.
        </p>
      </div>
    </div>
  );
}
