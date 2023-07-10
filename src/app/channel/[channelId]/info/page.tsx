"use client";

// import Chat from "../../components/Chat";
import ChannelInfo from "../../components/ChannelInfo";

export default async function Page({
  params,
}: {
  params: { channelId: number };
}) {
  return <ChannelInfo channelId={params.channelId} />;
}
