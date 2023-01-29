import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ICreateArticleForm } from '../../types/interfaces';
import { useFetchArticleQuery, useEditArticleMutation } from '../../store/blogApi';
import { tagsHelper } from '../../helpers/tagsHelper';
import { defaultPath } from '../../paths';

import './EditArticle.scss';

const EditArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [editArticle] = useEditArticleMutation();
  const { data } = useFetchArticleQuery(slug || '');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateArticleForm>({
    defaultValues: {
      title: data?.article.title,
      description: data?.article.description,
      body: data?.article.body,
      tags: [...tagsHelper(data?.article.tagList)],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmit: SubmitHandler<ICreateArticleForm> = async (data) => {
    const { title, description, body, tags } = data;

    const tagList: string[] = [];
    for (const tag of tags) {
      if (tag.tag) tagList.push(tag.tag);
    }

    if (slug) await editArticle({ slug, article: { title, description, body, tagList } }).unwrap();
    navigate(defaultPath);
  };

  const onKeyHandleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <div className="container">
      <div className="create-article">
        <span className="create-article__title">Create new article</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title
            <input
              className="create-article__name"
              placeholder="Title"
              type="text"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 80,
                  message: 'Title can not be longer than 80 characters',
                },
              })}
            />
            {errors.title && <p className="auth__error">{errors.title.message}</p>}
          </label>
          <label>
            Short description
            <input
              className="create-article__description"
              placeholder="Description"
              type="text"
              {...register('description', {
                required: 'Description is required',
                maxLength: {
                  value: 80,
                  message: 'Description can not be longer than 80 characters',
                },
              })}
            />
            {errors.description && <p className="auth__error">{errors.description.message}</p>}
          </label>
          <label>
            Text
            <textarea
              className="create-article__text"
              placeholder="Text"
              onKeyDown={onKeyHandleSubmit}
              {...register('body', {
                required: 'Article text is required',
                maxLength: {
                  value: 5000,
                  message: 'Text can not be longer than 5000 characters',
                },
              })}
            />
            {errors.body && <p className="auth__error">{errors.body.message}</p>}
          </label>
          <label className="create-article__tags">
            Tags
            {fields.map((field, index) => (
              <li key={field.id}>
                <input
                  {...register(`tags.${index}.tag`)}
                  placeholder="Tag"
                  className="create-article__tag"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="create-article__delete"
                >
                  Delete
                </button>
              </li>
            ))}
          </label>
          <button
            type="button"
            onClick={() => append({ tag: '' })}
            className="create-article__append"
          >
            Add tag
          </button>
          <input className="create-article__button" type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
