import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-[var(--text-h)] mb-6">
          Welcome to CodeCluster
        </h1>
        <p className="text-xl text-[var(--text)] mb-8">
          Practice coding problems and improve your skills
        </p>
        <Link to="/problems">
          <Button value="Start Solving Problems" />
        </Link>
      </div>
    </div>
  );
}
