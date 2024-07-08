"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import GPA from './GPA';
import Test from './Tests';
import Michigan from './Michigan';
import Income from './Income';
import SAT from './SAT';
import ACT from './ACT';
import Both from './Both';

type FormData = {
  name: string;
  email: string;
  gpa: string;
  test: string;
  michigan: string;
  income: string;
  sat?: string;
  act?: string;
  both?: string;
};

const QuestionsForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  
  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  const testType = watch('test');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <GPA register={register} errors={errors} />
      <Test register={register} errors={errors} />
      <Michigan register={register} errors={errors} />
      <Income register={register} errors={errors} />
      
      {testType === 'sat' && <SAT register={register} errors={errors} />}
      {testType === 'act' && <ACT register={register} errors={errors} />}
      {testType === 'both' && <Both register={register} errors={errors} />}

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionsForm;
