import React from 'react'
import {DropZone, DropZoneProps, Label, Box} from '@admin-bro/design-system';
import { BasePropertyProps } from 'admin-bro';

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { property, onChange } = props

    const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
        onChange(property.name, files[0])

    }
    return (
        <Box>
            <Label>Upload profile photo</Label>
            <DropZone onChange={(files) => console.log(files)}/>
        </Box>
    )
}

export default Edit;