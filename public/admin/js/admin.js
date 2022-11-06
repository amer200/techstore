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