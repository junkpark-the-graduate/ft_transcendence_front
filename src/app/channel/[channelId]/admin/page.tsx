"use client";

import React, { useEffect, useState } from "react";
import GridType4 from "@/ui/Grid/GridType4";
import ChannelEdit from "../../components/ChannelEdit";
import ChannelMemberlList from "../../components/ChannelMemberList";
import ChannelBannedMemberList from "../../components/ChannelBannedMemberList";
import ChannelInvite from "../../components/ChannelInvite";
import ChannelAdmin from "../../components/ChannelAdmin";

export default function Page({ params }: { params: { channelId: number } }) {
  return <ChannelAdmin channelId={params.channelId} />;
}

// export default function Page({ params }: { params: { channelId: number } }) {
//   const [channel, setChannel] = useState<any>({});
//   const [members, setMembers] = useState<any[]>([]);
//   const [bannedMembers, setBannedMembers] = useState<any[]>([]);

//   return (
//     <GridType4
//       children={
//         <ChannelEdit
//           channelId={params.channelId}
//           channel={channel}
//           setChannel={setChannel}
//         />
//       }
//       children1={
//         <ChannelMemberlList
//           channelId={params.channelId}
//           channel={channel}
//           members={members}
//           setMembers={setMembers}
//           bannedMembers={bannedMembers}
//           setBannedMembers={setBannedMembers}
//         />
//       }
//       children2={
//         <ChannelBannedMemberList
//           channelId={params.channelId}
//           bannedMembers={bannedMembers}
//           setBannedMembers={setBannedMembers}
//         />
//       }
//       children3={
//         <ChannelInvite
//           channelId={params.channelId}
//           members={members}
//           setMembers={setMembers}
//         />
//       }
//     />
//   );
// }
