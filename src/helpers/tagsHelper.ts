export const tagsHelper = (tags: string[] | undefined): { tag: string }[] => {
  const tagList = [];
  if (tags) for (const tag of tags) tagList.push({ tag });

  return tagList;
};
