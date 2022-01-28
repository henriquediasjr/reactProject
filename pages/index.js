import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Titulo(props) {

  const Tag = props.tag;
  // console.log(props)
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag}{
              color: ${appConfig.theme.colors.neutrals["000"]};
              font-size: 24px;
              font-weight: 600;
            }
      `}</style>
    </>
  )
}

// Componente React
// function HomePage() {
//   //JSX
//     return (
//       <div>
//         <GlobalStyle/>
//         <Titulo tag="h1">Bem vindos!</Titulo>
//         <h2>Discord - Henrique Dias</h2>
//       </div>
//     )
//   }

// export default HomePage


export default function PaginaInicial() {
  // const username = 'nei';
  const [username, setUsername] = useState('henriquediasjr');
  const roteamento = useRouter();
  const [gitData, setGitData] = useState()

  fetch(`https://api.github.com/users/${username}`).then(res => {
    if (res.ok) {
      res.json().then(data => {
        setGitData(data)
      })
    } else {
      console.log('erro')
    }
  }).catch((err) => console.error(err))



  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AM-JKLXxgQnpVURU3tch_gDLMxNI9zQRuhZmtxm_cAxXD9F53nPDwJ0HqNSFNdWLkeIM4uDuE0PDqJxx5PvLcfbKbY1DCJJbSJL-cC2CycdFbqxWzKHFGkMoVItEqT5e8b0kZwKrWMueX2WWtKjqDxkDr8AETg=w2074-h1378-no?authuser=0)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', border: '2px solid black', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infoEvento) {
              infoEvento.preventDefault();
              console.log('Alguém submeteu o form')
              roteamento.push('/chat')
              // window.location.href = '/chat' 
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function handler(event) {
                console.log('usuario digitou', event.target.value)
                //onde está o valor?
                const valor = event.target.value;
                //trocar valor da variável, atráves do react e avise quem precisa
                setUsername(valor)
              }}
            /> */}
            <TextField
              fullWidth
              value={username}
              onChange={function handler(event) {
                const valor = event.target.value;
                // console.log(valor)
                setUsername(valor)
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              disabled={username.length <= 2}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={
                username.length > 2 ? `https://github.com/${username}.png` : ''}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}>
              {/* {gitData.location}
              {gitData.bio} */}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}