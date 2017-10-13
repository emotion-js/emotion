import React from 'react';
import styled from '../';

let Component;
let mount;

/*
 * Inference HTML Tag Props
 */
Component = styled.div({ color: 'red' });
mount = <Component onClick={(event) => event} />;

Component = styled('div')({ color: 'red' });
mount = <Component onClick={(event) => event} />;

Component = styled.div`color: red;`;
mount = <Component onClick={(e) => e} />;

Component = styled('div')`color: red;`;
mount = <Component onClick={(e) => e} />;

Component = styled.a({ color: 'red' });
mount = <Component href="#" />;

Component = styled('a')({ color: 'red' });
mount = <Component href="#" />;

/*
 * Passing custom props
 */
type CustomProps = { lookColor: string };

Component = styled.div<CustomProps>(
  { color: 'blue' },
  props => ({
    background: props.lookColor,
  }),
  props => ({
    border: `1px solid ${props.lookColor}`,
  }),
);
mount = <Component lookColor="red" />;

Component = styled<CustomProps, 'div'>('div')(
  { color: 'blue' },
  props => ({
    background: props.lookColor,
  }),
);
mount = <Component lookColor="red" />;

const anotherColor = 'blue';
Component = styled<CustomProps, 'div'>('div')`
  background: ${props => props.lookColor};
  color: ${anotherColor};
`
mount = <Component lookColor="red" />;

/*
 * With other components
 */
type AnotherCustomProps = { customProp: string }
type SFCComponentProps = { className?: string, foo: 'bar' }
const SFCComponent: React.StatelessComponent<SFCComponentProps> = props => (
  <div className={props.className}>{props.children}</div>
)

// infer SFCComponentProps
Component = styled(SFCComponent)({ 
  color: 'red',
})
mount = <Component foo="bar" />

// do not infer SFCComponentProps, need to pass
Component = styled<AnotherCustomProps & SFCComponentProps>(SFCComponent)({ 
  color: 'red',
})
mount = <Component customProp="red" foo="bar" /> 
