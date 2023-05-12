import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const commentImageUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'

// Write your code here

class Comments extends Component {
  state = {
    name: '',
    commentsList: [],
    comment: '',
    noOfComments: 0,
  }

  onChangeSetName = event => {
    this.setState({name: event.target.value})
  }

  onChangeSetComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    // console.log(this.state)
    const {name, comment} = this.state

    const initialBackgroundClass =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLike: false,
      initialClassName: initialBackgroundClass,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      noOfComments: prevState.noOfComments + 1,
    }))
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLike: !eachComment.isLike}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState(prevState => ({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
      noOfComments: prevState.noOfComments - 1,
    }))
  }

  render() {
    const {name, comment, noOfComments, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-app">
          <h1 className="heading">Comments</h1>
          <div className="comments-container">
            <img src={commentImageUrl} className="image" alt="comments" />
            <form
              className="comments-form-container"
              onSubmit={this.onAddComment}
            >
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                value={name}
                className="input"
                placeholder="Your Name"
                onChange={this.onChangeSetName}
              />
              <textarea
                rows="5"
                value={comment}
                className="input"
                placeholder="Your Comment"
                onChange={this.onChangeSetComment}
              />
              <button type="submit" className="btn">
                Add Comment
              </button>
            </form>
          </div>
          <hr className="separator" />
          <div className="no-of-comments-container">
            <p className="no-of-comments">{noOfComments}</p>
            <p className="comments">Comments</p>
          </div>
          <ul className="comments-list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
