let url = 'http://api.mediastack.com/v1/news?access_key=30bf16ca32e9578d975e9d6ee9055cf6&languages=en';

const countries = {
    'ar': 'Argentina',
    'br': 'Brazil',
    'co': 'Colombia',
    'gb': 'United Kingdom',
    'us': 'USA',
    've': 'Venezuela'
};

let apiRequest = fetch(url).then(async res => {
    let news = await res.json();
    news = news.data;
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
})

