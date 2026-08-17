'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navigation from '@/components/Navigation';
import { Heart, Star, Flower, Sparkle, Squiggle, Bow, Tape } from '@/components/doodles';
import styles from './page.module.css';

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className={styles.desk}>
        <Heart className={styles.doodleHeart1} />
        <Star className={styles.doodleStar1} />
        <Sparkle className={styles.doodleSpark1} />
        <Sparkle className={styles.doodleSpark2} />
        <Flower className={styles.doodleFlower1} />
        <Squiggle className={styles.doodleSquiggle1} />
        <Bow className={styles.doodleBow} />

        <div className={styles.container}>
          <h1 className={styles.title}>
            Settings
            <span className={styles.titleFlower}><Flower petal="#F8A8C8" /></span>
          </h1>

          <div className={styles.section}>
            <div className={styles.card}>
              <Tape className={styles.cardTape} color="rgba(248,187,208,0.5)" rotation={-3} width={90} />
              <h2 className={styles.cardTitle}>👤 Account</h2>
            <div className={styles.info}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Username</span>
                <span className={styles.value}>{user.username}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.card}>
            <Tape className={styles.cardTape} color="rgba(165,207,235,0.45)" rotation={3} width={90} />
            <h2 className={styles.cardTitle}>🔒 Security</h2>
            <p className={styles.description}>
              All your passwords are encrypted using AES-256 encryption.
              Your data is stored securely in MongoDB and only accessible by you.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.card}>
            <Tape className={styles.cardTape} color="rgba(201,184,240,0.5)" rotation={-2} width={90} />
            <h2 className={styles.cardTitle}>ℹ️ About</h2>
            <p className={styles.description}>
              Personal Vault v1.0.0 — A cute, private digital diary and secure password manager.
              Built with Next.js, Express.js, and MongoDB.
            </p>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={() => { logout(); router.push('/login'); }}>
          Logout
        </button>
        </div>
      </div>
    </>
  );
}
