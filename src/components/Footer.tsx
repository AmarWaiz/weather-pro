export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="copy-badge">
          <span className="dot" />
          copyright@waiz <span className="year">{new Date().getFullYear()}</span>
        </span>
      </div>
    </footer>
  );
}
