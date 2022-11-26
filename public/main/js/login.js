
const loginReq = () => {
    const email = document.getElementsByName('email')[0];
    const password = document.getElementsByName('password')[0];

    const data = new FormData();
    data.append('email', email.value);
    data.append('password', password.value);
    console.log(data)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}