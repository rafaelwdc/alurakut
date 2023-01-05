import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommuns'
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations'

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'rafaelwdc'
  const pessoasFavoritas = [
    {key: 1, valor:'juunegreiros'}, 
    {key: 2, valor:'omariosouto'}, 
    {key: 3, valor:'peas'}, 
    {key: 4, valor:'rafaballerini'}, 
    {key: 5, valor:'marcobrunodev'}, 
    {key: 6, valor:'felipefialho'}
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map(({key, valor}) => {
                return (
                  <li>
                    <a href={`/users/${valor}`} key={key}>
                      <img src={`https://github.com/${valor}.png`} />
                      <span>{valor}</span>
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
