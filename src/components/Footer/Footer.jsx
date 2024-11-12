import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Lanchonete Todos os direitos reservados.</p>
      <div>
        <a href="https://www.facebook.com" target="_blank"> Facebook </a>
        <a href="https://www.instagram.com" target="_blank"> Instagram </a>
        <a href="https://www.twitter.com" target="_blank"> Twitter </a>
      </div>
    </footer>
  );
}

export default Footer;
