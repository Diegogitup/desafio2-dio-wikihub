import gitLogo from "../assets/github.png";

import { Container } from "./styles";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";
import { api } from "../services/api";

function App() {
  const [currentRepo, steCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handlerSearchRepo = async () => {
    if (!currentRepo.trim()) {
      alert("Por favor, digite o nome de um repositório.");
      return;
    }

    try {
      const { data } = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const repoExistente = repos.find((repo) => repo.id === data.id);
        if (repoExistente) {
          alert("Este repositório já está na lista!");
          return;
        }

        setRepos((prev) => [...prev, data]);
        steCurrentRepo("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Repositório não encontrado!");
      } else {
        alert("Ocorreu um erro ao buscar o repositório. Tente novamente.");
      }
    }
  };

  const handlerRemoverRepo = (id) => {

    // faço uma variavel
    const repoRemovido = repos.filter((repo) => repo.id !==id);
    setRepos(repoRemovido);
    console.log("clicou em remover", id);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="logo do github" />
      <Input
        value={currentRepo}
        onChange={(e) => steCurrentRepo(e.target.value)}
      />
      <Button onClick={handlerSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo
        key={repo.id}
        handlerRemoverRepo={handlerRemoverRepo} 
        repo={repo} 
        handleRemoveRepo={() => handlerRemoverRepo(repo.id)}
        />
      ))}
    </Container>
  );
}

export default App;
