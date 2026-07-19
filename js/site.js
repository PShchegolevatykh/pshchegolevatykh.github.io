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

     async function getUtterancesCommentCounts() {
          const response = await fetch(
               'https://api.github.com/repos/PShchegolevatykh/pshchegolevatykh.github.io/issues?state=all&per_page=100'
          );

          if (!response.ok) {
               throw new Error(`GitHub API returned ${response.status}`);
          }

          const issues = await response.json();

          const result = new Map();

          for (const issue of issues) {
               result.set(issue.title, issue.comments);
          }

          return result;
     }

     getUtterancesCommentCounts()
          .then((counts) => {
               $('.comment-count').each(function () {
                    const pathname = $(this).data('post-url');
                    const count = counts.get(pathname) ?? 0;
                    $(this).text(count);
               });
          })
          .catch(console.error);
});