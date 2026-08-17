'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navigation from '@/components/Navigation';
import { Heart, Star, Flower, Sparkle, Cloud, Squiggle, Bow, Tape } from '@/components/doodles';
import styles from './page.module.css';

const API_URL = 'http://localhost:5000/api';

interface Note {
  _id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdDate: string;
  updatedDate: string;
}

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const showToast = (message: string, type: string = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`, { credentials: 'include' });
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch {
      showToast('Failed to load notes', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_URL}/notes/${editingId}` : `${API_URL}/notes`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      if (res.ok) {
        showToast(editingId ? 'Note updated' : 'Note created');
        setShowModal(false);
        setForm({ title: '', content: '' });
        setEditingId(null);
        fetchNotes();
      }
    } catch {
      showToast('Server error', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this note?')) return;
    try {
      const res = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        showToast('Note deleted');
        fetchNotes();
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handlePin = async (note: Note) => {
    try {
      await fetch(`${API_URL}/notes/${note._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...note, pinned: !note.pinned })
      });
      fetchNotes();
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note._id);
    setForm({ title: note.title, content: note.content });
    setShowModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

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
              My Notes
              <span className={styles.titleFlower}><Flower petal="#A9CFEB" /></span>
            </h1>
            <button className={styles.addBtn} onClick={() => { setEditingId(null); setForm({ title: '', content: '' }); setShowModal(true); }}>
              + Add Note
            </button>
          </div>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍  Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.grid}>
            {filtered.map((note) => (
              <div key={note._id} className={`${styles.card} ${note.pinned ? styles.pinned : ''}`}>
                <Tape
                  className={styles.cardTape}
                  color="rgba(248,187,208,0.5)"
                  rotation={-3}
                  width={70}
                />
                {note.pinned && <span className={styles.pinBadge}>📌</span>}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{note.title}</h3>
                  <p className={styles.cardText}>{note.content}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardDate}>{formatDate(note.updatedDate)}</span>
                  <div className={styles.cardActions}>
                    <button className={styles.actionBtn} onClick={() => handlePin(note)}>
                      {note.pinned ? '📌 Unpin' : '📌 Pin'}
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleEdit(note)}>✏️ Edit</button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(note._id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyDoodle}>
                <Heart style={{ width: 24, height: 24 }} />
                <span style={{ fontSize: 38, display: 'inline-block', transform: 'rotate(-6deg)' }}>📝</span>
                <Star style={{ width: 22, height: 22 }} />
              </div>
              <p>No notes yet. Start writing!</p>
            </div>
          )}
        </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Tape className={styles.modalTape} color="rgba(248,187,208,0.55)" rotation={-3} width={110} />
            <Heart className={styles.modalDoodle1} />
            <Sparkle className={styles.modalDoodle2} />
            <button type="button" className={styles.closeBtn} onClick={() => setShowModal(false)} aria-label="Close">×</button>
            <h2 className={styles.modalTitle}>{editingId ? 'Edit Note' : 'New Note'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input className={styles.modalInput} placeholder="Note title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea className={`${styles.modalInput} ${styles.ruledTextarea}`} rows={6} placeholder="Write your note here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>{editingId ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.message && <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.message}</div>}
      </div>
    </>
  );
}
