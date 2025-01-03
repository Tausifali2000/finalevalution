import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import responseForm from "./cssModules/responseForm.module.css";

import useSessionStore from '../../../store/session';
import { PieChart } from 'react-minimal-pie-chart';

const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false); // Track if buttons are active

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

  return (
    <div className={responseForm.main}>
      <header className={responseForm.userheader}>

        <div className={responseForm.response}>
          <button
            className={responseForm.flowButton}
            onClick={() => navigate(`/buildform/${formId}`)}
            disabled={!isActive}
          >
            Flow
          </button>
          <button
            className={responseForm.responseButton}
            onClick={() => navigate(`/response/${formId}`)}
            disabled={!isActive}
          >
            Response
          </button>
        </div>

        <div className={responseForm.btn}>
          <button
            className={responseForm.shareBtn}
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
            className={responseForm.saveBtn}
            onClick={handleSaveForm}
            disabled={!isActive}
          >
            Save
          </button>
          <Link to="/">
            <img
              src="/closeRedIcon.png"
              alt="image"
              className={`${responseForm.buttonIcon} ${responseForm.cursorPointer}`}
            />
          </Link>
        </div>
      </header>

      <div className={responseForm.mainContainer}>
        <div className={responseForm.counterContainer}>
          <div className={responseForm.views}>
            <div>Views</div>
            <div>600</div>
          </div>
          <div className={responseForm.views}>
            <div>Starts</div>
            <div>100</div>
          </div>
        </div>
        <div className={responseForm.responseTable}>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Submitted at</th>
                <th>Button 1</th>
                <th>Email 1</th>
                <th>Text 1</th>
                <th>Button 2</th>
                <th>Rating 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jul 17, 03:23 PM</td>
                <td>Hi!</td>
                <td>abc@g.com</td>
                <td>alpha</td>
                <td>Studio App to Manage Clients, Tracking App for Clients</td>
                <td>5</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jul 17, 02:48 PM</td>
                <td>Hi!</td>
                <td>--</td>
                <td>fsdfasd</td>
                <td>--</td>
                <td>3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jul 14, 04:25 PM</td>
                <td>Hi!</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={responseForm.completionContainer}>
          <div className={responseForm.pieChart}>
            <PieChart
              data={[
                { title: 'Completed', value: 40, color: '#3B82F6' },
                { title: 'Two', value: 60, color: '#909090' }
              ]}

            />;
          </div>
          <div className={responseForm.completeLabel}>
            <div>Completed</div>
            <div>40</div>
          </div>
          <div className={responseForm.completeRate}>
            <div>Completion Rate</div>
            <div>40%</div>
          </div>
        </div>
      </div>
    </div>


   
  )
}

export default Response;

