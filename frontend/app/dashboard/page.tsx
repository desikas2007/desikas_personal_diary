'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navigation from '@/components/Navigation';
import { Heart, Star, Flower, Sparkle, Cloud, Rainbow, Squiggle, Bow, DoodleLine, Tape } from '@/components/doodles';
import styles from './page.module.css';

const API_URL = 'http://localhost:5000/api';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [counts, setCounts] = useState({ passwords: 0, notes: 0, diary: 0 });
  const [recentPassword, setRecentPassword] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [pwRes, noteRes, diaryRes] = await Promise.all([
        fetch(`${API_URL}/passwords`, { credentials: 'include' }),
        fetch(`${API_URL}/notes`, { credentials: 'include' }),
        fetch(`${API_URL}/diary`, { credentials: 'include' }),
      ]);

      const passwords = await pwRes.json();
      const notes = await noteRes.json();
      const diary = await diaryRes.json();

      setCounts({
        passwords: Array.isArray(passwords) ? passwords.length : 0,
        notes: Array.isArray(notes) ? notes.length : 0,
        diary: Array.isArray(diary) ? diary.length : 0,
      });

      if (Array.isArray(passwords) && passwords.length > 0) {
        setRecentPassword(passwords[0]);
      }
    } catch {
      // handle error silently
    }
  };

  if (loading || !user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const cards = [
    { icon: '🔐', title: 'Passwords', count: counts.passwords, href: '/passwords', color: 'pink' },
    { icon: '📝', title: 'Notes', count: counts.notes, href: '/notes', color: 'blue' },
    { icon: '📖', title: 'Diary', count: counts.diary, href: '/diary', color: 'pink' },
  ];

  return (
    <>
      <Navigation />
      <div className={styles.desk}>
        <Heart className={styles.doodleHeart1} />
        <Star className={styles.doodleStar1} />
        <Sparkle className={styles.doodleSpark1} />
        <Sparkle className={styles.doodleSpark2} />
        <Flower className={styles.doodleFlower1} />
        <Flower className={styles.doodleFlower2} petal="#A9CFEB" />
        <Cloud className={styles.doodleCloud} />
        <Rainbow className={styles.doodleRainbow} />
        <Squiggle className={styles.doodleSquiggle1} />
        <Bow className={styles.doodleBow} />

        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.greeting}>
              Welcome Back, {user.username} 👋
              <span className={styles.greetingFlower}><Flower petal="#F8A8C8" /></span>
            </h1>
            <p className={styles.subGreeting}>Here&apos;s your private space summary</p>
            <div className={styles.headerDoodle}><DoodleLine style={{ width: 160 }} /></div>
          </div>

          <div className={styles.grid}>
            {cards.map((card, i) => (
              <a key={card.title} href={card.href} className={`${styles.statCard} ${styles[card.color]}`}>
                <Tape
                  className={styles.cardTape}
                  color={i % 2 === 0 ? 'rgba(248,187,208,0.5)' : 'rgba(165,207,235,0.45)'}
                  rotation={i % 2 === 0 ? -3 : 3}
                  width={72}
                />
                <span className={styles.statIcon}>{card.icon}</span>
                <div className={styles.statInfo}>
                  <span className={styles.statCount}>{card.count}</span>
                  <span className={styles.statTitle}>{card.title}</span>
                </div>
              </a>
            ))}

            <div className={`${styles.statCard} ${styles.recentCard}`}>
              <Tape className={styles.cardTape} color="rgba(181,224,196,0.5)" rotation={2} width={72} />
              <span className={styles.statIcon}>🔄</span>
              <div className={styles.statInfo}>
                <span className={styles.statTitle}>Recent Update</span>
                {recentPassword ? (
                  <span className={styles.recentText}>{recentPassword.website}</span>
                ) : (
                  <span className={styles.recentText}>No updates yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
