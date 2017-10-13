import React from 'react';
import styled, { ThemedReactEmotionInterface } from '../';

let Component;
let mount;

/*
 * Inference HTML Tag Props
 */
Component = styled.div({ color: 'red' });
mount = <Component onClick={event => event} />;

Component = styled('div')({ color: 'red' });
mount = <Component onClick={event => event} />;

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
type CustomProps2 = { customProp: string };
type SFCComponentProps = { className?: string, foo: string };

const SFCComponent: React.StatelessComponent<SFCComponentProps> = props => (
  <div className={props.className}>{props.children} {props.foo}</div>
);

// infer SFCComponentProps
Component = styled(SFCComponent)({ color: 'red' });
mount = <Component foo="bar" />;

// infer SFCComponentProps
Component = styled(SFCComponent)`color: red`;
mount = <Component foo="bar" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled<CustomProps2 & SFCComponentProps>(SFCComponent)({ 
  color: 'red',
}, props => ({
  background: props.customProp,
}));
mount = <Component customProp="red" foo="bar" />;

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled<CustomProps2 & SFCComponentProps>(SFCComponent)`
  color: red;
  background: ${props => props.customProp};
`;
mount = <Component customProp="red" foo="bar" />;


/*
 * With explicit theme
 */

type Theme = {
  color: {
    primary: string,
    secondary: string,
  }
};

const _styled = styled as ThemedReactEmotionInterface<Theme>;

Component = _styled.div`
  color: ${props => props.theme.color.primary}
`;
mount = <Component onClick={event => event} />;

/*
 * withComponent
 */

type CustomProps3 = {
  bgColor: string,
};

Component = styled.div<CustomProps3>(props => ({
  bgColor: props.bgColor,
}));

let Link = Component.withComponent('a');
mount = <Link href="#" bgColor="red" />;

let Button = Component.withComponent('button');
mount = <Button type="submit" bgColor="red" />;
