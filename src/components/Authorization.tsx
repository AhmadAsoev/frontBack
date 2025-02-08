import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Authorization() {
  const {
    register,
      handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

    const navigate = useNavigate();
    const password = watch('password')

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    alert(JSON.stringify(data));
    reset();
    navigate('/table');
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Введите Имя: </label>
          <input
            {...register('firstName', {
              required: 'Имя обязательно',
              minLength: { value: 3, message: 'Минимум 3 символов' },
              maxLength: { value: 15, message: 'Максимум 15 символов' },
              pattern: { value: /^[a-zA-Zа-яА-ЯёЁ]+$/, message: 'Только буквы' },
            })}
            placeholder="Введите Имя"
            type="text"
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
            onBlur={(e) => setValue('firstName', e.target.value.trim())}
          />
          {errors?.firstName && <p className="text-red-600">{errors?.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Введите Фамилию: </label>
          <input
            {...register('lastName', {
              required: 'Фамилия обязательно',
              minLength: { value: 4, message: 'Минимум 4 символов' },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                message: 'Только буквы',
              },
            })}
            placeholder="Введите Фамилию"
            type="text"
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
            onBlur={(e) => setValue('lastName', e.target.value.trim())}
          />
          {errors?.lastName && <p className="text-red-400 mt-3"> {errors?.lastName.message} </p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Введите Почту: </label>
          <input
            {...register('email', {
              required: 'Почта обязательна',
              minLength: { value: 4, message: 'Минимум 4 символов' },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Неправильный формат почты',
              },
            })}
            placeholder="Введите почту"
            type="text"
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
            onBlur={(e) => setValue('email', e.target.value.trim())}
          />
          {errors?.email && <p className="text-red-400 mt-3"> {errors?.email.message} </p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Придумайте пароль: </label>
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
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
          />
          {errors.password && <p className="text-red-400 mt-3"> {errors.password.message} </p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 mt-3">Подтвердите пароль: </label>
          <input
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              minLength: { value: 6, message: 'Минимум 6 символов' },
            //   pattern: {
            //     value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            //     message:
            //       'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву и одну цифру',
                //   },
              validate: (value) => value === password || 'Пароли не совпадают'
            })}
            placeholder="Подтвердите Пароль"
            type="password"
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
          />
          {errors.confirmPassword && <p className="text-red-400 mt-3"> {errors.confirmPassword.message} </p>}
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-800 text-white py-2 rounded "
        >
          Авторизоваться
        </button>
      </form>
    </div>
  );
}
