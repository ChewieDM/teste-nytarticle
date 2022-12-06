import React, {useState, useEffect} from "react";
import FilterForm from "./FilterForm";

const App = () => {
  const [articles, setArticles] = useState([]) //array para alocar o dado posteriormente
  const [nameArticle, setnameArticle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => { 
    try {
      const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${nameArticle}&api-key=aPCIboE0uAL5Ru4VHiZUZ9Np8qck50SV`) //acessa a API com a chave e uma query que pode ser definida
      const articles = await res.json()
      setArticles(articles.response.docs) //preenche o array criado com o retorno JSON (docs) da API
      console.log(articles.response.docs);
      setIsLoading(false)
    } 
    catch (error) {
      console.log(error);
    }
  }
  fetchArticles()
  }, [nameArticle])

    return (
<>
<div className="showcase">
  <div className="overlay">
    <h1 className="text-white text-center mt-5">Mostrando Artigo Sobre: <br></br> {nameArticle} </h1>
    <FilterForm searchText={(text) => setnameArticle(text)}/>
  </div>
</div>
  {isLoading ? <h1 className="text-center mt-20 font-bold text8xl text-white">Loading...</h1> : <section className="grid grid-cols-1 gap-10 px-5 pt-10 pb-20">
  {articles.map((article) => {
    const {
    abstract, 
    headline: {main}, 
    byline: {original}, 
    lead_paragraph, 
    news_desk, 
    section_name, 
    web_url, 
    _id} = article
    return (
      <a href={web_url}>
      <article
      className="bg-white py-10 px-5 rounded-lg" 
      key= {_id}
      > 
      <h2 className="font-bold text-2xl mb-2">{main}</h2>
      <p>{abstract}</p>
      
      <p>{lead_paragraph}</p>

      <ul className="my-4">
        <li>{original}</li>

        <li>
        <span className="font-bold">News Desk: </span>  {news_desk}
        </li>
        
        <li>
        <span className="font-bold">Section Name: </span>{section_name}
        </li>
      </ul>
      </article>
      </a>
    )
  })}

  </section>}
</>
  );
}

export default App;
