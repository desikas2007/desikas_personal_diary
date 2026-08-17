'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import AnimeGirl from '@/components/AnimeGirl';
import { Heart, Star, Flower, Sparkle, Cloud, Rainbow, Squiggle, Tape } from '@/components/doodles';
import styles from './page.module.css';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(email, username, password);
      } else {
        await login(email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>

      <Heart className={styles.doodleHeart1} />
      <Star className={styles.doodleStar1} />
      <Sparkle className={styles.doodleSpark1} />
      <Sparkle className={styles.doodleSpark2} />
      <Flower className={styles.doodleFlower1} />
      <Cloud className={styles.doodleCloud} />
      <Rainbow className={styles.doodleRainbow} />
      <Squiggle className={styles.doodleSquiggle1} />

      <div className={styles.scene}>
        <div className={styles.girlSpot}>
          <AnimeGirl />
        </div>

        <div className={styles.card}>
          <Tape className={styles.cardTape} color="rgba(248,187,208,0.55)" rotation={-3} width={140} />
          <div className={styles.header}>
            <div className={styles.logo}>🌸</div>
            <h1 className={styles.title}>Welcome Back 👋</h1>
            <p className={styles.subtitle}>Your Private Space</p>
          </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className={styles.footer}>
          {isRegister ? (
            <p>Already have an account? <button onClick={() => { setIsRegister(false); setError(''); }}>Login</button></p>
          ) : (
            <p>Don&apos;t have an account? <button onClick={() => { setIsRegister(true); setError(''); }}>Register</button></p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
