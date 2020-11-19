import React from 'react'
import Cropper from 'react-cropper'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css'
import PropTypes from 'prop-types'

const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
  let cropper

  const onCropperInit = (component) => {
    cropper = component
  }

  const cropImage = () => {
    if (cropper && typeof cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    if (
      cropper &&
      cropper.getCroppedCanvas().toBlob((blob) => {
        setImage(blob)
      }, 'image/jpeg')
    );
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      aspectRatio={1 / 1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable
      cropBoxMovable
      cropBoxResizable
      crop={cropImage}
      onInitialized={onCropperInit}
    />
  )
}

PhotoWidgetCropper.propTypes = {
  setImage: PropTypes.func.isRequired,
  imagePreview: PropTypes.string.isRequired,
}

export default PhotoWidgetCropper
