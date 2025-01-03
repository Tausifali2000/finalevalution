import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';
import BubbleElement from '../../components/bubbles/BubbleElement';
import useSessionStore from '../../../store/session';
import toast from "react-hot-toast";

const BuildForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false); 

  const {
    forms,
    isLoading,
    fetchForm,
    hasFormBeenFetched,
    saveForm,
    addElement,
    updateElement,
    removeElement,
  } = useSessionStore();

  const form = forms[formId] || { formName: '', elements: [] };
  
  useEffect(() => {
    if (formId && !hasFormBeenFetched(formId)) {
      toast.success("Click start to enable buttons");
      fetchForm(formId);
     
    }
  }, [formId, fetchForm, hasFormBeenFetched]);

  const handleSaveForm = async () => {
    if (formId) {
      await saveForm(formId);
    } else {
      console.error('No form ID provided for saving!');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDisabledButtonClick = () => {
    toast.error("Please start the form to enable the buttons.");
  };

  return (
    <>
      <div className={createform.body}>
        <header className={createform.userheader}>
          <div className={createform.formname}>
            <input
              type="text"
              className={createform.searchForm}
              placeholder="Form Name"
              value={form.formName}
              onChange={(e) =>
                useSessionStore.setState((state) => ({
                  forms: {
                    ...state.forms,
                    [formId]: {
                      ...state.forms[formId],
                      formName: e.target.value,
                    },
                  },
                }))
              }
              
            />
          </div>

          <div className="response">
            <Link>  <button
              className={createform.flowButton}
             
             
            >
              Flow
            </button></Link>
             <Link to= "/response">
             <button
              className={createform.responseButton}
             
            
            >
              Response
            </button>
             </Link>
             
           
          </div>

          <div className={createform.btn}>
            <button
              className={createform.shareBtn}
              onClick={() => {
                const shareLink = `${window.location.origin}/viewform/${formId}`;
                navigator.clipboard.writeText(shareLink);
                alert(`Shareable link copied to clipboard: ${shareLink}`);
              }}
              disabled={!isActive}
            >
              Share
            </button>
            <button
              className={createform.saveBtn}
              onClick={handleSaveForm}
              disabled={!isActive}
            >
              Save
            </button>
            <Link to="/">
              <img
                src="/closeRedIcon.png"
                alt="image"
                className={`${createform.buttonIcon} ${createform.cursorPointer}`}
              />
            </Link>
          </div>
        </header>

        <div className={createform.create}>
          <div className={createform.sidebar}>
            <div className={createform.bubbles}>
              <div className={createform.sidebarSubHeading}>Bubbles</div>
              <div className={createform.buttonGroup}>
                <button
                  onClick={() => addElement(formId, 'textBubble')}
                  disabled={!isActive}
                  onDoubleClick={handleDisabledButtonClick}
                >
                  <img
                    src="/textBubble.png"
                    alt="text"
                    className={createform.buttonIcon}
                  />
                  Text
                </button>
                <button
                  onClick={() => addElement(formId, 'imageBubble')}
                  disabled={!isActive}
                >
                  <img
                    src="/imageBubble.png"
                    alt="image"
                    className={createform.buttonIcon}
                  />
                  Image
                </button>
              </div>
            </div>

            <div className={createform.inputs}>
              <div className={createform.sidebarSubHeading}>Inputs</div>
              <div className={createform.buttonGroup}>
                <button
                  onClick={() => addElement(formId, 'textInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/textInput.png"
                    alt="text"
                    className={createform.buttonIcon}
                  />
                  Text
                </button>
                <button
                  onClick={() => addElement(formId, 'numberInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/numberInput.png"
                    alt="Number"
                    className={createform.buttonIcon}
                  />
                  Number
                </button>
                <button
                  onClick={() => addElement(formId, 'emailInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/emailInput.png"
                    alt="Email"
                    className={createform.buttonIcon}
                  />
                  Email
                </button>
                <button
                  onClick={() => addElement(formId, 'phoneInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/phoneInput.png"
                    alt="Phone"
                    className={createform.buttonIcon}
                  />
                  Phone
                </button>
                <button
                  onClick={() => addElement(formId, 'dateInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/dateInput.png"
                    alt="Date"
                    className={createform.buttonIcon}
                  />
                  Date
                </button>
                <button
                  onClick={() => addElement(formId, 'ratingInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/ratingInput.png"
                    alt="Rating"
                    className={createform.buttonIcon}
                  />
                  Rating
                </button>
                <button
                  onClick={() => addElement(formId, 'buttonInput')}
                  disabled={!isActive}
                >
                  <img
                    src="/buttonInput.png"
                    alt="Buttons"
                    className={createform.buttonIcon}
                  />
                  Buttons
                </button>
              </div>
            </div>
          </div>

          <div className={createform.flow}>
            <div className={createform.start}>
              <img
                src="/startIcon.png"
                alt="start"
                className={createform.iconPadding10}
              />
              <button
                onClick={() => setIsActive(true)} 
              >
                Start
              </button>
            </div>
            {console.log("YAHA DEKHO" ,form.elements, form)}
            {form.elements.map((el, index) =>
             el.type === 'textBubble' || el.type === 'imageBubble' ? (
                <BubbleElement
                  key={el._id ?? el.id}
                  id={el._id ?? el.id}
                  type={el.type === 'textBubble' ? 'text' : 'image'}
                  label={el.label}
                  bubblecontent={el.bubblecontent}
                  updateLabel={(newLabel, newContent) =>
                    updateElement(formId, el._id ?? el.id, newLabel, newContent)
                  }
                  
                  removeElement={() => removeElement(formId, el._id ?? el.id)}

                />
              ) : (
                <InputElement
                  key={el._id ?? el.id}
                  id={el._id ?? el.id}
                  type={el.type }
                  label={el.label}
                  updateLabel={(newLabel) =>
                    updateElement(formId, el._id ?? el.id, newLabel, el.bubblecontent)
                  }
                  removeElement={() => removeElement(formId, el._id ?? el.id)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildForm;
