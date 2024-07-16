import { Heading, Text } from '@ignite-ui/react'
import * as S from './styles'
import Image from 'next/image'
import appPreview from '../../assets/appPreview.png'

export default function Home() {
  return (
    <S.Container>
      <S.Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </S.Hero>

      <S.Preview>
        <Image
          src={appPreview}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </S.Preview>
    </S.Container>
  )
}
