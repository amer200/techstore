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
const ordersByStatus = (stat) => {
  console.log(stat)
  const ordersByStat = Array.from(document.getElementsByClassName(`o-${stat}`));
  const allOrders = Array.from(document.getElementsByClassName('orders'));
  allOrders.forEach(o => {
    o.classList.add('d-none')
  })
  ordersByStat.forEach(o => {
    o.classList.remove('d-none')
  })
  console.log(ordersByStat)
}
const ChangeOrderStat = (stat, id) => {
  fetch(`/admin/change-order-stat/${stat}/${id}`)
    .then(res => {
      location.reload()
    })
    .catch(err => {
      console.log(err)
    })
}