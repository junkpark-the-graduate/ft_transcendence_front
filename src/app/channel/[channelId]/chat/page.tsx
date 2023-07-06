"use client";

import Chat from "../../components/Chat";

export default async function Page({
  params,
}: {
  params: { channelId: number };
}) {
  return (
    <div>
      <h1>Chat</h1>
      <Chat channelId={params.channelId} />
    </div>
  );
}
