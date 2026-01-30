import { Button, TextInput } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm, type Path } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import type { IForgotPasswordRequest } from '../models';
import { authService } from '../services/authService';

const schema = z.object({
  email: z.email({ message: 'Please, insert a valid email address.' }),
});

export default function ForgotPasswordForm() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const forgotMutation = useMutation({
    mutationFn: (data: IForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: () => setIsEmailSent(true),
    onError: (error: Error) => {
      toast.error('Error', { description: error.message });
    },
  });

  const onSubmit = (data: FormSchema) => {
    forgotMutation.mutate(data);
  };

  if (isEmailSent) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg animate-in fade-in zoom-in duration-300">
        <h3 className="audio-title text-2xl! md:text-4xl! text-gray-800! flex items-center gap-2">
          All set! <CheckCircle />
        </h3>
        <p className="text-sm md:text-base text-gray-600 text-center mt-2">
          If this e-mail exists in our database, a reset link will be sent to
          you!
        </p>
      </div>
    );
  }

  return (
    <form
      className="w-full max-w-md flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        name={'email' as Path<FormSchema>}
        placeholder="E-mail"
        register={register}
        required
        Icon={Mail}
        error={errors.email}
        disabled={forgotMutation.isPending}
      />

      <Button
        text={forgotMutation.isPending ? 'Sending...' : 'Reset Password'}
        styles="font-bold justify-center cursor-pointer"
        type="submit"
        disabled={forgotMutation.isPending}
      />
    </form>
  );
}
