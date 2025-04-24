document.getElementById('unlock').addEventListener('click', () => {
    const password = document.getElementById('password').value;
    
    if(password === '1505') {
        sessionStorage.setItem('access', '1505');
        window.location.href = '/l0v3t1m3l1n3_xXx.html';
    } else if(password === '1596') {
        sessionStorage.setItem('access', '1596');
        window.location.href = '/m3m0r13s_7h3h3.html';
    } else {
        alert('Incorrect code');
    }
});