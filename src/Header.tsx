import * as React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { KeyboardBackspace } from '@material-ui/icons'

import {Link} from 'react-router-dom'

const Header = ({link}: {link?: string}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                {link ? (
                    <Link to={link} title='Back home'>
                        <KeyboardBackspace style={{color: 'white', marginRight: 8}} />
                    </Link>
                ): null}
                <Typography variant="h6">Overly Contrived App</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
