import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editStore, getSingleStore } from '../../store/stores';
import { useHistory } from 'react-router-dom';
import "./EditStore.css"

function EditStoreForm({store, exitModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedInUser = useSelector(state => state.session.user);

    const [name, setName] = useState(store?.name);
    const [about, setAbout] = useState(store?.about);
    const [coverImage, setCoverImage] = useState(store?.cover_image_url);
    const [profileUrl, setProfileUrl] = useState(store?.profile_image_url);
 
    const [nameErrors, setNameErrors] = useState(false);
    const [aboutErrors, setAboutErrors] = useState(false);
    const [coverErrors, setCoverErrors] = useState(false);
    const [profileUrlErrors, setProfileUrlErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [isValidCoverLink, setIsValidCoverLink] = useState(true);
    const [isValidLink, setIsValidLink] = useState(true);
    const imgEndings = ["jpg", "svg", "png"];

    useEffect(() => {
          if (store) {
            if (loggedInUser) {
              if (store?.id !== loggedInUser?.store_id) {
                history.push("/404");
              } else {
///////



                  if (name?.replaceAll(" ", "").length < 1) {
                    setNameErrors(true);
                  } else {
                    setNameErrors(false);
                  }
                  if (about?.replaceAll(" ", "").length < 1) {
                    setAboutErrors(true);
                  } else {
                    setAboutErrors(false);
                  }

                  if (coverImage?.length > 1) {
                      if (coverImage?.replaceAll(" ", "").length < 1) {
                        setCoverErrors(true);
                      }
                    }
                  
                  if(coverImage?.replaceAll(" ", "").length > 1) {
                      const ending = coverImage?.slice(-3);
                      if (!imgEndings.includes(ending)) {
                        setIsValidCoverLink(false);
                      } else {
                        setIsValidCoverLink(true);
                      }
                  } else {
                      setCoverErrors(false);
                  }

                  if (profileUrl?.length > 1) {
                      if (profileUrl?.replaceAll(" ", "").length < 1) {
                        setProfileUrlErrors(true);
                      }
                    }
                  
                  if (profileUrl?.length > 1) {
                    if (profileUrl?.replaceAll(" ", "").length > 1) {
                      const ending = profileUrl?.slice(-3);
                      if (!imgEndings.includes(ending)) {
                        setIsValidLink(false);
                      } else {
                        setIsValidLink(true);
                      }
                    }
                  } else {
                      setProfileUrlErrors(false);
                  }













                ///////
              }
            }
          }
      }, [store, name, about, coverImage, profileUrl]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (nameErrors || aboutErrors || coverErrors || profileUrlErrors || !isValidCoverLink || !isValidLink) {
            setShowErrors(true);
          }
      
        if (!nameErrors && !aboutErrors && !coverErrors && !profileUrlErrors && isValidCoverLink && isValidLink) {
         
            let store = {
                name,
                about,
                cover_image_url: coverImage,
                profile_image_url: profileUrl
            };

            const store_id = loggedInUser?.store_id
            let updatedStore = await dispatch(editStore(store, store_id))

            if(updatedStore){
                dispatch(getSingleStore(store_id))
                .then(() => {history.push(`/stores/${store_id}`)})
                exitModal()
            }
        
            }
        }

    return (
        <>
            <form className="edit-store-form" onSubmit={handleSubmit}>
                {nameErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Name must have at least 1 character</p>
                </div>
                ) : null}
                <label className="edit-store-label">
                    Name: 
                    <input
                        type="text"
                        className="edit-store-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required />
                </label>
                {aboutErrors && showErrors ? (
                <div className="errors-msg">
                  <p>About snippet must have at least 1 character</p>
                </div>
                ) : null}
                <label className="edit-store-label">
                    About: 
                    <input
                        type="text"
                        className="edit-store-input"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)} 
                        required />
                </label>
                {coverErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Cover Image Url must contain at least 1 character</p>
                </div>
                ) : null}
                {!isValidCoverLink && showErrors ? (
                <div className="errors-msg">
                  <p> An Image Url must end in .jpg, .svg, or .png</p>
                </div>
                ) : null}
                <label className="edit-store-label">
                    Cover Image Url: 
                    <input
                        type="text"
                        className="edit-store-input"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)} 
                        required />
                </label>
                {profileUrlErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Profile Url contain at least 1 character</p>
                </div>
                ) : null}
                {!isValidLink && showErrors ? (
                <div className="errors-msg">
                  <p> An Image Url must end in .jpg, .svg, or .png</p>
                </div>
                ) : null}
                <label className="edit-store-label">
                    Profile Image Url:
                    <input
                        type="text"
                        className="edit-store-input"
                        value={profileUrl}
                        onChange={(e) => setProfileUrl(e.target.value)} 
                        required />
                </label>
                <button className="edit-store-btn" type="submit" >Edit Store</button>
                <button className="cancel-store-btn"type="button" onClick={(e) => exitModal()}>Cancel</button>
            </form>
        </>
    )
};

export default EditStoreForm;
