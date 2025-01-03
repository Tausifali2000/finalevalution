import { useEffect, useState } from "react";
import homestyles from "./cssModules/home.module.css";
import { useHomeStore } from "../../../store/home.js";
import { useAuthStore } from "../../../store/authUser.js";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import ToggleButton from "react-toggle-button";

import CreateDialog from "../../components/CreateDialog.jsx";
import DeleteDialog from "../../components/DeleteDialog.jsx";

import Dropdown from "../../components/Dropdown.jsx";
import ShareDialog from "../../components/ShareDialog.jsx";
import useWorkspaceStore from "../../../store/share.js";

const HomeScreen = () => {
  const [activeBox, setActiveBox] = useState(null); 
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ type: null, id: null });
  const [formName, setFormName] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); 
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [isWorkspaceSelected, setIsWorkspaceSelected] = useState(false); 
  const [permission , setPermission] = useState("")

  const navigate = useNavigate();
  const {
    folders,
    forms,
    fetchHome,
    createFolder,
    folderById,
    createForm,
    deleteFolder,
    deleteForm,
    fetchWorkspace,
  } = useHomeStore();

  const { user, authCheck } = useAuthStore();
  const { fetchAccessList } = useWorkspaceStore();
  const { username } = user;
  const { id } = fetchAccessList;

  useEffect(() => {

    if (selectedWorkspaceId) {

        fetchWorkspace(selectedWorkspaceId); 
    } else {

      setSelectedWorkspaceId(null)
        fetchHome();

    }
}, [selectedWorkspaceId, fetchWorkspace, fetchHome]);

  const handleWorkspaceSelect = (workspaceId, isSelected, permission) => {
    setSelectedWorkspaceId(workspaceId);
    setIsWorkspaceSelected(isSelected);
    setPermission(permission);
    console.log("Selected Workspace ID:", workspaceId, permission);
  };

  const toggleBox = (type) => {
    setDeleteDialog({ type: null, id: null }); 
    setActiveBox((prev) => (prev === type ? null : type));
  };

  const openDeleteDialog = (type, id) => {
    setActiveBox(null); 
    setDeleteDialog({ type, id });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ type: null, id: null });
  };

  const handleConfirmDelete = async () => {
    try {
      const { type, id } = deleteDialog;
      if (type === "folder") {
        await deleteFolder(id);
      } else if (type === "form") {
        await deleteForm(id);
      }
    } catch (error) {
      console.error(`Failed to delete ${deleteDialog.type}:`, error);
    } finally {
      closeDeleteDialog();
    }
  };

  const handleCreateFolder = async () => {
    try {
      await createFolder({ name: folderName });
      setFolderName(""); 
      setActiveBox(null); 
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleFolderClick = async (folderId) => {
    try {
      setSelectedFolderId(folderId || null); 
      if (folderId) {
        await folderById(folderId); 
      } else {
        await fetchHome(); 
      }
    } catch (error) {
      console.error("Error fetching folder forms:", error);
    }
  };

  const handleCreateForm = async () => {
    try {
      const formData = {
        name: formName,
        folderId: selectedFolderId, 
      };

      await createForm(formData); 
      setFormName(""); 
      setActiveBox(null); 
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const handleFormClick = (formId) => {
    navigate(`/buildform/${formId}`);
  };

  const isDialogActive = !!(activeBox || deleteDialog.type);

  const toggleShareDialog = () => {
    if (isWorkspaceSelected) {
      toast.error("Shared workspaces can't be shared again.");
    } else {
      setIsShareDialogOpen((prev) => !prev);
    }
  };

  const closeShareDialog = () => setIsShareDialogOpen(false);

  return (
    <div className={homestyles.homebody}>
      <header className={homestyles.header}>
        <div className={homestyles.dropdown}>
          <Dropdown username={username}  onWorkspaceSelect={handleWorkspaceSelect}/>
        </div>
        <div className={homestyles.btn}>
          <div>
           Light <ToggleButton 
             inactiveLabel=""
             activeLabel=""/>
          </div> Dark
          <button
  className={homestyles.share}
  onClick={toggleShareDialog}
  disabled={isWorkspaceSelected}
  style={
    isWorkspaceSelected
      ? {
          backgroundColor: "#F0F8FF", 
          color: "black", 
          cursor: "not-allowed", 
        }
      : {}
  }
>
  Share
</button>
        </div>
      </header>

      {"IF userID selected render user ID" ?   (<div className={homestyles.container}>
        <div className={homestyles.workspace}>
          <div className={homestyles.folderbar}>
          <button
    className={homestyles.create1}
    onClick={() => toggleBox("folder")}
    disabled={permission === "view"}
    style={
      permission === "view"
        ? { cursor: "not-allowed" }
        : {}
    }
  >
    <img src="/create.png" alt="Create" /> Create a folder
  </button>
            <div className={homestyles.folders}>
              {folders?.map((folder) => (
                <div key={folder._id} className={homestyles.folderc}>
                  <button
                    className={homestyles.folder}
                    onClick={() => handleFolderClick(folder._id)}
                  >
                    {folder.name}
                  </button>
                  <button
                    className={homestyles.x}
                    onClick={() => openDeleteDialog("folder", folder._id)}
                    disabled={permission === "view"}
                    style={
            permission === "view"
              ? {  cursor: "not-allowed" }
              : {}
          }
        >
          <img src="/delete.png" alt="Delete" />
        </button>
                </div>
              ))}
            </div>
          </div>

          <div className={homestyles.container0}>
          <button
    className={homestyles.createform}
    onClick={() => toggleBox("form")}
    disabled={permission === "view"}
    style={
      permission === "view"
        ? { cursor: "not-allowed" }
        : {}
    }
  >
    <img src="/plus.png" alt="Create" /> Create a typebot
  </button>
            <div className={homestyles.forms}>
              {activeBox === "folder" && (
                <CreateDialog
                  title="Create New Folder"
                  placeholder="Enter folder name"
                  value={folderName}
                  setValue={setFolderName}
                  onConfirm={handleCreateFolder}
                  onCancel={() => toggleBox(null)}
                />
              )}

              {activeBox === "form" && (
                <CreateDialog
                  title="Create New Type Bot"
                  placeholder="Enter type bot name"
                  value={formName}
                  setValue={setFormName}
                  onConfirm={handleCreateForm}
                  onCancel={() => toggleBox(null)}
                />
              )}

              {deleteDialog.type && (
                <DeleteDialog
                  type={deleteDialog.type}
                  onConfirm={handleConfirmDelete}
                  onCancel={closeDeleteDialog}
                />
              )}

              
              {!isDialogActive &&
                forms?.map((form) => (
                  <div key={form._id} className={homestyles.fc}>
                     <button
            className={homestyles.x2}
            onClick={() => openDeleteDialog("form", form._id)}
            disabled={permission === "view"}
            style={
              permission === "view"
                ? {  cursor: "not-allowed" }
                : {}
            }
          >
            <img src="/delete.png" alt="Delete" />
          </button>
                    <button
                      className={homestyles.form}
                      onClick={() => handleFormClick(form._id)}
                    >
                      {form.name}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> )
      : "populate data from workspace ID"
    }

      {isShareDialogOpen && <ShareDialog   closeDialog={closeShareDialog}/>}
    </div>
  );
};

export default HomeScreen;