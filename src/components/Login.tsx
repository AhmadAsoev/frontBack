import { useForm } from 'react-hook-form';

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Введите Логин: </label>
          <input
            {...register('login', {
              required: 'Логин обязателен',
              minLength: { value: 3, message: 'Минимум 3 символов' },
              maxLength: { value: 20, message: 'Максимум 20 символов' },
              pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Только буквы и цифры' },
            })}
            placeholder="Введите Логин"
            type="text"
            className="w-full p-2 border rounded bg-slate-300"
          />
          {errors.login && <p className="text-red-600">{errors.login?.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Введите пароль: </label>
          <input
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву и одну цифру',
              },
            })}
            placeholder="Введите Пароль"
            type="password"
            className="w-full p-2 border rounded bg-slate-300"
          />
          {errors.password && <p className="text-red-400 mt-3"> {errors.password.message} </p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Войти
        </button>
      </form>
    </div>
  );
}
