// data.js
document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem('access') !== '1505') {
        window.location.href = '/';
    }

    Papa.parse('data.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById('entries');
            results.data.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'entry';
                div.innerHTML = `
                    <h3>${entry['Do I still love her?']}</h3>
                    <p>${entry.Message}</p>
                    <small>${entry['Date and Time']}</small>
                `;
                container.appendChild(div);
            });
        }
    });
});