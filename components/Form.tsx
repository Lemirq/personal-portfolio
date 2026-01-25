'use client';
import { useForm, Resolver } from 'react-hook-form';
import makeToast from '@/utils/makeToast';
import posthog from 'posthog-js';
interface FormValues {
  name: string;
  email: string;
  message: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : !values.email
        ? {
            email: {
              type: 'required',
              message: 'This is required.',
            },
          }
        : // email pattern regex from https://stackoverflow.com/a/46181
          !values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? {
              email: {
                type: 'pattern',
                message: 'Invalid email.',
              },
            }
          : !values.message
            ? {
                message: {
                  type: 'required',
                  message: 'This is required.',
                },
              }
            : {},
  };
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = async (data: FormValues) => {
    const formattedData = {
      name: data.name,
      email: data.email,
      message: data.message,
      date: new Date().toLocaleString('en-ca', { hour12: true }) + ', ' + Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const fetched = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(formattedData),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    console.log(await fetched.json());

    if (fetched.status === 200) {
      makeToast('Message sent!', 'success');
      posthog.capture('contact_form_submitted', {
        message_length: data.message.length,
      });
    } else {
      makeToast('Error sending message!', 'danger');
      posthog.capture('contact_form_failed', {
        status_code: fetched.status,
      });
    }

    setValue('name', '');
    setValue('email', '');
    setValue('message', '');
  };

  return (
    <form
      className='fc items-end gap-3 bg-neutral-900 rounded-xl p-5 w-full sm:w-[full] md:w-auto sm:p-10 text-white text-base'
      onSubmit={handleSubmit(onSubmit)}>
      <div className='fc md:fr gap-3 w-full'>
        <input
          className={`px-3 py-2 bg-transparent outline-hidden transition-colors duration-200 border-b-2 min-w-[200px] lg:min-w-[250px] w-full ${
            errors.name ? 'border-red-500' : 'border-neutral-700'
          }`}
          {...register('name')}
          placeholder='Name'
        />
        <input
          className={`px-3 py-2 bg-transparent outline-hidden transition-colors duration-200 border-b-2 min-w-[200px] lg:min-w-[250px] w-full ${
            errors.email ? 'border-red-500' : 'border-neutral-700'
          }`}
          {...register('email')}
          placeholder='Email'
        />
      </div>
      <textarea
        rows={4}
        className={`h-48 sm:h-60 px-3 py-2 bg-transparent outline-hidden transition-colors duration-200 w-full border-b-2 resize-none ${
          errors.message ? 'border-red-500' : 'border-neutral-700'
        }`}
        {...register('message')}
        placeholder='Your Message'
      />
      <button
        type='submit'
        // className='relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-hidden focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
        // <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
        // <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-sm font-medium text-white backdrop-blur-3xl'
            className=" px-5 border-neutral-700 bg-neutral-800 border-2 rounded-full text-white w-36 h-10 mt-10 cursor-pointer hover:bg-black hover:text-white transition-colors"

        >
          Send
         {/* </span> */}
      </button>
    </form>
  );
};

export default Form;
