// Write your code here

import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props
  const {name, comment, isLike, id, date, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const time = formatDistanceToNow(date)

  const likeImageUrl = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  //   console.log({time})

  const onClickLikeBtn = () => {
    toggleIsLike(id)
  }
  const likeTextClassName = isLike ? 'like-text' : 'unlike-text'
  //   console.log(likeTextClassName)

  const onClickDeleteBtn = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item-container">
      <div className="comment-header">
        <p className={`initial ${initialClassName}`}>{initial}</p>
        <div className="comment-content">
          <div className="name-container">
            <p className="name">{name}</p>
            <p className="time-format">{time} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="comment-footer">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-img" />
          <button
            type="button"
            className={`${likeTextClassName} like-btn`}
            onClick={onClickLikeBtn}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-btn"
          data-testid="delete"
          onClick={onClickDeleteBtn}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
      <hr className="separator" />
    </li>
  )
}

export default CommentItem
