// 页面过渡动画和通用交互效果

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPageTransition();
    initNavbarEffects();
    initUserAvatar();
    initScrollEffects();
});

// 页面过渡动画
function initPageTransition() {
    // 创建过渡元素
    if (!document.querySelector('.page-transition')) {
        const transitionEl = document.createElement('div');
        transitionEl.className = 'page-transition';
        document.body.appendChild(transitionEl);
    }

    // 创建加载动画
    if (!document.querySelector('.loader')) {
        const loaderEl = document.createElement('div');
        loaderEl.className = 'loader';
        loaderEl.style.display = 'none';
        document.body.appendChild(loaderEl);
    }
    
    // 处理所有链接点击
    document.querySelectorAll('a').forEach(link => {
        // 只处理内部链接
        if (link.hostname === window.location.hostname && !link.hasAttribute('data-no-transition')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 如果是锚点链接或JavaScript链接，不处理
                if (href.startsWith('#') || href.startsWith('javascript:')) {
                    return;
                }
                
                e.preventDefault();
                
                // 开始过渡动画
                const transitionEl = document.querySelector('.page-transition');
                const loaderEl = document.querySelector('.loader');
                
                transitionEl.classList.add('active');
                loaderEl.style.display = 'block';
                
                // 延迟导航以显示动画
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
    
    // 页面加载完成后淡出过渡元素
    window.addEventListener('load', function() {
        const transitionEl = document.querySelector('.page-transition');
        const loaderEl = document.querySelector('.loader');
        
        setTimeout(() => {
            transitionEl.classList.remove('active');
            loaderEl.style.display = 'none';
        }, 300);
    });
}

// 导航栏效果
function initNavbarEffects() {
    // 添加导航链接的悬停效果
    document.querySelectorAll('.nav-link').forEach(link => {
        // 创建波纹效果
        link.addEventListener('mouseenter', function(e) {
            if (!this.querySelector('.nav-ripple')) {
                const ripple = document.createElement('span');
                ripple.className = 'nav-ripple';
                ripple.style.position = 'absolute';
                ripple.style.width = '100%';
                ripple.style.height = '100%';
                ripple.style.top = '0';
                ripple.style.left = '0';
                ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
                ripple.style.transform = 'scale(0)';
                ripple.style.transition = 'transform 0.6s, opacity 0.6s';
                ripple.style.opacity = '0';
                ripple.style.borderRadius = '8px';
                ripple.style.pointerEvents = 'none';
                this.appendChild(ripple);
                
                // 触发动画
                setTimeout(() => {
                    ripple.style.transform = 'scale(2.5)';
                    ripple.style.opacity = '1';
                }, 10);
            }
        });
        
        // 移除波纹效果
        link.addEventListener('mouseleave', function() {
            const ripple = this.querySelector('.nav-ripple');
            if (ripple) {
                ripple.style.opacity = '0';
                setTimeout(() => {
                    if (ripple.parentNode === this) {
                        this.removeChild(ripple);
                    }
                }, 600);
            }
        });
    });
    
    // 设置当前活动导航项
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // 移除文件扩展名进行比较
            const hrefPath = href.replace(/\.html$/, '');
            const currentPathNoExt = currentPath.replace(/\.html$/, '');
            
            if (hrefPath === currentPathNoExt || 
                (hrefPath === 'index' && (currentPathNoExt === '/' || currentPathNoExt === ''))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// 用户头像效果
function initUserAvatar() {
    const avatar = document.querySelector('.user-avatar');
    if (avatar) {
        // 添加鼠标悬停效果
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 从localStorage获取用户信息
        const username = localStorage.getItem('currentUser');
        const usernameEl = document.getElementById('currentUsername');
        
        if (username && usernameEl) {
            usernameEl.textContent = username;
            
            // 获取用户名首字母作为头像
            const initial = username.charAt(0).toUpperCase();
            avatar.textContent = initial;
            
            // 根据用户名生成固定的颜色
            const hue = getHashCode(username) % 360;
            avatar.style.background = `hsla(${hue}, 80%, 45%, 1)`;
        } else if (!username) {
            // 如果未登录，添加跳转到登录页面的功能
            avatar.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }
}

// 滚动效果
function initScrollEffects() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // 渐入动画
    const fadeElements = document.querySelectorAll('.card, .btn-primary, .table-container');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
}

// 辅助函数：从字符串生成哈希码（用于生成固定颜色）
function getHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// 导出过渡函数，供其他脚本使用
window.pageTransition = {
    navigateTo: function(url) {
        const transitionEl = document.querySelector('.page-transition');
        const loaderEl = document.querySelector('.loader');
        
        transitionEl.classList.add('active');
        loaderEl.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
}; 