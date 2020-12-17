import React from 'react';

import ChannelUI from './Channel';
import ChannelMenu from './ChannelMenu';

import { ChannelResource, ChannelType, ChannelMemberResource } from 'app/models/Channel';

import RouterServices, { ClientStateType } from 'services/RouterService';
import { Collection } from 'services/CollectionsReact/Collections';
import UsersService from 'services/user/user.js';
import { getUserParts } from 'app/components/Member/UserParts';

type Props = {
  channel: ChannelType;
  collection: Collection<ChannelResource>;
};

export default (props: Props): JSX.Element => {
  const userId: string = UsersService.getCurrentUserId();
  const { companyId }: ClientStateType = RouterServices.useStateFromRoute();
  const isDirectChannel = props.channel.visibility === 'direct';

  const menu = (channel: ChannelResource) => {
    if (!channel) return <></>;
    return <ChannelMenu channel={channel} />;
  };

  const channel = props.collection.useWatcher(
    { id: props.channel.id },
    { query: { mine: true } },
  )[0];

  const { avatar, name } = isDirectChannel
    ? getUserParts({
        usersIds: props.channel.direct_channel_members || [],
      })
    : { avatar: '', name: '' };

  if (!channel || !channel.data.user_member?.id || !channel.state.persisted) return <></>;

  const channelIcon = isDirectChannel ? avatar : channel.data.icon || '';
  const channeName = isDirectChannel ? name : channel.data.name || '';

  return (
    <ChannelUI
      collection={props.collection}
      name={channeName}
      icon={channelIcon}
      muted={channel.data.user_member?.notification_level === 'none'}
      favorite={channel.data.user_member?.favorite || false}
      unreadMessages={false}
      visibility={channel.data.visibility || 'public'}
      notifications={channel.data.messages_count || 0}
      menu={menu(channel)}
      id={channel.data.id}
    />
  );
};