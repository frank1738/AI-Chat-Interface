const FormComponent = ({ handleSubmit, children }) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default FormComponent;
