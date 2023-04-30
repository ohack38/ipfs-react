import React, { useEffect } from 'react'
import FeedItem from './FeedItem'

const Feed = ({ activeDid }) => {

    // TABLE IN DB STORING IPFS CIDS TO WITH ACTIVE DID USER HAS RIGHTS TO
    // GET CIDS - FETCH FROM IPFS - ENCRYPT 

    const posts = [{ didId: "did:3:123", content: "It's clearly a crisis of two things: of consciousness and conditioning. These are the two things that the psychedelics attack. We have the technological power, the engineering skills to save our planet, to cure disease, to feed the hungry, to end war; But we lack the intellectual vision, the ability to change our minds. We must decondition ourselves from 10,000 years of bad behavior. And, it's not easy." }, { didId: "did:3:345", content: "Chaos is what we've lost touch with. This is why it is given a bad name. It is feared by the dominant archetype of our world, which is Ego, which clenches because its existence is defined in terms of control." }]

    return (
        <div>
            <h3> Hello {activeDid}, this is your feed </h3>
            {posts.map(post => (
                <FeedItem post={post} />
            ))}
        </div>

    )
}
export default Feed
