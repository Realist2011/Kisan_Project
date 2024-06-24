module.exports.sortCategory = (products) => {
  let data = {}
  products.forEach((item) => {
    let category = item.category
    let categoryProducts = data[category] || []
    categoryProducts.push(item)
    data[category] = categoryProducts
  })
  console.log(data)
  return data
}
