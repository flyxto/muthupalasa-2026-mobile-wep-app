import React from 'react';
import { MainFlow } from '@/components/MainFlow';

interface StarClubPageProps {
  params: Promise<{ goldenPass: string }>;
}

export default async function StarClubPage({ params }: StarClubPageProps) {
  const resolvedParams = await params;
  const goldenPass = resolvedParams?.goldenPass;

  return <MainFlow goldenPass={goldenPass} clubType="starclub" />;
}
