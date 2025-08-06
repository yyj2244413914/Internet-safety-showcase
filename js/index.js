// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  // 阻止按钮点击时触发图片链接
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      nextSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      prevSlide();
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // 初始化显示第一张
  showSlide(0);
  
  // 自动播放
  setInterval(nextSlide, 4000);
});

// 专业教师叠卡轮播功能
document.addEventListener('DOMContentLoaded', function() {
  const teacherCards = document.querySelectorAll('.li5box-car');
  const leftBtn = document.getElementById('leftimg');
  const rightBtn = document.getElementById('rightimg');
  
  if (teacherCards.length && leftBtn && rightBtn) {
    let currentIndex = 0;
    const totalCards = teacherCards.length;
    let autoPlayInterval;
    
    function updateCards() {
      teacherCards.forEach((card, index) => {
        card.classList.remove('active');
        
        // 计算相对于当前卡片的位置
        let position = (index - currentIndex + totalCards) % totalCards;
        
        if (position === 0) {
          // 当前卡片（最上层）
          card.style.zIndex = 3;
          card.style.transform = 'translateX(0) translateY(0)';
          card.style.opacity = 1;
          card.classList.add('active');
        } else if (position === 1) {
          // 第二张卡片
          card.style.zIndex = 2;
          card.style.transform = 'translateX(10px) translateY(10px)';
          card.style.opacity = 0.8;
        } else {
          // 第三张卡片
          card.style.zIndex = 1;
          card.style.transform = 'translateX(20px) translateY(20px)';
          card.style.opacity = 0.6;
        }
      });
    }
    
    function nextCard() {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCards();
    }
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextCard, 3000); // 每3秒切换
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    leftBtn.addEventListener('click', function() {
      stopAutoPlay();
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCards();
      startAutoPlay(); // 重新开始自动播放
    });
    
    rightBtn.addEventListener('click', function() {
      stopAutoPlay();
      currentIndex = (currentIndex + 1) % totalCards;
      updateCards();
      startAutoPlay(); // 重新开始自动播放
    });
    
    // 鼠标悬停时暂停自动播放
    const cardContainer = document.querySelector('.li5-box');
    if (cardContainer) {
      cardContainer.addEventListener('mouseenter', stopAutoPlay);
      cardContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 初始化
    updateCards();
    startAutoPlay(); // 开始自动播放
  }
});


