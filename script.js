let searchForm, header, menuBtn, sideBar, closeBtn, navbar;

document.addEventListener('DOMContentLoaded', function() {
    searchForm = document.querySelector('.header .flex .search-form');
    header = document.querySelector('.header');
    menuBtn = document.querySelector('#menu-btn');
    sideBar = document.querySelector('.side-bar');
    closeBtn = document.querySelector('#close-btn');
    navbar = document.querySelector('.side-bar .navbar')


    function closeSidebarWithAnimation() {
        if (navbar.classList.contains('slide-out')) return;
    
        navbar.classList.add('slide-out');
        navbar.addEventListener('animationend', function handler() {
            sideBar.classList.remove('active');
            navbar.classList.remove('slide-out');
            navbar.removeEventListener('animationend', handler);
        });
    }

    if (menuBtn && sideBar) {
        menuBtn.onclick = () => {
            sideBar.classList.add('active');
        }
    }

    if (closeBtn && sideBar) {
        closeBtn.onclick = closeSidebarWithAnimation;
    }



    window.onclick = function(e) {
        if (!sideBar || !sideBar.classList.contains('active')) return;
        if (menuBtn.contains(e.target)) return;

        if (navbar && navbar.contains(e.target)) return;

        closeSidebarWithAnimation();
    }

    // 移动端放大镜点击显示/隐藏搜索栏
    const searchToggler = document.getElementById('search-toggler');
    if (searchToggler && searchForm) {
        searchToggler.onclick = function(e) {
            e.stopPropagation(); 
            searchForm.classList.toggle('active');
        }
    }

    
   
    const username = localStorage.getItem('username');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (loginBtn && logoutBtn) {
        if (username) {
            loginBtn.innerHTML = `<i class="fas fa-user"></i>${username}`;
            loginBtn.href = "#";
            logoutBtn.style.display = '';
        } else {
            loginBtn.innerHTML = `<i class="fas fa-user"></i>登录`;
            loginBtn.href = "login.html";
            logoutBtn.style.display = 'none';
        }
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('username');
            location.reload();
        }
    }
});

window.onscroll = () => {
    if (searchForm) searchForm.classList.remove('active');
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    }
}

let list_items = document.querySelectorAll('.filter form .list-container .list .items .item')

list_items.forEach(items =>{

    items.onclick = () =>{

        list = items.parentElement.parentElement;
        output = list.querySelector('.output');
        output.value = items.innerHTML;
    }

})


var swiper = new Swiper(".hero-slider", {

    loop: true,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
})

var swiper = new Swiper(".trending-slider", {

    slidesPerView: "auto",
    spaceBetween:20,
        loop: true,
    grabCursor: true,

    autoplay:{
        delay: 2000,
        disableOnInteraction:false,
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = async function(e) {
            e.preventDefault();
            const username = document.querySelectorAll('.input')[0].value;
            const password = document.querySelectorAll('.input')[1].value;
            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            alert(data.msg);
            if (data.msg === '注册成功') {
                window.location.href = 'home.html';
            }
        }
    }
});


