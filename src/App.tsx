import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import GlobalStyle from "./styles/gloabalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
