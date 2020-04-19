$(document).ready(function() {
     $(".button-collapse").sideNav();
     // this checks whether system dark mode is set
     var systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)"); 
     // this checks for session storage telling to override
     // the system preferences
     var theme = sessionStorage.getItem('theme');
     if (systemInitiatedDark.matches) {
          $('.theme-toggle').html('Light Theme');
     } else {
          $('.theme-toggle').html('Dark Theme');
     }
     function prefersColorTest(systemInitiatedDark) {
          if (systemInitiatedDark.matches) {
               document.documentElement.setAttribute('data-theme', 'dark');
               $('.theme-toggle').html('Light Theme');
               // this clears the session storage 
               sessionStorage.setItem('theme', '');
          } else {
               document.documentElement.setAttribute('data-theme', 'light');
               $('.theme-toggle').html('Dark Theme');
               sessionStorage.setItem('theme', '');
          }
     }
     systemInitiatedDark.addListener(prefersColorTest);

     function toggleTheme() {
          let theme = sessionStorage.getItem('theme');
          if (theme === "dark") {
               document.documentElement.setAttribute('data-theme', 'light');
               sessionStorage.setItem('theme', 'light');
               $('.theme-toggle').html('Dark Theme');
          } else if (theme === "light") {
               document.documentElement.setAttribute('data-theme', 'dark');
               sessionStorage.setItem('theme', 'dark');
               $('.theme-toggle').html('Light Theme');
          } else if (systemInitiatedDark.matches) {
               document.documentElement.setAttribute('data-theme', 'light');
               sessionStorage.setItem('theme', 'light');
               $('.theme-toggle').html('Dark Theme');
          } else {
               document.documentElement.setAttribute('data-theme', 'dark');
               sessionStorage.setItem('theme', 'dark');
               $('.theme-toggle').html('Light Theme');
          }
     }

     $('.theme-toggle').on('click', toggleTheme);

     if (theme === "dark") {
          document.documentElement.setAttribute('data-theme', 'dark');
          sessionStorage.setItem('theme', 'dark');
          $('.theme-toggle').html('Light Theme');
     } else if (theme === "light") {
          document.documentElement.setAttribute('data-theme', 'light');
          sessionStorage.setItem('theme', 'light');
          $('.theme-toggle').html('Dark Theme');
     }
});