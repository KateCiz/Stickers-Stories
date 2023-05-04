import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewItem } from '../../store/items';
import { Redirect, useHistory } from 'react-router-dom';
import './index.css';
import { getSingleStore } from '../../store/stores';

function CreateItemForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedInUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [contentType, setContentType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlLoading, setImageUrlLoading] = useState(false)

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
    if (name.replaceAll(" ", "").length < 1) {
      setNameErrors(true);
    } else {
      setNameErrors(false);
    }
    if (description.replaceAll(" ", "").length < 1) {
      setDescriptErrors(true);
    } else {
      setDescriptErrors(false);
    }
    if (price.replaceAll(" ", "").length < 1 || !Number(price) || price.includes(".")) {
        setPriceErrors(true);
      } else {
        setPriceErrors(false);
      }
    if (content.replaceAll(" ", "").length < 1) {
      setContentErrors(true);
    } else {
        setContentErrors(false);
    }
    if(contentType === 'sticker') {
        const ending = content.slice(-3);
        if (!imgEndings.includes(ending)) {
          setIsValidContentLink(false);
        } else {
          setIsValidContentLink(true);
        }
    } else if(contentType === 'story') {
        const contentArr = content.split('/');
        if (contentArr.length >= 5 && contentArr[2] === 'docs.google.com' && contentArr[3] === 'document') {
          setIsValidContentLink(true);
        } else {
          setIsValidContentLink(false);
        }
    }

    if (imageUrl.length > 1) {
      if (imageUrl.replaceAll(" ", "").length < 1) {
        setImageUrlErrors(true);
      }
    }
    if (imageUrl.length > 1) {
      if (imageUrl.replaceAll(" ", "").length > 1) {
        const ending = imageUrl.slice(-3);
        if (!imgEndings.includes(ending)) {
          setIsValidLink(false);
        } else {
          setIsValidLink(true);
        }
      }
    } else {
      setImageUrlErrors(false);
    }
  }, [name, description, price, content, contentType, imageUrl]);

    if (!loggedInUser?.id) return (
        <Redirect to='/'/>
      )
  
      const handleCancel = (e) => {
        e.preventDefault();
        history.push('/')
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nameErrors || descriptErrors || priceErrors || contentErrors || imageUrlErrors || !isValidContentLink || !isValidLink) {
            setShowErrors(true);
            setImageUrlLoading(false);
          }
      
          if (!nameErrors && !descriptErrors && !priceErrors && !contentErrors && !imageUrlErrors && isValidContentLink && isValidLink) {

            const itemFormBody = new FormData();
            itemFormBody.append('name', name);
            itemFormBody.append('description', description);
            itemFormBody.append('price', price);
            itemFormBody.append('content', content);
            itemFormBody.append('content_type', contentType);
            itemFormBody.append('image_url', imageUrl)


            setImageUrlLoading(true);

            const res = await fetch('/api/items/', {
              method: 'POST',
              body: itemFormBody
            })

            if(res.ok){
              await res.json();
              setImageUrlLoading(false);
              dispatch(getSingleStore(loggedInUser?.store_id))
              .then(() =>{history.push(`/stores/${loggedInUser?.store_id}`)});
            } else {
              setImageUrlLoading(false);
            }


        
            // dispatch(createNewItem(itemFormBody))
            // .then(() => {dispatch(getSingleStore(loggedInUser?.store_id))})
            // .then(() =>{history.push(`/stores/${loggedInUser?.store_id}`)});

        }
    }

    return (
        <div className="item-create-form">
          {imageUrlLoading ? (<p>Loading Files</p>) : (
            <form onSubmit={handleSubmit}>
              <div className='item-tips-text'>
                <p className='item-tips-into'>Hi, when creating a new item here are a few tips!</p>
                <p>1. All image urls - including sticker content urls - must end in .png, .jpg, or .svg</p>
                <p>2. Content urls for stories must be shared links from a Google Document</p>
                <p>3. All prices must be whole numbers - no decimals</p>
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
                  <p>Image Url must contain at least 1 character</p>
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
                      type="file"
                      className='item-input'
                      accept='image/*'
                      onChange={(e) => setImageUrl(e.target.files[0])} 
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
                <button className="submit-btn" type="submit">Create Item</button>
                <button className="cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
            </form>
          )}
        </div>
    )
};

export default CreateItemForm;
