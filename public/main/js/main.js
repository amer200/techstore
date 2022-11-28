const addCard = (pId) => {
    console.log(pId)
    fetch(`/add-to-card/${pId}`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => {
            console.log(err)
        })
}