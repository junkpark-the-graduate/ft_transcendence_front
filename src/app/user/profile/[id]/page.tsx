"use client";

import GridType1 from "@/ui/Grid/GridType1";
import Dashboard from "@/ui/Dashboard/Dashboard";
import UserDetail from "@/ui/Dashboard/UserDetail";

export default function UserProfile({ params }: { params: any }) {
  const userId: number = params.id;

  return (
    <GridType1
      children={
        <Dashboard userData={<UserDetail userId={userId} />} id={userId} />
      }
    />
  );
}
