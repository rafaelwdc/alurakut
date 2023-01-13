import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommuns'
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations'

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}



export default function Home(props) {
  const githubUser = props.githubUser
  const [comunidades, setComunidades] = React.useState([])
  const [seguidores, setSeguidores] = React.useState([])
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  React.useEffect(function () {
    fetch('https://api.github.com/users/peas/followers')
      .then(resposta => resposta.json())
      .then(function (seguidores) {
        let seguidoreesArray = []

        seguidores.map(seguidor => {
          seguidoreesArray.push({
            id: seguidor.id,
            link: seguidor.html_url,
            imageUrl: seguidor.avatar_url,
            title: seguidor.login
          })
        })
        setSeguidores(seguidoreesArray)
      })

    fetch('https://api.github.com/users/peas/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta)
      })
    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f26f6f6babf659baace59c24d85169',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        setComunidades(comunidadesVindasDoDato)
      })
    // .then(function (response) {
    //   return response.json()
    // })

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem vindo(a) @{githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault()
              const dadosDoForm = new FormData(e.target)

              console.log(dadosDoForm.get('title'));
              console.log(dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de Capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de Capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidore{seguidores.length > 1 ? 's' : ''} ({seguidores.length})
            </h2>
            <ul>
              {seguidores.map((itemAtual) => {
                { }
                return (
                  < li key={itemAtual.id} >
                    <a href={`/users/${itemAtual.login}`} >
                      <img src={itemAtual.avatar_url} alt={itemAtual.login} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoa{pessoasFavoritas.length > 1 ? 's' : ''} da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  < li key={itemAtual.id} >
                    <a href={`https://github.com/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} alt={itemAtual} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade{comunidades.length > 1 ? 's' : ''} ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  < li key={`${itemAtual.id}`} >
                    <a href={`/users/${itemAtual.id}`} >
                      <img src={itemAtual.imageUrl} alt={itemAtual.title} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
