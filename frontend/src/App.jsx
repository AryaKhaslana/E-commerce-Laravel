import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Minta data ke Backend Laravel lo
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        console.log("✅ DATA MASUK:", response.data) // Cek Console kalo penasaran
        setProducts(response.data)
      })
      .catch(error => {
        console.error("❌ GAGAL KONEK:", error)
      })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>👟 STRIDE COMMERCE (Data dari Laravel)</h1>
      <p>Kalau list di bawah ini muncul, berarti Backend & Frontend lo udah SAH!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        
        {products.length === 0 ? (
          <p>⏳ Sedang mengambil data dari gudang...</p>
        ) : (
          products.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px' }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
              />
              <h3>{item.name}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>Rp {item.price.toLocaleString()}</p>
              <p style={{ color: '#666', fontSize: '14px' }}>Stok: {item.stock}</p>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default App