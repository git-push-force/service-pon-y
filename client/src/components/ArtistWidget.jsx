import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends, faHeadphones, faCircle, faStar,
} from '@fortawesome/free-solid-svg-icons';
import NumericLabel from 'react-pretty-numbers';
import artistData from '../data/artistData';

function FollowButton({ isFollowing, toggleFollow }) {
  const followToolTip = isFollowing ? 'Unfollow' : 'Follow';
  if (isFollowing) {
    return (
      <button id="followingArtistButton" onClick={toggleFollow} title={followToolTip}>Following</button>
    );
  }
  return (
    <button id="followArtistButton" onClick={toggleFollow} title={followToolTip}>Follow</button>
  );
}

class ArtistWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      avatar: null,
      followCount: 0,
      trackCount: null,
      isFollowing: null,
    };

    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount() {
    const random = Math.floor(Math.random() * 100);
    this.setState({
      name: artistData[random].artist_name,
      avatar: artistData[random].avatar_picture,
      followCount: artistData[random].no_of_followers,
      trackCount: artistData[random].no_of_tracks,
      isFollowing: artistData[random].is_followed,
    });
  }

  toggleFollow() {
    const { isFollowing } = this.state;
    this.setState({
      isFollowing: !isFollowing,
    });
  }


  render() {
    const {
      name, avatar, followCount, trackCount, isFollowing,
    } = this.state;

    const params = {
      justification: 'L',
      locales: 'en-AU',
      currency: false,
      percentage: false,
      precision: 1,
      commafy: false,
      shortFormat: true,
      shortFormatMinValue: 1001,
      title: false,

    };

    return (
      <div className="artistWidget">
        <img src={avatar} alt="avatar" />
        <div id="artistName">
          <span className="artistNameToolTipContainer" title={`Visit ${name}'s Profile`}>
            {name}
          </span>
          <span className="fa-layers fa-fw" style={{ marginLeft: '3px' }}>
            <span style={{ fontSize: '10px' }}>
              <FontAwesomeIcon icon={faCircle} size="m" color="#f50" />
            </span>
            <span style={{ fontSize: '8px' }}>
              <FontAwesomeIcon icon={faStar} size="xs" color="#fff" />
            </span>
          </span>

        </div>
        <div className="followAndTrackCount">
          <span className="ArtistFollowBadge" id={followCount} title={`${followCount.toLocaleString()} followers`}>
            <span style={{ marginRight: '3px' }}>
              <FontAwesomeIcon color="#999" icon={faUserFriends} />
            </span>
            <NumericLabel params={params}>{followCount}</NumericLabel>
          </span>
          <span className="ArtistTrackBadge" title={`${trackCount} tracks`}>
            <span style={{ marginRight: '3px' }}>
              <FontAwesomeIcon color="#666" padding-right="3px" icon={faHeadphones} />
            </span>
            {trackCount}
          </span>

        </div>
        <FollowButton isFollowing={isFollowing} toggleFollow={this.toggleFollow} />
      </div>
    );
  }
}


export default ArtistWidget;
