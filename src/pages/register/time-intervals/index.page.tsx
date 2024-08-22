/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Controller, Form, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-to-minutes'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((value) => value.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1 hora distante do início',
      },
    ),
})

type TTimeIntervalFormInput = z.input<typeof timeIntervalsFormSchema>
type TTimeIntervalFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimerIntervals() {
  const {
    register,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<TTimeIntervalFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '00:00', endTime: '00:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '00:00', endTime: '00:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const formattedData = data as TTimeIntervalFormOutput

    console.log(formattedData)
  }

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

      <Form<TTimeIntervalFormInput, TTimeIntervalFormOutput>
        control={control}
        onSubmit={async ({ data }) => await handleSetTimeIntervals(data)}
      >
        <S.IntervalBox>
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

                    <Text>{weekDays[field.weekDay]}</Text>
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

          {errors?.intervals && (
            <S.FormError size="sm">
              {errors.intervals.root?.message}
            </S.FormError>
          )}

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </S.IntervalBox>
      </Form>
    </M.Container>
  )
}
