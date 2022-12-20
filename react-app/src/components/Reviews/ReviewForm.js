import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import { getSingleItem } from '../../store/items';
import './index.css';

function CreateReviewForm({ exitModal }) {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const history = useHistory();

    const loggedInUser = useSelector(state => state.session.user);
    const store_id = useSelector(state => state.itemState[itemId].Store.id);
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');
    const [starRating, setStarRating] = useState('');

    const [contentErrors, setContentErrors] = useState(false);
    const [photoErrors, setPhotoErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [isValidLink, setIsValidLink] = useState(true);
    const imgEndings = ["jpg", "svg", "png"];

    useEffect(() => {
        if (content.replaceAll(" ", "").length < 1) {
          setContentErrors(true);
        } else {
          setContentErrors(false);
        }

        if (photo.length > 1) {
            if (photo.replaceAll(" ", "").length < 1) {
              setPhotoErrors(true);
            }
          }
        
        if(photo.replaceAll(" ", "").length > 1) {
            const ending = photo.slice(-3);
            if (!imgEndings.includes(ending)) {
              setIsValidLink(false);
            } else {
              setIsValidLink(true);
            }
        } else {
            setPhotoErrors(false);
        }

      }, [content, photo]);

    if (!loggedInUser?.id) return (
        <Redirect to='/'/>
      )
  
      const handleClickAway = (e) => {
        e.preventDefault();
        exitModal();
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('photo errors', photoErrors)
        console.log('valid link', isValidLink)

        if (contentErrors || photoErrors || !isValidLink) {
            setShowErrors(true);
        }
      
        if (!contentErrors && !photoErrors && isValidLink) {
            let photoUrl;

            if(photo.replaceAll(" ", "").length < 1) {  
                photoUrl = null;
            }  else {
                photoUrl = photo;
            }
            let review = {
                content,
                photo: photoUrl,
                star_rating: starRating,
                item_id: itemId,
                store_id
            };
        
            exitModal();

            return dispatch(createReview(review))
            .then(() => {dispatch(getSingleItem(itemId))})
        }
    }

    return (
        <form onSubmit={handleSubmit} className='create-review-form'>
            <p className='create-review-header'>Create Review</p>
            {contentErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Content must have at least 1 character</p>
                </div>
                ) : null}
            <label className='create-review-label'>
                Review: 
                <textarea
                    // type="text"
                    className="create-review-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} 
                    required />
            </label>
            {photoErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Photo Url must contain at least 1 visible character or be left blank</p>
                </div>
                ) : null}
                {!isValidLink && showErrors ? (
                <div className="errors-msg">
                  <p>An Image Url must end in .jpg, .svg, or .png</p>
                </div>
                ) : null}
            <label className='create-review-label'>
                Photo Url:
                <input
                    type="text"
                    className="create-review-input"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)} 
                    />
            </label>
            <label className='create-review-label'>
                Star Rating
                <select
                    className="create-review-input"
                    value={starRating}
                    onChange={(e) => setStarRating(e.target.value)}
                    required>
                    <option value="" disabled={true}>Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </label>
            <button className="create-review-btn" type="submit">Post Review</button>
            <button className="cancel-review-btn" type="button" onClick={handleClickAway}>Cancel</button>
        </form>
    )
};

export default CreateReviewForm;
