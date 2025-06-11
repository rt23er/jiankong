// 更现代化的导航栏图标替换脚本

document.addEventListener('DOMContentLoaded', function() {
    updateNavIcons();
});

// 更新导航栏图标
function updateNavIcons() {
    // 图标定义 - 使用更现代的设计
    const icons = {
        // 首页图标
        "首页": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12,2.1L1,12h3v9h7v-6h2v6h7v-9h3L12,2.1z M19,19h-3v-6H8v6H5v-7.6l7-6.5l7,6.4V19z"/>
            <rect height="2" width="4" x="10" y="9"/>
        </svg>`,
        
        // 设备管理图标 - 更专业的设计
        "设备管理": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M22,7H2V2h20V7z M22,9H2v5h20V9z M22,16H2v5h20V16z M4,4h1v1H4V4z M4,11h1v1H4V11z M4,18h1v1H4V18z M7,4h7v1H7V4z M7,11h7v1H7V11z M7,18h7v1H7V18z"/>
        </svg>`,
        
        // 数据大屏图标 - 图表和显示屏组合
        "数据大屏": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M20,3H4C2.9,3,2,3.9,2,5v11c0,1.1,0.9,2,2,2h3l-1,3h2l1-3h6l1,3h2l-1-3h3c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,16H4V5h16V16z"/>
            <rect x="6" y="8" width="2" height="5"/>
            <rect x="9" y="7" width="2" height="6"/>
            <rect x="12" y="9" width="2" height="4"/>
            <rect x="15" y="6" width="2" height="7"/>
        </svg>`,
        
        // 视频墙图标 - 多视频组合显示
        "视频墙": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M4,4h6v5H4V4z M4,10h6v5H4V10z M4,16h6v5H4V16z M11,4h9v8h-9V4z M11,13h9v8h-9V13z"/>
        </svg>`,
        
        // 智能巡检图标 - 扫描/检测概念
        "智能巡检": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M4,4h3v2H4v3H2V6C2,4.9,2.9,4,4,4z M20,4h-3v2h3v3h2V6C22,4.9,21.1,4,20,4z M20,18h-3v2h3c1.1,0,2-0.9,2-2v-3h-2V18z M4,18v-3H2v3c0,1.1,0.9,2,2,2h3v-2H4z"/>
            <path d="M12,7c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S14.8,7,12,7z M12,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,15,12,15z"/>
        </svg>`,
        
        // 告警列表图标 - 警告/通知概念
        "告警列表": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12,2L2,22h20L12,2z M12,18c-0.8,0-1.5-0.7-1.5-1.5S11.2,15,12,15s1.5,0.7,1.5,1.5S12.8,18,12,18z M13,14h-2V9h2V14z"/>
        </svg>`,
        
        // 智能专家图标 - 人工智能/思考概念
        "智能专家": `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21,11.2l-2.2-1.3c0.1-0.4,0.2-0.8,0.2-1.2c0-0.4-0.1-0.8-0.2-1.2L21,6.2V3h-4.1L15,4.5C14.5,4.2,14,4,13.5,3.9V2h-3v1.9
            C10,4,9.5,4.2,9,4.5L7.1,3H3v3.2l2.2,1.3C5.1,7.9,5,8.3,5,8.7c0,0.4,0.1,0.8,0.2,1.2L3,11.2V15h4.1L9,13.5c0.5,0.3,1,0.5,1.5,0.6V17
            h3v-2.9c0.5-0.1,1-0.3,1.5-0.6l1.9,1.5H21V11.2z M12,11c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C14,10.1,13.1,11,12,11z"/>
            <path d="M7,19c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2v-1H7V19z"/>
        </svg>`
    };
    
    // 遍历导航链接，替换图标
    document.querySelectorAll('.nav-link').forEach(link => {
        const text = link.textContent.trim();
        
        // 清除现有的SVG图标
        const existingSvg = link.querySelector('svg');
        if (existingSvg) {
            existingSvg.remove();
        }
        
        // 插入新图标
        if (icons[text]) {
            // 提取文本节点
            const textNode = Array.from(link.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)[0];
            
            if (textNode) {
                // 创建临时容器
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = icons[text];
                const svgElement = tempContainer.firstChild;
                
                // 在文本节点前插入SVG图标
                link.insertBefore(svgElement, textNode);
                
                // 给SVG添加过渡效果
                svgElement.style.transition = 'transform 0.3s, color 0.3s';
            }
        }
    });
    
    // 添加图标悬停效果
    document.querySelectorAll('.nav-link').forEach(link => {
        const svg = link.querySelector('svg');
        if (svg) {
            link.addEventListener('mouseenter', function() {
                svg.style.transform = 'scale(1.2)';
            });
            
            link.addEventListener('mouseleave', function() {
                svg.style.transform = '';
            });
        }
    });
} 