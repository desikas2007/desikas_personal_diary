'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import styles from './Navigation.module.css';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/passwords', label: 'Passwords', icon: '🔐' },
  { href: '/notes', label: 'Notes', icon: '📝' },
  { href: '/diary', label: 'Diary', icon: '📖' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/dashboard" className={styles.logo}>
            🌸 Vault
          </Link>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${pathname === item.href ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <button className={styles.mobileLogout} onClick={() => { logout(); setMenuOpen(false); }}>
            Logout
          </button>
        </div>
      )}

      <div className={styles.bottomNav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomLink} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.bottomIcon}>{item.icon}</span>
            <span className={styles.bottomLabel}>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
