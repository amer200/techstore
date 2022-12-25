const slide = document.getElementById('slide');

const changeImg = (e) => {
    slide.src = e.src
}
const addTocard = (id) => {
    fetch(`/add-to-card/${id}`)
        .then(res => {
            location.reload();
        })
        .catch(err => {
            alert(err.message)
        })
}