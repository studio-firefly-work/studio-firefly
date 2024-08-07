import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ContactFormConfirm({ setIsConfirming }) {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div>
      <p className="label-text">お名前</p>
      <p>{values.familyName}({values.familyNameKana}) {values.givenName}({values.givenNameKana})</p>
      <p className="label-text">メールアドレス</p>
      <p>{values.email}</p>
      <p className="label-text">お問い合わせ内容</p>
      <p>{values.message}</p>
      <button type="button" onClick={() => setIsConfirming(false)}>Back</button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );
};
