import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Ambil data user dari penyimpanan browser
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Fungsi Logout
    const handleLogout = () => {
        localStorage.clear(); // Hapus token & user
        alert("Dadah Broskie! 👋");
        navigate('/login');
        // Reload halaman biar Navbarnya nge-refresh (berubah jadi mode tamu)
        window.location.reload(); 
    };

    return (
        <nav style={styles.nav}>
            {/* LOGO / NAMA TOKO */}
            <div style={styles.logo}>
                <Link to="/" style={styles.linkLogo}>🛒 Toko Broskie</Link>
            </div>

            {/* MENU LINK */}
            <div style={styles.menu}>
                <Link to="/" style={styles.link}>Home</Link>

                {/* LOGIKA: Kalo udah Login */}
                {token ? (
                    <>
                        {/* Kalo dia ADMIN, munculin tombol khusus */}
                        {user && user.role === 'admin' && (
                            <Link to="/admin" style={styles.linkAdmin}>Dashboard</Link>
                        )}
                        
                        <Link to="/history" style={styles.link}>Riwayat</Link>

                        <Link to="/cart" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        background: '#333', 
                        padding: '5px 10px', 
                        borderRadius: '5px' 
                        }}>
                          Keranjang 🛒
                        </Link>
                        
                        <button onClick={handleLogout} style={styles.btnLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    /* LOGIKA: Kalo Belum Login */
                    <>
                        <Link to="/login" style={styles.btnLogin}>Login</Link>
                        <Link to="/register" style={styles.link}>Daftar</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

// CSS SEDERHANA BIAR RAPI (Inline Style)
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 50px',
        backgroundColor: '#1a1a1a', // Warna Hitam Elegan
        color: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    menu: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    linkLogo: {
        textDecoration: 'none',
        color: '#00f2ea', // Warna Cyan Neon
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
        transition: '0.3s'
    },
    linkAdmin: {
        textDecoration: 'none',
        color: '#ff4d4d', // Merah buat Admin
        fontWeight: 'bold'
    },
    btnLogout: {
        padding: '8px 15px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    btnLogin: {
        padding: '8px 15px',
        backgroundColor: '#00f2ea',
        color: 'black',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
    }
};

export default Navbar;