const ChildComponent = ({ name }) => {
  console.log('rendering child component');
  return <div>{name}</div>;
};

export default ChildComponent;
