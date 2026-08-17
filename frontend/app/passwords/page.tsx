'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navigation from '@/components/Navigation';
import { Heart, Star, Flower, Sparkle, Cloud, Squiggle, Bow, Tape } from '@/components/doodles';
import styles from './page.module.css';

const API_URL = 'http://localhost:5000/api';

interface PasswordEntry {
  _id: string;
  website: string;
  url: string;
  username: string;
  password: string;
  category: string;
  notes: string;
  lastUpdated: string;
  passwordHistory: { password: string; date: string }[];
}

export default function PasswordsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [historyEntry, setHistoryEntry] = useState<PasswordEntry | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ message: '', type: '' });

  const [form, setForm] = useState({
    website: '',
    url: '',
    username: '',
    password: '',
    category: 'General',
    notes: ''
  });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchPasswords();
  }, [user]);

  const showToast = (message: string, type: string = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const fetchPasswords = async () => {
    try {
      const res = await fetch(`${API_URL}/passwords`, { credentials: 'include' });
      const data = await res.json();
      setPasswords(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to load passwords', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_URL}/passwords/${editingId}` : `${API_URL}/passwords`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      if (res.ok) {
        showToast(editingId ? 'Password updated' : 'Password saved');
        setShowModal(false);
        resetForm();
        fetchPasswords();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this password?')) return;
    try {
      const res = await fetch(`${API_URL}/passwords/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        showToast('Password deleted');
        fetchPasswords();
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleEdit = (pw: PasswordEntry) => {
    setEditingId(pw._id);
    setForm({
      website: pw.website,
      url: pw.url,
      username: pw.username,
      password: pw.password,
      category: pw.category,
      notes: pw.notes
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ website: '', url: '', username: '', password: '', category: 'General', notes: '' });
  };

  const togglePassword = (id: string) => {
    const next = new Set(visiblePasswords);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVisiblePasswords(next);
  };

  const copyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      showToast('Password copied!');
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  const filtered = passwords.filter(p =>
    p.website.toLowerCase().includes(search.toLowerCase()) ||
    p.username.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
        <Cloud className={styles.doodleCloud} />
        <Squiggle className={styles.doodleSquiggle1} />
        <Bow className={styles.doodleBow} />

        <div className={styles.container}>
          <div className={styles.topBar}>
            <h1 className={styles.title}>
              My Passwords
              <span className={styles.titleFlower}><Flower petal="#C9B8F0" /></span>
            </h1>
            <button className={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
              + Add Password
            </button>
          </div>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍  Search passwords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.grid}>
            {filtered.map((pw) => (
              <div key={pw._id} className={styles.card}>
                <Tape
                  className={styles.cardTape}
                  color="rgba(201,184,240,0.5)"
                  rotation={-3}
                  width={72}
                />
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🔐</div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{pw.website}</h3>
                    <span className={styles.cardCategory}>{pw.category}</span>
                  </div>
                </div>

              <div className={styles.cardDetails}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{pw.username}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Password</span>
                  <span className={styles.detailValue}>
                    {visiblePasswords.has(pw._id) ? pw.password : '••••••••'}
                  </span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Updated</span>
                  <span className={styles.detailValue}>{formatDate(pw.lastUpdated)}</span>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => togglePassword(pw._id)}>
                  {visiblePasswords.has(pw._id) ? '🙈 Hide' : '👁️ Show'}
                </button>
                <button className={styles.actionBtn} onClick={() => copyPassword(pw.password)}>
                  📋 Copy
                </button>
                <button className={styles.actionBtn} onClick={() => handleEdit(pw)}>
                  ✏️ Edit
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(pw._id)}>
                  🗑️
                </button>
                {pw.passwordHistory.length > 0 && (
                  <button className={styles.actionBtn} onClick={() => { setHistoryEntry(pw); setShowHistoryModal(true); }}>
                    🔄 History
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyDoodle}>
                <Heart style={{ width: 24, height: 24 }} />
                <span style={{ fontSize: 38, display: 'inline-block', transform: 'rotate(-6deg)' }}>🔐</span>
                <Star style={{ width: 22, height: 22 }} />
              </div>
              <p>No passwords yet. Add your first one!</p>
            </div>
          )}
        </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Tape className={styles.modalTape} color="rgba(201,184,240,0.5)" rotation={-3} width={110} />
            <Heart className={styles.modalDoodle1} />
            <Sparkle className={styles.modalDoodle2} />
            <button type="button" className={styles.closeBtn} onClick={() => setShowModal(false)} aria-label="Close">×</button>
            <h2 className={styles.modalTitle}>{editingId ? 'Edit Password' : 'Add Password'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Website Name</label>
                <input className={styles.modalInput} placeholder="e.g. GitHub" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>Website URL</label>
                <input className={styles.modalInput} placeholder="https://github.com" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Username / Email</label>
                <input className={styles.modalInput} placeholder="user@example.com" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input className={styles.modalInput} type="password" placeholder="Enter password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select className={styles.modalInput} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>General</option>
                  <option>Social</option>
                  <option>Work</option>
                  <option>Finance</option>
                  <option>Email</option>
                  <option>Shopping</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Notes</label>
                <textarea className={`${styles.modalInput} ${styles.ruledTextarea}`} rows={3} placeholder="Optional notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>{editingId ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showHistoryModal && historyEntry && (
        <div className={styles.modalOverlay} onClick={() => setShowHistoryModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Tape className={styles.modalTape} color="rgba(165,207,235,0.45)" rotation={3} width={120} />
            <h2 className={styles.modalTitle}>Password History - {historyEntry.website}</h2>
            <div className={styles.historyList}>
              {historyEntry.passwordHistory.map((h, i) => (
                <div key={i} className={styles.historyItem}>
                  <span className={styles.historyDate}>{formatDate(h.date)}</span>
                  <span className={styles.historyPassword}>••••••••</span>
                </div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowHistoryModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {toast.message && <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.message}</div>}
      </div>
    </>
  );
}
