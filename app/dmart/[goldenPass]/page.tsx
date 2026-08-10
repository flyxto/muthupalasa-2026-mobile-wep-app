import React from 'react';
import { MainFlow } from '@/components/MainFlow';

interface DmartPageProps {
  params: Promise<{ goldenPass: string }>;
}

export default async function DmartPage({ params }: DmartPageProps) {
  const resolvedParams = await params;
  const goldenPass = resolvedParams?.goldenPass;

  return <MainFlow goldenPass={goldenPass} clubType="dmart" />;
}
