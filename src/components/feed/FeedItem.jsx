import PropTypes from 'prop-types'

const FeedItem = ({ post }) => {


    const { didId, content } = post

    return (
        <div className='card'>
            <h3>{didId}</h3>
            <p>{content}</p>
        </div>
    )
}

FeedItem.propTypes = {
    post: PropTypes.object.isRequired
}

export default FeedItem
