import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewStore } from '../../store/stores';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './CreateStore.css';

function CreateStoreForm({exitModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedInUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
   

    const [nameErrors, setNameErrors] = useState(false);
    const [aboutErrors, setAboutErrors] = useState(false);
    const [coverErrors, setCoverErrors] = useState(false);
    const [profileUrlErrors, setProfileUrlErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [isValidCoverLink, setIsValidCoverLink] = useState(true);
    const [isValidLink, setIsValidLink] = useState(true);
    const imgEndings = ["jpg", "svg", "png"];

    useEffect(() => {
        if (name.replaceAll(" ", "").length < 1) {
          setNameErrors(true);
        } else {
          setNameErrors(false);
        }
        if (about.replaceAll(" ", "").length < 1) {
          setAboutErrors(true);
        } else {
          setAboutErrors(false);
        }

        if (coverImage.length > 1) {
            if (coverImage.replaceAll(" ", "").length < 1) {
              setCoverErrors(true);
            }
          }
        
        if(coverImage.replaceAll(" ", "").length > 1) {
            const ending = coverImage.slice(-3);
            if (!imgEndings.includes(ending)) {
              setIsValidCoverLink(false);
            } else {
              setIsValidCoverLink(true);
            }
        } else {
            setCoverErrors(false);
        }

        if (profileUrl.length > 1) {
            if (profileUrl.replaceAll(" ", "").length < 1) {
              setProfileUrlErrors(true);
            }
          }
    
        if (profileUrl.length > 1) {
          if (profileUrl.replaceAll(" ", "").length > 1) {
            const ending = profileUrl.slice(-3);
            if (!imgEndings.includes(ending)) {
              setIsValidLink(false);
            } else {
              setIsValidLink(true);
            }
          }
        } else {
            setProfileUrlErrors(false);
        }
      }, [name, about, coverImage, profileUrl]);

    if (!loggedInUser?.id) return (
        <Redirect to='/'/>
      )

    const handleSubmit = (e) => {
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
        
        history.push("/");
        
        exitModal()

        return dispatch(createNewStore(store))
        //   .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        //   })
          .then(() => {dispatch(sessionActions.authenticate())});

        }
    }

    return (
        <form className="create-store-form" onSubmit={handleSubmit}>
            {nameErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Name must have at least 1 character</p>
                </div>
                ) : null}
            <label className='create-store-label'>
                Name: 
                <input
                    type="text"
                    className="create-store-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required />
            </label>
            {aboutErrors && showErrors ? (
                <div className="errors-msg">
                  <p>About snippet must have at least 1 character</p>
                </div>
                ) : null}
            <label  className='create-store-label'>
                About: 
                <input
                    type="text"
                    className="create-store-input"
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
            <label  className='create-store-label'>
                Cover Image Url: 
                <input
                    type="text"
                    className="create-store-input"
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
            <label  className='create-store-label'>
                Profile Image Url:
                <input
                    type="text"
                    className="create-store-input"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)} 
                    required />
            </label>
            <button className="create-store-btn" type="submit">Create Store</button>
            <button className="cancel-store-btn"type="button" onClick={(e) => exitModal()}>Cancel</button>
        </form>
    )
};

export default CreateStoreForm;
