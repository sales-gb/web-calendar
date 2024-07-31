import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import * as M from '../styles'
import * as S from './styles'

import { ArrowRight } from 'phosphor-react'

export default function RegisterPage() {
  // async function handleRegister(data: TRegisterFormData) {

  // }

  return (
    <M.Container>
      <M.Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </M.Header>

      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </S.ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </M.Container>
  )
}
