import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

const Friends = () => {

    const [friend, setFriend] = useState('')
    const [error, setError] = useState('')
    const addFriend = () => {
        const did = friend.split(':')
        if (did.length == 3) {
            if (did[0] == 'did' && did[1] == '3') {
                console.log('Adding ', friend)
                setError('')
            } else setError('Check DID:3 format')
        } else setError("Check friend's DID")
    }

    return (
        <div>
            <h2>Friends</h2>
            <div className='addFriend'>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Friend's DID "
                        aria-label="Friend's DID "
                        aria-describedby="basic-addon2"
                        onChange={e => setFriend(e.target.value)}
                    />
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={addFriend}>
                        Add
                    </Button>
                </InputGroup>
                <p>{error}</p>
            </div>
        </div>
    )
}

export default Friends;
