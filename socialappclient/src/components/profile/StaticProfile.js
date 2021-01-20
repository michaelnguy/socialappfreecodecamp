import React, { Component, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/userActions';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class StaticProfile extends Component {
  followedUser = () => {
    if (
      this.props.user.following &&
      this.props.user.following.find(
        (following) => following === this.props.profile.handle
      )
    )
      return true;
    else return false;
  };

  followUser = (handle, followerHandle) => {
    this.props.followUser(handle, followerHandle);
    this.props.profile.followersCount++;
  };
  unfollowUser = (handle, followerHandle) => {
    this.props.unfollowUser(handle, followerHandle);
    this.props.profile.followersCount--;
  };

  render() {
    const {
      classes,
      profile: {
        handle,
        createdAt,
        imageUrl,
        bio,
        website,
        location,
        followersCount,
        followingCount,
      },
      user: { handle: currentUserHandle },
    } = this.props;

    const profileCard = (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='profile' className='profile-image' />
          </div>
          <hr />
          <div className='profile-details'>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
            >
              @{handle}
              <hr />
            </MuiLink>
            followers: {followersCount} following: {followingCount}
            <hr />
            {this.followedUser() ? (
              <Button
                color='primary'
                onClick={() => {
                  this.unfollowUser(handle, currentUserHandle);
                }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                color='primary'
                onClick={() => {
                  this.followUser(handle, currentUserHandle);
                }}
              >
                Follow
              </Button>
            )}
            <hr />
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
        </div>
      </Paper>
    );

    return profileCard;
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user.credentials,
});

const mapActionsToProps = {
  followUser,
  unfollowUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StaticProfile));
