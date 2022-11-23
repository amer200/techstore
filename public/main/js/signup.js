const signupReq = () => {
    const pass1 = document.getElementsByName('password')[0];
    const pass2 = document.getElementsByName('password')[1];
    const name = document.getElementsByName('name');
    const email = document.getElementsByName('email');
    const phone = document.getElementsByName('phone');
    const zip = document.getElementsByName('zip');
    const address = document.getElementsByName('address');
    const city = document.getElementsByName('city');
    const country = document.getElementsByName('country');
    const surName = document.getElementsByName('surname');
    if (pass1.value !== pass2.value) {
        alert('كلمة المرور غير متطابقة')
    } else if (!pass1.value || !pass2.value || !name.value || !email.value || !phone.value || !zip.value || !address.value || !city.value || !country.value || !surName.value) {
        alert('يجب كتابة كل الحقول')
    } else {
        const user = {
            password: pass1.value,
            name: name.value,
            email: email.value,
            phone: phone.value,
            zip: zip.value,
            address: address.value,
            city: city.value,
            country: country.value,
            surname: surName.value
        }
        fetch('/signup', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}