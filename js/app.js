// npm local host
// localhost:8080

const app = document.querySelector('#app');
const state = {
  source: 'news',

  articles: [
    {
      headline: '',
      byline: '',
      image: '',
      impressions: '',
      link: ''
    }
  ]
}

// Fetch NY Times news
// function fetchNYTimes() {
//     return fetch('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=%22donald+trump+%22&&api-key=25e5e6c8ec914bcc84a4957c58846b68')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//     return data.response.docs.map(article => {
//       return {
//         headline: article.headline.main,
//         byline: article.byline.original,
//         image: article.multimedia.url, // how to get back inside this array?
//         impressions: article.word_count, // need to go back up to meta
//         link: article.web_url
//       }
//     })
//   })
// }

// function getNews() {
//   return new Promise(function (resolve, reject) {
//
//   });
// }

// Fetch all news feed articles
function fetchNews() {
  const sourceOne = 'https://content.guardianapis.com/search?q=donald+trump&sectionId=politics&show-fields=thumbnail,byline,starRating&api-key=addcef14-e761-45b6-8045-2157aa8a3f6b'
  const sourceTwo = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=%22donald+trump+%22&&api-key=25e5e6c8ec914bcc84a4957c58846b68'

  fetch(sourceOne).then(res => res.json())
  .then(data => {
    console.log(data)
    return data.response.results.map(article => {
      return {
        headline: article.webTitle,
        byline: article.fields.byline,
        image: article.fields.thumbnail,
        impressions: article.fields.starRating,
        link: article.webUrl
      }
    })
  })

  fetch(sourceTwo).then(res => res.json())
  .then(data => {
    console.log(data)
    return data.response.docs.map(article => {
      return {
        headline: article.headline.main,
        byline: article.byline.original,
        image: article.multimedia.url, // how to get back inside this array?
        impressions: article.word_count, // need to go back up to meta
        link: article.web_url
      }
    })
  });

}


// WORKING : Fetch The Guardian articles
// function fetchGuardian() {
//   return fetch('https://content.guardianapis.com/search?q=donald+trump&sectionId=politics&show-fields=thumbnail,byline,starRating&api-key=addcef14-e761-45b6-8045-2157aa8a3f6b')
//   // Split this URL into a nicer array??
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//     return data.response.results.map(article => {
//       return {
//         headline: article.webTitle,
//         byline: article.fields.byline,
//         image: article.fields.thumbnail,
//         impressions: article.fields.starRating,
//         link: article.webUrl
//       }
//     })
//   })
// }


function fetchArticles(source) {
  if (source === 'news') {
    return fetchNews();
  }
}


fetchArticles(state.source)
  .then(articles => state.articles = articles)
  .then(() => render(app, state))


// Render properties of articles in HTML
function renderArticles(articles) {
  return articles.map(article => `
    <article class="article">
      <section class="featuredImage">
        <img src="${article.image}" alt="" />
      </section>
      <section class="articleContent">
          <a href="${article.link}" target="_blank"><h3>${article.headline}</h3></a>
          <h6>${article.byline}</h6>
      </section>
      <section class="impressions">
        ${article.impressions}
      </section>
      <div class="clearfix"></div>
    </article>
  `)
}


function render(container, data) {
  container.innerHTML = `
  <header>
    <section class="container">
      <h1>Trump Dump</h1></a>
      <nav>
        <ul>
          <li><a href="#">Filter: <span>Source Name</span></a>
            <ul>
                <li><a href="#">Source 1</a></li>
                <li><a href="#">Source 2</a></li>
                <li><a href="#">Source 3</a></li>
            </ul>
          </li>
        </ul>
        <section id="search">
          <input type="text" name="name" value="">
          <a href="#"><img src="images/search.png" alt="" /></a>
        </section>
      </nav>
      <div class="clearfix"></div>
    </section>
  </header>
  <div id="popUp" class="loader hidden">
    <a href="#" class="closePopUp">X</a>
    <div class="container">
      <h1>Article title here</h1>
      <p>
        Article description/content here.
      </p>
      <a href="#" class="popUpAction" target="_blank">Read more from source</a>
    </div>
  </div>
  <section id="main" class="container">
    ${renderArticles(data.articles)}
  </section>
  `
}

render(app, state)
