/******categs */
const removeCateg = (cId) => {
  if (confirm('سيتم حذف هذا القسم نهائيا هل انت متأكد؟')) {
    fetch(`/admin/remove-categ/${cId}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        location.reload();
      }).catch(err => {
        console.log(err)
      })
  }
}
const removeProd = (id, t) => {
  if (confirm('حذف المنتج')) {
    fetch(`/admin/remove-prod/${id}`)
      .then(res => {
        if (res.status == 200) {
          location.reload()
        }
      })
      .catch(err => {
        alert(err)
      })
  }
}
const removeProdImg = (pId, img, t) => {
  if (confirm('حذف الصورة')) {
    fetch(`/admin/remove-prod-img/${pId}/?img=${img}`)
      .then(res => {
        if (res.status == 200) {
          t.parentNode.remove()
        }
      })
      .catch(err => {
        alert(err)
      })
  }
}