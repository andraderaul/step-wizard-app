import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function App(props) {
  const [state, setState] = useState({
    form: {},
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    setState({
      ...state,
      form,
    });
  };

  const onStepChange = (stats) => {
    console.log(stats);
  };

  const setInstance = (SW) =>
    setState({
      ...state,
      SW,
    });

  return (
    <>
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        instance={setInstance}
      >
        {/* <StepCamera /> */}
        <Step1 update={updateForm} />
        <Step2 update={updateForm} />
        <Step3 state={state} />
      </StepWizard>
    </>
  );
}

function StepCamera(props) {
  const [dataUri, setDataUri] = useState("");

  function handleTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto");
    console.log(dataUri);
    setDataUri(dataUri);
  }
  function removeImage() {
    setDataUri("");
  }

  return dataUri ? (
    <>
      <h1>foto tirada</h1>
      <button onClick={removeImage}>New Picture</button>
    </>
  ) : (
    <>
      <Camera onTakePhotoAnimationDone={handleTakePhotoAnimationDone} />
      <BotoesInferiores step={1} {...props} />
    </>
  );
}

function Step1(props) {
  const handleOnChange = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <>
      <label>Nome</label>
      <input
        type="text"
        name="firstname"
        placeholder="nome"
        onChange={handleOnChange}
      />
      <BotoesInferiores step={2} {...props} />
    </>
  );
}

function Step2(props) {
  const handleOnChange = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <>
      <label>Sobrenome</label>
      <input
        type="text"
        name="secondname"
        placeholder="sobrenome"
        onChange={handleOnChange}
      />
      <BotoesInferiores step={3} {...props} />
    </>
  );
}

function Step3(props) {
  const {
    state: { form },
  } = props;

  const submit = () => {
    alert("Enviando"); // eslint-disable-line
  };

  return (
    <>
      <h1>Final</h1>
      <h2>{form.firstname}</h2>
      <h2>{form.secondname}</h2>
      <BotoesInferiores {...props} step={4} nextStep={submit} />
    </>
  );
}

function BotoesInferiores({ step, totalSteps, previousStep, nextStep }) {
  return (
    <>
      {step > 1 && <button onClick={previousStep}>Anterior</button>}
      {step < totalSteps ? (
        <button onClick={nextStep}>Proximo</button>
      ) : (
        <button onClick={nextStep}>Finalizar</button>
      )}
    </>
  );
}

export default App;
