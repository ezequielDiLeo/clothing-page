
import './scrollBtn.scss';
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? 'scroll-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};
