import * as React from 'react'
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Snackbar,
} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {CheckCircleOutline, HighlightOff} from '@material-ui/icons'
import {Alert} from '@material-ui/lab'

import {useNavigate} from 'react-router'

import Header from './Header'

import {useGetRocketsQuery, useGetRocketLazyQuery} from './queries.gqlGen'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(4),
        },
        nameInput: {
            backgroundColor: theme.palette.grey[50],
            marginBottom: theme.spacing(3),
        },
        shipWrapper: {
            width: '80%',
        },
        active: {
            color: theme.palette.success.main,
        },
        inactive: {
            color: theme.palette.text.disabled,
        },
        icon: {
            textAlign: 'center',
        },
        rocketName: {
            width: 150,
        },
        tableRow: {
            cursor: 'pointer',
        },
        loading: {
            textAlign: 'center',
        },
    }),
)

function Main() {
    const classes = useStyles()
    const navigate = useNavigate()

    const {data: rockets, loading, error} = useGetRocketsQuery()
    const [cacheRocket] = useGetRocketLazyQuery()

    function hoverRocket(rocketId: string) {
        cacheRocket({
            variables: {
                rocketId,
            },
        })
    }

    function clickRocket(rocketId: string) {
        navigate(`./${rocketId}`)
    }

    return (
        <>
            <Header />
            <Grid container spacing={2} direction="column" className={classes.root}>
                <Grid item container justify="center">
                    <Grid item className={classes.shipWrapper}>
                        <Card>
                            <CardHeader disableTypography title={<Typography variant="h5">Ship Details:</Typography>} />
                            <CardContent>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h6">Name</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">Description</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">Active</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={3} className={classes.loading}>
                                                    <Typography variant="h6">Loading...</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            rockets?.rockets?.map(rocket => (
                                                <TableRow
                                                    key={rocket?.id}
                                                    hover
                                                    className={classes.tableRow}
                                                    onMouseEnter={() =>
                                                        rocket && rocket.id ? hoverRocket(rocket.id) : null
                                                    }
                                                    onClick={() =>
                                                        rocket && rocket.id ? clickRocket(rocket.id) : null
                                                    }
                                                >
                                                    <TableCell className={classes.rocketName}>
                                                        <Typography>{rocket?.name}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{rocket?.description}</Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.icon}>
                                                        {rocket?.active ? (
                                                            <CheckCircleOutline className={classes.active} />
                                                        ) : (
                                                            <HighlightOff className={classes.inactive} />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar open={Boolean(error)}>
                    <Alert severity="error">Oh noes, the api results in an error, there goes your presentation.</Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default Main
