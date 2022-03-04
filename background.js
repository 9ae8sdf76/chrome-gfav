const gmail_url = 'https://mail.google.com';

const getUnreadCount = () => {
    const inboxCount = document.querySelector('.aio.UKr6le > .bsU');
    return inboxCount instanceof HTMLElement
        ? inboxCount.textContent
        : 0;
};

const updateIcon = async (count) => {
    const head = document.querySelector('head');
    const favicon = head.querySelector('link[rel*=icon]');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    const textFill = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const textStroke = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    style.textContent = `
svg { position: relative; }
text {
    font-weight: bolder;
    font: bold 4em sans-serif;
    
    position: absolute;
    right: 0;
    bottom: 0;
}
text.fill { 
    fill: black;
}
text.stroke {
    stroke: white;
    stroke-width: 15px;
}`;

    svg.append(style);

    img.setAttribute('href', 'data:image/png;base64,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');
    img.setAttribute('width', '100');
    img.setAttribute('height', '100');
    svg.append(img);

    svg.setAttribute('viewBox', '0,0,100,100');

    textStroke.setAttribute('class', 'stroke');
    textStroke.setAttribute('x', '50');
    textStroke.setAttribute('y', '50');
    textStroke.textContent = count;
    svg.append(textStroke);

    textFill.setAttribute('class', 'fill');
    textFill.setAttribute('x', '50');
    textFill.setAttribute('y', '50');
    textFill.textContent = count;
    svg.append(textFill);

    favicon.setAttribute('sizes', 'any');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('href', `data:image/svg+xml;utf8,${new XMLSerializer().serializeToString(svg).replace(/#/g, '%23')}`);
    favicon.removeAttribute('type');
};

const updateTab = async () => {
    const tabs = await chrome.tabs.query({ url: `${gmail_url}/*` });
    tabs.forEach((tab) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: getUnreadCount,
        }, (results) => {
            for (const result of results) {
                const count = result.result;
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    func: updateIcon,
                    args: [count],
                });
            }
        });
    });
};

// setInterval(updateTab, 750);
updateTab();
