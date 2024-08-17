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
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimerIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: '00:00', endTime: '00:00' },
        { weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 6, enabled: false, startTime: '00:00', endTime: '00:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals() {}

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

      <S.IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <S.IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <S.IntervalItem key={field.id}>
                <S.IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )
                    }}
                  />

                  <Text>{getWeekDays()[field.weekday]}</Text>
                </S.IntervalDay>

                <S.IntervalInput>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                    crossOrigin={null}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                    crossOrigin={null}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </S.IntervalInput>
              </S.IntervalItem>
            )
          })}
        </S.IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </S.IntervalBox>
    </M.Container>
  )
}
