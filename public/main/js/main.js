const addCard = (pId) => {
    fetch(`/add-to-card/${pId}`)
        .then(res => {
            if (res.status !== 200) {
                location.href = '/login';
            } else {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err)
        })
}
const minCard = (pId) => {
    console.log(pId)
    fetch(`/min-from-card/${pId}`)
        .then(res => {
            if (res.status !== 200) {
                location.href = '/login';
            } else {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err)
        })
}
const plusCard = (pId) => {
    console.log(pId)
    fetch(`/plus-from-card/${pId}`)
        .then(res => {
            if (res.status !== 200) {
                location.href = '/login';
            } else {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err)
        })
}