import * as React from 'react'
import {useParams} from 'react-router'
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Snackbar,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Alert} from '@material-ui/lab'

import Header from './Header'

import {useGetRocketQuery} from './queries.gqlGen'

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
    }),
)

const Ship = () => {
    const classes = useStyles()
    const {rocketId} = useParams()

    const {data: rocketData, loading, error} = useGetRocketQuery({
        variables: {
            rocketId,
        },
    })

    const rocket = React.useMemo(() => {
        return rocketData?.rocket
    }, [rocketData?.rocket])

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Header link="../" />
            <Grid container spacing={2} direction="column" className={classes.root}>
                <Grid item container justify="center">
                    <Grid item className={classes.shipWrapper}>
                        <Card>
                            <CardHeader
                                disableTypography
                                title={<Typography variant="h5">{rocket?.name}:</Typography>}
                            />
                            <CardContent>
                                <Typography variant="caption">{rocket?.description}</Typography>
                                <List>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            💥&nbsp;&nbsp;
                                            {rocket?.engines
                                                ? `Engines: ${rocket?.engines?.number} ${
                                                      rocket?.engines?.type!.slice(0, 1).toUpperCase() +
                                                      rocket?.engines?.type!.slice(1)
                                                  } ${rocket?.engines?.version}`
                                                : null}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            💰&nbsp;&nbsp;Cost per launch:{' '}
                                            {Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(
                                                rocket?.cost_per_launch! / 100,
                                            )}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            🗽&nbsp;&nbsp;Height:{' '}
                                            {`${rocket?.height?.feet}' / ${rocket?.height?.meters}m`}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            ⚖️&nbsp;&nbsp;Mass:{' '}
                                            {`${Intl.NumberFormat().format(
                                                rocket?.mass?.lb ?? 0,
                                            )} lb / ${Intl.NumberFormat().format(rocket?.mass?.kg ?? 0)} kg`}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            📈&nbsp;&nbsp;Success Rate: {`${rocket?.success_rate_pct}%`}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem dense disableGutters>
                                        <ListItemText>
                                            📖&nbsp;&nbsp;Wikiwedia:{' '}
                                            <a
                                                href={rocket?.wikipedia ?? '#'}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {rocket?.wikipedia}
                                            </a>
                                        </ListItemText>
                                    </ListItem>
                                </List>
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

export default Ship
