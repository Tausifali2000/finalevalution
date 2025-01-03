import { FormResponse } from "../models/response.model.js";
import { Workspace } from "../models/workspace.model.js";

export async function formResponse(req, res) {
  try {
    
    const { answers, questions, userId, formId } = req.body;

    if (!userId || !formId || !Array.isArray(answers) || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    // Check if a form response already exists for this user and form
    let existingResponse = await FormResponse.findOne({ userId, formId });
    console.log(answers)
    console.log(questions)
    console.log(existingResponse);
    
    if (existingResponse) {
      // Push new answers to the existing response
     // existingResponse.formResponse.forEach((answer, index) => {
        existingResponse.formResponse.push({
          questionId: questions[index],
          answer: answers,
      //  });
      });

      // Save the updated response
      await existingResponse.save();
    } else {
      // Create a new form response if none exists
      existingResponse = new FormResponse({
        userId,
        formId,
        formResponse: answers.map((answer, index) => ({
          questionId: questions[index],
          answer: answer,
        })),
      });

      await existingResponse.save();
    }

    // Find the workspace containing the form and add the response reference
    const workspace = await Workspace.findOne({ forms: formId });
    if (workspace) {
      if (!workspace.formResponses.includes(existingResponse._id)) {
        workspace.formResponses.push(existingResponse._id);
        await workspace.save();
      }
    }

    res.status(200).json({ message: 'Form response processed successfully' });
  } catch (error) {
    console.error('Error handling form response:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
