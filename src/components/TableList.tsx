import jsPDF from 'jspdf';
import 'jspdf-autotable';
import robotoBase64 from '../fonts/RobotoFonts';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  actNumber: number;
  senderName: string;
  senderPosition: string;
  senderOrganization: string;
  date: number;
  receiverName: string;
  receiverPosition: string;
  receiverOrganization: string;
}

export default function TableList() {
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onBlur' });
  const [acts, setActs] = useState<IForm[]>([]);
  const [message, setMessage] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
    setActs((prevActs) => [...prevActs, data]);
    setMessage('Акт успешно сохранен  ');
    console.log(data);
    // reset();
  };

  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };

  const generatePDF = (act: IForm) => {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto', 'normal');

    doc.text(`Акт №${act.actNumber}`, 10, 10);
    doc.text(`Дата: ${act.date}`, 10, 20);
    doc.text(
      `Отправитель: ${act.senderName}, ${act.senderPosition}, ${act.senderOrganization}`,
      10,
      30
    );
    doc.text(
      `Получатель: ${act.receiverName}, ${act.receiverPosition}, ${act.receiverOrganization}`,
      10,
      40
    );
    doc.text('Подписи: _____________________', 10, 120);
    doc.save(`Акт_${act.actNumber}.pdf`);
  };
  return (
    <>
      <button
        onClick={handleOnclick}
        className="bg-green-500 hover:bg-green-600 rounded-b-xl absolute mx-auto right-0 left-0 top-0 max-w-[400px] text-white hover:text-black "
      >
        {isOpen ? `Закрыть форму` : `Открыть форму`}
      </button>
      {isOpen && (
        <div className="p-7 max-w-[500px] text-center mx-auto  ">
          <h2 className="text-xl font-bold">Форма Акта</h2>
          {message && <p className="text-green-500">{message}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded">
            <input
              {...register('actNumber', {
                required: 'Обязательное поле',
              })}
              placeholder="Номер Акта"
              type="number"
              className="border p-2 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
            />
            {errors.actNumber && <span className="text-red-500">{errors.actNumber.message}</span>}
            <input
              type="date"
              {...register('date', {
                required: 'Обязательное поле',
                max: { value: '2024-12-31', message: 'Дата не может быть позже 2024-12-31' },
              })}
              className="border p-2 w-full"
            />
            {errors.date && <span className="text-red-500">{errors.date.message}</span>}

            <h3 className="font-semibold">Отправитель</h3>
            <input
              {...register('senderName', {
                required: 'Обязательное поле',
                minLength: { value: 15, message: 'Минимум 15 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              placeholder="ФИО"
              type="text"
              className="border p-2 w-full"
              onBlur={(e) => setValue('senderName', e.target.value.trim())}
            />
            {errors.senderName && <span className="text-red-500">{errors.senderName.message}</span>}

            <input
              {...register('senderPosition', {
                required: 'Обязательное поле',
                minLength: { value: 4, message: 'Минимум 4 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              type="text"
              placeholder="Должность"
              className="border p-2 w-full"
              onBlur={(e) => setValue('senderPosition', e.target.value.trim())}
            />
            {errors.senderPosition && (
              <span className="text-red-500">{errors.senderPosition.message}</span>
            )}

            <input
              {...register('senderOrganization', {
                required: 'Обязательное поле',
                minLength: { value: 3, message: 'Минимум 3 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              placeholder="Организация"
              type="text"
              className="border p-2 w-full"
              onBlur={(e) => setValue('senderOrganization', e.target.value.trim())}
            />
            {errors.senderOrganization && (
              <span className="text-red-500">{errors.senderOrganization.message}</span>
            )}

            <h3 className="font-semibold">Получатель</h3>
            <input
              {...register('receiverName', {
                required: 'Обязательное поле',
                minLength: { value: 4, message: 'Минимум 4 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              placeholder="ФИО"
              className="border p-2 w-full"
            />
            {errors.receiverName && (
              <span className="text-red-500">{errors.receiverName.message}</span>
            )}
            <input
              {...register('receiverPosition', {
                required: 'Обязательное поле',
                minLength: { value: 4, message: 'Минимум 4 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              placeholder="Должность"
              className="border p-2 w-full"
              onBlur={(e) => setValue('receiverPosition', e.target.value.trim())}
            />
            {errors.receiverPosition && (
              <span className="text-red-500">{errors.receiverPosition.message}</span>
            )}
            <input
              {...register('receiverOrganization', {
                required: 'Обязательное поле',
                minLength: { value: 3, message: 'Минимум 3 символов' },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+( [a-zA-Zа-яА-ЯёЁ]+)*$/,
                  message: 'Только буквы',
                },
              })}
              placeholder="Организация"
              className="border p-2 w-full"
              onBlur={(e) => setValue('receiverOrganization', e.target.value.trim())}
            />
            {errors.receiverOrganization && (
              <span className="text-red-500 ">{errors.receiverOrganization.message}</span>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Сохранить акт
            </button>
          </form>
        </div>
      )}
      <div className='"p-4 max-w-[500px] min-h-10 text-center mx-auto '>
        <h2 className="text-xl font-bold mt-[50px]">Сохранённые акты</h2>
        <table className="w-full border mt-4">
          <thead>
            <tr>
              <th className="border p-2">Номер</th>
              <th className="border p-2">Дата</th>
              <th className="border p-2">Отправитель</th>
              <th className="border p-2">Получатель</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {acts.map((act, index) => (
              <tr key={index}>
                <td className="border p-2">{act.actNumber}</td>
                <td className="border p-2">{act.date}</td>
                <td className="border p-2">{act.senderName}</td>
                <td className="border p-2">{act.receiverName}</td>
                <td className="border p-2">
                  <button
                    onClick={() => generatePDF(act)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Скачать PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
