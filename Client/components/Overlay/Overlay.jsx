function Overlay({ children, style, onClick }) {
  return (
    <div className="overlay" onClick={onClick} style={{ display: style }}>
      {children}
    </div>
  );
}

export default Overlay;
