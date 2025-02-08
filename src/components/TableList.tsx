import jsPDF from 'jspdf';
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
    reset,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onBlur' });
  const [acts, setActs] = useState<IForm[]>([]);

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
    setActs((prevActs) => [...prevActs, data]);
    console.log(data);
    // reset();
    };
    
    const generatePDF = (act: IForm) => {
        const doc = new jsPDF();
        doc.setFont("helvetica");
        doc.text(`Акт №${act.actNumber}`, 10, 10);
    doc.text(`Дата: ${act.date}`, 10, 20);
    doc.text(`Отправитель: ${act.senderName}, ${act.senderPosition}, ${act.senderOrganization}`, 10, 30);
    doc.text(`Получатель: ${act.receiverName}, ${act.receiverPosition}, ${act.receiverOrganization}`, 10, 40);
    doc.save(`Акт_${act.actNumber}.pdf`);
    }
  return (
    <div className="p-4 max-w-[500px] text-center mx-auto ">
      <h2 className="text-xl font-bold">Форма Акта</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded">
        <input
          {...register('actNumber', { required: 'Обязательное поле' })}
          placeholder="Номер Акта"
          className="border p-2 w-full"
        />
        {errors.actNumber && <span className="text-red-500">{errors.actNumber.message}</span>}
        <input
          type="date"
          {...register('date', { required: 'Обязательное поле' })}
          className="border p-2 w-full"
        />
        {errors.date && <span className="text-red-500">{errors.date.message}</span>}

        <h3 className="font-semibold">Отправитель</h3>
        <input
          {...register('senderName', { required: 'Обязательное поле' })}
          placeholder="ФИО"
          className="border p-2 w-full"
        />
        {errors.senderName && <span className="text-red-500">{errors.senderName.message}</span>}

        <input
          {...register('senderPosition', { required: 'Обязательное поле' })}
          placeholder="Должность"
          className="border p-2 w-full"
        />
        {errors.senderPosition && (
          <span className="text-red-500">{errors.senderPosition.message}</span>
        )}

        <input
          {...register('senderOrganization', { required: 'Обязательное поле' })}
          placeholder="Организация"
          className="border p-2 w-full"
        />
        {errors.senderOrganization && (
          <span className="text-red-500">{errors.senderOrganization.message}</span>
        )}

        <h3 className="font-semibold">Получатель</h3>
        <input
          {...register('receiverName', { required: 'Обязательное поле' })}
          placeholder="ФИО"
          className="border p-2 w-full"
        />
        {errors.receiverName && <span className="text-red-500">{errors.receiverName.message}</span>}
        <input
          {...register('receiverPosition', { required: 'Обязательное поле' })}
          placeholder="Должность"
          className="border p-2 w-full"
        />
        {errors.receiverPosition && (
          <span className="text-red-500">{errors.receiverPosition.message}</span>
        )}
        <input
          {...register('receiverOrganization', { required: 'Обязательное поле' })}
          placeholder="Организация"
          className="border p-2 w-full"
        />
        {errors.receiverOrganization && (
          <span className="text-red-500 ">{errors.receiverOrganization.message}</span>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Сохранить акт
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Сохранённые акты</h2>
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
                  <button onClick={() => generatePDF(act)} className="bg-green-500 text-white px-2 py-1 rounded">Скачать PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
