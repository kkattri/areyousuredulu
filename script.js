// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaf4dIRfvSmUGemeGOADMzplwQbqeESEs",
  authDomain: "duylanoneyearletter.firebaseapp.com",
  projectId: "duylanoneyearletter",
  storageBucket: "duylanoneyearletter.firebasestorage.app",
  messagingSenderId: "359448781769",
  appId: "1:359448781769:web:18c0f1907ef8444dc63e18",
  measurementId: "G-LKBH3DHJMG"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Correctly initializes Firestore

document.addEventListener('DOMContentLoaded', function () {
  // Password check for index.html
  if (document.getElementById('passwordForm')) {
    document.getElementById('passwordForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const code = document.getElementById('password').value;
      if (code === '2803') window.location.href = 'https://kkattri.github.io/oneyearduylan/page2.html';
      if (code === '1505') window.location.href = 'https://kkattri.github.io/oneyearduylan/page3.html';
    });
  }

  // Page 2 functionality
  if (document.querySelector('#log2')) {
    const logContainer = document.getElementById('log2');
    const messageBox = document.querySelector('.message-box');
    const sendBtn = document.querySelector('.send-btn');
    let yesNo = '';

    document.querySelectorAll('.love-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        yesNo = this.textContent;
        document.querySelectorAll('.love-btn').forEach((b) => (b.style.backgroundColor = '#ff6b6b'));
        this.style.backgroundColor = '#4ecdc4';
      });
    });

    sendBtn.addEventListener('click', function () {
      if (yesNo && messageBox.value) {
        const entry = {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Use Firestore server timestamp
          answer: yesNo,
          message: messageBox.value
        };

        // Save log to Firestore
        db.collection('loveLogs')
          .add(entry)
          .then(() => {
            console.log('Log saved successfully!');
            messageBox.value = ''; // Clear input box
            loadLogs(); // Reload logs after saving
          })
          .catch((error) => {
            console.error('Error saving log: ', error);
          });
      }
    });

    function loadLogs() {
      logContainer.innerHTML = '';
      db.collection('loveLogs')
        .orderBy('timestamp', 'desc') // Order logs by timestamp (newest first)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const log = doc.data();
            const div = document.createElement('div');
            div.className = 'log-entry';
            div.innerHTML = `
              <p><strong>${new Date(log.timestamp.toDate()).toLocaleString()}</strong></p>
              <p>Answer: ${log.answer}</p>
              <p>Message: ${log.message}</p>
            `;
            logContainer.appendChild(div);
          });
        })
        .catch((error) => {
          console.error('Error loading logs: ', error);
        });
    }

    loadLogs(); // Load logs when the page loads
  }

  // Page 3 display
  if (document.querySelector('#log3')) {
    const logContainer = document.getElementById('log3');

    db.collection('loveLogs')
      .orderBy('timestamp', 'desc') // Order logs by timestamp (newest first)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const log = doc.data();
          const div = document.createElement('div');
          div.className = 'log-entry';
          div.innerHTML = `
            <p><strong>${new Date(log.timestamp.toDate()).toLocaleString()}</strong></p>
            <p>He said: ${log.answer}</p>
            <p>Message: ${log.message}</p>
          `;
          logContainer.appendChild(div);
        });
      })
      .catch((error) => {
        console.error('Error loading logs: ', error);
      });
  }
});
