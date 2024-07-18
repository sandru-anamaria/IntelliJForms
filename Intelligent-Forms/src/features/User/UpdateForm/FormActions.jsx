import React from "react";
import "./FormActions.css"
import { deleteTemplateById } from "../../API/TemplateAPI/TemplateAPI";
import Swal from 'sweetalert2'


function FormActions({activeTemplateId}) {


  const deleteTemplate = async()=>{
    Swal.fire({
      title: 'Do you want to delete the form?',
      text: "Deleting the form will result in deleting all it's submission",
      icon: 'warning',
      iconColor:'red',
      showCancelButton: true,
      confirmButtonColor: '#6e8cc7',
      cancelButtonColor: '#d95050',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTemplateById(activeTemplateId);
        Swal.fire(
          'Deleted!',
          'The form and all the submission are deleted!',
          'success'
        )
        window.location.href='#/Update_Form'
      }
    })
  }

  function viewSubmissions()
  {

   window.location.href=`#/Submissions_Forms/${activeTemplateId}`

  }

  return (
    <div>
      <div className="Card1">
      <div className="PozaPDF">
        <img src="images/pdf.png" alt="Logo" />
      </div>
      <div className="Delimitation">© 2023 INTELLIGENT FORMS</div>
    </div>
    <button className="EditButton" type="edit" id="editt">Edit Form</button>
    <button onClick={deleteTemplate} className="DeleteButton" type="delete" id="deletee">Delete Form</button>
    <button  className="ViewButton" type="view" id="view1" onClick={viewSubmissions}>View Subbmissions</button>

    </div>
  );
}

export default FormActions;
