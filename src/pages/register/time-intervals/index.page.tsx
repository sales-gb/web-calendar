import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import * as M from '../styles'
import * as S from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimerIntervals() {
  return (
    <M.Container>
      <M.Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>
          Defina os intervalos de horários que você está disponível em cada dia
          da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </M.Header>

      <S.IntervalBox as="form">
        <S.IntervalsContainer>
          <S.IntervalItem>
            <S.IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </S.IntervalDay>

            <S.IntervalInput>
              <TextInput
                size="sm"
                type="time"
                step={60}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
                crossOrigin={null}
              />
              <TextInput
                size="sm"
                type="time"
                step={60}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
                crossOrigin={null}
              />
            </S.IntervalInput>
          </S.IntervalItem>

          <S.IntervalItem>
            <S.IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </S.IntervalDay>

            <S.IntervalInput>
              <TextInput
                size="sm"
                type="time"
                step={60}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
                crossOrigin={null}
              />
              <TextInput
                size="sm"
                type="time"
                step={60}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
                crossOrigin={null}
              />
            </S.IntervalInput>
          </S.IntervalItem>
        </S.IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </S.IntervalBox>
    </M.Container>
  )
}
