'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navigation from '@/components/Navigation';
import AnimeGirl from '@/components/AnimeGirl';
import { Heart, Star, Flower, Sparkle, Cloud, Rainbow, Squiggle, DoodleLine, Bow, PaperClip, Tape } from '@/components/doodles';
import styles from './page.module.css';

const API_URL = 'http://localhost:5000/api';

const MOODS = [
  { value: 'happy', label: '😊 Happy' },
  { value: 'calm', label: '😌 Calm' },
  { value: 'excited', label: '😎 Excited' },
  { value: 'sad', label: '😔 Sad' },
  { value: 'thoughtful', label: '🤔 Thoughtful' },
];

interface DiaryEntry {
  _id: string;
  date: string;
  title: string;
  mood: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}

export default function DiaryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ date: today, title: '', mood: 'calm', content: '' });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const showToast = (message: string, type: string = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_URL}/diary`, { credentials: 'include' });
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to load diary', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_URL}/diary/${editingId}` : `${API_URL}/diary`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      if (res.ok) {
        showToast(editingId ? 'Entry updated' : 'Diary entry saved');
        setView('list');
        setForm({ date: today, title: '', mood: 'calm', content: '' });
        setEditingId(null);
        fetchEntries();
      }
    } catch {
      showToast('Server error', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this diary entry?')) return;
    try {
      const res = await fetch(`${API_URL}/diary/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        showToast('Entry deleted');
        fetchEntries();
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleEdit = (entry: DiaryEntry) => {
    setEditingId(entry._id);
    setForm({
      date: new Date(entry.date).toISOString().split('T')[0],
      title: entry.title,
      mood: entry.mood,
      content: entry.content
    });
    setView('form');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getMoodEmoji = (mood: string) => {
    return MOODS.find(m => m.value === mood)?.label || '😌 Calm';
  };

  const filtered = entries.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading || !user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className={styles.desk}>
        {/* handmade doodles scattered around the desk */}
        <Heart className={styles.doodleHeart1} />
        <Star className={styles.doodleStar1} />
        <Sparkle className={styles.doodleSpark1} />
        <Sparkle className={styles.doodleSpark2} />
        <Flower className={styles.doodleFlower1} />
        <Flower className={styles.doodleFlower2} petal="#A9CFEB" />
        <Cloud className={styles.doodleCloud} />
        <Rainbow className={styles.doodleRainbow} />
        <Squiggle className={styles.doodleSquiggle1} />
        <Squiggle className={styles.doodleSquiggle2} />
        <DoodleLine className={styles.doodleLine1} />
        <Bow className={styles.doodleBow} />
        <PaperClip className={styles.doodleClip} />

        <div className={styles.scene}>
          <div className={styles.girlSpot}>
            <div className={styles.thought}>today was lovely ♡</div>
            <AnimeGirl />
          </div>

          <div className={`${styles.notebook} ${view === 'form' ? styles.notebookForm : ''}`}>
            <Tape className={styles.notebookTape} color="rgba(248,187,208,0.55)" rotation={-4} width={150} />

            {view === 'form' ? (
              <div className={styles.formView}>
                <div className={styles.formViewHeader}>
                  <button type="button" className={styles.backBtn} onClick={() => setView('list')}>← Back to diary</button>
                  <h2 className={styles.formViewTitle}>{editingId ? 'Edit Entry' : 'New Diary Entry'}</h2>
                  <p className={styles.formViewSubtitle}>a fresh page, just for today ♡</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Date</label>
                      <input className={styles.modalInput} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Mood</label>
                      <select className={styles.modalInput} value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })}>
                        {MOODS.map(m => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Title</label>
                    <input className={styles.modalInput} placeholder="What happened today?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Content</label>
                    <textarea className={`${styles.modalInput} ${styles.ruledTextarea} ${styles.formTextarea}`} rows={16} placeholder="Write your thoughts..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                  </div>
                  <div className={styles.modalActions}>
                    <button type="button" className={styles.cancelBtn} onClick={() => setView('list')}>Cancel</button>
                    <button type="submit" className={styles.saveBtn}>{editingId ? 'Update' : 'Save Entry'}</button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className={styles.notebookHeader}>
                  <h1 className={styles.title}>
                    My Diary
                    <span className={styles.titleFlower}><Flower petal="#F8A8C8" /></span>
                  </h1>
                  <button className={styles.addBtn} onClick={() => { setEditingId(null); setForm({ date: today, title: '', mood: 'calm', content: '' }); setView('form'); }}>
                    + New Entry
                  </button>
                </div>

                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="🔍  Search diary entries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className={styles.pages}>
                  {filtered.map((entry) => (
                    <article key={entry._id} className={styles.page}>
                      <Tape className={styles.pageTape} color="rgba(165,207,235,0.45)" rotation={4} width={90} />
                      <div className={styles.pageHeader}>
                        <div className={styles.pageMeta}>
                          <span className={styles.pageDate}>{formatDate(entry.date)}</span>
                          <span className={styles.pageMood}>{getMoodEmoji(entry.mood)}</span>
                        </div>
                        <div className={styles.pageActions}>
                          <button className={styles.actionBtn} onClick={() => handleEdit(entry)}>✏️ Edit</button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(entry._id)}>🗑️</button>
                        </div>
                      </div>
                      <h3 className={styles.pageTitle}>{entry.title}</h3>
                      <div className={styles.pageBody}>
                        <p className={styles.pageContent}>{entry.content}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className={styles.empty}>
                    <div className={styles.emptyDoodle}>
                      <Heart style={{ width: 26, height: 26 }} />
                      <span style={{ fontSize: 40, display: 'inline-block', transform: 'rotate(-6deg)' }}>📖</span>
                      <Star style={{ width: 24, height: 24 }} />
                    </div>
                    <p>No diary entries yet. Start writing!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      {toast.message && <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.message}</div>}
      </div>
    </>
  );
}
