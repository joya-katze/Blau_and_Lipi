document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('theme-select');
  
  // Cargar tema guardado previamente si existe, o usar 'dark' por defecto
  const savedTheme = localStorage.getItem('lipi-theme') || 'dark';
  
  if (select) {
    select.value = savedTheme;
  }
  
  applyTheme(savedTheme);

  if (select) {
    select.addEventListener('change', (e) => {
      const theme = e.target.value;
      localStorage.setItem('lipi-theme', theme);
      applyTheme(theme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      updateAutoTheme(mediaQuery);
      
      mediaQuery.onchange = (e) => {
        if (localStorage.getItem('lipi-theme') === 'auto') {
          updateAutoTheme(mediaQuery);
        }
      };
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function updateAutoTheme(mediaQuery) {
    document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
  }
});