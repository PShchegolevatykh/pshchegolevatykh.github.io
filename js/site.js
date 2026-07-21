function createUtterances(pathname) {
     const script = document.createElement("script");

     script.src = "https://utteranc.es/client.js";
     script.async = true;
     script.crossOrigin = "anonymous";

     script.setAttribute("repo", "PShchegolevatykh/pshchegolevatykh.github.io");
     script.setAttribute("issue-term", pathname);
     script.setAttribute(
          "theme",
          document.documentElement.getAttribute("data-theme") === "dark"
               ? "github-dark"
               : "github-light"
     );

     const comments = document.getElementById("comments-section");

     comments.innerHTML = "";
     comments.appendChild(script);
}

// export global functions
window.blog = {
     createUtterances
};

$(document).ready(function () {
     $('.button-collapse').sideNav();

     // this checks whether system dark mode is set
     const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

     function setUtterancesTheme(theme) {
          const iframe = document.querySelector('.utterances-frame');

          if (!iframe) {
               return;
          }

          iframe.contentWindow.postMessage(
               {
                    type: 'set-theme',
                    theme: theme === 'dark'
                         ? 'github-dark'
                         : 'github-light'
               },
               "https://utteranc.es"
          );
     }

     function applyTheme(theme, rememberChoice) {
          document.documentElement.setAttribute('data-theme', theme);

          $('.theme-toggle').text(
               theme === 'dark'
                    ? 'Light Theme'
                    : 'Dark Theme'
          );

          if (rememberChoice) {
               sessionStorage.setItem('theme', theme);
          } else {
               sessionStorage.removeItem('theme');
          }

          setUtterancesTheme(theme);
     }

     // Initial theme
     const savedTheme = sessionStorage.getItem('theme');

     if (savedTheme === 'dark' || savedTheme === 'light') {
          applyTheme(savedTheme, true);
     } else {
          applyTheme(systemTheme.matches ? 'dark' : 'light', false);
     }

     // React to OS theme changes only if user hasn't overridden it
     systemTheme.addEventListener('change', function (e) {
          if (!sessionStorage.getItem('theme')) {
               applyTheme(e.matches ? 'dark' : 'light', false);
          }
     });

     // Manual toggle
     $('.theme-toggle').on('click', function () {
          const currentTheme = document.documentElement.getAttribute('data-theme');

          applyTheme(
               currentTheme === 'dark'
                    ? 'light'
                    : 'dark',
               true
          );
     });

     $(document).trigger("themeinitialized");
});