import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './dnd_file.scss'

const DndFile = ( props ) => {

    const [ file, setFile ] = useState( false )
    const [ errMessage, setErrMessage ] = useState()
    const [ fileName, setFileName ] = useState('Choose file..')

    let { acceptedFiles, getRootProps, getInputProps} = useDropzone( { maxFiles:1 } )

    const removeFile = () => {
        setFile()
        setFileName()
        props.setFile()
    }

    const trigerSizeNotification = () => {
        setErrMessage( 'Max size 5MB' )
        setTimeout(() => {
            setErrMessage()
        }, 2000)
    }

    const trigerFileNotification = ( err ) => {
        setErrMessage( err )
        setTimeout(() => {
            setErrMessage()
        }, 2000)
    }

    useEffect(() => {
        trigerFileNotification( props.errMessage )
    }, [ props.errMessage ])

    const validateFileSize = ( file ) => {
        return new Promise(( resolve, reject ) => {
            if( file.size >= 5000000 ) {
                trigerSizeNotification()
                reject()
            } else {
                resolve( true )
            }
        }) 
    }

    useEffect(() => {
        const test = async () => {
            if ( acceptedFiles.length > 0 ) {
                await validateFileSize( acceptedFiles[0] )
                setFileName( acceptedFiles[0].path )
                props.setFile(acceptedFiles[0])
                setFile( true )
            } else {
                props.setFile()
                setFile( false )
            }
        }
        test()
    }, [ acceptedFiles ])

if ( file ) return (
    <div className='selected_file_container'>
        <h3>{ fileName }</h3>
        <i onClick={ removeFile } className="fas fa-times"></i>
    </div>
)

  return (
    <section className="dnd_container">
      <div { ...getRootProps( { className: 'dropzone' } ) }>
        <input { ...getInputProps() } />
        <p>Drag 'n' drop your file, or click to browse</p>
        <h3 
            className={ errMessage ? 'notification' : '' }
            >{ errMessage ? errMessage : '5MB Max' }</h3>
      </div>
    </section>
  );
}

export default DndFile