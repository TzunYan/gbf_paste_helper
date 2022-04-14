window.addEventListener('hashchange', function() {  // gbf 只有透過更改 hash 去跳轉網頁
    auto_paste();
});

function auto_paste() {
    if (window.location.hash === "#quest/assist") { // 要助戰那頁才執行
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
        var input_battle_key = null;
        waitForElm("input.frm-battle-key").then((elm) => {
            // 等到填助戰 ID 那個元素出來才執行
            input_battle_key = elm;
            input_battle_key.addEventListener("click", fill_battle_key);
            function fill_battle_key() {
                // 貼上剪貼簿上的值
                navigator.clipboard.readText().then(
                    clipText => {
                        input_battle_key.value = clipText;
                    });
                
            }
        });
    }
}
