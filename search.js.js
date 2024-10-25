const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// 假设这是我们要搜索的教程数据
const tutorials = [
    { title: 'HTML 基础教程', url: 'tutorials/html/basics.html' },
    { title: 'CSS 布局教程', url: 'tutorials/css/layouts.html' },
    { title: 'JavaScript 事件处理', url: 'tutorials/javascript/events.html' },
    { title: 'JavaScript AJAX 教程', url: 'tutorials/javascript/ajax.html' },
    { title: 'JavaScript Promise 教程', url: 'tutorials/javascript/promise.html' }
];

// 实现防抖函数，避免频繁触发搜索
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// 处理搜索输入
function handleSearchInput() {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // 清空之前的结果

    if (query) {
        const filteredTutorials = tutorials.filter(tutorial => 
            tutorial.title.toLowerCase().includes(query)
        );

        if (filteredTutorials.length > 0) {
            filteredTutorials.forEach(tutorial => {
                const resultItem = document.createElement('a');
                resultItem.href = tutorial.url;
                resultItem.innerHTML = tutorial.title.replace(
                    new RegExp(query, 'gi'), 
                    match => `<span class="search-highlight">${match}</span>`
                );
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block'; // 显示搜索结果
        } else {
            searchResults.style.display = 'none'; // 无结果时隐藏
        }
    } else {
        searchResults.style.display = 'none'; // 输入为空时隐藏
    }
}

// 监听输入框的输入事件，使用防抖来优化性能
searchInput.addEventListener('input', debounce(handleSearchInput, 300));
