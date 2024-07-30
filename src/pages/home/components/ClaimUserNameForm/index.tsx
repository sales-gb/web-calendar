import { Button, TextInput } from '@ignite-ui/react'
import * as S from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUserNameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/),
})

type TClaimUserNameFormData = z.infer<typeof claimUserNameSchema>

export function ClaimUserNameForm() {
  const { register, handleSubmit } = useForm<TClaimUserNameFormData>()

  async function handleClaimUserName(data: TClaimUserNameFormData) {
    console.log(data)
  }

  return (
    <S.Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        crossOrigin={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </S.Form>
  )
}
