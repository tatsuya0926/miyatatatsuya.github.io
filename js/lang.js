// 表示言語（ja / en）を決めて <html lang="..."> に設定する。
// 優先順位: URLの ?lang= → 前回選んだ言語 → 日本語
// <head> の中、<title> とCSSの後で読み込むこと（表示前に切り替えるため）。
(function () {
    var valid = function (l) { return l === 'ja' || l === 'en'; };

    var lang = new URLSearchParams(location.search).get('lang');
    if (!valid(lang)) {
        try { lang = localStorage.getItem('lang'); } catch (e) {}
    }
    if (!valid(lang)) lang = 'ja';
    try { localStorage.setItem('lang', lang); } catch (e) {}

    document.documentElement.lang = lang;

    // <title data-en="..."> があれば英語表示のときにタイトルを差し替える
    var title = document.querySelector('title');
    if (lang === 'en' && title && title.dataset.en) {
        document.title = title.dataset.en;
    }
})();
