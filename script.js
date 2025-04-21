// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Password check for index.html
    if (document.getElementById('passwordForm')) {
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const code = document.getElementById('password').value;
            if (code === '2803') window.location.href = 'page2.html';
            if (code === '1505') window.location.href = 'page3.html';
        });
    }

    // Page 2 functionality
    if (document.querySelector('#log2')) {
        const logContainer = document.getElementById('log2');
        const messageBox = document.querySelector('.message-box');
        const sendBtn = document.querySelector('.send-btn');
        let yesNo = '';

        document.querySelectorAll('.love-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                yesNo = this.textContent;
                document.querySelectorAll('.love-btn').forEach(b => b.style.backgroundColor = '#ff6b6b');
                this.style.backgroundColor = '#4ecdc4';
            });
        });

        sendBtn.addEventListener('click', function() {
            if (yesNo && messageBox.value) {
                const entry = {
                    timestamp: new Date().toLocaleString(),
                    answer: yesNo,
                    message: messageBox.value
                };
                let logs = JSON.parse(localStorage.getItem('loveLogs')) || [];
                logs.push(entry);
                localStorage.setItem('loveLogs', JSON.stringify(logs));
                messageBox.value = '';
                loadLogs();
            }
        });

        function loadLogs() {
            logContainer.innerHTML = '';
            const logs = JSON.parse(localStorage.getItem('loveLogs')) || [];
            logs.forEach(log => {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = `
                    <p><strong>${log.timestamp}</strong></p>
                    <p>Answer: ${log.answer}</p>
                    <p>Message: ${log.message}</p>
                `;
                logContainer.appendChild(div);
            });
        }
        loadLogs();
    }

    // Page 3 display
    if (document.querySelector('#log3')) {
        const logContainer = document.getElementById('log3');
        const logs = JSON.parse(localStorage.getItem('loveLogs')) || [];
        
        logs.forEach(log => {
            const div = document.createElement('div');
            div.className = 'log-entry';
            div.innerHTML = `
                <p><strong>${log.timestamp}</strong></p>
                <p>He said: ${log.answer}</p>
                <p>Message: ${log.message}</p>
            `;
            logContainer.appendChild(div);
        });
    }
});