import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const STORAGE_KEY = 'moshood-profile';

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const initialProfile = useRef((() => {
    let registration = {};
    let profile = {};

    try {
      const regData = localStorage.getItem('moshood-registration');
      registration = regData ? JSON.parse(regData) : {};
    } catch {
      registration = {};
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      profile = raw ? JSON.parse(raw) : {};
    } catch {
      profile = {};
    }

    const hydratedImages = Array.isArray(profile.images) && profile.images.length
      ? profile.images
      : (profile.avatarImage ? [{ id: 'legacy-avatar', dataUrl: profile.avatarImage }] : []);

    return {
      firstName: profile.firstName ?? registration.firstName ?? '',
      lastName: profile.lastName ?? registration.lastName ?? '',
      phone: profile.phone ?? registration.phone ?? '',
      images: hydratedImages,
      avatarId: profile.avatarId ?? (hydratedImages[0] ? hydratedImages[0].id : null),
    };
  })()).current;
  const [persistError, setPersistError] = useState('');
  const [firstName, setFirstName] = useState(initialProfile.firstName);
  const [lastName, setLastName] = useState(initialProfile.lastName);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [images, setImages] = useState(initialProfile.images); // array of { id, dataUrl }
  const [avatarId, setAvatarId] = useState(initialProfile.avatarId);

  useEffect(() => {
    const activeAvatar = images.find((img) => img.id === avatarId)?.dataUrl || images[0]?.dataUrl || null;
    const payload = { firstName, lastName, phone, images, avatarId, avatarImage: activeAvatar };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setPersistError('');
    } catch (e) {
      if (images.length > 1) {
        const reducedImages = [images[0]];
        const reducedPayload = {
          firstName,
          lastName,
          phone,
          images: reducedImages,
          avatarId: reducedImages[0].id,
          avatarImage: reducedImages[0].dataUrl,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedPayload));
          setImages(reducedImages);
          setAvatarId(reducedImages[0].id);
          setPersistError('Saved only one photo to fit browser storage.');
          return;
        } catch {
          // fall through to generic message
        }
      }
      setPersistError('Could not save photo. Try another smaller image.');
    }
  }, [firstName, lastName, phone, images, avatarId]);

  // derive avatar from registration/localStorage when no uploaded avatar exists
  const registrationData = (() => {
    try {
      const saved = localStorage.getItem('moshood-registration');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  })();
  const storedLastName = registrationData?.lastName || localStorage.getItem('registeredLastName')?.trim();
  const avatarInitial = (storedLastName?.trim()?.charAt(0) || 'M').toUpperCase();
  const avatarPalette = [
    { background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: '#fff' },
    { background: 'linear-gradient(135deg, #b45309, #f59e0b)', color: '#fff' },
    { background: 'linear-gradient(135deg, #1d4ed8, #38bdf8)', color: '#fff' },
    { background: 'linear-gradient(135deg, #7c2d12, #ef4444)', color: '#fff' },
    { background: 'linear-gradient(135deg, #3f6212, #84cc16)', color: '#fff' },
  ];
  const avatarTheme = avatarPalette[avatarInitial.charCodeAt(0) % avatarPalette.length];

  function readFileAsDataURL(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  function compressImage(file, maxSize = 512, quality = 0.6) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(selectedFiles) {
    if (!selectedFiles || !selectedFiles.length) return;
    const file = selectedFiles[0];
    try {
      const dataUrl = await compressImage(file);
      const id = Date.now().toString() + Math.random().toString(36).slice(2);
      const nextImage = { id, dataUrl };
      setImages([nextImage]);
      setAvatarId(id);
      setPersistError('');
    } catch (e) {
      try {
        const fallbackDataUrl = await readFileAsDataURL(file);
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        const nextImage = { id, dataUrl: fallbackDataUrl };
        setImages([nextImage]);
        setAvatarId(id);
        setPersistError('');
      } catch {
        setPersistError('Could not read selected image. Please try again.');
      }
    }
  }

  function handleRemove(id) {
    setImages(prev => prev.filter(p => p.id !== id));
    if (avatarId === id) {
      const remaining = images.filter(p => p.id !== id);
      setAvatarId(remaining[0] ? remaining[0].id : null);
    }
  }

  function handleSetAvatar(id) {
    setAvatarId(id);
  }

  function handleClearAll() {
    setImages([]);
    setAvatarId(null);
    setFirstName('');
    setLastName('');
    setPhone('');
    localStorage.removeItem(STORAGE_KEY);
    setPersistError('');
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          "radial-gradient(circle at top left, rgba(0, 107, 63, 0.12), transparent 34%), radial-gradient(circle at bottom right, rgba(255, 211, 26, 0.12), transparent 24%), #f7faf8",
        color: '#1c1b1b',
      }}
    >
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 20px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ border: '1px solid #d6d3d1', background: 'rgba(255,255,255,0.88)', color: '#1c1b1b', borderRadius: 999, padding: '10px 16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>Back to dashboard</button>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#006b3f' }}>Profile</p>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#3e4a41' }}>Manage your account and avatar.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20, alignItems: 'start' }}>
          <div className="card">
            <div style={{ marginBottom: 18 }}>
              <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.05 }}>Your profile</h1>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: '#3e4a41' }}>Upload pictures, choose an avatar, and update display information.</p>
            </div>

            <div style={{ display: 'grid', gap: 18 }}>
              <div className="profile-section">
                <div className="profile-form">
                  <label className="label">First name</label>
                  <input className="input" value={firstName} onChange={e => setFirstName(e.target.value)} />

                  <label className="label">Last name</label>
                  <input className="input" value={lastName} onChange={e => setLastName(e.target.value)} />

                  <label className="label">Phone</label>
                  <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-primary" onClick={() => { alert('Profile saved.'); }}>Save</button>
              </div>
            </div>
          </div>

          <aside className="card aside">
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>Active profile</p>
            <h3 style={{ margin: '10px 0 0', fontSize: 20, lineHeight: 1.08 }}>Your avatar</h3>
            <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: '#ffffff' }}>Choose an avatar to represent you across the app.</p>

            <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const avatarImage = images.find(i => i.id === avatarId)?.dataUrl;
                    if (avatarImage) {
                      return <img src={avatarImage} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
                    }
                    return (
                      <div aria-hidden style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, background: avatarTheme.background, color: avatarTheme.color }}>
                        {avatarInitial}
                      </div>
                    );
                  })()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#ffffff' }}>{(firstName || lastName) ? `${firstName} ${lastName}`.trim() : 'No name set'}</div>
                  <div style={{ fontSize: 13, color: '#ffffff' }}>{phone || 'No phone set'}</div>
                </div>
              </div>

              <button type="button" onClick={() => fileRef.current && fileRef.current.click()} style={{ width: '100%', border: 'none', background: '#006b3f', color: '#fff', borderRadius: 12, padding: '12px 16px', fontWeight: 800, cursor: 'pointer', marginBottom: 12 }}>Add Picture</button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={async e => {
                  await handleFiles(e.target.files);
                  e.target.value = '';
                }}
                style={{ display: 'none' }}
              />

              {persistError ? (
                <p style={{ margin: '-4px 0 4px', fontSize: 12, color: '#fee2e2' }}>{persistError}</p>
              ) : null}

              <button type="button" onClick={() => setAvatarId(null)} style={{ width: '100%', border: 'none', background: '#dc2626', color: '#fff', borderRadius: 12, padding: '12px 16px', fontWeight: 800, cursor: 'pointer', marginBottom: 12 }}>Remove Picture</button>

              <button type="button" onClick={() => navigate('/dashboard')} style={{ width: '100%', border: 'none', background: '#fff', color: '#006b3f', borderRadius: 12, padding: '12px 16px', fontWeight: 800, cursor: 'pointer' }}>Return to dashboard</button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
