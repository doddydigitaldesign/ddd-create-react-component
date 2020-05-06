export const reactFn = (componentName: string) => `import React from 'react';
import { use${componentName}Styles } from './styles';

interface Props {
  
};

export const ${componentName} = (props: Props) => {
  const classes = use${componentName}Styles();
  return (
    <div className={classes.root}>
      Yay! New component...
      <span role="img" aria-label="Confetti emoji">
        🎉
      </span>
    </div>
  );
};
`;
