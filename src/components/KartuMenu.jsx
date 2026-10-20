function KartuMenu({ nama, kategori }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
      <h3 style={{ margin: '0 0 5px 0' }}>{nama}</h3>
      <p style={{ margin: 0, color: '#555' }}>Kategori: {kategori}</p>
    </div>
  );
}

export default KartuMenu