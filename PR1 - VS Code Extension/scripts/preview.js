(function() {
    function ensureStyles() {
        document.documentElement.style.setProperty('background-color', '#c0c0c0', 'important');
        document.documentElement.style.setProperty('color', '#24292f', 'important');
        document.body.style.setProperty('background-color', '#c0c0c0', 'important');
        document.body.style.setProperty('color', '#24292f', 'important');
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureStyles);
    } else {
        ensureStyles();
    }
    setTimeout(() => {
        document.querySelectorAll('.spoiler details').forEach(details => {
            details.addEventListener('toggle', () => {
                if (details.open) {
                    details.style.animation = 'fadeIn 0.5s';
                }
            });
        });
    }, 200);
})();