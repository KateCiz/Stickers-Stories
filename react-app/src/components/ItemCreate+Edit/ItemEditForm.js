import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../store/items';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleItem } from '../../store/items';
import './index.css';

function EditItemForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { itemId } = useParams();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async() => {
            await dispatch(getSingleItem(itemId));
            setLoaded(true);
        })();
    }, [dispatch]);
    
    const item = useSelector((state) => state.itemState[itemId]);

    const loggedInUser = useSelector(state => state.session.user);
    const [name, setName] = useState(item?.name);
    const [description, setDescription] = useState(item?.description);
    const [price, setPrice] = useState(item?.price);
    const [content, setContent] = useState(item?.content);
    const [contentType, setContentType] = useState(item?.content_type);
    const [imageUrl, setImageUrl] = useState(item?.image_url);

    const [nameErrors, setNameErrors] = useState(false);
    const [descriptErrors, setDescriptErrors] = useState(false);
    const [priceErrors, setPriceErrors] = useState(false);
    const [contentErrors, setContentErrors] = useState(false);
    const [imageUrlErrors, setImageUrlErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [isValidLink, setIsValidLink] = useState(true);
    const [isValidContentLink, setIsValidContentLink] = useState(true);
    const imgEndings = ["jpg", "svg", "png"];

    useEffect(() => {
        if (loaded) {
          if (item) {
            if (loggedInUser) {
              if (item?.Store?.id !== loggedInUser?.store_id) {
                history.push("/404");
              }  else {
                  if (name?.replaceAll(" ", "").length < 1) {
                    setNameErrors(true);
                  } else {
                    setNameErrors(false);
                  }
                  if (description?.replaceAll(" ", "").length < 1) {
                    setDescriptErrors(true);
                  } else {
                    setDescriptErrors(false);
                  }
                  if (`${price}`?.replaceAll(" ", "").length < 1 || !Number(price)) {
                      setPriceErrors(true);
                    } else {
                      setPriceErrors(false);
                    }
                  if (content?.replaceAll(" ", "").length < 1) {
                    setContentErrors(true);
                  } else {
                      setContentErrors(false);
                  }
                  if(contentType === 'sticker') {
                      const ending = content?.slice(-3);
                      if (!imgEndings.includes(ending)) {
                        setIsValidContentLink(false);
                      } else {
                        setIsValidContentLink(true);
                      }
                  } else if(contentType === 'story') {
                      const contentArr = content?.split('/');
                      if (contentArr.length >= 5 && contentArr[2] === 'docs.google.com' && contentArr[3] === 'document') {
                        setIsValidContentLink(true);
                      } else {
                        setIsValidContentLink(false);
                      }
                  }

                  if (imageUrl?.length > 1) {
                    if (imageUrl?.replaceAll(" ", "").length < 1) {
                      setImageUrlErrors(true);
                    }
                  }
                  if (imageUrl?.length > 1) {
                    if (imageUrl?.replaceAll(" ", "").length > 1) {
                      const ending = imageUrl?.slice(-3);
                      if (!imgEndings.includes(ending)) {
                        setIsValidLink(false);
                      } else {
                        setIsValidLink(true);
                      }
                    }
                  } else {
                    setImageUrlErrors(false);
                  }
              }
            }
          }
        }
      }, [loaded, name, description, price, content, contentType, imageUrl]);

  
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (nameErrors || descriptErrors || priceErrors || contentErrors || imageUrlErrors || !isValidContentLink || !isValidLink) {
            setShowErrors(true);
          }
      
        if (!nameErrors && !descriptErrors && !priceErrors && !contentErrors && !imageUrlErrors && isValidContentLink && isValidLink) {
            let item = {
                name,
                description,
                price,
                content,
                content_type: contentType,
                image_url: imageUrl
            };

            dispatch(editItem(item, itemId));
            history.push(`/items/${itemId}`);
        }
    }

    return (
        <div className='edit-item-div'>
        {loaded && (
        <form onSubmit={handleSubmit}>
          <div className='item-tips-text'>
                <p className='item-tips-into'>Hi, tips to remember when editing an item...</p>
                <p>1. All image urls - including sticker content urls - must end in .png, .jpg, or .svg</p>
                <p>2. Content urls for stories must be shared links from a Google Document</p>
              </div>
            <div className='item-input-div'>
                {nameErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Name must have at least 1 character</p>
                </div>
                ) : null}
                <label>
                    Name: 
                    <input
                        type="text"
                        className='item-input'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required />
                </label>
            </div>
            <div className='item-input-div'>
                {descriptErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Description must have at least 1 character</p>
                </div>
                ) : null}
                <label>
                    Description: 
                    <input
                        type="text"
                        className='item-input'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        required />
                </label>
            </div>
            <div className='item-input-div'>
                {priceErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Price must have at least 1 character and be a number greater than 0</p>
                </div>
                ) : null}
                <label>
                    Price: 
                    <input
                        type="text"
                        className='item-input'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} 
                        required />
                </label>
            </div>
            <div className='item-input-div'>
                {contentErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Content must have at least 1 character</p>
                </div>
                ) : null}
                {!isValidContentLink && showErrors ? (
                <div className="errors-msg">
                  <p>An Sticker Url must end in .jpg, .svg, or .png</p>
                  <p>A Story Url must be a link shared from Google Docs</p>
                </div>
                ) : null}
                <label>
                    Content Url: 
                    <input
                        type="text"
                        className='item-input'
                        value={content}
                        onChange={(e) => setContent(e.target.value)} 
                        required />
                </label>
            </div>
            <div className='item-input-div'>
                {imageUrlErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Image Url contain at least 1 character</p>
                </div>
                ) : null}
                {!isValidLink && showErrors ? (
                <div className="errors-msg">
                  <p> An Image Url must end in .jpg, .svg, or .png</p>
                </div>
                ) : null}
                <label>
                    Image Url:
                    <input
                        type="text"
                        className='item-input'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} 
                        required />
                </label>
            </div>
            <div className='item-input-div'>
            <label>
                Content Type:
                <select
                    className='item-input'
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    required>
                    <option value='' disabled={true}>Choose</option>
                    <option value='story'>Story</option>
                    <option value='sticker'>Sticker</option>
                </select>
            </label>
            </div>
            <button className="submit-btn" type="submit">Update Item</button>
            <button className="cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
        </form>)}
        </div>
    )
};

export default EditItemForm;
