import React, {useState, useEffect} from "react";
import FilterForm from "./FilterForm";
import ShowForm from "./ShowForm";

const App = () => {
  const [articles, setArticles] = useState([]) //array para alocar o dado posteriormente
  const [nameArticle, setnameArticle] = useState('') //definir o nome do artigo posteriormente
  const [isLoading, setIsLoading] = useState(true) //definir o loading se é true ou false
  const [show, setShow] = useState('10') //definir o numero de artigos por pagina posteriormente

  useEffect(() => {
    const fetchArticles = async () => { 
    try {
      const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${nameArticle}&api-key=aPCIboE0uAL5Ru4VHiZUZ9Np8qck50SV`) //acessa a API com a chave e uma query que pode ser definida
      const articles = await res.json()
      setArticles(articles.response.docs.slice(0, show)) //preenche o array criado com o retorno JSON (docs) da API, utilizando o Slice, para poder determinar a quantidade de artigos mostrados por vez
      console.log(articles.response.docs); //log para checar se o acima funciona
      setIsLoading(false) //determina o loading pra falso quando a pagina está carregada
    } 
    catch (error) {
      console.log(error);
    }
  }
  fetchArticles()
  }, [nameArticle, show]) //apoio para a função

    return (
<>
<div className="showcase">
  <div className="overlay">
    <h1 className="text-white text-center mt-5">Showing Articles About: <br></br> {nameArticle} </h1>
    <FilterForm searchText={(text) => setnameArticle(text)}/>
    <ShowForm searchShow={(show) => setShow(show)}/> 
  </div> 
  
</div>
  {isLoading ? <h1 className="text-center mt-20 font-bold text8xl text-white">Loading...</h1> : <section className="grid grid-cols-1 gap-10 px-5 pt-10 pb-20">
  { articles.map((article) => {
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
      <a href={web_url} style={{textDecoration: 'none'}}>
      <article
      className="bg-secondary py-5 px-5 rounded-lg text-white" 
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