export default function Frame({ children }) {
  return (
    <div className="frame shadow">
      <div className="subFrame">{children}</div>
    </div>
  );
}
