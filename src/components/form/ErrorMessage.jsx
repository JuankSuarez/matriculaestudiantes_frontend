import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ error, text }) => {
  return (
    <Message error>
      <Message.Header>{error.statusText}</Message.Header>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List>
          {Object.values(error.data.errors)
            .flat()
            .map((err, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Message.Item key={i}>{err}</Message.Item>
            ))}
        </Message.List>
      )}
      {text && <Message.Content content={text} />}
    </Message>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
}

export default ErrorMessage
