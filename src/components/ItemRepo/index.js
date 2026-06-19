import React from 'react'
import { ItemContainer } from "./styles";

function ItemRepo({repo, handlerRemoverRepo}) {

    const handlerRemover = () => {
        handlerRemoverRepo(repo.id)
        
    }

  return (
    <ItemContainer onClick={handlerRemover}>
        <h3>{repo.name}</h3>
        <p>repo.full.name</p>
        <hr />
        <a href={repo.html_url} target='_blanck'>Ver repositório</a><br />
        <a  href="#" className='remover' rel='noreferrer'>Remover</a> 
        <hr />
    </ItemContainer>
  )
}


export default ItemRepo;