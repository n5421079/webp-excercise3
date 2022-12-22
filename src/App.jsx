import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">ポケモン画像</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute pokémon!" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      <div className="column is-3">
        <Image src={urls} />
      </div>
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { id } = event.target.elements;
    props.onFormSubmit(id.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div>
            <div>
              <input type="number" name="id"></input>
            </div>
          </div>
          <div>
            <button type="submit">
              検索
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("1").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(id) {
    fetchImages(id).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>こちらは「日本大学文理学部情報科学科 Webプログラミングの演習課題」として制作したものである。</p>
        <p>制作者:5421079 高橋歩</p>
        <p>
          <a href="https://pokeapi.co/">PokéAPIはこちら</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
  
export default App;