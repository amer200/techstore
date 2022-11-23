const signupReq = () => {
    const form = document.getElementById('signupForm');
    const pass1 = document.getElementsByName('password')[0];
    const pass2 = document.getElementsByName('password')[1];
    const name = document.getElementsByName('name')[0];
    const email = document.getElementsByName('email')[0];
    const phone = document.getElementsByName('phone')[0];
    const zip = document.getElementsByName('zip')[0];
    const address = document.getElementsByName('address')[0];
    const city = document.getElementsByName('city')[0];
    const country = document.getElementsByName('country')[0];
    const surName = document.getElementsByName('surname')[0];
    if (pass1.value !== pass2.value) {
        alert('كلمة المرور غير متطابقة')
    } else if (pass1.value == '' || pass2.value == '' || name.value == '' || email.value == '' || phone.value == '' || zip.value == '' || address.value == '' || city.value == '' || country.value == '' || surName.value == '') {
        alert('يجب كتابة كل الحقول')
    } else {
        form.submit()
    }
}