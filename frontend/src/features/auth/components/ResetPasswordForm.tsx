import { Button, PasswordInput } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import type { IResetPasswordRequest } from '@/interfaces/auth';
import { z } from 'zod';
import { passwordRules } from '@/domain/config';
import { toast } from 'sonner';

interface IProps {
  token: string;
}

const schema = z
  .object({
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const ResetPasswordForm = ({ token }: IProps) => {
  const navigate = useNavigate();

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const resetMutation = useMutation({
    mutationFn: (data: IResetPasswordRequest) =>
      authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password has been reset!', {
        description: 'You will be redirected to Sign In page.',
        duration: 3000,
      });

      setTimeout(() => {
        navigate({ to: '/sign-in' });
      }, 3000);
    },
    onError: (error: Error) => {
      toast.error('Error', { description: error.message });
    },
  });

  const onSubmit = (data: FormSchema) => {
    const parsedData = {
      token,
      newPassword: data.password,
    };
    resetMutation.mutate(parsedData);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        <PasswordInput
          name="password"
          placeholder="New Password"
          page="sign-up"
          watch={watch}
          register={register}
          error={undefined}
        />

        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Your Password"
          watch={watch}
          register={register}
          error={errors.confirmPassword}
        />
      </div>

      <Button
        text={resetMutation.isPending ? 'Changing...' : 'Change Password'}
        styles="font-bold justify-center cursor-pointer mt-2"
        type="submit"
      />
    </form>
  );
};

export default ResetPasswordForm;
