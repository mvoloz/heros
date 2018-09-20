export const createActionTypes = (type, ...props) =>
  props.reduce((acc, prop) => ({ ...acc, [prop]: `${type}/${prop}` }), {});

  