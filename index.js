//---------------------------------------------------------------
let images = []
images.push('banner1.png')
images.push('banner2.png')
images.push('banner3.png')
let index = 0
let banner = document.querySelector('.banner')
banner.style.backgroundImage = `url(${images[index]})`
function changeslide(bool) {
  clearInterval(intervalid)
  if (bool == true) {
    index = (index + 1) % images.length
  } else {
    index = (index - 1 + images.length) % images.length
  }
  banner.style.backgroundImage = `url(${images[index]})`
  console.log(index)
  
  setTimeout(() => {
    intervalid = setInterval(changeslideauto, 5000);
  }, 1000);
}
  // changeslideauto()

let nextslide = document.getElementById('next_banner')
let prevslide = document.getElementById('previous_banner')

nextslide.addEventListener('click', function () {
  changeslide(true)
})
prevslide.addEventListener('click', function () {
  changeslide(false)
})

function changeslideauto() {
  banner.style.backgroundImage = `url(${images[index]})`
  if (index < images.length - 1) index++
  else index = 0
  console.log('called')
}
let intervalid = setInterval(() => {
  changeslideauto()
}, 5000)
window.onload = changeslideauto
//---------------------------------------------------------


const nextBtns = document.querySelectorAll('#next_product')
const prevBtns = document.querySelectorAll('#previous_product')

prevBtns.forEach(btn => {
  btn.style.display = 'none';
});

nextBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const productContainer = btn.closest('.item-list')
    const products = productContainer.querySelectorAll('.seedbox')
    const prevBtn = productContainer.querySelector('#previous_product')
    const nextBtn = productContainer.querySelector('#next_product')
    if(!productContainer.counter){
      productContainer.counter=0;
    }
    console.log(products)
    if (productContainer.counter < 7) {
      productContainer.counter++
      products.forEach((Element) => {
        Element.style.right = `${productContainer.counter * 16.4}vw`
      })
    }
    if (productContainer.counter == 7) {
      nextBtn.style.display = 'none'
    }
    if (productContainer.counter>0) {
      prevBtn.style.display = 'block'
    }
    console.log('pressed', productContainer.counter)
  })
})

prevBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const productContainer = btn.closest('.item-list')
    const products = productContainer.querySelectorAll('.seedbox')
    const prevBtn = productContainer.querySelector('#previous_product')
    const nextBtn = productContainer.querySelector('#next_product')
    console.log(products)
    if (productContainer.counter >= 1) {
      
      products.forEach((Element) => {
        Element.style.right = `${(productContainer.counter - 1) * 16.4}vw`
      })
      productContainer.counter--
    }
    if (productContainer.counter <1) {
      prevBtn.style.display = 'none'
    }
    if (productContainer.counter<7) {
      nextBtn.style.display = 'block'
    }

    console.log('pressed', productContainer.counter)
  })
})
