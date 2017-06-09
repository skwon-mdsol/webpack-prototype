import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello = (props: HelloProps) => {
  return <h1>Hello from {props.compiler} to {props.framework}</h1>;
};

ReactDOM.render(
  <Hello compiler="wooo" framework="react" />,
  document.getElementById('root')
);