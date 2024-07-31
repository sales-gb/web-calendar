import { Button, Text, TextInput } from '@ignite-ui/react'
import * as S from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/router'

const claimUserNameSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa ter pelo menos 3 caracteres.' })
    .max(20, { message: 'Usuário não pode ter mais de 20 caracteres.' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'Usuário pode ter somente letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type TClaimUserNameFormData = z.infer<typeof claimUserNameSchema>

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameSchema),
  })
  const router = useRouter()

  async function handleClaimUserName(data: TClaimUserNameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
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
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </S.Form>

      <S.FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado.'}
        </Text>
      </S.FormAnnotation>
    </>
  )
}
