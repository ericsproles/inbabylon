import React from 'react'
import {DropZone, Label, Box} from '@admin-bro/design-system';

const Edit = () => {
    return (
        <Box>
            <Label>Upload profile photo</Label>
            <DropZone onChange={(files) => console.log(files)}/>
        </Box>
    )
}

export default Edit;