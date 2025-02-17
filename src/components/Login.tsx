import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onBlur' });

  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState<string | null>('')

  const getToken = async (data: LoginData): Promise<string | null> => {
    try {
      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      
      
      
      const result: string = await response.json(); // Получаем токен из JSON-ответа
      return result; // Возвращаем токен
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      return null; // В случае ошибки возвращаем null
    }
  };

  const fetchToken = async (data:LoginData) => {
    try {
      const token: string | null  = await getToken(data); // Дожидаемся данных
      setTokenData(token);
    } catch (error) {
      console.error('Ошибка при загрузке актов:', error);
    }
  };

  const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {

    fetchToken(data);

    
    if (tokenData) {
      setTokenData(tokenData)
      localStorage.setItem("authToken", tokenData);
    } else {
      setTokenData(null)
      localStorage.removeItem("authToken"); // Лучше удалить, если токена нет
    }
    
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && token.trim() !== "") {
      navigate("/table"); 
    } else {
      navigate('/login')
    }
  }, [navigate, tokenData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          />
          {errors?.email && <p className="text-red-400 mt-3"> {errors?.email.message} </p>}
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
            className="w-full p-2 border rounded bg-white-300 hover:bg-slate-200"
          />
          {errors.password && <p className="text-red-400 mt-3"> {errors.password.message} </p>}
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-800 text-white py-2 rounded "
        >
          Войти
        </button>
      </form>
    </div>
  );
}
