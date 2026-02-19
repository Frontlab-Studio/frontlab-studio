// --- MENU MOBILE ---
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const closeLinks = document.querySelectorAll('.close-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

closeLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// --- LÓGICA DO CARRINHO ---
let cart = []; // Array que guarda os produtos
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const closeCartBtn = document.querySelector('.close-cart');

// Abrir Carrinho ao clicar no ícone
function openCart() {
    cartModal.classList.add('active');
}

// Fechar Carrinho
closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Fechar ao clicar fora
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Função Adicionar ao Carrinho
function addToCart(name, price, image) {
    // Verifica se já existe
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCartModal();
    openCart(); // Abre o carrinho automaticamente para feedback
}

// Atualizar o HTML do Carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio.</p>';
    }

    cartTotalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCountElement.innerText = count;
}

// --- CHECKOUT WHATSAPP ---
function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const phoneNumber = "5543999999999"; // COLOQUE SEU NÚMERO AQUI
    let message = "Olá! Gostaria de finalizar meu pedido no site LUMINA:\n\n";

    cart.forEach(item => {
        message += `▪ ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    const totalText = cartTotalElement.innerText;
    message += `\n*Total do Pedido: ${totalText}*`;
    message += "\n\nAguardo confirmação de pagamento e entrega!";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// --- CONTADORES E ANIMAÇÕES ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.fade-in, .reveal-bottom');
hiddenElements.forEach((el) => observer.observe(el));

// Countdown Timer
const targetDate = new Date().getTime() + (5 * 60 * 60 * 1000) + (42 * 60 * 1000); // 5h 42m

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeBoxes = document.querySelectorAll('.time-box');
    
    if(timeBoxes.length > 0) {
        timeBoxes[0].childNodes[0].nodeValue = hours < 10 ? "0" + hours : hours;
        timeBoxes[1].childNodes[0].nodeValue = minutes < 10 ? "0" + minutes : minutes;
        timeBoxes[2].childNodes[0].nodeValue = seconds < 10 ? "0" + seconds : seconds;
    }
}, 1000);
// --- NEWSLETTER VIA WHATSAPP ---
function joinClub(event) {
    event.preventDefault(); // Impede a página de recarregar
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

    if (!email) {
        alert("Por favor, digite seu e-mail!");
        return;
    }

    const phoneNumber = "5543999999999"; // SEU NÚMERO AQUI
    
    // A mágica: Monta a mensagem pedindo o cupom
    const message = `Olá! Quero entrar para o Clube Lumina e ganhar *10% OFF* na minha primeira compra.\n\nMeu e-mail de cadastro é: ${email}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp
    window.open(url, '_blank');
    
    // Limpa o campo e agradece
    emailInput.value = "";
    alert("Redirecionando para o WhatsApp para retirar seu cupom!");
}