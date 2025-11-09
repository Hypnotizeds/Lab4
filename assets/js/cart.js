
/* Simple cart using localStorage */
const CART_KEY = 'sushi_cart_v1';
const fmt = n => new Intl.NumberFormat('ru-RU').format(n);

function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[] }catch(e){ return [] } }
function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCounter(); }

function addToCart(item){
  const cart = getCart();
  const idx = cart.findIndex(x=>x.id===item.id);
  if(idx>-1){ cart[idx].qty += item.qty||1; } else { cart.push({...item, qty:item.qty||1}); }
  saveCart(cart);
}

function removeFromCart(id){
  let cart = getCart().filter(x=>x.id!==id);
  saveCart(cart);
  renderCartIfExists();
}

function changeQty(id, delta){
  const cart = getCart();
  const it = cart.find(x=>x.id===id);
  if(!it) return;
  it.qty = Math.max(1, it.qty + delta);
  saveCart(cart);
  renderCartIfExists();
}

function clearCart(){ saveCart([]); renderCartIfExists(); }

/* Render helpers */
function renderCart(containerId='cartView', withForm=false){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  const cart = getCart();
  if(cart.length===0){
    wrap.innerHTML = '<p>Корзина пуста. Перейдите в <a href="products.html">Товары</a>.</p>';
    return;
  }
  let total = 0;
  let html = '<div class="cart">';
  cart.forEach(it=>{
    const sum = it.price*it.qty; total += sum;
    html += `<div class="cart__row">
      <div class="cart__title">
        <img src="${it.img}" alt="${it.name}">
        <div><div><strong>${it.name}</strong></div><div class="card__text">${fmt(it.price)} ₽ / шт.</div></div>
      </div>
      <div class="cart__qty">
        <button class="btn btn--ghost" onclick="changeQty('${it.id}',-1)" aria-label="Уменьшить">−</button>
        <span>${it.qty}</span>
        <button class="btn btn--ghost" onclick="changeQty('${it.id}',1)" aria-label="Увеличить">+</button>
      </div>
      <div class="cart__sum"><strong>${fmt(sum)} ₽</strong></div>
      <div><button class="btn btn--ghost" onclick="removeFromCart('${it.id}')">Удалить</button></div>
    </div>`;
  });
  html += `<div class="cart__total">Итого: ${fmt(total)} ₽</div>`;
  html += `<div class="card__actions"><a href="checkout.html" class="btn btn--brand">Оформить заказ</a><button class="btn btn--ghost" onclick="clearCart()">Очистить</button></div>`;
  html += '</div>';
  if(withForm){
    html += `
    <section class="mt-4" aria-label="Быстрое оформление">
      <h2>Быстрое оформление здесь</h2>
      <form class="form" onsubmit="event.preventDefault(); alert('Спасибо! Заказ оформлен.'); clearCart();">
        <input class="input" placeholder="Ваше имя" required>
        <input class="input" placeholder="Телефон" pattern="[0-9+ ()-]{6,}" required>
        <input class="input" placeholder="Адрес доставки" required>
        <button class="btn btn--brand" type="submit">Подтвердить заказ на ${fmt(total)} ₽</button>
      </form>
    </section>`;
  }
  wrap.innerHTML = html;
}

function renderCartIfExists(){
  const el = document.getElementById('cartView');
  if(el){ renderCart('cartView', true); }
  const sumEl = document.getElementById('checkoutSummary');
  if(sumEl){ renderCheckout(); }
}

function updateCartCounter(){
  const span = document.getElementById('cartCounter');
  if(!span) return;
  const cart = getCart();
  const c = cart.reduce((s,x)=>s+x.qty,0);
  span.textContent = c>0 ? `(${c})` : '';
}
document.addEventListener('DOMContentLoaded', updateCartCounter);

/* Checkout page */
function renderCheckout(){
  const box = document.getElementById('checkoutSummary');
  if(!box) return;
  const cart = getCart();
  if(cart.length===0){ box.innerHTML='<p>Корзина пуста.</p>'; return; }
  let total = 0;
  let rows = cart.map(it=>{ const sum = it.price*it.qty; total+=sum; return `<li>${it.name} × ${it.qty} — <strong>${fmt(sum)} ₽</strong></li>`; }).join('');
  box.innerHTML = `<ul>${rows}</ul><p><strong>Итого: ${fmt(total)} ₽</strong></p>`;
}

/* Binding for "add to cart" buttons */
function bindAddButtons(){
  document.querySelectorAll('[data-add]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price,10),
        img: btn.dataset.img
      };
      addToCart(item);
      btn.textContent = 'В корзине ✓';
      setTimeout(()=>btn.textContent='В корзину',1200);
    });
  });
}
document.addEventListener('DOMContentLoaded', bindAddButtons);
