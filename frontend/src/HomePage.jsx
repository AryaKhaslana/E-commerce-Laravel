import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <--- Kita butuh ini buat link

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = async (productId) => {
    try {
        // Ambil token dari localStorage (kalo user udah login)
        const token = localStorage.getItem('token'); 

        if (!token) {
            alert("Eits, Login dulu bos!");
            return;
        }

        await axios.post('http://127.0.0.1:8000/api/cart', {
            product_id: productId,
            quantity: 1
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        alert("Berhasil masuk keranjang! 🛒");
        
    } catch (error) {
        console.error(error);
        alert("Gagal nambahin barang. Stok abis kali?");
    }
};

  const getImageUrl = (imagePath) => {
    // 1. Kalo gak ada gambar, kasih gambar placeholder (abu-abu)
    if (!imagePath) return 'https://placehold.co/150';
    
    // 2. Kalo gambarnya link online (https://...) biarin aja (Produk Seeding)
    if (imagePath.startsWith('http')) return imagePath;
    
    // 3. Kalo ini hasil upload, gabungin sama link Laravel Storage
    return `http://127.0.0.1:8000/storage/${imagePath}`;
};

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1>👟 STRIDE COMMERCE</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products?.data?.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px' }}>
            <img src={getImageUrl(item.image_url)} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{item.name}</h3>
            <p>Rp {item.price}</p>
            
            {/* TOMBOL KE HALAMAN DETAIL */}
            <Link to={`/product/${item.id}`}>
                <button style={{ background: 'blue', color: 'white', padding: '5px 10px' }}>
                    Lihat Detail 👉
                </button>
            </Link>
            <button 
        onClick={() => addToCart(item.id)} // Nanti kita bikin fungsinya
        style={{ 
            background: '#22c55e', // Warna Hijau
            color: 'white', 
            padding: '8px 15px', 
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }}
    >
        <span>+ Keranjang</span> 🛒
    </button>
          </div>
        ))}
      </div>
    </div>
  );
}