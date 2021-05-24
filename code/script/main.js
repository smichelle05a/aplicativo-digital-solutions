let url = 'https://api.mediastack.com/v1/news?access_key=7948ceebf2c8421e98642fe1ebb4826e&languages=en';
let backupUrl = 'https://mov0g.mocklab.io/news';

const countries = {
    'ar': 'Argentina',
    'br': 'Brazil',
    'co': 'Colombia',
    'gb': 'United Kingdom',
    'us': 'USA',
    've': 'Venezuela'
};

const buildTable = (news) => {
    let tableData = '';
    news.forEach(post => {
        let { author, title, url, source, category, country } = post;
        let date = new Date(post['published_at']).toLocaleString();
        author = post['author'] || 'Anonymus';
        country = countries[post['country']] || 'Other';
        tableData += /* html */`
        <tr>
            <td>${author}</td>
            <td>${title}</td>
            <td><a href="${url}" target="_blank">${source}</a></td>
            <td>${category}</td>
            <td>${country}</td>
            <td>${date}</td>
        </tr>`;
    });
    document.querySelector('#newsData').innerHTML += tableData;
};

let apiRequest = fetch(url).then(async res => {
    let news = await res.json();
    if (!news.error) {
        news = news.data;
        buildTable(news);
    } else {
        console.error('Error intentando obtener información de api.mediastack.com =>', news.error.message);
        console.warn('Se reemplazó la API por la siguiente dirección: https://mov0g.mocklab.io/news');
        fetch(backupUrl).then(async res => {
            news = await res.json();
            news = news.data;
            buildTable(news);
        });
    }
});
